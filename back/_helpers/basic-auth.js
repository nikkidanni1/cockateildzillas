const userService = require('../users/user.service')
const utils = require('../_helpers/utils')

const basicAuth = async(req, res, next) => {
    // make authenticate path public
    if (!req.path.includes('/api/')) {
        return next()
    }

    // check for basic auth cookies
    if (!req.signedCookies.auth) {
        return res.status(401).json({ responseBody: null, error: 'Missing Authorization Cookies' })
    }

    // verify auth credentials
    const user = utils.getUserByAuth(req.signedCookies.auth)

    const userFullInfo = await (await userService.authenticate(user)).responseBody
    console.log(userFullInfo)
    if (!userFullInfo) {
        return res.status(401).json({ responseBody: null, error: 'Invalid Authentication Credentials' })
    }

    // attach user to request object
    req.user = userFullInfo

    next()
}

module.exports = basicAuth