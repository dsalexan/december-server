import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import path from 'path'

import useragent from 'express-useragent'
import bodyParser from 'body-parser'
import cors from 'cors'

import pusher from './pusher'

const app: express.Application = express()

app.use(cors())

app.use(useragent.express())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname)))

import { users } from './routes'

app.use('/users', users)

const port = 5000
app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
