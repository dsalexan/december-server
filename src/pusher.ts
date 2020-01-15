import Pusher from 'pusher'
import Client from 'pusher-js'

import uuid from 'uuid/v4'

import { not } from './debug'

if (global.pusher === undefined) {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.CLUSTER,
  })

  // const client = new Client(process.env.PUSHER_APP_KEY, {
  //   cluster: process.env.CLUSTER,
  // })

  // client.connection.bind('disconnected', (context, data) => {
  //   console.log('DISCONNECTION', context, data)
  // })

  global.pusher = (event: string, from: string, data: any, path: string[] = [], user = 'guest'): string => {
    const hash = uuid().substr(0, 13)

    not(`Triggered event (${hash})`, event, 'at path', path, 'from', from, 'user', user)
    pusher.trigger('december', event, { event, hash, from, path, data, user })

    return hash
  }
}

export default global.pusher
