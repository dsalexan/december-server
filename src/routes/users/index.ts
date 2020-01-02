import express, { Router } from 'express'
import uuid from 'uuid/v4'

import pusher from '../../pusher'

import { Request, Response, NextFunction } from 'express'
import { Details } from 'express-useragent'

const router = express.Router()

const USERS: Record<
  string,
  {
    _id: string
    __timestamp: Date
    __useragent: Details | undefined
    player: string
    permissions: {
      __GLOBAL__: Record<string, any>
      __CHARACTER__: Record<string, any>
    }
  }
> = {}

router.get('/', (req: Request, res: Response) => {
  res.status(200).json(USERS)
})

router.post('/add', (req: Request, res: Response) => {
  const player = req.body.player
  const _id = player
  USERS[_id] = {
    _id,
    __timestamp: new Date(),
    __useragent: req.useragent,
    player,
    permissions: {
      __GLOBAL__: {},
      __CHARACTER__: {},
    },
  }

  pusher.trigger('december', 'user:added', { user: USERS[_id] })
  res.status(200).json(USERS[_id])
})

export default router
