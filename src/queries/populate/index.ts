import _ from 'lodash'

import USERS from './users'
import CHARACTERS from './characters'
import TRACKERS from './trackers'

export default function makePopulate(connection: any) {
  const MOCK_USERAGENT = {
    isYaBrowser: false,
    isAuthoritative: false,
    isMobile: false,
    isTablet: false,
    isiPad: false,
    isiPod: false,
    isiPhone: false,
    isAndroid: false,
    isBlackberry: false,
    isOpera: false,
    isIE: false,
    isEdge: false,
    isIECompatibilityMode: false,
    isSafari: false,
    isFirefox: false,
    isWebkit: false,
    isChrome: false,
    isKonqueror: false,
    isOmniWeb: false,
    isSeaMonkey: false,
    isFlock: false,
    isAmaya: false,
    isPhantomJS: false,
    isEpiphany: false,
    isDesktop: false,
    isWindows: false,
    isLinux: false,
    isLinux64: false,
    isMac: false,
    isChromeOS: false,
    isBada: false,
    isSamsung: false,
    isRaspberry: false,
    isBot: false,
    isCurl: false,
    isAndroidTablet: false,
    isWinJs: false,
    isKindleFire: false,
    isSilk: false,
    isCaptive: false,
    isSmartTV: false,
    isUC: false,
    isFacebook: false,
    isAlamoFire: false,
    isElectron: false,
    silkAccelerated: false,
    browser: 'PostmanRuntime',
    version: '7.20.1',
    os: 'unknown',
    platform: 'unknown',
    geoIp: {},
    source: 'PostmanRuntime/7.20.1',
  }

  async function users(soft = true): Promise<void> {
    let _users = _.cloneDeep(USERS)
    if (!soft) await connection.query('DELETE FROM users')
    else {
      const non_existent = await Promise.all(
        USERS.map(async user => {
          const exists = await connection.query('SELECT * FROM users WHERE _id = ${_id}', user)
          return exists.length === 0
        }),
      )

      _users = _users.filter((value, index) => non_existent[index])
    }

    _users.map(user => {
      connection.query(
        'INSERT INTO users VALUES (${_id}, ${__created_at}, ${__modified_at}, ${__sessions}, ${__last_session}, ${player}, ${status}, ${permissions})',
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        {
          ...user,
          status: 'offline',
          __created_at: new Date(),
          __modified_at: new Date(),
          __sessions: [],
          __last_session: {
            useragent: MOCK_USERAGENT,
            timestamp: new Date(),
          },
        },
      )
    })
  }

  async function characters(soft = true): Promise<void> {
    let _characters = _.cloneDeep(CHARACTERS)
    if (!soft) await connection.query('DELETE FROM characters WHERE 1 = 1')
    else {
      const non_existent = await Promise.all(
        CHARACTERS.map(async character => {
          const exists = await connection.query('SELECT * FROM characters WHERE _id = ${_id}', character)
          return exists.length === 0
        }),
      )

      _characters = _characters.filter((value, index) => non_existent[index])
    }

    _characters.map(async character => {
      const { _id, name, source } = character

      delete character._id
      delete character.name
      delete character.source

      if (soft) {
        await connection.query('DELETE FROM characters WHERE _id = ${_id}', { _id })
      }

      connection.query(
        'INSERT INTO characters VALUES (${_id}, ${__created_at}, ${__modified_at}, ${permission}, ${name}, ${source}, ${data})',
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        {
          _id,
          name,
          source,
          __created_at: new Date(),
          __modified_at: new Date(),
          permission: 'character:party',
          data: character,
        },
      )
    })
  }

  async function trackers(soft = true): Promise<void> {
    let _trackers = _.cloneDeep(TRACKERS)
    if (!soft) await connection.query('DELETE FROM trackers WHERE 1 = 1')
    else {
      const non_existent = await Promise.all(
        TRACKERS.map(async tracker => {
          const exists = await connection.query('SELECT * FROM trackers WHERE _id = ${_id}', tracker)
          return exists.length === 0
        }),
      )

      _trackers = _trackers.filter((value, index) => non_existent[index])
    }

    _trackers.map(tracker => {
      connection.query(
        'INSERT INTO trackers VALUES (${_id}, ${__created_at}, ${__modified_at}, ${name}, ${round}, ${active}, ${characters})',
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        {
          ...tracker,
          __created_at: new Date(),
          __modified_at: new Date(),
        },
      )
    })
  }

  return Object.freeze({
    users,
    characters,
    trackers,
  })
}
