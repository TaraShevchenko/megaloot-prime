import { CharacteristicsEnum } from "shared/characteristics";
import { RarityEnum } from "shared/rarity";
import { EquipmentStatRanges } from "../../shared/types";

export const STAT_RANGES: EquipmentStatRanges = {
  [RarityEnum.COMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [14, 34],
  },
  [RarityEnum.UNCOMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [15, 25],
  },
  [RarityEnum.RARE]: {
    [CharacteristicsEnum.PHYS_ATK]: [20, 30],
  },
  [RarityEnum.EPIC]: {
    [CharacteristicsEnum.PHYS_ATK]: [25, 35],
  },
  [RarityEnum.LEGENDARY]: {
    [CharacteristicsEnum.PHYS_ATK]: [30, 40],
  },
};
