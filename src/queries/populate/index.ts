import USERS from './users'
import CHARACTERS from './characters'

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

  async function users() {
    await connection.query('DELETE FROM users')

    USERS.map(user => {
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

  async function characters() {
    await connection.query('DELETE FROM characters WHERE 1 = 1')

    CHARACTERS.map(character => {
      const { _id, name, source } = character

      delete character._id
      delete character.name
      delete character.source

      connection.query(
        'INSERT INTO characters VALUES (${_id}, ${__created_at}, ${__modified_at}, ${name}, ${source}, ${data})',
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        {
          _id,
          name,
          source,
          __created_at: new Date(),
          __modified_at: new Date(),
          data: character,
        },
      )
    })
  }

  return Object.freeze({
    users,
    characters,
  })
}
