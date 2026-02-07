import { createId } from "@/shared/lib/id";
import type { RandomFn } from "@/shared/lib/random";
import { pickWeighted } from "@/shared/lib/random";
import { CHARACTERISTICS_ORDER, rollCharacteristicValue } from "@/shared/types/characteristics";

import type { ItemDefinition, ItemInstance, ItemStats } from "./types";
import { normalizeRolledStatSlots } from "./rolled-slots";

const STAT_ROLL_COUNTS = [0, 1, 2, 3, 4, 5, 6] as const;
const STAT_ROLL_COUNT_WEIGHTS = [63, 20, 9, 4, 2, 1.2, 0.8] as const;
const REPEAT_STAT_WEIGHT = 0.25;

const clampToRange = (value: number, range: [number, number]): number => {
  const min = Math.min(range[0], range[1]);
  const max = Math.max(range[0], range[1]);
  return Math.max(min, Math.min(max, value));
};

export const rollItemStats = (
  definition: ItemDefinition,
  rarity: ItemDefinition["defaultRarity"],
  rng: RandomFn = Math.random,
): ItemStats => {
  const ranges = definition.statRanges[rarity] ?? {};
  const allowedStats = CHARACTERISTICS_ORDER.filter(
    (stat) => Boolean(ranges[stat]),
  );

  if (allowedStats.length === 0) return {};

  const rolls = pickWeighted(
    STAT_ROLL_COUNTS,
    STAT_ROLL_COUNT_WEIGHTS,
    rng,
  );

  const stats: ItemStats = {};

  for (let index = 0; index < rolls; index += 1) {
    const weights = allowedStats.map((stat) =>
      typeof stats[stat] === "number" ? REPEAT_STAT_WEIGHT : 1,
    );
    const pickedStat = pickWeighted(allowedStats, weights, rng);
    const range = ranges[pickedStat];
    if (!range) continue;
    const nextValue =
      (stats[pickedStat] ?? 0) + Math.round(rollCharacteristicValue(range, rng));
    stats[pickedStat] = clampToRange(nextValue, range);
  }

  return stats;
};

export const createItemInstance = (
  definition: ItemDefinition,
  options?: {
    rarity?: ItemDefinition["defaultRarity"];
    rng?: RandomFn;
    instanceId?: string;
  },
): ItemInstance => {
  const rarity = options?.rarity ?? definition.defaultRarity;
  const stats = rollItemStats(definition, rarity, options?.rng);

  return {
    instanceId: options?.instanceId ?? createId(),
    definitionId: definition.id,
    type: definition.type,
    rarity,
    stats,
    rolledStatSlots: normalizeRolledStatSlots(stats),
  };
};

export const cloneItemInstance = (
  item: ItemInstance,
  updates: Partial<ItemInstance>,
): ItemInstance => ({
  ...item,
  ...updates,
});


