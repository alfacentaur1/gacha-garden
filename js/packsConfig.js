import { PLANTS_CONFIG as P } from "./plantsConfig";

export const PACKS_CONFIG = {
  STARTER: {
    id: 'starter',
    name: 'Starter Pack',
    icon: '🌱',
    price: 10,
    loot: [
      { plant: P.TOMATO, chance: 60 },
      { plant: P.WHEAT,  chance: 30 },
      { plant: P.PEPPER, chance: 8 },
      { plant: P.ORANGE, chance: 2 }
    ]
  },
  GREEN: {
    id: 'green',
    name: 'Green Pack',
    icon: '🌿',
    price: 25,
    loot: [
      { plant: P.TOMATO, chance: 35 },
      { plant: P.WHEAT,  chance: 25 },
      { plant: P.PEPPER, chance: 25 },
      { plant: P.ORANGE, chance: 12 },
      { plant: P.BANANA, chance: 3 }
    ]
  },
  GARDEN: {
    id: 'garden',
    name: 'Garden Pack',
    icon: '🌻',
    price: 50,
    loot: [
      { plant: P.TOMATO,   chance: 20 },
      { plant: P.WHEAT,    chance: 15 },
      { plant: P.PEPPER,   chance: 25 },
      { plant: P.ORANGE,   chance: 25 },
      { plant: P.BANANA,   chance: 12 },
      { plant: P.MUSHROOM, chance: 3 }
    ]
  },
  EXOTIC: {
    id: 'exotic',
    name: 'Exotic Pack',
    icon: '🌴',
    price: 100,
    loot: [
      { plant: P.PEPPER,   chance: 20 },
      { plant: P.ORANGE,   chance: 30 },
      { plant: P.BANANA,   chance: 35 },
      { plant: P.MUSHROOM, chance: 15 }
    ]
  },
  RARE: {
    id: 'rare',
    name: 'Rare Pack',
    icon: '✨',
    price: 200,
    loot: [
      { plant: P.ORANGE,   chance: 20 },
      { plant: P.BANANA,   chance: 45 },
      { plant: P.MUSHROOM, chance: 35 }
    ]
  },
  LEGENDARY: {
    id: 'legendary',
    name: 'Legendary Pack',
    icon: '👑',
    price: 500,
    loot: [
      { plant: P.BANANA,   chance: 30 },
      { plant: P.MUSHROOM, chance: 70 }
    ]
  }
};