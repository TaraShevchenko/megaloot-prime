import { StaticImageData } from "next/image";
import { CharacteristicsEnum } from "shared/characteristics";
import { RarityEnum } from "shared/rarity";
import hammerCommonImage from "./lvl1.png";
import hammerUncommonImage from "./lvl2.png";
import hammerRareImage from "./lvl3.png";
import hammerEpicImage from "./lvl4.png";
import hammerLegendaryImage from "./lvl5.png";
import { EquipmentStatRanges } from "../../shared/types";

export const SKIN_BY_RARITY: Record<RarityEnum, StaticImageData> = {
  [RarityEnum.COMMON]: hammerCommonImage,
  [RarityEnum.UNCOMMON]: hammerUncommonImage,
  [RarityEnum.RARE]: hammerRareImage,
  [RarityEnum.EPIC]: hammerEpicImage,
  [RarityEnum.LEGENDARY]: hammerLegendaryImage,
};

export const STAT_RANGES: EquipmentStatRanges = {
  [RarityEnum.COMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [10, 20],
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
