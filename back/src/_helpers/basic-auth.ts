import { Request, Response, NextFunction } from 'express'
import { getUserByAuth } from '_helpers/utils'


const userService = require('../users/user.service')

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
    const user = getUserByAuth(req.headers.authorization)

    const userAuth = await (await userService.authenticate(user)).responseBody
    
    if (!userAuth) {
        return res.status(401).json({ responseBody: null, error: 'Invalid Authentication Credentials' })
    }

    next()
}

export default basicAuth