import type { Express, Request, Response } from 'express'
import { authenticate, signup, activateUser, recovery, getUserInfo, updateUserInfo, getUsers } from 'users/users.controller'
import { getBattle, moveBattle, recreateBattle } from 'battles/battle.controller'
import APP_CONSTANTS from 'app-constants'

const routes = (app: Express) => {
    app.post('/authenticate', authenticate)
    app.post('/signup', signup)
    app.post('/activateUser/:id', activateUser)
    app.post('/recovery', recovery)
    app.get('/getAppContants', (req: Request, res: Response) => {
        res.type('application/json')
        res.send({ error: null, responseBody: APP_CONSTANTS })
    })
    app.get('/api/userInfo', getUserInfo)
    app.put('/api/userInfo', updateUserInfo)
    app.get('/api/users', getUsers)
    app.get('/api/battle', getBattle)
    app.post('/api/moveBattle', moveBattle)
    app.post('/api/recreateBattle', recreateBattle)
}

export default routes