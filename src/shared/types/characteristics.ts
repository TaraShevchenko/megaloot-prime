import { z } from "zod";

import type { RandomFn } from "../lib/random";
import { randomBetween } from "../lib/random";

export const CHARACTERISTICS_ORDER = [
  "HP",
  "PHYS_DEF",
  "MAGIC_DEF",
  "PHYS_ATK",
  "MAGIC_ATK",
  "CRIT_CHANCE",
  "CRIT_DAMAGE",
  "VAMPIRIC",
] as const;

export const CharacteristicsEnumSchema = z.enum(CHARACTERISTICS_ORDER);
export type CharacteristicsEnum = z.infer<typeof CharacteristicsEnumSchema>;
export const CharacteristicsEnum = CharacteristicsEnumSchema.enum;

export const CHARACTERISTIC_LABELS: Record<CharacteristicsEnum, string> = {
  [CharacteristicsEnum.HP]: "HP",
  [CharacteristicsEnum.PHYS_DEF]: "Phys DEF",
  [CharacteristicsEnum.MAGIC_DEF]: "Magic DEF",
  [CharacteristicsEnum.PHYS_ATK]: "Phys ATK",
  [CharacteristicsEnum.MAGIC_ATK]: "Magic ATK",
  [CharacteristicsEnum.CRIT_CHANCE]: "Crit %",
  [CharacteristicsEnum.CRIT_DAMAGE]: "Crit Dmg",
  [CharacteristicsEnum.VAMPIRIC]: "Vampiric",
};

export const CharacteristicRangeSchema = z.tuple([z.number(), z.number()]);
export const CharacteristicValueSchema = z.union([
  z.number(),
  CharacteristicRangeSchema,
]);
export type CharacteristicRange = z.infer<typeof CharacteristicRangeSchema>;
export type CharacteristicValue = z.infer<typeof CharacteristicValueSchema>;

const characteristicsShape = Object.fromEntries(
  CHARACTERISTICS_ORDER.map((stat) => [stat, CharacteristicValueSchema]),
) as unknown as Record<CharacteristicsEnum, z.ZodType<CharacteristicValue>>;

export const CharacteristicsMapSchema = z.object(characteristicsShape);
export type CharacteristicsMap = z.infer<typeof CharacteristicsMapSchema>;

const numericShape = Object.fromEntries(
  CHARACTERISTICS_ORDER.map((stat) => [stat, z.number()]),
) as unknown as Record<CharacteristicsEnum, z.ZodType<number>>;

export const CharacteristicsNumericMapSchema = z.object(numericShape);
export type CharacteristicsNumericMap = z.infer<
  typeof CharacteristicsNumericMapSchema
>;

export const CharacteristicsSchema = z.object({
  base: CharacteristicsMapSchema,
  growth: CharacteristicsMapSchema,
});
export type Characteristics = z.infer<typeof CharacteristicsSchema>;

export const rollCharacteristicValue = (
  value: CharacteristicValue,
  rng: RandomFn = Math.random,
): number => {
  if (Array.isArray(value)) {
    const [first, second] = value;
    if (first === second) return first;
    return randomBetween(first, second, rng);
  }

  return value;
};

export const formatCharacteristicValue = (
  value: CharacteristicValue,
): string => {
  if (Array.isArray(value)) {
    const [first, second] = value;
    const min = Math.min(first, second);
    const max = Math.max(first, second);
    return `${min}-${max}`;
  }

  return `${value}`;
};

export const getScaledCharacteristics = (
  stats: Characteristics,
  level: number,
  rng: RandomFn = Math.random,
): CharacteristicsNumericMap => {
  const scaled = {} as CharacteristicsNumericMap;
  const normalizedLevel = Math.max(1, Math.floor(level));
  const multiplier = normalizedLevel - 1;

  CHARACTERISTICS_ORDER.forEach((stat) => {
    const base = rollCharacteristicValue(stats.base[stat], rng);
    const growth = rollCharacteristicValue(stats.growth[stat], rng);

    scaled[stat] = base + growth * multiplier;
  });

  return scaled;
};
