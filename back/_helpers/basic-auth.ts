import { Request, Response, NextFunction } from 'express';

const userService = require('../users/user.service')
const utils = require('../_helpers/utils')

const basicAuth = async(req: Request, res: Response, next: NextFunction) => {
    // make authenticate path public
    if (!req.path.includes('/api/')) {
        return next()
    }

    // check for basic auth header
    if (!req.headers.authorization) {
        return res.status(403).json({ responseBody: null, error: 'No credentials sent!' })
    }

    // verify auth credentials
    const user = utils.getUserByAuth(req.headers.authorization)

    const userAuth = await (await userService.authenticate(user)).responseBody
    console.log(userAuth)
    if (!userAuth) {
        return res.status(401).json({ responseBody: null, error: 'Invalid Authentication Credentials' })
    }

    next()
}

export default basicAuth