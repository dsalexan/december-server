import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import path from 'path'

import bodyParser from 'body-parser'

const app: express.Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname)))

/*
 * Initialise Pusher
 */
import Pusher from 'pusher'
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.CLUSTER,
})

/*
 * Define post route for creating new reviews
 */
app.post('/review', (req, res) => {
  pusher.trigger('reviews', 'review_added', { review: req.body })
  res.status(200).send()
})

/*
 * Run app
 */
const port = 5000
app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
