import { WithId, ObjectId } from 'mongodb'
import type { Request, Response, NextFunction } from 'express'
import {
    addUser,
    activateUser as activateUserService,
    getUser,
    getUserInfo as getUserInfoService,
    getUsers as getUsersService,
    updateUser,
    deleteUser,
} from 'users/user.service'
import { getCockatiel, updateCockatiel, addCockatiel } from 'cockatiels/cockatiel.service'
import { getUserByAuth } from '_helpers/utils'
import emailSender from '_helpers/email-sender'
import { validateUpdateData } from './validation'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserByAuth = getUserByAuth(req.body.auth)
        const userFullInfo: WithId<UserInfoDB> | null | undefined = await getUser({ email: user.email, password: user.password }, next)

        const response: ServerResponse<WithId<AuthResponse> | null> = { error: null, responseBody: null }
        if (userFullInfo) {
            const { _id, password, email, isActive } = userFullInfo
            if (isActive && _id) {
                response.responseBody = { _id, auth: Buffer.from(`${email}:${password}`).toString('base64') }
            } else if (_id && !isActive) {
                response.error = 'Пользователь неактивный'
            } else {
                response.error = 'Неверный пароль и/или почта'
            }
            res.json(response)
        } else {
            response.error = 'Пользователь не найден'
            res.json(response)
        }
    } catch (err) {
        next(err)
    }
}

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserByAuth = getUserByAuth(req.headers.authorization ?? '')
        const userInfo: WithId<UserInfo> | null | undefined = await getUserInfoService({ email: user.email, password: user.password }, next)
        const response: ServerResponse<WithId<UserInfo> | null> = { responseBody: null, error: null }

        if (userInfo?.isActive) {
            response.responseBody = userInfo
        }

        res.json(response)
    } catch (err) {
        next(err)
    }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const userInfo: WithId<UserInfoDB> | null | undefined = await getUser({ email: user.email, password: user.password }, next)
        const response: ServerResponse<WithId<UserInfo> | null> = { responseBody: null, error: null }
        await getUsersService(0, 100, next)
        // getUsersService
        // if (userInfo?.isActive) {
        //     const { cockatielId, password, ...restUserInfo } = userInfo
        //     const cockatiel: Cockatiel | null = cockatielId ? await getCockatiel({ _id: cockatielId }, next) : null
        //     const resposeUserInfo: WithId<UserInfo> = { ...restUserInfo, cockatiel }
        //     response.responseBody = resposeUserInfo
        // }

        res.json(response)
    } catch (err) {
        next(err)
    }
}

export const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserByAuth = getUserByAuth(req.headers.authorization ?? '')
        const userInfo: WithId<UserInfoDB> | null | undefined = await getUser({ email: user.email, password: user.password }, next)
        const response: ServerResponse<Partial<WithId<UserInfo>> | null> = { responseBody: null, error: null }
        const data: Partial<UserInfo> = req.body;

        if (userInfo) {
            const error: string = validateUpdateData(data)
            
            if (!error) {
                const cockatiel: WithId<Cockatiel> | null = userInfo.cockatielId ? await getCockatiel({ _id: userInfo.cockatielId }, next) : null
                
                let cockatielId: ObjectId | undefined
                const cockatielData: Partial<Cockatiel> = {
                    name: req.body.cockatiel.name,
                    appearanceData: req.body.cockatiel.appearanceData
                }
                
                if (cockatiel) {
                    await updateCockatiel(cockatiel._id, cockatielData, next)
                    cockatielId = cockatiel._id
                } else {
                    const createdCoockatiel: WithId<Cockatiel> | null = await addCockatiel(cockatielData, next)
                    cockatielId = createdCoockatiel?._id
                }

                if (cockatielId) {
                    const updatedUser: WithId<UserInfoDB> | null | undefined = await updateUser(
                        userInfo._id, 
                        { nickname: data.nickname ?? '', cockatielId },
                        next
                    )

                    if (updatedUser) {
                        const { cockatielId, password, ...restUserInfo } = updatedUser
                        const cockatiel: Cockatiel | null = cockatielId ? await getCockatiel({ _id: cockatielId }, next) : null
                        const resposeUserInfo: WithId<UserInfo> = { ...restUserInfo, cockatiel }
                        response.responseBody = resposeUserInfo
                    }
                } else {
                    response.error = 'Cockatiel isn\'t created'
                }
            } else {
                response.error = error
            }
        }

        res.json(response)
    } catch (err) {
        next(err)
    }
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo: WithId<UserInfoDB> | null | undefined = await getUser({ email: req.body.email }, next)
        let response: ServerResponse<string | null> = { error: null, responseBody: null }

        if (userInfo) {
            response.error = `Пользователь с почтой ${userInfo.email} уже существует`
            res.json(response)
            return
        }

        const createdUser: WithId<UserInfoDB> | null | undefined = await addUser(req.body, next)

        if (createdUser) {
            const transporter: any = await emailSender()
            const activateURL: string = process.env.APP_MODE === 'production' ? 'https://cockatieldzillas.vercel.app' : 'http://127.0.0.1:3000'

            try {
                await transporter.sendMail({
                    from: '"Cockatieldzillas 🦜" <cockatieldzillas@mail.ru>',
                    to: createdUser.email,
                    subject: "Активация аккаунта",
                    html: `
                                        <a href=\"${activateURL}/activate/${createdUser._id.toString()}\">
                                            ${activateURL}/activate/${createdUser._id.toString()}
                                        </a>
                                        <br/>
                                        <p>
                                            password: ${createdUser.password}
                                        </p>
                                    `,
                })
                response.responseBody = createdUser._id.toString()
                res.json(response)
            } catch(err) {
                await deleteUser(createdUser._id, next)
                response.error = `Введенная почта ${req.body.email} не существует`
                res.json(response)
            }
        } else {
            res.status(500).json(response)
        }
    } catch (err) {
        next(err)
    }
}

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: ServerResponse<{ _id: string } | null> = { responseBody: null, error: null }
        const updateResult: boolean | undefined = await activateUserService(req.params.id, next)

        if (updateResult) {
            response.responseBody = {
                _id: req.params.id
            }
        } else {
            response.error = 'Ошибка активации пользователя'
        }
        res.json(response)
    } catch (err) {
        next(err)
    }
}

export const recovery = async (req: Request, res: Response, next: NextFunction) => {
    const user: WithId<UserInfoDB> | null | undefined = await getUser({ email: req.body.email }, next)
    const response: ServerResponse<{ _id: string } | null> = { responseBody: null, error: null }
    if (user) {
        const transporter = await emailSender()
        await transporter.sendMail({
            from: '"Cockatieldzillas 🦜" <cockatieldzillas@mail.ru>',
            to: req.body.email,
            subject: "Восстановление пароля",
            html: `
                    <p>
                        password: ${user.password}
                    </p>
                `,
        })
        response.responseBody = {
            _id: user._id.toString()
        }
    } else {
        response.error = "Пользователь с такой почтой не найден"
    }
    res.json(response)
}