import Pusher = require('pusher')

export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT?: string
      PUSHER_APP_ID: string
      PUSHER_APP_KEY: string
      PUSHER_SECRET: string
      CLUSTER: string
    }

    interface Global {
      pusher: Pusher
    }
  }
}
