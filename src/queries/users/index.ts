import { IDatabase } from 'pg-promise'
import debug from '../../debug'
import { exists } from 'fs'

const info = debug.error.extend('adapter:users')
const error = debug.error.extend('adapter:users')

export default function makeUsersAdapter(
  connection: IDatabase<any>,
): Readonly<{
  all: () => Promise<[Record<string, any>]>
  exists: (id: string) => Promise<boolean>
  byId: (name: string) => Promise<Record<string, any>>
  statusById: (name: string) => Promise<string>
  permissionsById: (id: string) => Promise<any>
  insertUser: (user: any) => Promise<boolean>
  updateStatusById: (id: string, status: string, useragent?: any) => Promise<boolean>
  updatePermissionsById: (id: string, permissions: any) => Promise<boolean>
}> {
  function all(): Promise<[Record<string, any>]> {
    info('Select all users')
    return connection.query(`SELECT * FROM users`)
  }

  async function exists(id: string): Promise<boolean> {
    return (await connection.query('SELECT * FROM users WHERE _id = $1', [id])).length > 0
  }

  async function byId(id: string): Promise<Record<string, any>> {
    info('Select user by id', id)
    const result = await connection.query(`SELECT * FROM users WHERE _id = $1`, [id])
    if (result.length > 1) error(`Query for user idd <${id}> returned ${result.length} entries`)
    return result[0]
  }

  async function statusById(id: string): Promise<string> {
    info('Select user status by id', id)
    const result = await connection.query(`SELECT status FROM users WHERE _id = $1`, [id])
    if (result.length > 1) error(`Query for user idd <${id}> returned ${result.length} entries`)
    return (result[0] || {}).status
  }

  async function permissionsById(id: string): Promise<any> {
    info('Select user permissions by id', id)
    const [{ permissions }] = await connection.query('SELECT permissions FROM users WHERE _id = ${id}', { id })
    return permissions
  }

  async function insertUser(user: any): Promise<boolean> {
    info('Insert user', user._id)
    const userExists = await exists(user._id)
    if (userExists) {
      error(`User id ${user._id} already exists`)
      return false
    }

    await connection.query(
      'INSERT INTO users VALUES (${_id}, ${__created_at}, ${__modified_at}, ${__sessions}, ${__last_session}, ${player}, ${status}, ${permissions})',
      user,
    )
    return true
  }

  async function updateStatusById(id: string, status: string, new_session?: any): Promise<boolean> {
    info('Update status by id', id)
    const userExists = await exists(id)
    if (!userExists) {
      error(`User id ${id} doesnt exists`)
      return false
    }

    if (new_session) {
      await connection.query(
        'UPDATE users SET status = ${status}, __sessions = array_append(__sessions, __last_session), __last_session = ${last_session} WHERE _id = ${id}',
        {
          id,
          status,
          last_session: new_session,
        },
      )
    } else {
      await connection.query('UPDATE users SET status = ${status} WHERE _id = ${id}', {
        id,
        status,
      })
    }

    return true
  }

  async function updatePermissionsById(id: string, permissions: any): Promise<boolean> {
    info('Update permissions by id', id)
    const userExists = await exists(id)
    if (!userExists) {
      error(`User id ${id} doesnt exists`)
      return false
    }

    connection.query('UPDATE users SET permissions = ${permissions} WHERE _id = ${id}', { id, permissions })
    return true
  }

  return Object.freeze({
    all,
    exists,
    byId,
    statusById,
    permissionsById,
    insertUser,
    updateStatusById,
    updatePermissionsById,
  })
}
