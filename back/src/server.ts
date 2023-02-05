import express from 'express'
import type { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import basicAuth from '_helpers/basic-auth'
import errorHandler from '_helpers/error-handler'
import routes from 'routes'

dotenv.config()

const app: Express = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
    cors({ 
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'https://cockatieldzillas.vercel.app'], 
        credentials: true,  
    })
)

const port: string | number = process.env.PORT || 3001
app.set('port', port)

app.use(basicAuth)

routes(app)

app.use(errorHandler)

app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + port)
})
