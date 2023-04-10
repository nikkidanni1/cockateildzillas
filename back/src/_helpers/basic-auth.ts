import { Request, Response, NextFunction } from 'express'
import { getUserByAuth } from '_helpers/utils'
import { getUser } from 'users/user.service'

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
    const userAuth = getUserByAuth(req.headers.authorization)

    const user = await getUser(userAuth)
    
    if (!user) {
        return res.status(401).json({ responseBody: null, error: 'Invalid Authentication Credentials' })
    }

    if (!user.isActive) {
        return res.status(401).json({ responseBody: null, error: 'User is inactive' })
    }

    next()
}

export default basicAuth