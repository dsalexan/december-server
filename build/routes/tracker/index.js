"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pusher_1 = __importDefault(require("../../pusher"));
const router = express_1.default.Router();
const CHARACTERS_MOCK = [
    {
        _id: 'lukeundel--21df-fcs',
        name: 'Luke Undell',
        source: 'FCS',
        type: {
            type: 'Humanoid',
            tags: ['Human', 'Variant Human'],
        },
        background: 'Gravedigger',
        level: [
            {
                level: 1,
                takenAt: [1],
                class: {
                    name: 'Fighter',
                },
            },
            {
                level: 4,
                takenAt: [2, 3, 4, 5],
                class: {
                    name: 'Monk',
                },
                subclass: {
                    name: 'The Way of the Zoroaster',
                    source: 'FCS',
                },
            },
        ],
        str: 10,
        dex: 14,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10,
        _fluff: {
            images: [
                {
                    type: 'image',
                    href: {
                        type: 'external',
                        path: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    },
                },
            ],
        },
        _rolls: {
            initiative: 10,
        },
    },
    {
        _id: 'avirivrani-a32fg--fcs',
        name: 'Avir Yvrani',
        source: 'FCS',
        type: {
            type: 'Humanoid',
            tags: ['Human', 'Variant Human'],
        },
        background: 'Outlander',
        level: [
            {
                level: 20,
                class: {
                    name: 'Monk',
                },
                subclass: {
                    name: 'The Way of the Zoroaster',
                    source: 'FCS',
                },
            },
        ],
        ac: [
            {
                ac: 19,
                from: ['Unarmored Defense'],
            },
            {
                ac: 20,
                from: ['Unarmored Defense', 'Breathing Techiniques'],
            },
        ],
        speed: {
            walk: 60,
            fly: {
                number: 90,
                condition: '(Legacy of the Stars)',
            },
            canHover: true,
        },
        // avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        str: 10,
        dex: 20,
        con: 10,
        int: 10,
        wis: 18,
        cha: 10,
        save: {
            dex: true,
            con: '+16',
            wis: '+12',
        },
        skill: {
            athletics: true,
            acrobatics: {
                proficiency_ratio: 2,
            },
            deception: '+6',
            insight: '+5',
            intimidation: '+6',
        },
        senses: ["darkvision 120 ft. (see devil's sight below)"],
        languages: ['Common', 'Infernal'],
        vulnerable: [
            {
                vulnerable: ['piercing'],
                note: 'from magic weapons wielded by good creatures',
            },
        ],
        resist: [
            'fire',
            'poison',
            {
                resist: ['bludgeoning', 'piercing', 'slashing'],
                note: 'from nonmagical attacks',
            },
        ],
        immune: [
            'cold',
            'poison',
            {
                immune: ['bludgeoning', 'piercing', 'slashing'],
                note: 'from nonmagical attacks',
            },
        ],
        conditionImmune: ['frightened'],
        _conditions: [
            'disease',
            'prone',
            {
                name: 'exhaustion',
                value: 2,
            },
            {
                name: 'blinded',
                condition: 'when his eyes are closed',
            },
        ],
    },
];
const CHARACTERS = CHARACTERS_MOCK.reduce((obj, cur, index) => (Object.assign(Object.assign({}, obj), { [cur._id]: cur })), {});
router.get('/characters', (req, res) => {
    res.status(200).json({
        success: true,
        data: CHARACTERS_MOCK,
    });
});
router.post('/characters', (req, res) => {
    const character = req.body.character;
    const id = character._id;
    if (id in CHARACTERS) {
        return res.status(404).json({
            success: false,
            error: `Character <${id}> already exists at the initiative tracker`,
        });
    }
    CHARACTERS[id] = character;
    const hash = pusher_1.default('tracker:character:added', `${req.method} ${req.originalUrl}`, { character: CHARACTERS[id] });
    res.status(201).json({
        success: true,
        ignore: [hash],
    });
});
router.put('/characters/:id', (req, res) => {
    const id = req.params.id;
    const character = req.body.character;
    if (id in CHARACTERS) {
        CHARACTERS[id] = character;
        const hash = pusher_1.default('tracker:character:updated', `${req.method} ${req.originalUrl}`, { character: CHARACTERS[id] });
        res.status(200).json({
            success: true,
            ignore: [hash],
        });
    }
    else {
        return res.status(404).json({
            success: false,
            error: `Character <${id}> doesn't exists at the initiative tracker`,
        });
    }
});
router.delete('/characters/:id', (req, res) => {
    const id = req.params.id;
    if (id in CHARACTERS) {
        const character = CHARACTERS[id];
        delete CHARACTERS[id];
        const hash = pusher_1.default('tracker:character:removed', `${req.method} ${req.originalUrl}`, { character: id });
        res.status(200).json({
            success: true,
            data: character,
            ignore: [hash],
        });
    }
    else {
        return res.status(404).json({
            success: false,
            error: `Character <${id}> doesn't exists at the initiative tracker`,
        });
    }
});
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
exports.default = router;
//# sourceMappingURL=index.js.map