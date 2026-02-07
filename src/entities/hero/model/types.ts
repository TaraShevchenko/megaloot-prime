import type { CharacteristicsNumericMap } from "@/shared/types/characteristics";

export type HeroBaseStats = CharacteristicsNumericMap;
export type HeroStats = CharacteristicsNumericMap;

export type Hero = {
  baseStats: HeroBaseStats;
};


