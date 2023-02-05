import type { WithId } from 'mongodb'
import type { Request, Response, NextFunction } from 'express'
import { 
        authenticate as authenticateService, 
        createUser,
        activateUser as activateUserService,
        getUser as getUserService
} from 'users/user.service'
import { getUserByAuth } from '_helpers/utils'
import emailSender from '_helpers/email-sender'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserByAuth = getUserByAuth(req.body.auth)
    authenticateService(user)
        .then(response => {
            if (response.responseBody) {
                res.json(response)
            } else {
                res.status(403).json(response)
            }
        })
        .catch(err => next(err))
}

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    const user: UserByAuth = getUserByAuth(req.headers.authorization ?? '')
    const userInfo: WithId<UserInfo> | null | undefined = await getUserService(user.email)
    const response: ServerResponse<WithId<UserInfo> | null> = { responseBody: null, error: null }

    if (userInfo) {
        response.responseBody = userInfo
    } else {
        response.error = 'Пользователь не найден'
    }

    res.json(response)
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    createUser(req.body)
        .then(async response => {
            if (response && response.responseBody) {
                // сделать отправку письма по регистрации + ссылку активации 
                const transporter: any = await emailSender()
                const activateURL: string = process.env.APP_MODE === 'production' ? 'https://cockatieldzillas.vercel.app' : 'http://127.0.0.1:3000'
                await transporter.sendMail({
                    from: '"Cockatieldzillas 🦜" <cockatieldzillas@mail.ru>',
                    to: response.responseBody.email,
                    subject: "Активация аккаунта",
                    html: `
                        <a href=\"${activateURL}/activate/${response.responseBody._id.toString()}\">
                            ${activateURL}/activate/${response.responseBody._id.toString()}
                        </a>
                        <br/>
                        <p>
                            password: ${response.responseBody.password}
                        </p>
                    `,
                })
                res.json(response)
            } else {
                res.status(400).send(response)
            }
        }
        ).catch(err => next(err))
}

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
    activateUserService(req.params.id).then(async () => {
        res.json({
            error: null, 
            responseBody: {
                _id: req.params.id
            }
        })
    }).catch(err => next(err.message))
}

export const recovery = async (req: Request, res: Response, next: NextFunction) => {
    getUserService(req.body.email).then(async response => {
        if (response && response._id) {
            const transporter = await emailSender()
            await transporter.sendMail({
                from: '"Cockatieldzillas 🦜" <cockatieldzillas@mail.ru>',
                to: req.body.email,
                subject: "Восстановление пароля",
                html: `
                    <p>
                        password: ${response.password}
                    </p>
                `,
            })
            res.json({
                error: null, 
                responseBody: {
                    _id: response._id
                }
            })
        }
    })
}