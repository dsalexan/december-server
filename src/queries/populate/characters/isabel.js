export default {
  _id: 'whitewater-isabelwestmoreland-fcs',
  name: 'Isabel Westmoreland',
  shortName: 'Isabel',
  source: 'Fendas',
  type: {
    type: 'humanoid',
    tags: ['human'],
  },
  cr: 5,
  isNpc: true,
  page: 22,
  size: 'M',
  alignment: ['N', 'E'],
  ac: [
    {
      ac: 14, // 10 + DEX + ?
      from: ['Natural Armor'],
    },
  ],
  hp: {
    average: 98,
    formula: '18d8 + 18',
  },
  speed: {
    walk: 30,
  },
  str: 8,
  dex: 14,
  con: 12, // +1 [1]
  int: 16,
  wis: 16,
  cha: 17, // +2 [1]
  save: {
    dex: true,
    con: true,
    int: true,
    wis: true,
  },
  skill: {
    acrobatics: false,
    'animal handling': false,
    arcana: false,
    athletics: false,
    deception: true,
    history: false,
    insight: true,
    intimidation: false,
    investigation: false,
    medicine: true,
    nature: false,
    perception: false,
    performance: false,
    persuasion: false,
    religion: false,
    'sleight of hand': false,
    stealth: false,
    survival: false,
  },
  passive: 13,
  conditionImmune: ['charmed', 'frightened'],
  languages: ['Common', 'Abyssal'],
  spellcasting: [
    {
      name: 'Innate Magic',
      ability: 'cha',
    },
  ],
  // TODO: Add Isabel's Ritual
  // tags
  languageTags: ['C', 'A'],
  spellcastingTags: ['I', 'CL'],
  // fluff
  _fluff: {
    images: [
      {
        href: {
          path: 'isabel_westmoreland.jpg',
          type: 'custom',
        },
        type: 'image',
      },
    ],
  },
}
