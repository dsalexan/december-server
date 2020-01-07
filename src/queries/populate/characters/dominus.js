export default {
  _id: 'b-dominus-fcs',
  name: 'Dominus',
  source: 'Fendas',
  type: {
    type: 'humanoid',
    tags: ['half-elf'],
  },
  background: {
    name: 'Bastard',
    source: 'Fendas',
  },
  level: [
    {
      level: 5,
      takenAt: [1, 2, 3, 4, 5],
      class: {
        name: 'Warlock',
      },
      subclass: {
        name: 'The Angel of Death',
        source: 'Fendas',
      },
    },
  ],
  isNpc: false,
  page: 17,
  size: 'M',
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
    rolls: [8, 2, 6, 4, 5], // 25
    bonus: [15], // CON * 5
  },
  speed: {
    walk: 30,
  },
  str: 14,
  dex: 15,
  con: 16, // +1 [1]
  int: 14,
  wis: 14,
  cha: 19, // +2 [1]
  save: {
    wis: true,
    cha: true,
  },
  skill: {
    acrobatics: false,
    'animal handling': false,
    arcana: true,
    athletics: false,
    deception: true,
    history: true,
    insight: false,
    intimidation: false,
    investigation: true,
    medicine: false,
    nature: false,
    perception: false,
    performance: false,
    persuasion: true,
    religion: false,
    'sleight of hand': false,
    stealth: false,
    survival: false,
  },
  senses: [
    {
      name: 'Darkvision',
      value: 60,
      condition: 'can’t discern color in darkness',
    },
  ],
  passive: 12,
  proficiencies: {
    armor: ['light'],
    weapons: ['simple'],
    tools: ['disguise kit'],
  },
  languages: ['Common', 'Elvish'],
  spellcasting: [
    {
      name: 'Pact Magic',
      ability: 'cha',
    },
  ],
  feat: ['{@feat inspiring leader}'],
  // tags
  languageTags: ['C', 'E'],
  spellcastingTags: ['CL'],
}
