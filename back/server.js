const express = require('express')

const app = express()
const cors = require('cors')
const basicAuth = require('./_helpers/basic-auth')
const credentails = require('./_helpers/credentails')
const errorHandler = require('./_helpers/error-handler')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
    cors({ origin: ["http://127.0.0.1:3000", "http://localhost:3000"], credentials: true,  })
)

const port = 3001
app.set('port', port)

app.use(require('cookie-parser')(credentails.cookieSecret))
app.use(basicAuth)

require('./routes')(app)

app.use(errorHandler)

app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + port)
})
