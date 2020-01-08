export default {
  _id: 'dawnbringer-helena-fcs',
  name: 'Helena',
  source: 'Fendas',
  type: {
    type: 'humanoid',
    tags: ['half-elf'],
  },
  background: {
    name: 'Knight of the Order',
    source: 'SCAG',
  },
  level: [
    {
      level: 9,
      takenAt: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      class: {
        name: 'Paladin',
      },
      subclass: {
        name: 'Oath of the Crown',
        source: 'PHB',
      },
    },
  ],
  isNpc: false,
  page: 21,
  size: 'M',
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
    // 89
    rolls: [10, 8, 10, 2, 10, 6, 10, 8, 7], // 71
    bonus: [18], // CON * 9
  },
  speed: {
    walk: 30,
  },
  str: 15, // +1 [1]
  dex: 11,
  con: 14,
  int: 10,
  wis: 11, // +1 [1]
  cha: 18, // +2 [1]
  save: {
    wis: true,
    cha: true,
  },
  skill: {
    acrobatics: false,
    'animal handling': false,
    arcana: false,
    athletics: true,
    deception: false,
    history: false,
    insight: true,
    intimidation: false,
    investigation: true,
    medicine: false,
    nature: false,
    perception: true,
    performance: false,
    persuasion: true,
    religion: true,
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
    armor: ['light', 'medium', 'heavy', 'shields'],
    weapons: ['simple', 'martial'],
    tools: ['musical instrument'],
  },
  languages: ['Common', 'Elvish', 'Celestial', 'Sylvan'],
  feat: ['{@feat war caster}'],
  spellcasting: [
    {
      name: 'Spellcasting',
      ability: 'cha',
    },
  ],
  // tags
  languageTags: ['C', 'D'],
  spellcastingTags: ['CP'],
}
