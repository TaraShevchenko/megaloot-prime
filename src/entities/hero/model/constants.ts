import type { CharacteristicsNumericMap } from "@/shared/types/characteristics";
import { CharacteristicsEnum } from "@/shared/types/characteristics";

export const DEFAULT_HERO_STATS: CharacteristicsNumericMap = {
  [CharacteristicsEnum.HP]: 120,
  [CharacteristicsEnum.PHYS_DEF]: 6,
  [CharacteristicsEnum.MAGIC_DEF]: 4,
  [CharacteristicsEnum.PHYS_ATK]: 12,
  [CharacteristicsEnum.MAGIC_ATK]: 8,
  [CharacteristicsEnum.CRIT_CHANCE]: 5,
  [CharacteristicsEnum.CRIT_DAMAGE]: 25,
  [CharacteristicsEnum.VAMPIRIC]: 0,
};


