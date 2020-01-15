import Pusher = require('pusher')
import pgp from 'pg-promise'

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
      pusher: (event: string, from: string, data: any, path?: string[], user?: string) => string
      connection: pgp.IDatabase<any>
    }
  }
}
