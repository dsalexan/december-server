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

  const hash = pusher('tracker:character:added', `${req.method} ${req.originalUrl}`, { character: clonePusher })

  res.status(201).json({
    success: true,
    ignore: [hash],
  })
})

router.put('/characters/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const character = req.body.character

  if (await characters.exists(id)) {
    const clonePusher = _.cloneDeep(character)
    const { name, source } = character

    delete character._id
    delete character.name
    delete character.source

    await characters.updateById(id, name, source, character)

    const hash = pusher('tracker:character:updated', `${req.method} ${req.originalUrl}`, { character: clonePusher })

    res.status(200).json({
      success: true,
      ignore: [hash],
    })
  } else {
    return res.status(404).json({
      success: false,
      error: `Character <${id}> doesn't exists at the initiative tracker`,
    })
  }
})

router.delete('/characters/:id', async (req: Request, res: Response) => {
  const id = req.params.id

  if (await characters.exists(id)) {
    const character = await characters.byId(id)
    await characters.removeById(id)

    const hash = pusher('tracker:character:removed', `${req.method} ${req.originalUrl}`, { character: id })

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
