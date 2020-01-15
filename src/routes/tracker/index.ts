import _ from 'lodash'
import express, { Router } from 'express'
import uuid from '../../util/uuid'

import pusher from '../../pusher'

import { Request, Response, NextFunction } from 'express'
import { Details } from 'express-useragent'
import { trackers } from '../../queries'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const list = await trackers.all()

  res.status(200).json({
    success: true,
    data: list,
  })
})

router.post('/characters', async (req: Request, res: Response) => {
  const character = req.body.character
  const id = character._id
  const auth = req.headers.authorization

  if (await characters.exists(id)) {
    return res.status(404).json({
      success: false,
      error: `Character <${id}> already exists at the initiative tracker`,
    })
  }

  const clonePusher = _.cloneDeep(character)
  const { _id, name, source } = character

  delete character._id
  delete character.name
  delete character.source

  await characters.insert(_id, name, source, character)

  const hash = pusher(
    'tracker:character:added',
    `${req.method} ${req.originalUrl}`,
    { character: clonePusher },
    [],
    auth,
  )

  res.status(201).json({
    success: true,
    ignore: [hash],
  })
})

router.put('/active', async (req: Request, res: Response) => {
  const active = true
  const id = req.body.tracker
  const auth = req.headers.authorization

  if (await trackers.exists(id)) {
    const oldActive = await trackers.active()

    if (oldActive && oldActive.length == 1 && oldActive._id === id && active === oldActive.active) {
      return res.status(200).json({
        success: false,
        error: `Tracker <${id}> was already ${active ? '' : 'in'}active`,
      })
    }

    await trackers.updateActiveByIds([id], active)
    const hashOldActive = []
    if (oldActive && active === true) {
      await trackers.updateActiveByIds(
        oldActive.map((t: any) => t._id),
        false,
      )

      for (const OA of oldActive) {
        if (OA._id === id) continue
        OA.active = false
        hashOldActive.push(
          pusher(
            'tracker:updated',
            `${req.method} ${req.originalUrl}`,
            { action: 'inactivate', tracker: OA },
            [],
            auth,
          ),
        )
      }
    }

    const hash = pusher(
      'tracker:updated',
      `${req.method} ${req.originalUrl}`,
      {
        action: 'activate',
        tracker: await trackers.byId(id),
      },
      [],
      auth,
    )

    res.status(200).json({
      success: true,
      ignore: [hash, ...hashOldActive],
    })
  } else {
    return res.status(404).json({
      success: false,
      error: `Tracker <${id}> doesn't exists`,
    })
  }
})

router.put('/:id/round', async (req: Request, res: Response) => {
  const id = req.params.id
  const round = req.body.round
  const auth = req.headers.authorization

  if (await trackers.exists(id)) {
    await trackers.updateRoundById(id, round)

    const hash = pusher(
      'tracker:updated',
      `${req.method} ${req.originalUrl}`,
      { action: 'round', tracker: trackers.byId(id) },
      [],
      auth,
    )

    res.status(200).json({
      success: true,
      ignore: [hash],
    })
  } else {
    return res.status(404).json({
      success: false,
      error: `Tracker <${id}> doesn't exists`,
    })
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const tracker = req.body.tracker
  const auth = req.headers.authorization

  if (await trackers.exists(id)) {
    const { name, round, active, characters } = tracker
    await trackers.updateById(id, name, round, active, characters)

    const hash = pusher('tracker:updated', `${req.method} ${req.originalUrl}`, { tracker }, [], auth)

    res.status(200).json({
      success: true,
      ignore: [hash],
    })
  } else {
    return res.status(404).json({
      success: false,
      error: `Tracker <${id}> doesn't exists`,
    })
  }
})

router.delete('/characters/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const auth = req.headers.authorization

  if (await characters.exists(id)) {
    const character = await characters.byId(id)
    await characters.removeById(id)

    const hash = pusher('tracker:character:removed', `${req.method} ${req.originalUrl}`, { character: id }, [], auth)

    res.status(200).json({
      success: true,
      data: character,
      ignore: [hash],
    })
  } else {
    return res.status(404).json({
      success: false,
      error: `Character <${id}> doesn't exists at the initiative tracker`,
    })
  }
})

// router.post('/add', (req: Request, res: Response) => {
//   const player = req.body.player
//   const _id = player
//   USERS[_id] = {
//     _id,
//     __timestamp: new Date(),
//     __useragent: req.useragent,
//     player,
//     permissions: {
//       __GLOBAL__: {},
//       __CHARACTER__: {},
//     },
//   }

//   pusher.trigger('december', 'user:added', { user: USERS[_id] })
//   res.status(200).json(USERS[_id])
// })

export default router
