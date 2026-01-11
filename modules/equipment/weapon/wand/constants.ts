import { StaticImageData } from "next/image";
import { CharacteristicsEnum, RarityEnum } from "shared/types";
import wandCommonImage from "./Common.png";
import wandEpicImage from "./Epic.png";
import wandLegendaryImage from "./Legendary.png";
import wandRareImage from "./Rare.png";
import wandUncommonImage from "./Uncommon.png";
import { EquipmentStatRanges } from "../../shared/types";

export const SKIN_BY_RARITY: Record<RarityEnum, StaticImageData> = {
  [RarityEnum.COMMON]: wandCommonImage,
  [RarityEnum.UNCOMMON]: wandUncommonImage,
  [RarityEnum.RARE]: wandRareImage,
  [RarityEnum.EPIC]: wandEpicImage,
  [RarityEnum.LEGENDARY]: wandLegendaryImage,
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
