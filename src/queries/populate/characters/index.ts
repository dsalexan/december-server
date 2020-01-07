import luke from './luke'
import lyra from './lyra'
import brana from './brana'
import dominus from './dominus'
import celska from './celska'
import medan from './medan'
import vi from './vi'

export default [
  luke,
  lyra,
  brana,
  dominus,
  celska,
  medan,
  vi,
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
        ratio: 2,
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
]
