import { EQUIPMENT_ITEMS, type EquipmentEntry } from "modules/equipment";
import {
  CHARACTERISTICS_ORDER,
  rollCharacteristicValue,
  type CharacteristicsEnum,
} from "shared/types/characteristics";
import { RARITY_ORDER, RarityEnum } from "shared/types/rarity";
import type { InventoryItem } from "./types";

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

const rollStatsForRarity = (
  entry: EquipmentEntry,
  rarity: RarityEnum,
): Partial<Record<CharacteristicsEnum, number>> => {
  const ranges = entry.statRanges[rarity] ?? {};
  const rolled: Partial<Record<CharacteristicsEnum, number>> = {};

  CHARACTERISTICS_ORDER.forEach((stat) => {
    const range = ranges[stat];
    if (!range) return;

    rolled[stat] = Math.round(rollCharacteristicValue(range));
  });

  return rolled;
};

let itemCounter = 0;

export const createRandomInventoryItem = (): InventoryItem => {
  const entry = pickRandomEntry();
  const rarity = pickWeightedRarity();
  const rolledStats = rollStatsForRarity(entry, rarity);

  return {
    instanceId: `loot-${Date.now()}-${itemCounter++}`,
    id: entry.id,
    type: entry.type,
    name: entry.name,
    rarity,
    characteristics: rolledStats,
    statRanges: entry.statRanges,
    rolledStats,
    skin: entry.skins[rarity],
  };
};
