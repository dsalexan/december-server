export default {
  _id: 'b-medan-fcs',
  name: "Med'an",
  shortName: "Med'an",
  source: 'Fendas',
  type: {
    type: 'humanoid',
    tags: ['human'],
  },
  background: {
    name: 'Sage',
    source: 'PHB',
  },
  level: [
    {
      level: 4,
      takenAt: [1, 2, 3, 4],
      class: {
        name: 'Wizard',
        source: 'PHB',
      },
      subclass: {
        name: 'Evocation',
        source: 'PHB',
      },
    },
    {
      level: 1,
      takenAt: [5],
      class: {
        name: 'Warlock',
        source: 'PHB',
      },
      subclass: {
        name: 'The Hexblade',
        source: 'XGE',
      },
    },
  ],
  isNpc: false,
  page: 19,
  size: 'M',
  alignment: ['N', 'G'],
  ac: [
    {
      ac: 10, // 10 + DEX
      from: ['Natural Armor'],
    },
  ],
  hp: {
    rolls: [6, 3, 4, 3, 8], // 24
    bonus: [15], // CON * 5
  },
  speed: {
    walk: 30,
  },
  str: 8,
  dex: 11,
  con: 16, // +2 [1]
  int: 20, // +1 [1]
  wis: 12,
  cha: 13, // +4 [5, ORAKARON]
  save: {
    int: true,
    wis: true,
  },
  skill: {
    acrobatics: false,
    'animal handling': false,
    arcana: true,
    athletics: false,
    deception: false,
    history: true,
    insight: true,
    intimidation: false,
    investigation: true,
    medicine: false,
    nature: false,
    perception: false,
    performance: false,
    persuasion: false,
    religion: false,
    'sleight of hand': false,
    stealth: false,
    survival: false,
  },
  senses: [],
  passive: 11,
  proficiencies: {
    armor: ['light', 'medium', 'shields'],
    weapons: ['Dagger', 'darts', 'sling', 'Quarterstaff', 'Light Crossbow', 'martial'],
    tools: ['ocarina', '{@item disguise kit|PHB}'],
  },
  languages: ['Common', 'Elvish', 'Sylvan', 'Draconic'],
  feat: ['{@feat keen mind}', '{@feat spell sniper}'],
  spellcasting: [
    {
      name: 'Spellcasting',
      ability: 'int',
    },
    {
      name: 'Pact Magic',
      ability: 'cha',
    },
  ],
  // tags
  languageTags: ['C', 'E', 'S', 'DR'],
  spellcastingTags: ['CL', 'CW'],
}
