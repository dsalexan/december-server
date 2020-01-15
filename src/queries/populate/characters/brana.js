export default {
  _id: 'b-branahammerrein-fcs',
  name: 'Brana Hammerrein',
  shortName: 'Brana',
  source: 'Fendas',
  type: {
    type: 'humanoid',
    tags: ['dwarf', 'hill dwarf'],
  },
  background: {
    name: 'Blacksmith',
    source: 'Fendas',
  },
  level: [
    {
      level: 5,
      takenAt: [1, 2, 3, 4, 5],
      class: {
        name: 'Cleric',
      },
      subclass: {
        name: 'War Domain',
        source: 'PHB',
      },
    },
  ],
  isNpc: false,
  page: 18,
  size: 'S',
  alignment: ['L', 'G'],
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
    rolls: [8, 4, 3, 8, 5], // 28
    bonus: [10, 5], // CON * 5, DWARVEN RESILIENCE
  },
  speed: {
    walk: 25,
  },
  str: 12,
  dex: 13,
  con: 15, // +2 [1]
  int: 15,
  wis: 17, // +1 [1]
  cha: 12,
  save: {
    wis: true,
    cha: true,
  },
  skill: {
    acrobatics: true,
    'animal handling': false,
    arcana: false,
    athletics: false,
    deception: false,
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
  senses: [
    {
      name: 'Darkvision',
      value: 60,
      condition: 'can’t discern color in darkness',
    },
  ],
  passive: 13,
  proficiencies: {
    armor: ['light', 'medium', 'shields', 'heavy'],
    weapons: ['simple', 'martial'],
    tools: ["{@item smith's tools|PHB}", "{@item tinker's tools|PHB}"],
  },
  languages: ['Common', 'Dwarvish'],
  spellcasting: [
    {
      name: 'Spellcasting',
      ability: 'wis',
    },
  ],
  feats: ['{@feat alert}'],
  // tags
  languageTags: ['C', 'D'],
  spellcastingTags: ['CC'],
  // fluff
  _fluff: {
    images: [
      {
        href: {
          path: 'brana.jpg',
          type: 'custom',
        },
        type: 'image',
      },
    ],
  },
}
