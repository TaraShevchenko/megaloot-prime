import { CHARACTERISTICS_ORDER } from "@/shared/types/characteristics";

import type { ItemStats, RolledStatSlotEntry } from "./types";

export const STAT_SLOT_COUNT = 6;

export const normalizeRolledStatSlots = (
  stats: ItemStats,
  slots?: RolledStatSlotEntry[],
): RolledStatSlotEntry[] => {
  if (Array.isArray(slots) && slots.length === STAT_SLOT_COUNT) {
    return slots.map((slot) => {
      if (!slot) return null;
      if (
        !slot.stat ||
        !CHARACTERISTICS_ORDER.includes(slot.stat) ||
        typeof slot.value !== "number" ||
        !Number.isFinite(slot.value)
      ) {
        return null;
      }
      return { stat: slot.stat, value: Math.round(slot.value) };
    });
  }

  const picked = CHARACTERISTICS_ORDER.filter(
    (stat) => typeof stats?.[stat] === "number",
  ).slice(0, STAT_SLOT_COUNT);

  return Array.from({ length: STAT_SLOT_COUNT }, (_, index) => {
    const stat = picked[index];
    const value = stat ? stats?.[stat] : undefined;
    return stat && typeof value === "number" && Number.isFinite(value)
      ? { stat, value: Math.round(value) }
      : null;
  });
};

export const buildStatsFromSlots = (
  slots: RolledStatSlotEntry[],
): ItemStats => {
  const stats: ItemStats = {};

  slots.forEach((slot) => {
    if (!slot) return;
    stats[slot.stat] = (stats[slot.stat] ?? 0) + Math.round(slot.value);
  });

  return stats;
};
