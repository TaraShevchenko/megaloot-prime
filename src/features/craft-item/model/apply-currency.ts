import type { GameSession } from "@/entities/game-session";
import type { ItemInstance } from "@/entities/item";
import {
  EQUIPMENT_BY_ID,
  normalizeRolledStatSlots,
  rollItemStats,
} from "@/entities/item";
import type {
  CharacteristicsEnum,
  CurrencyType,
  RandomFn,
  RarityEnum,
} from "@/shared";
import {
  CHARACTERISTICS_ORDER,
  CurrencyEnum,
  pickOne,
  randomInt,
  RARITY_ORDER,
} from "@/shared";

export type CraftResult = {
  session: GameSession;
  error?: string;
};

const CURRENCY_COSTS: Record<CurrencyType, number> = {
  GOLD: 5,
  EQUIPMENT_PART: 1,
  CRIMSON_GEM: 1,
  RARITY_INGOT: 1,
};

const upgradeRarity = (current: RarityEnum): RarityEnum => {
  const index = RARITY_ORDER.indexOf(current);
  if (index === -1 || index === RARITY_ORDER.length - 1) return current;
  return RARITY_ORDER[index + 1] ?? current;
};

const applyCrimsonGem = (
  item: ItemInstance,
  rng: RandomFn,
): ItemInstance => {
  const missing = CHARACTERISTICS_ORDER.filter(
    (stat) => typeof item.stats[stat] !== "number",
  );

  if (missing.length > 0) {
    const newStat = pickOne(missing, rng) as CharacteristicsEnum;
    return {
      ...item,
      stats: {
        ...item.stats,
        [newStat]: randomInt(1, 4, rng),
      },
    };
  }

  const stat = pickOne(CHARACTERISTICS_ORDER, rng) as CharacteristicsEnum;
  const current = item.stats[stat] ?? 0;
  return {
    ...item,
    stats: {
      ...item.stats,
      [stat]: current + randomInt(1, 3, rng),
    },
  };
};

const applyEquipmentPart = (item: ItemInstance, rng: RandomFn): ItemInstance => {
  const nextStats = { ...item.stats };
  CHARACTERISTICS_ORDER.forEach((stat) => {
    const current = nextStats[stat];
    if (typeof current === "number") {
      nextStats[stat] = current + randomInt(1, 2, rng);
    }
  });
  return { ...item, stats: nextStats };
};

const applyRarityIngot = (item: ItemInstance, rng: RandomFn): ItemInstance => {
  const definition = EQUIPMENT_BY_ID[item.definitionId];
  const nextRarity = upgradeRarity(item.rarity);
  if (nextRarity === item.rarity || !definition) return item;
  return {
    ...item,
    rarity: nextRarity,
    stats: rollItemStats(definition, nextRarity, rng),
  };
};

const applyGold = (item: ItemInstance, rng: RandomFn): ItemInstance => {
  const definition = EQUIPMENT_BY_ID[item.definitionId];
  if (!definition) return item;
  const stats = { ...item.stats };
  const available = Object.entries(definition.statRanges[item.rarity]).filter(
    ([, range]) => Boolean(range),
  ) as Array<[CharacteristicsEnum, [number, number]]>;
  if (available.length === 0) return item;

  const [stat, range] = pickOne(available, rng);
  stats[stat] = randomInt(range[0], range[1], rng);
  return { ...item, stats };
};

const applyCurrencyEffect = (
  item: ItemInstance,
  currency: CurrencyType,
  rng: RandomFn,
): ItemInstance => {
  switch (currency) {
    case CurrencyEnum.CRIMSON_GEM:
      return applyCrimsonGem(item, rng);
    case CurrencyEnum.EQUIPMENT_PART:
      return applyEquipmentPart(item, rng);
    case CurrencyEnum.RARITY_INGOT:
      return applyRarityIngot(item, rng);
    case CurrencyEnum.GOLD:
      return applyGold(item, rng);
    default:
      return item;
  }
};

const withNormalizedSlots = (item: ItemInstance): ItemInstance => ({
  ...item,
  rolledStatSlots: normalizeRolledStatSlots(
    item.stats,
    item.rolledStatSlots,
  ),
});

export const applyCurrency = (
  session: GameSession,
  currency: CurrencyType,
  rng: RandomFn = Math.random,
): CraftResult => {
  if (!session.craft.item) {
    return { session, error: "Select an item for crafting first." };
  }

  const available = session.currencies[currency] ?? 0;
  const cost = CURRENCY_COSTS[currency] ?? 1;
  if (available < cost) {
    return { session, error: "Not enough currency." };
  }

  const updatedItem = withNormalizedSlots(
    applyCurrencyEffect(session.craft.item, currency, rng),
  );

  return {
    session: {
      ...session,
      craft: { ...session.craft, item: updatedItem },
      currencies: {
        ...session.currencies,
        [currency]: available - cost,
      },
    },
  };
};
