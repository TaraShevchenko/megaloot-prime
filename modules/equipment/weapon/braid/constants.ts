import { StaticImageData } from "next/image";
import { CharacteristicsEnum, RarityEnum } from "shared/types";
import braidCommonImage from "./Common.png";
import braidEpicImage from "./Epic.png";
import braidLegendaryImage from "./Legendary.png";
import braidRareImage from "./Rare.png";
import braidUncommonImage from "./Uncommon.png";
import { EquipmentStatRanges } from "../../shared/types";

export const SKIN_BY_RARITY: Record<RarityEnum, StaticImageData> = {
  [RarityEnum.COMMON]: braidCommonImage,
  [RarityEnum.UNCOMMON]: braidUncommonImage,
  [RarityEnum.RARE]: braidRareImage,
  [RarityEnum.EPIC]: braidEpicImage,
  [RarityEnum.LEGENDARY]: braidLegendaryImage,
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
