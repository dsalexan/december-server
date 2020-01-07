import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import path from 'path'

import useragent from 'express-useragent'
import bodyParser from 'body-parser'
import cors from 'cors'

import pusher from './pusher'
import { routes, info } from './debug'

const app: express.Application = express()

app.use(cors())

app.use(useragent.express())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname)))

app.use((req, res, next) => {
  routes(`${req.method} ${req.path} (${req.originalUrl})`)
  next()
})

import { users, trackers, characters } from './routes'
import { populate } from './queries'

app.use('/users', users)
app.use('/trackers', trackers)
app.use('/characters', characters)

app.get('/database/populate', async (req, res) => {
  const onlyUsers = req.query.onlyUsers
  const onlyCharacters = req.query.onlyCharacters

  const selective = onlyUsers || onlyCharacters

  if (!selective || onlyUsers) await populate.users()
  if (!selective || onlyCharacters) await populate.characters()
  res.status(200).json({
    success: true,
    message: 'Database populated',
  })
})

const port = 5000
app.listen(port, () => {
  info(`Listening on port ${port}`)
})
