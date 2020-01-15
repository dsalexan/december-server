import './connection'

import makeUsersAdapter from './users'
import makePopulate from './populate'
import makeCharactersAdapter from './characters'
import makeTrackersAdapter from './trackers'

export const populate = makePopulate(global.connection)

export const users = makeUsersAdapter(global.connection)
export const characters = makeCharactersAdapter(global.connection)
export const trackers = makeTrackersAdapter(global.connection, characters)

export default {
  users,
  characters,
  trackers,
}
