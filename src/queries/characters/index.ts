import { IDatabase } from 'pg-promise'
import debug from '../../debug'
import { exists } from 'fs'

const info = debug.error.extend('adapter:characters')
const error = debug.error.extend('adapter:characters')

export default function makeCharactersAdapter(
  connection: IDatabase<any>,
): Readonly<{
  all: () => Promise<[Record<string, any>]>
  exists: (id: string) => Promise<boolean>
  byId: (name: string) => Promise<Record<string, any>>
  insert: (id: string, name: string, source: string, characterData: any, permission?: string | null) => Promise<boolean>
  updateById: (id: string, name: string, source: string, characterData: any, permission?: string) => Promise<boolean>
  removeById: (id: string) => Promise<boolean>
}> {
  function all(): Promise<[Record<string, any>]> {
    info('Select all characters')
    return connection.query(`SELECT * FROM characters`)
  }

  async function exists(id: string): Promise<boolean> {
    return (await connection.query('SELECT * FROM characters WHERE _id = $1', [id])).length > 0
  }

  async function byId(id: string): Promise<Record<string, any>> {
    info('Select character by id', id)
    const result = await connection.query(`SELECT * FROM characters WHERE _id = $1`, [id])
    if (result.length > 1) error(`Query for character idd <${id}> returned ${result.length} entries`)
    return result[0]
  }

  async function insert(
    id: string,
    name: string,
    source: string,
    characterData: any,
    permission: string | null = null,
  ): Promise<boolean> {
    info('Insert character', id)
    const characterExists = await exists(id)
    if (characterExists) {
      error(`Character id ${id} already exists`)
      return false
    }

    await connection.query(
      'INSERT INTO characters VALUES (${id}, ${__created_at}, ${__modified_at}, ${permission}, ${name}, ${source}, ${data})',
      {
        id,
        name,
        source,
        permission,
        __created_at: new Date(),
        __modified_at: new Date(),
        data: characterData,
      },
    )
    return true
  }

  async function updateById(
    id: string,
    name: string,
    source: string,
    characterData: any,
    permission = null,
  ): Promise<boolean> {
    info('Update character by id', id)
    const characterExists = await exists(id)
    if (!characterExists) {
      error(`Character id ${id} doesnt exists`)
      return false
    }

    await connection.query(
      'UPDATE characters SET __modified_at = ${__modified_at}, name = ${name}, source = ${source}, permission = ${permission}, data = ${data} WHERE _id = ${id}',
      {
        id,
        name,
        source,
        __modified_at: new Date(),
        permission,
        data: characterData,
      },
    )

    return true
  }

  async function removeById(id: string): Promise<boolean> {
    info('Remove character by id', id)
    const characterExists = await exists(id)
    if (!characterExists) {
      error(`Character id ${id} doesnt exists`)
      return false
    }

    await connection.query('DELETE FROM characters WHERE _id = ${id}', { id })
    return true
  }

  return Object.freeze({
    all,
    exists,
    byId,
    insert,
    updateById,
    removeById,
  })
}
