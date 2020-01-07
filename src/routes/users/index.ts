import express, { Router } from 'express'
// import uuid from 'uuid/v4'

import _ from 'lodash'

import pusher from '../../pusher'

import { Request, Response, NextFunction } from 'express'
import { Details } from 'express-useragent'
import { users } from '../../queries'
import { exists } from 'fs'

const router = express.Router()

const USERS: any = {}

const USERS_ONLINE_CONTROL: Record<string, any> = {
  dsalexan: undefined,
  mario: undefined,
}

router.get('/', async (req: Request, res: Response) => {
  const asIndex = req.query.asIndex || false

  const result = await users.all()

  res.status(200).json(!asIndex ? result : result.reduce((obj, user) => ({ ...obj, [user._id]: user }), {}))
})

router.get('/:player', async (req: Request, res: Response) => {
  const player = req.params.player
  const user = await users.byId(player)

  if (user) {
    res.status(200).json({
      success: true,
      data: user,
    })
  } else {
    return res.status(404).json({
      success: false,
      error: `User <${player}> doesn't exists`,
    })
  }
})

router.get('/:player/status', async (req: Request, res: Response) => {
  const player = req.params.player
  const status = await users.statusById(player)

  if (status) {
    res.status(200).json({
      success: true,
      data: status,
    })
  } else {
    return res.status(404).json({
      success: false,
      error: `User <${player}> doesn't exists`,
    })
  }
})

router.post('/', async (req: Request, res: Response) => {
  const player = req.body.player
  const _id = player

  if (await users.exists(_id)) {
    return res.status(409).json({
      success: false,
      error: `User <${player}> already exists`,
    })
  }

  await users.insertUser({
    _id,
    __created_at: new Date(),
    __modified_at: new Date(),
    __sessions: [],
    __last_session: {
      useragent: req.useragent,
      timestamp: new Date(),
    },
    player,
    status: 'offline',
    permissions: {
      __GLOBAL__: {},
      __CHARACTER__: {},
    },
  })

  USERS_ONLINE_CONTROL[_id] = undefined

  const hash = pusher('user:added', `${req.method} ${req.originalUrl}`, { user: USERS[_id] })
  const hash2 = pusher('user:updated', `${req.method} ${req.originalUrl}`, { user: USERS[_id] })

  res.status(201).json({
    success: true,
    ignore: [hash, hash2],
  })
})

router.put('/:player/status', async (req: Request, res: Response) => {
  const player = req.params.player
  const status = req.query.status

  const new_session = {
    useragent: req.useragent,
    timestamp: new Date(),
  }

  if (status === undefined) {
    return res.status(400).json({
      success: false,
      error: 'New status is required to update online status',
    })
  }

  const oldStatus = await users.statusById(player)
  const exists = oldStatus !== undefined

  if (exists) {
    if (status === 'online') {
      await users.updateStatusById(player, status, new_session)

      if (USERS_ONLINE_CONTROL[player] !== undefined) clearTimeout(USERS_ONLINE_CONTROL[player])
      USERS_ONLINE_CONTROL[player] = setTimeout(function() {
        // TODO: Split in domain logic to be able to call changeStatus here
        users.updateStatusById(player, 'offline')

        pusher(`user:updated`, 'server idle timeout', { user: player, status: 'offline', last_session: new_session }, [
          'status',
        ])
      }, 6 * 60 * 1000)
    } else if (status === 'offline') {
      await users.updateStatusById(player, status)

      if (USERS_ONLINE_CONTROL[player]) {
        clearTimeout(USERS_ONLINE_CONTROL[player])
        USERS_ONLINE_CONTROL[player] = undefined
      }
    }

    if (oldStatus !== status) {
      const hash = pusher(
        `user:updated`,
        `${req.method} ${req.originalUrl}`,
        { user: player, status, last_session: new_session },
        ['status'],
      )
      res.status(200).json({
        success: true,
        ignore: [hash],
      })
    } else {
      res.status(200).json({
        success: false,
        note: `Status was already ${status} for user ${player}`,
      })
    }
  } else {
    return res.status(404).json({
      success: false,
      error: `User <${player}> doesn't exists`,
    })
  }
})

router.put('/:player/permissions', async (req: Request, res: Response) => {
  const player = req.params.player
  const permissions = req.body.permissions

  if (await users.exists(player)) {
    const oldPermissions = await users.permissionsById(player)

    if (!_.isEqual(oldPermissions, permissions)) {
      await users.updatePermissionsById(player, permissions)

      const hash = pusher(`user:updated`, `${req.method} ${req.originalUrl}`, { user: player, permissions }, [
        'permissions',
      ])

      res.status(200).json({
        success: true,
        ignore: [hash],
      })
    } else {
      res.status(200).json({
        success: false,
        note: `Permissions, new value equals old for user ${player}`,
      })
    }
  } else {
    return res.status(404).json({
      success: false,
      error: `User <${player}> doesn't exists`,
    })
  }
})

export default router
