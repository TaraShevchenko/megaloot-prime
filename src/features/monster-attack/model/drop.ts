import { createItemInstance,EQUIPMENT_ITEMS } from "@/entities/item";
import type { MonsterId } from "@/entities/monster";
import type { CurrencyType , RandomFn } from "@/shared";
import { CurrencyEnum , pickOne, randomInt , RARITY_ORDER,RarityEnum } from "@/shared";

export type DropResult = {
  items: ReturnType<typeof createItemInstance>[];
  currencies: Partial<Record<CurrencyType, number>>;
};

const RARITY_WEIGHTS: Array<{ rarity: RarityEnum; weight: number }> = [
  { rarity: RarityEnum.COMMON, weight: 60 },
  { rarity: RarityEnum.UNCOMMON, weight: 22 },
  { rarity: RarityEnum.RARE, weight: 12 },
  { rarity: RarityEnum.EPIC, weight: 5 },
  { rarity: RarityEnum.LEGENDARY, weight: 1 },
];

const rollRarity = (rng: RandomFn = Math.random): RarityEnum => {
  const total = RARITY_WEIGHTS.reduce((acc, entry) => acc + entry.weight, 0);
  const roll = randomInt(1, total, rng);
  let cursor = 0;
  for (const entry of RARITY_WEIGHTS) {
    cursor += entry.weight;
    if (roll <= cursor) return entry.rarity;
  }
  return RARITY_ORDER[0] ?? RarityEnum.COMMON;
};

const DROP_TABLE: Record<MonsterId, { gold: [number, number]; itemChance: number }> = {
  EVIL_WITCH: { gold: [18, 32], itemChance: 0.5 },
  FIRE_WORM: { gold: [24, 40], itemChance: 0.6 },
  KNIGHT: { gold: [12, 22], itemChance: 0.4 },
  ORK: { gold: [10, 18], itemChance: 0.35 },
};
const FORCE_DROP = process.env.NEXT_PUBLIC_FORCE_DROP === "1";

export const rollDrop = (
  monsterId: MonsterId,
  rng: RandomFn = Math.random,
): DropResult => {
  const table = DROP_TABLE[monsterId];
  const currencies: Partial<Record<CurrencyType, number>> = {};
  const gold = randomInt(table.gold[0], table.gold[1], rng);
  if (gold > 0) {
    currencies[CurrencyEnum.GOLD] = gold;
  }

  const items = [] as DropResult["items"];
  if (FORCE_DROP || rng() < table.itemChance) {
    const definition = pickOne(EQUIPMENT_ITEMS, rng);
    const rarity = rollRarity(rng);
    items.push(createItemInstance(definition, { rarity, rng }));
  }

  return { items, currencies };
};
