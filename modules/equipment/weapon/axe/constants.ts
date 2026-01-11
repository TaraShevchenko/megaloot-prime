import { StaticImageData } from "next/image";
import { CharacteristicsEnum, RarityEnum } from "shared/types";
import axeCommonImage from "./Common.png";
import axeEpicImage from "./Epic.png";
import axeLegendaryImage from "./Legendary.png";
import axeRareImage from "./Rare.png";
import axeUncommonImage from "./Uncommon.png";
import { EquipmentStatRanges } from "../../shared/types";

export const SKIN_BY_RARITY: Record<RarityEnum, StaticImageData> = {
  [RarityEnum.COMMON]: axeCommonImage,
  [RarityEnum.UNCOMMON]: axeUncommonImage,
  [RarityEnum.RARE]: axeRareImage,
  [RarityEnum.EPIC]: axeEpicImage,
  [RarityEnum.LEGENDARY]: axeLegendaryImage,
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
