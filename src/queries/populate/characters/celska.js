export default {
  _id: 'b-celska-fcs',
  name: 'Celka of Mier',
  shortName: 'Celska',
  source: 'Fendas',
  type: {
    type: 'humanoid',
    tags: ['human', 'Human (Mier)'],
  },
  background: {
    name: 'Outlander',
    source: 'PHB',
  },
  level: [
    {
      level: 4,
      takenAt: [1, 2, 3, 4],
      class: {
        name: 'Ranger, Reimaginated',
        source: 'Fendas',
      },
      subclass: {
        name: 'Beastmaster',
        source: 'Fendas',
      },
    },
    {
      level: 1,
      takenAt: [5],
      class: {
        name: 'Barbarian',
      },
    },
  ],
  isNpc: false,
  page: 19,
  size: 'M',
  alignment: ['L', 'N'],
  ac: [
    {
      ac: 11, // 10 + DEX
      from: ['Natural Armor'],
    },
    {
      ac: 15, // 14 + DEX
      from: ['Scale Mail'],
    },
    {
      ac: 17, // 14 + DEX + 2
      from: ['Scale Mail', 'Shield'],
    },
  ],
  hp: {
    rolls: [10, 5, 6, 9, 12], // 42
    bonus: [5], // CON * 5
  },
  speed: {
    walk: 30,
  },
  str: 16, // +2 [1]
  dex: 16,
  con: 13,
  int: 14,
  wis: 14,
  cha: 10,
  save: {
    str: true,
    dex: true,
  },
  skill: {
    acrobatics: true,
    'animal handling': true,
    arcana: false,
    athletics: true,
    deception: false,
    history: false,
    insight: true,
    intimidation: false,
    investigation: false,
    medicine: false,
    nature: true,
    perception: false,
    performance: false,
    persuasion: false,
    religion: false,
    'sleight of hand': false,
    stealth: false,
    survival: true,
  },
  senses: [
    {
      name: 'Keen Smell',
      condition: 'Advantage on Perception (Wisdom) checks that rely on smell',
    },
  ],
  passive: 12,
  proficiencies: {
    armor: ['light', 'medium', 'shields'],
    weapons: ['simple', 'martial'],
    tools: ['ocarina', '{@item disguise kit|PHB}'],
  },
  languages: ['Common', 'Baeric', 'Sylvan'],
  feat: ['{@feat sentinel}'],
  // tags
  languageTags: ['C', 'BR', 'S'],
}
