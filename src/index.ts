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

import { users, tracker, characters } from './routes'
import { populate } from './queries'

app.get('/status', (req, res) => {
  res.send('DECEMBER (SERVER) ONLINE')
})

app.use('/users', users)
app.use('/tracker', tracker)
app.use('/characters', characters)

app.get('/database/populate', async (req, res) => {
  const soft = req.query.soft === undefined ? true : req.query.soft && req.query.soft.toLowerCase() !== 'false'

  const onlyUsers = req.query.onlyUsers && req.query.onlyUsers.toLowerCase() !== 'false'
  const onlyCharacters = req.query.onlyCharacters && req.query.onlyCharacters.toLowerCase() !== 'false'
  const onlyTrackers = req.query.onlyTrackers && req.query.onlyTrackers.toLowerCase() !== 'false'

  const selective = onlyUsers || onlyCharacters || onlyTrackers

  if (!selective || onlyUsers) await populate.users(soft)
  if (!selective || onlyCharacters) await populate.characters(soft)
  if (!selective || onlyTrackers) await populate.trackers(soft)

  res.status(200).json({
    success: true,
    message: 'Database populated',
  })
})

const port = 5000
app.listen(port, '0.0.0.0', () => {
  info(`Listening on port ${port}`)
})
