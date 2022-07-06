const utils = require('./_helpers/utils')
const APP_CONSTANTS = require('./app-constants')

module.exports = function (app) {
    const { authenticate, signup, activateUser, recovery } = require('./users/users.controller')
    
    app.post('/authenticate', authenticate)
    app.post('/signup', signup)
    app.post('/activateUser/:id', activateUser)
    app.post('/recovery', recovery)
    app.get('/getAppContants', (req, res) => {
        res.type('application/json')
        res.send({error: null, responseBody: APP_CONSTANTS})
    })

    app.get('/api/userInfo', async (req, res) => {
        console.log(req.cookies.auth, req.signedCookies.auth, 'cook')
        res.json({error: null, responseBody: req.user})
    })

    app.get('/', (req, res) => {
        res.type('text/plain')
        res.send('Home')
    })
}