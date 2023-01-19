const userService = require('./user.service')
const utils = require('../_helpers/utils')
const emailSender = require('../_helpers/email-sender')

const authenticate = async (req, res, next) => {
    const user = utils.getUserByAuth(req.body.auth)
    userService.authenticate(user)
        .then(response => {
            if (response.responseBody) {
                res.cookie('auth', req.body.auth, { signed: true, maxAge: 43200000 })
                res.json(response)
            } else {
                res.status(403).json(response)
            }
        })
        .catch(err => next(err))
}

const signup = async (req, res, next) => {
    userService.createUser(req.body)
        .then(async response => {
            if (response.responseBody) {
                // сделать отправку письма по регистрации + ссылку активации 
                const transporter = await emailSender()
                const activateURL = process.env.APP_MODE === 'production' ? 'https://cockatieldzillas.vercel.app' : 'http://127.0.0.1:3000'
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

const activateUser = async (req, res, next) => {
    userService.activateUser(req.params.id).then(async response => {
        res.json({
            error: null, 
            responseBody: {
                _id: req.params.id
            }
        })
    }).catch(err => next(err.message))
}

const recovery = async (req, res, next) => {
    userService.getUser(req.body.email).then(async response => {
        if (response._id) {
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

module.exports = { authenticate, signup, activateUser, recovery }