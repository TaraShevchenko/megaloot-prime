import { addInventoryItem } from "@/entities/inventory";
import {
  buildStatsFromSlots,
  cloneItemInstance,
  EQUIPMENT_BY_ID,
  normalizeRolledStatSlots,
  STAT_SLOT_COUNT,
} from "@/entities/item";
import type { ItemInstance } from "@/entities/item";
import {
  CHARACTERISTIC_LABELS,
  CHARACTERISTICS_ORDER,
  rollCharacteristicValue,
  type CharacteristicValue,
  type CharacteristicsEnum,
} from "@/shared/types/characteristics";
import {
  RARITY_LABELS,
  RARITY_ORDER,
  type RarityEnum,
} from "@/shared/types/rarity";
import { CurrencyEnum, type RandomFn } from "@/shared";
import type { GameSession } from "@/entities/game-session";
import { createId } from "@/shared/lib/id";
import { pickWeighted } from "@/shared/lib/random";

import type { CraftActionResult, CraftCurrencyDragPayload } from "./types";
import {
  consumeAddOrChangeChar,
  consumeChangeValueChar,
  consumeForgeAction,
  consumeRarityUpgrade,
} from "./tokens";

const REPEAT_STAT_WEIGHT = 0.25;

const getRangeBounds = (value: CharacteristicValue): { min: number; max: number } => {
  if (Array.isArray(value)) {
    const [first, second] = value;
    return { min: Math.min(first, second), max: Math.max(first, second) };
  }
  return { min: value, max: value };
};

const clampToRange = (value: number, range: CharacteristicValue): number => {
  const { min, max } = getRangeBounds(range);
  return Math.max(min, Math.min(max, value));
};

const pickDistinct = <T,>(items: T[], count: number, rng: RandomFn): T[] => {
  const picked: T[] = [];
  const pool = [...items];
  while (pool.length > 0 && picked.length < count) {
    const index = Math.floor(rng() * pool.length);
    const item = pool[index];
    if (item !== undefined) {
      picked.push(item);
      pool.splice(index, 1);
    }
  }
  return picked;
};

const rollChance = (chance: number, rng: RandomFn): boolean => rng() < chance;

const updateCraftItem = (
  session: GameSession,
  item: ItemInstance,
): GameSession => ({
  ...session,
  craft: {
    ...session.craft,
    item,
  },
});

export const applyCraftAction = (
  session: GameSession,
  payload: CraftCurrencyDragPayload,
  options?: {
    rng?: RandomFn;
    selectedStatIndex?: number | null;
  },
): CraftActionResult => {
  const rng = options?.rng ?? Math.random;
  const selectedStatIndex = options?.selectedStatIndex ?? null;
  const current = session.craft.item;
  if (!current) {
    return { session, error: "Drop currency on an item." };
  }

  const definition = EQUIPMENT_BY_ID[current.definitionId];
  if (!definition) {
    return { session, error: "Unknown item definition." };
  }

  const currentSlots = normalizeRolledStatSlots(
    current.stats,
    current.rolledStatSlots,
  );

  const updateFromSlots = (
    baseSession: GameSession,
    nextSlots: typeof currentSlots,
    options?: { rarity?: RarityEnum },
  ): GameSession => {
    const nextRarity = options?.rarity ?? current.rarity;
    const nextStats = buildStatsFromSlots(nextSlots);

    const nextItem: ItemInstance = {
      ...current,
      rarity: nextRarity,
      stats: nextStats,
      rolledStatSlots: nextSlots,
    };

    return updateCraftItem(baseSession, nextItem);
  };

  if (payload.type === "gold" || payload.type === "parts") {
    const currentIndex = RARITY_ORDER.indexOf(current.rarity);
    if (currentIndex === -1 || currentIndex >= RARITY_ORDER.length - 1) {
      return { session, error: "Item is already max rarity." };
    }

    const nextRarity = RARITY_ORDER[currentIndex + 1]!;
    const cost = currentIndex + 1;
    const currencyKey =
      payload.type === "gold" ? CurrencyEnum.GOLD : CurrencyEnum.EQUIPMENT_PART;
    const available = session.currencies[currencyKey] ?? 0;

    if (available < cost) {
      return {
        session,
        error: `Not enough ${payload.type}. Need ${cost}.`,
      };
    }

    const baseSession = {
      ...session,
      currencies: {
        ...session.currencies,
        [currencyKey]: available - cost,
      },
    };
    const nextSession = updateFromSlots(
      baseSession,
      currentSlots.map((slot) =>
        slot ? { stat: slot.stat, value: slot.value } : null,
      ),
      { rarity: nextRarity },
    );

    return {
      session: nextSession,
      info: `Upgraded rarity to ${RARITY_LABELS[nextRarity]} (cost ${cost} ${payload.type}).`,
    };
  }

  if (payload.type === "setRarity") {
    const targetRarity = payload.rarity;
    const currentIndex = RARITY_ORDER.indexOf(current.rarity);
    const targetIndex = RARITY_ORDER.indexOf(targetRarity);
    if (targetIndex === -1) {
      return { session, error: "Invalid rarity." };
    }

    if (targetIndex <= currentIndex) {
      return {
        session,
        error: `Item is already ${RARITY_LABELS[current.rarity]} or higher.`,
      };
    }

    const nextTokens = consumeRarityUpgrade(session.craft.tokens, targetRarity);
    if (!nextTokens) {
      return {
        session,
        error: `Not enough rarity-upgrade (${RARITY_LABELS[targetRarity]}).`,
      };
    }

    const nextSession = updateFromSlots(
      session,
      currentSlots.map((slot) =>
        slot ? { stat: slot.stat, value: slot.value } : null,
      ),
      { rarity: targetRarity },
    );

    return {
      session: {
        ...nextSession,
        craft: { ...nextSession.craft, tokens: nextTokens },
      },
      info: `Updated rarity to ${RARITY_LABELS[targetRarity]}.`,
    };
  }

  if (payload.type === "changeValueChar") {
    const levelIndex = Math.max(0, Math.min(5, payload.level - 1));
    const slot = currentSlots[levelIndex] ?? null;
    const stat = slot?.stat;
    if (!stat) {
      return {
        session,
        error: "No characteristic in that slot to change value.",
      };
    }

    const nextTokens = consumeChangeValueChar(
      session.craft.tokens,
      payload.level,
    );
    if (!nextTokens) {
      return {
        session,
        error: `Not enough change-value (lvl ${payload.level}).`,
      };
    }

    const range = definition.statRanges?.[current.rarity]?.[stat];
    if (!range) {
      return { session, error: "This item cannot roll that characteristic." };
    }

    const nextSlots = [...currentSlots];
    nextSlots[levelIndex] = {
      stat,
      value: Math.round(rollCharacteristicValue(range, rng)),
    };

    const nextSession = updateFromSlots(session, nextSlots);
    return {
      session: {
        ...nextSession,
        craft: { ...nextSession.craft, tokens: nextTokens },
      },
      info: `Changed value for ${CHARACTERISTIC_LABELS[stat]}.`,
    };
  }

  if (payload.type === "addChar") {
    const levelIndex = Math.max(0, Math.min(5, payload.level - 1));
    if (currentSlots[levelIndex]) {
      return { session, error: "That slot already has a characteristic." };
    }

    const nextTokens = consumeAddOrChangeChar(
      session.craft.tokens,
      payload.level,
    );
    if (!nextTokens) {
      return { session, error: `Not enough add (lvl ${payload.level}).` };
    }

    const currentRanges = definition.statRanges?.[current.rarity] ?? {};
    const presentStats = new Set<CharacteristicsEnum>(
      currentSlots.flatMap((slot) => (slot ? [slot.stat] : [])),
    );
    const candidates = CHARACTERISTICS_ORDER.filter((stat) =>
      Boolean(currentRanges[stat]),
    );
    if (candidates.length === 0) {
      return {
        session,
        error: "This item has no available characteristics to roll.",
      };
    }

    const weights = candidates.map((stat) =>
      presentStats.has(stat) ? REPEAT_STAT_WEIGHT : 1,
    );
    const nextStat = pickWeighted(candidates, weights, rng);
    const range = currentRanges[nextStat];
    if (!range) {
      return { session, error: "This item cannot roll that characteristic." };
    }

    const nextSlots = [...currentSlots];
    nextSlots[levelIndex] = {
      stat: nextStat,
      value: Math.round(rollCharacteristicValue(range, rng)),
    };

    const nextSession = updateFromSlots(session, nextSlots);
    return {
      session: {
        ...nextSession,
        craft: { ...nextSession.craft, tokens: nextTokens },
      },
      info: `Added ${CHARACTERISTIC_LABELS[nextStat]}.`,
    };
  }

  if (
    payload.type === "removeRandomChar" ||
    payload.type === "removeSelectedChar" ||
    payload.type === "improveRandomChar" ||
    payload.type === "improveSelectedChar" ||
    payload.type === "improve3RandomChar" ||
    payload.type === "cloneItem"
  ) {
    const action = payload.type;
    const nextTokens = consumeForgeAction(session.craft.tokens, action);
    if (!nextTokens) {
      return { session, error: `Not enough ${action}.` };
    }

    const filledIndexes = currentSlots.flatMap((slot, index) =>
      slot ? [index] : [],
    );

    const selectedIndex =
      selectedStatIndex === null
        ? null
        : selectedStatIndex >= 0 && selectedStatIndex < STAT_SLOT_COUNT
          ? selectedStatIndex
          : null;

    const canImproveSlotAt = (index: number): boolean => {
      const slot = currentSlots[index];
      if (!slot) return false;
      const range = definition.statRanges?.[current.rarity]?.[slot.stat];
      if (!range) return false;
      const { min, max } = getRangeBounds(range);
      return max > min;
    };

    const improveSlotAt = (index: number): boolean => {
      const slot = currentSlots[index];
      if (!slot) return false;
      const range = definition.statRanges?.[current.rarity]?.[slot.stat];
      if (!range) return false;
      const { min, max } = getRangeBounds(range);
      if (max <= min) return false;
      const delta = Math.max(1, Math.round((max - min) * 0.15));
      const nextValue = clampToRange(slot.value + delta, range);
      if (nextValue === slot.value) return false;
      currentSlots[index] = { stat: slot.stat, value: Math.round(nextValue) };
      return true;
    };

    const removeSlotAt = (index: number): boolean => {
      if (!currentSlots[index]) return false;
      currentSlots[index] = null;
      return true;
    };

    if (action === "removeRandomChar") {
      if (filledIndexes.length === 0) {
        return { session, error: "No characteristics to remove." };
      }
      const index = pickDistinct(filledIndexes, 1, rng)[0] ?? filledIndexes[0];
      if (index === undefined) {
        return { session, error: "No characteristics to remove." };
      }
      removeSlotAt(index);
      const nextSession = updateFromSlots(session, [...currentSlots]);
      return {
        session: {
          ...nextSession,
          craft: { ...nextSession.craft, tokens: nextTokens },
        },
        info: "Removed random characteristic.",
      };
    }

    if (action === "removeSelectedChar") {
      if (selectedIndex === null) {
        return { session, error: "Select a characteristic first." };
      }
      if (!currentSlots[selectedIndex]) {
        return { session, error: "Selected slot has no characteristic." };
      }
      removeSlotAt(selectedIndex);
      const nextSession = updateFromSlots(session, [...currentSlots]);
      return {
        session: {
          ...nextSession,
          craft: { ...nextSession.craft, tokens: nextTokens },
        },
        info: "Removed selected characteristic.",
      };
    }

    if (action === "improveRandomChar") {
      const improvableIndexes = filledIndexes.filter((index) =>
        canImproveSlotAt(index),
      );
      if (improvableIndexes.length === 0) {
        return { session, error: "No characteristics to improve." };
      }
      const index =
        pickDistinct(improvableIndexes, 1, rng)[0] ?? improvableIndexes[0];
      if (index === undefined) {
        return { session, error: "No characteristics to improve." };
      }
      if (!improveSlotAt(index)) {
        return { session, error: "Could not improve characteristic." };
      }
      const nextSession = updateFromSlots(session, [...currentSlots]);
      return {
        session: {
          ...nextSession,
          craft: { ...nextSession.craft, tokens: nextTokens },
        },
        info: "Improved random characteristic.",
      };
    }

    if (action === "improveSelectedChar") {
      if (selectedIndex === null) {
        return { session, error: "Select a characteristic first." };
      }
      if (!currentSlots[selectedIndex]) {
        return { session, error: "Selected slot has no characteristic." };
      }
      if (!canImproveSlotAt(selectedIndex)) {
        return { session, error: "Selected characteristic cannot be improved." };
      }
      if (!improveSlotAt(selectedIndex)) {
        return { session, error: "Could not improve characteristic." };
      }
      const nextSession = updateFromSlots(session, [...currentSlots]);
      return {
        session: {
          ...nextSession,
          craft: { ...nextSession.craft, tokens: nextTokens },
        },
        info: "Improved selected characteristic.",
      };
    }

    if (action === "improve3RandomChar") {
      const improvableIndexes = filledIndexes.filter((index) =>
        canImproveSlotAt(index),
      );
      if (improvableIndexes.length === 0) {
        return { session, error: "No characteristics to improve." };
      }

      const pickedIndexes = pickDistinct(improvableIndexes, 3, rng);
      let improvedCount = 0;
      pickedIndexes.forEach((index) => {
        if (improveSlotAt(index)) improvedCount += 1;
      });

      let removedCount = 0;
      if (rollChance(0.2, rng)) {
        const filledAfterImprove = currentSlots.flatMap((slot, index) =>
          slot ? [index] : [],
        );
        const removalIndexes = pickDistinct(filledAfterImprove, 3, rng);
        removalIndexes.forEach((index) => {
          if (removeSlotAt(index)) removedCount += 1;
        });
      }

      const nextSession = updateFromSlots(session, [...currentSlots]);
      return {
        session: {
          ...nextSession,
          craft: { ...nextSession.craft, tokens: nextTokens },
        },
        info:
          removedCount > 0
            ? `Improved ${improvedCount} characteristics, but removed ${removedCount}.`
            : `Improved ${improvedCount} characteristics.`,
      };
    }

    if (action === "cloneItem") {
      const added = addInventoryItem(
        session.inventory.equipment,
        cloneItemInstance(current, { instanceId: createId() }),
      );
      if (added.index === undefined) {
        return { session, error: "Backpack is full." };
      }
      return {
        session: {
          ...session,
          inventory: { equipment: added.items },
          craft: { ...session.craft, tokens: nextTokens },
        },
        info: "Cloned item into backpack.",
      };
    }
  }

  return { session, error: "Unsupported craft action." };
};
