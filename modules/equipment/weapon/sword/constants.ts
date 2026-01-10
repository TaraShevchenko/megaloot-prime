import { StaticImageData } from "next/image";
import { CharacteristicsEnum } from "shared/characteristics";
import { RarityEnum } from "shared/rarity";
import swordCommonImage from "./lvl1.png";
import swordUncommonImage from "./lvl2.png";
import swordRareImage from "./lvl3.png";
import swordEpicImage from "./lvl4.png";
import swordLegendaryImage from "./lvl5.png";
import { EquipmentStatRanges } from "../../shared/types";

export const SKIN_BY_RARITY: Record<RarityEnum, StaticImageData> = {
  [RarityEnum.COMMON]: swordCommonImage,
  [RarityEnum.UNCOMMON]: swordUncommonImage,
  [RarityEnum.RARE]: swordRareImage,
  [RarityEnum.EPIC]: swordEpicImage,
  [RarityEnum.LEGENDARY]: swordLegendaryImage,
};

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
