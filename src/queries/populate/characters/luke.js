export default {
  _id: 'lukeundel-fcs',
  name: 'Luke Undell',
  shortName: 'Luke',
  source: 'Fendas',
  type: {
    type: 'Humanoid',
    tags: ['Human', 'Variant Human'],
  },
  background: {
    name: 'Gravedigger',
    source: 'Fendas',
  },
  level: [
    {
      level: 5,
      takenAt: [1, 2, 3, 4, 5],
      class: {
        name: 'Monk',
      },
      subclass: {
        name: 'The Way of the Zoroaster',
        source: 'Fendas',
      },
    },
  ],
  isNpc: true,
  page: 15,
  size: 'M',
  alignment: ['N', 'G'],
  ac: [
    {
      ac: 14, // 10 + DEX
      from: ['Natural Armor'],
    },
    {
      ac: 15, // 10 + DEX + WIS
      from: ['Unarmored Defense'],
      condition: 'no armor and not wielding a shield',
    },
    {
      ac: 16, // 10 + DEX + WIS + 1
      from: ['Unarmored Defense', 'Breathing Techniques'],
      condition: 'no armor and not wielding a shield',
    },
  ],
  hp: {
    rolls: [8, 4, 8, 7, 8], // 35
    bonus: [10], // CON * 5
  },
  speed: {
    walk: {
      number: 40,
      condition: 'no armor and not wielding a shield',
    },
  },
  str: 12, // +1 [1], +1 [1]
  dex: 18,
  con: 13,
  int: 16,
  wis: 12, // +1 [1]
  cha: 16,
  save: {
    str: '+4',
    dex: '+7',
  },
  skill: {
    athletics: '+4',
    acrobatics: '+7',
    history: '+6',
    medicine: '+7', // prodigy
    perception: '+4',
    performance: '+6',
  },
  senses: [],
  passive: 11,
  proficiencies: {
    weapons: ['simple weapons', 'shortswords', 'longswords', 'greatswords', 'longbows', '???'],
    tools: ['???', 'musical instrument', '???'],
  },
  languages: ['Common', 'Elvish', 'Giant'],
  feat: ['{@feat weapon master}', '{@feat prodigy}'],
  // tags
  languageTags: ['C', 'E', 'GI'],
}
