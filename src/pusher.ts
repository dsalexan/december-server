import Pusher from 'pusher'

if (global.pusher === undefined) {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.CLUSTER,
  })

  global.pusher = pusher
}

export default global.pusher
