import { StaticImageData } from "next/image";
import { RarityEnum } from "shared/rarity";
import { CharacteristicsEnum } from "shared/characteristics";
import swordCommonImage from "./Common.png";
import swordEpicImage from "./Epic.png";
import swordLegendaryImage from "./Legendary.png";
import swordRareImage from "./Rare.png";
import swordUncommonImage from "./Uncommon.png";
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
