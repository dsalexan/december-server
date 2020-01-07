export default {
  _id: 'b-lyra-fcs',
  name: 'Lyra',
  source: 'Fendas',
  type: {
    type: ['humanoid', 'fey'],
    tags: ['Fairy'],
  },
  background: {
    name: 'Entertainer',
    source: 'PHB',
  },
  level: [
    {
      level: 5,
      takenAt: [1, 2, 3, 4, 5],
      class: {
        name: 'Bard',
      },
      subclass: {
        name: 'College of Lore',
        source: 'PHB',
      },
    },
  ],
  isNpc: false,
  page: 16,
  size: [
    {
      size: 'M',
      condition: 'humanoid form',
    },
    {
      size: 'T',
      condition: 'fae form',
    },
  ],
  alignment: ['N'],
  ac: [
    {
      ac: 12, // 10 + DEX
      from: ['Natural Armor'],
    },
    {
      ac: 13, // 11 + DEX
      from: ['Leather Armor'],
    },
  ],
  hp: {
    rolls: [8, 3, 6, 4, 5], // 30
  },
  speed: {
    walk: 25,
    fly: {
      number: 50,
      condition: 'no armor',
    },
    alternate: {
      walk: [
        {
          number: 10,
          condition: 'humanoid form',
        },
      ],
      fly: [
        {
          number: 30,
          condition: 'humanoid form, no medium or heavy armor',
        },
      ],
    },
  },
  str: 7, // -1 [1]
  dex: 15, // +1 [1]
  con: 10, // +2 [4]
  int: 12,
  wis: 14,
  cha: 19, // +2 [1]
  save: {
    dex: true,
    cha: true,
  },
  skill: {
    acrobatics: true,
    'animal handling': true,
    arcana: true,
    athletics: true,
    deception: true,
    history: {
      ratio: 0.5,
    },
    insight: {
      ratio: 2, // expertise
    },
    intimidation: {
      ratio: 0.5,
    },
    investigation: {
      ratio: 0.5,
    },
    medicine: {
      ratio: 0.5,
    },
    nature: {
      ratio: 0.5,
    },
    perception: true,
    performance: true,
    persuasion: true,
    religion: {
      ratio: 0.5,
    },
    'sleight of hand': {
      ratio: 0.5,
    },
    stealth: {
      ratio: 2, // expertise
    },
    survival: {
      ratio: 0.5,
    },
  },
  senses: [],
  passive: 15,
  proficiencies: {
    armor: ['light'],
    weapons: ['simple', 'hand crossbows', 'longswords', 'rapiers', 'shortswords'],
    tools: ['voz', 'harpa', 'flute', 'lute', 'disguise kit'],
  },
  languages: ['Common', 'Elvish', 'Sylvan'],
  spellcasting: [
    {
      name: 'Spellcasting',
      ability: 'cha',
    },
  ],
  // tags
  languageTags: ['C', 'E', 'S'],
  spellcastingTags: ['CB'],
}
