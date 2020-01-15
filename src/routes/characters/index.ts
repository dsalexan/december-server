import _ from 'lodash'
import express, { Router } from 'express'
import uuid from '../../util/uuid'

import pusher from '../../pusher'

import { Request, Response, NextFunction } from 'express'
import { Details } from 'express-useragent'
import { characters, trackers } from '../../queries'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const list = await characters.all()

  const result = list.map(char => {
    const { _id, name, source, permission, __created_at, __modified_at, data } = char

    return {
      _id,
      name,
      source,
      _permission: permission,
      ...data,
    }
  })

  res.status(200).json({
    success: true,
    data: result,
  })
})

router.post('/', async (req: Request, res: Response) => {
  const character = req.body.character
  const id = character._id
  const tracker = req.body.tracker
  const auth = req.headers.authorization

  if (await characters.exists(id)) {
    return res.status(404).json({
      success: false,
      error: `Character <${id}> already exists`,
    })
  }

  if (!(await trackers.exists(tracker))) {
    return res.status(404).json({
      success: false,
      error: `Tracker <${id}> doesn't exists`,
    })
  }

  const clonePusher = _.cloneDeep(character)
  const { _id, name, source } = character

  delete character._id
  delete character.name
  delete character.source
  debugger
  await characters.insert(_id, name, source, character)
  await trackers.addCharacterById(tracker, _id)

  const hash = pusher('character:added', `${req.method} ${req.originalUrl}`, { character: clonePusher }, [], auth)
  const hash2 = pusher(
    'tracker:characters:added',
    `${req.method} ${req.originalUrl}`,
    { character: clonePusher },
    [],
    auth,
  )

  res.status(201).json({
    success: true,
    ignore: [hash, hash2],
  })
})

router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const character = req.body.character
  const action = req.body.action

  const auth = req.headers.authorization

  if (await characters.exists(id)) {
    const clonePusher = _.cloneDeep(character)
    const { name, source, _permission } = character

    delete character._id
    delete character.name
    delete character.source
    delete character._permission

    await characters.updateById(id, name, source, character, _permission)

    const hash = pusher(
      'character:updated',
      `${req.method} ${req.originalUrl}`,
      { action: action === '' ? undefined : action, character: clonePusher },
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
      error: `Character <${id}> doesn't exists at the initiative tracker`,
    })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const auth = req.headers.authorization

  if (await characters.exists(id)) {
    const character = await characters.byId(id)
    await characters.removeById(id)

    const hash = pusher('character:removed', `${req.method} ${req.originalUrl}`, { character: id }, [], auth)

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
