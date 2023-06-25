import { WithId, ObjectId } from 'mongodb'
import type { Request, Response, NextFunction } from 'express'
import {
    addUser,
    activateUser as activateUserService,
    getUser,
    updateUser
} from 'users/user.service'
import { getCockatiel, updateCockatiel, addCockatiel } from 'cockatiels/cockatiel.service'
import { getUserByAuth } from '_helpers/utils'
import emailSender from '_helpers/email-sender'
import { validateUpdateData } from './validation'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserByAuth = getUserByAuth(req.body.auth)
        const userFullInfo: WithId<UserInfoDB> | null | undefined = await getUser({ email: user.email, password: user.password })

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
        const userInfo: WithId<UserInfoDB> | null | undefined = await getUser({ email: user.email, password: user.password })
        const response: ServerResponse<WithId<UserInfo> | null> = { responseBody: null, error: null }

        if (userInfo?.isActive) {
            const { cockatielId, password, ...restUserInfo } = userInfo
            const cockatiel: Cockatiel | null = cockatielId ? await getCockatiel({ _id: cockatielId }) : null
            const resposeUserInfo: WithId<UserInfo> = { ...restUserInfo, cockatiel }
            response.responseBody = resposeUserInfo
        }

        res.json(response)
    } catch (err) {
        next(err)
    }
}

export const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserByAuth = getUserByAuth(req.headers.authorization ?? '')
        const userInfo: WithId<UserInfoDB> | null | undefined = await getUser({ email: user.email, password: user.password })
        const response: ServerResponse<Partial<WithId<UserInfo>> | null> = { responseBody: null, error: null }
        const data: Partial<UserInfo> = req.body;

        if (userInfo) {
            const error: string = validateUpdateData(data)
            
            if (!error) {
                const cockatiel: WithId<Cockatiel> | null = userInfo.cockatielId ? await getCockatiel({ _id: userInfo.cockatielId }) : null
                
                let cockatielId: ObjectId | undefined
                if (cockatiel) {
                    await updateCockatiel(cockatiel._id, req.body.cockatiel)
                    cockatielId = cockatiel._id
                } else {
                    const createdCoockatiel: WithId<Cockatiel> | null = await addCockatiel(req.body.cockatiel)
                    cockatielId = createdCoockatiel?._id
                }

                if (cockatielId) {
                    const updatedUser: WithId<UserInfoDB> | null | undefined = await updateUser(
                        userInfo._id, 
                        { nickname: data.nickname ?? '', cockatielId }
                    )

                    if (updatedUser) {
                        const { cockatielId, password, ...restUserInfo } = updatedUser
                        const cockatiel: Cockatiel | null = cockatielId ? await getCockatiel({ _id: cockatielId }) : null
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
        const userInfo: WithId<UserInfoDB> | null | undefined = await getUser({ email: req.body.email })
        let response: ServerResponse<string | null> = { error: null, responseBody: null }

        if (userInfo) {
            response.error = `Пользователь с почтой ${userInfo.email} уже существует`
            res.json(response)
        }

        const createdUser: WithId<UserInfoDB> | null | undefined = await addUser(req.body)

        if (createdUser) {
            const transporter: any = await emailSender()
            const activateURL: string = process.env.APP_MODE === 'production' ? 'https://cockatieldzillas.vercel.app' : 'http://127.0.0.1:3000'

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
        const updateResult: boolean | undefined = await activateUserService(req.params.id)

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
    const user: WithId<UserInfoDB> | null | undefined = await getUser({ email: req.body.email })
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