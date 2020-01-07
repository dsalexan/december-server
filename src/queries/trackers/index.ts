import { IDatabase } from 'pg-promise'
import debug from '../../debug'
import { exists } from 'fs'
import { characters } from '../characters'

const info = debug.error.extend('adapter:trackers')
const error = debug.error.extend('adapter:trackers')

export default function makeTrackerAdapter(
  connection: IDatabase<any>,
): Readonly<{
  all: () => Promise<[Record<string, any>]>
  exists: (id: string) => Promise<boolean>
  byId: (id: string) => Promise<Record<string, any>>
  insert: (id: string, name: string, characters: string[]) => Promise<boolean>
  updateById: (id: string, name: string, characters: string[]) => Promise<boolean>
  addCharacterById: (id: string, character: string) => Promise<boolean>
  removeById: (id: string) => Promise<boolean>
}> {
  function all(): Promise<[Record<string, any>]> {
    info('Select all trackers')
    return connection.query(`SELECT * FROM trackers`)
  }

  async function exists(id: string): Promise<boolean> {
    return (await connection.query('SELECT * FROM trackers WHERE _id = $1', [id])).length > 0
  }

  async function byId(id: string): Promise<Record<string, any>> {
    info('Select tracker by id', id)
    const result = await connection.query(`SELECT * FROM trackers WHERE _id = $1`, [id])
    if (result.length > 1) error(`Query for tracker idd <${id}> returned ${result.length} entries`)
    return result[0]
  }

  async function insert(id: string, name: string, characters: string[]): Promise<boolean> {
    info('Insert tracker', id)
    const trackerExists = await exists(id)
    if (trackerExists) {
      error(`Character id ${id} already exists`)
      return false
    }

    await connection.query(
      'INSERT INTO trackers VALUES (${id}, ${__created_at}, ${__modified_at}, ${name}, ${characters})',
      {
        id,
        name,
        __created_at: new Date(),
        __modified_at: new Date(),
        characters,
      },
    )
    return true
  }

  async function updateById(id: string, name: string, characters: string[]): Promise<boolean> {
    info('Update tracker by id', id)
    const trackerExists = await exists(id)
    if (!trackerExists) {
      error(`Character id ${id} doesnt exists`)
      return false
    }

    await connection.query(
      'UPDATE trackers SET __modified_at = ${__modified_at}, name = ${name}, characters = ${characters} WHERE _id = ${id}',
      {
        id,
        name,
        __modified_at: new Date(),
        characters,
      },
    )

    return true
  }

  async function addCharacterById(id: string, character: string): Promise<boolean> {
    info('Update tracker by id', id)
    const trackerExists = await exists(id)
    if (!trackerExists) {
      error(`Tracker id ${id} doesnt exists`)
      return false
    }

    if (!(await characters.exists(character))) {
      error(`Character id ${character} doesnt exists`)
      return false
    }

    await connection.query('UPDATE trackers SET characters = characters || ${character} WHERE _id = ${id}', {
      id,
      character,
    })

    return true
  }

  async function removeById(id: string): Promise<boolean> {
    info('Remove tracker by id', id)
    const trackerExists = await exists(id)
    if (!trackerExists) {
      error(`Character id ${id} doesnt exists`)
      return false
    }

    await connection.query('DELETE FROM trackers WHERE _id = ${id}', { id })
    return true
  }

  return Object.freeze({
    all,
    exists,
    byId,
    insert,
    updateById,
    addCharacterById,
    removeById,
  })
}
