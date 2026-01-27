import {
  EQUIPMENT_ITEMS,
  type EquipmentEntry,
} from "modules/equipment";
import {
  CHARACTERISTICS_ORDER,
  rollCharacteristicValue,
  type CharacteristicsEnum,
} from "shared/types/characteristics";
import { RARITY_ORDER, RarityEnum } from "shared/types/rarity";
import type { InventoryItem } from "./inventory.types";

const REPEAT_STAT_WEIGHT = 0.25;

const rarityWeights: Record<RarityEnum, number> = {
  [RarityEnum.COMMON]: 48,
  [RarityEnum.UNCOMMON]: 26,
  [RarityEnum.RARE]: 16,
  [RarityEnum.EPIC]: 7,
  [RarityEnum.LEGENDARY]: 3,
};

const pickWeightedRarity = () => {
  const total = RARITY_ORDER.reduce(
    (sum, rarity) => sum + (rarityWeights[rarity] ?? 0),
    0,
  );
  const roll = Math.random() * total;
  let accumulator = 0;

  for (const rarity of RARITY_ORDER) {
    accumulator += rarityWeights[rarity] ?? 0;
    if (roll <= accumulator) {
      return rarity;
    }
  }

  return RarityEnum.COMMON;
};

const pickRandomEntry = () =>
  EQUIPMENT_ITEMS[Math.floor(Math.random() * EQUIPMENT_ITEMS.length)];

const STAT_ROLL_COUNTS = [0, 1, 2, 3, 4, 5, 6] as const;
// Probabilities (in %): 0=63, 1=20, 2=9, 3=4, 4=2, 5=1.2, 6=0.8
// Requirement: chance of 6 is < 1%.
const STAT_ROLL_COUNT_WEIGHTS = [63, 20, 9, 4, 2, 1.2, 0.8] as const;

const pickWeighted = <T,>(items: T[], weights: number[]): T => {
  const total = weights.reduce((sum, value) => sum + Math.max(0, value), 0);
  if (total <= 0) {
    return items[Math.floor(Math.random() * items.length)]!;
  }

  const roll = Math.random() * total;
  let accumulator = 0;

  for (let index = 0; index < items.length; index += 1) {
    accumulator += Math.max(0, weights[index] ?? 0);
    if (roll <= accumulator) {
      return items[index]!;
    }
  }

  return items[items.length - 1]!;
};

const clampToRange = (
  value: number,
  range: [number, number] | undefined,
): number => {
  if (!range) return value;
  const min = Math.min(range[0], range[1]);
  const max = Math.max(range[0], range[1]);
  return Math.max(min, Math.min(max, value));
};

const rollRandomStatsForRarity = (
  entry: EquipmentEntry,
  rarity: RarityEnum,
): Partial<Record<CharacteristicsEnum, number>> => {
  const ranges = entry.statRanges[rarity] ?? {};
  const allowedStats = CHARACTERISTICS_ORDER.filter(
    (stat) => Boolean(ranges[stat]),
  ) as CharacteristicsEnum[];

  if (allowedStats.length === 0) return {};

  const rolls = pickWeighted(
    [...STAT_ROLL_COUNTS],
    [...STAT_ROLL_COUNT_WEIGHTS],
  );
  const rolled: Partial<Record<CharacteristicsEnum, number>> = {};

  for (let index = 0; index < rolls; index += 1) {
    const weights = allowedStats.map((stat) =>
      typeof rolled[stat] === "number" ? REPEAT_STAT_WEIGHT : 1,
    );

    const pickedStat = pickWeighted(allowedStats, weights);
    const range = ranges[pickedStat];
    if (!range) continue;

    const nextValue =
      (rolled[pickedStat] ?? 0) + Math.round(rollCharacteristicValue(range));

    rolled[pickedStat] = clampToRange(nextValue, range);
  }

  return rolled;
};

let itemCounter = 0;

export const createRandomInventoryItem = (): InventoryItem => {
  const entry = pickRandomEntry();
  const rarity = pickWeightedRarity();
  const rolledStats = rollRandomStatsForRarity(entry, rarity);
  const stackKeyParts = CHARACTERISTICS_ORDER.map(
    (stat) => `${stat}:${rolledStats[stat] ?? ""}`,
  ).join("|");

  return {
    instanceId: `loot-${Date.now()}-${itemCounter++}`,
    id: entry.id,
    type: entry.type,
    name: entry.name,
    rarity,
    characteristics: rolledStats,
    statRanges: entry.statRanges,
    rolledStats,
    stackKey: `${entry.type}:${entry.id}:${rarity}:${stackKeyParts}`,
    stackCount: 1,
    skin: entry.skins[rarity],
  };
};
