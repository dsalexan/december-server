"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makePopulate(connection) {
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
    };
    const USERS = {
        ADMIN: {
            _id: 'ADMIN',
            __created_at: new Date(),
            __modified_at: new Date(),
            __sessions: [],
            __last_session: {
                useragent: MOCK_USERAGENT,
                timestamp: new Date(),
            },
            player: 'ADMIN',
            status: 'offline',
            permissions: {
                __GLOBAL__: {},
                __CHARACTER__: {},
                defaults: {
                    __GLOBAL__: 'global:admin',
                    __CHARACTER__: 'character:admin',
                },
            },
        },
        dsalexan: {
            _id: 'dsalexan',
            __created_at: new Date(),
            __modified_at: new Date(),
            __sessions: [],
            __last_session: {
                useragent: MOCK_USERAGENT,
                timestamp: new Date(),
            },
            player: 'dsalexan',
            status: 'offline',
            permissions: {
                __GLOBAL__: {},
                __CHARACTER__: {
                    'lukeundel--21df-fcs': 'character:personal',
                },
            },
        },
        mario: {
            _id: 'mario',
            __created_at: new Date(),
            __modified_at: new Date(),
            __sessions: [],
            __last_session: {
                useragent: MOCK_USERAGENT,
                timestamp: new Date(),
            },
            player: 'mario',
            status: 'offline',
            permissions: {
                __GLOBAL__: {},
                __CHARACTER__: {},
            },
        },
    };
    function users() {
        connection.query('DELETE FROM users WHERE 1 = 1');
        Object.keys(USERS).map(name => {
            connection.query('INSERT INTO users VALUES (${_id}, ${__created_at}, ${__modified_at}, ${__sessions}, ${__last_session}, ${player}, ${status}, ${permissions})', 
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            USERS[name]);
        });
    }
    return Object.freeze({
        users,
    });
}
exports.default = makePopulate;
//# sourceMappingURL=populate.js.map