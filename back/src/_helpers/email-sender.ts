const nodemailer = require('nodemailer')

const transporter = async () => {
    return nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'cockatieldzillas@mail.ru', // generated ethereal user
            pass: 'U012x2pRQwZcdd1H5t7U', // generated ethereal password
        },
    })
}

export default transporter