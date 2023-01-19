import express from 'express'
import type { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app: Express = express()
const basicAuth = require('./_helpers/basic-auth')
const credentails = require('./_helpers/credentails')
const errorHandler = require('./_helpers/error-handler')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
    cors({ origin: ["http://127.0.0.1:3000", "http://localhost:3000", "https://cockatieldzillas.vercel.app"], credentials: true,  })
)

const port: string | number = process.env.PORT || 3001
app.set('port', port)

app.use(require('cookie-parser')(credentails.cookieSecret))
app.use(basicAuth)

require('./routes')(app)

app.use(errorHandler)

app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + port)
})
