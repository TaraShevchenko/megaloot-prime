import {
  CHARACTERISTICS_ORDER,
  type CharacteristicsEnum,
  type CharacteristicsNumericMap,
} from "@/shared/types/characteristics";

export type StatModifier = Partial<Record<CharacteristicsEnum, number>>;

export const calculateHeroStats = (
  base: CharacteristicsNumericMap,
  modifiers: StatModifier[],
): CharacteristicsNumericMap => {
  const result = { ...base } as CharacteristicsNumericMap;

  CHARACTERISTICS_ORDER.forEach((stat) => {
    const bonus = modifiers.reduce((acc, modifier) => {
      const value = modifier[stat];
      return acc + (typeof value === "number" ? value : 0);
    }, 0);
    result[stat] = (result[stat] ?? 0) + bonus;
  });

  return result;
};


