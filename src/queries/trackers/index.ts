import { IDatabase } from 'pg-promise'
import debug from '../../debug'
import { exists } from 'fs'

const info = debug.error.extend('adapter:trackers')
const error = debug.error.extend('adapter:trackers')

export default function makeTrackerAdapter(
  connection: IDatabase<any>,
  characters: any,
): Readonly<{
  all: () => Promise<[Record<string, any>]>
  exists: (id: string) => Promise<boolean>
  byId: (id: string) => Promise<Record<string, any>>
  active: () => Promise<Record<string, any>[]>
  insert: (id: string, name: string, round: number, characters: string[]) => Promise<boolean>
  updateById: (id: string, name: string, round: number, active: boolean, characters: string[]) => Promise<boolean>
  updateRoundById: (id: string, round: number) => Promise<boolean>
  updateActiveByIds: (id: string[], active: boolean) => Promise<boolean>
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

  async function active(): Promise<Record<string, any>[]> {
    info('Select active trackers')
    const result = await connection.query(`SELECT * FROM trackers WHERE active = true`)
    return result.length > 0 ? result : undefined
  }

  async function insert(id: string, name: string, round = 0, characters: string[]): Promise<boolean> {
    info('Insert tracker', id)
    const trackerExists = await exists(id)
    if (trackerExists) {
      error(`Tracker id ${id} already exists`)
      return false
    }

    await connection.query(
      'INSERT INTO trackers VALUES (${id}, ${__created_at}, ${__modified_at}, ${name}, ${round}, ${active}, ${characters})',
      {
        id,
        name,
        round,
        __created_at: new Date(),
        __modified_at: new Date(),
        characters,
        active: false,
      },
    )
    return true
  }

  async function updateById(
    id: string,
    name: string,
    round = 0,
    active = false,
    characters: string[],
  ): Promise<boolean> {
    info('Update tracker by id', id)
    const trackerExists = await exists(id)
    if (!trackerExists) {
      error(`Tracker id ${id} doesnt exists`)
      return false
    }

    await connection.query(
      'UPDATE trackers SET __modified_at = ${__modified_at}, name = ${name}, round = ${round}, active = ${active}, characters = ${characters} WHERE _id = ${id}',
      {
        id,
        name,
        __modified_at: new Date(),
        characters,
        round,
        active,
      },
    )

    return true
  }

  async function updateRoundById(id: string, round = 0): Promise<boolean> {
    info('Update tracker round by id', id)
    const trackerExists = await exists(id)
    if (!trackerExists) {
      error(`Tracker id ${id} doesnt exists`)
      return false
    }

    await connection.query('UPDATE trackers SET __modified_at = ${__modified_at}, round = ${round} WHERE _id = ${id}', {
      id,
      __modified_at: new Date(),
      round,
    })

    return true
  }

  async function updateActiveByIds(ids: string[], active = false): Promise<boolean> {
    info(`Setting trackers ${ids} as active`)

    await connection.query(
      'UPDATE trackers SET __modified_at = ${__modified_at}, active = ${active} WHERE _id IN ' +
        `(${ids.map(i => `'${i}'`).join(',')})`,
      {
        __modified_at: new Date(),
        active,
      },
    )

    return true
  }

  async function addCharacterById(id: string, character: string): Promise<boolean> {
    info(`Add chracter to tracker ${id}`, character)
    const trackerExists = await exists(id)
    if (!trackerExists) {
      error(`Tracker id ${id} doesnt exists`)
      return false
    }

    if (!(await characters.exists(character))) {
      error(`Tracker id ${character} doesnt exists`)
      return false
    }

    await connection.query(
      'UPDATE trackers SET characters = ARRAY_APPEND(characters, ${character}) WHERE _id = ${id}',
      {
        id,
        character,
      },
    )

    return true
  }

  async function removeById(id: string): Promise<boolean> {
    info('Remove tracker by id', id)
    const trackerExists = await exists(id)
    if (!trackerExists) {
      error(`Tracker id ${id} doesnt exists`)
      return false
    }

    await connection.query('DELETE FROM trackers WHERE _id = ${id}', { id })
    return true
  }

  return Object.freeze({
    all,
    exists,
    byId,
    active,
    insert,
    updateById,
    updateRoundById,
    updateActiveByIds,
    addCharacterById,
    removeById,
  })
}
