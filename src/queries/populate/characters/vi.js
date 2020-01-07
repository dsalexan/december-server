export default {
  _id: 'b-vithorkharvalhus-fcs',
  name: "Vi'Thor Khar'Valhus",
  shortName: "Vi'Thor",
  source: 'Fendas',
  type: {
    type: 'humanoid',
    tags: ['tiefling'],
  },
  background: {
    name: 'Noble',
    source: 'PHB',
  },
  level: [
    {
      level: 5,
      takenAt: [1, 2, 3, 4, 5],
      class: {
        name: 'Rogue',
        source: 'PHB',
      },
      subclass: {
        name: 'Assassin',
        source: 'PHB',
      },
    },
  ],
  isNpc: false,
  page: 20,
  size: 'M',
  alignment: ['N'],
  ac: [
    {
      ac: 14, // 10 + DEX
      from: ['Natural Armor'],
    },
    {
      ac: 15, // 11 + DEX
      from: ['Leather Armor'],
    },
  ],
  hp: {
    rolls: [8, 3, 4, 7, 5], // 27
    bonus: [15], // CON * 5
  },
  speed: {
    walk: 30,
  },
  str: 13,
  dex: 18, // +1 [4]
  con: 16, // +1 [4]
  int: 16, // +1 [1]
  wis: 14,
  cha: 18, // +2 [1]
  save: {
    dex: true,
    int: true,
  },
  skill: {
    acrobatics: false,
    'animal handling': false,
    arcana: false,
    athletics: false,
    deception: true,
    history: true,
    insight: false,
    intimidation: true,
    investigation: false,
    medicine: false,
    nature: false,
    perception: false,
    performance: false,
    persuasion: true,
    religion: false,
    'sleight of hand': true,
    stealth: {
      ratio: 2,
    },
    survival: false,
  },
  senses: [],
  passive: 12,
  resist: ['fire'],
  proficiencies: {
    armor: ['light'],
    weapons: ['simple', 'Hand Crossbows', 'Longswords', 'Shortswords', 'Rapiers'],
    tools: ['poker', "{@item thive's tools|PHB}"],
  },
  languages: ['Common', 'Elvish', 'Infernal'],
  // TODO: Infernal Legacy
  // tags
  languageTags: ['C', 'E', 'I'],
}
