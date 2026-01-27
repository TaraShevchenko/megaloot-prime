import { CharacteristicsEnum } from "shared/types/characteristics";
import { RarityEnum } from "shared/types/rarity";
import common from "./assets/common.png";
import epic from "./assets/epic.png";
import legendary from "./assets/legendary.png";
import rare from "./assets/rare.png";
import uncommon from "./assets/uncommon.png";
import {
  EquipmentNameMap,
  EquipmentSkinMap,
  EquipmentStatRanges,
} from "../../../shared/equipment.types";

export const SKIN_BY_RARITY: EquipmentSkinMap = {
  [RarityEnum.COMMON]: common,
  [RarityEnum.UNCOMMON]: uncommon,
  [RarityEnum.RARE]: rare,
  [RarityEnum.EPIC]: epic,
  [RarityEnum.LEGENDARY]: legendary,
};

export const NAME_BY_RARITY: EquipmentNameMap = {
  [RarityEnum.COMMON]: "Woodfang Axe",
  [RarityEnum.UNCOMMON]: "Rockbreaker Axe",
  [RarityEnum.RARE]: "Ironfall Axe",
  [RarityEnum.EPIC]: "Sunflare Axe",
  [RarityEnum.LEGENDARY]: "Crystalbane Axe",
};

export const STAT_RANGES: EquipmentStatRanges = {
  [RarityEnum.COMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [12, 18],
    [CharacteristicsEnum.CRIT_DAMAGE]: [8, 12],
  },
  [RarityEnum.UNCOMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [18, 26],
    [CharacteristicsEnum.CRIT_DAMAGE]: [12, 18],
  },
  [RarityEnum.RARE]: {
    [CharacteristicsEnum.PHYS_ATK]: [26, 36],
    [CharacteristicsEnum.CRIT_DAMAGE]: [18, 25],
  },
  [RarityEnum.EPIC]: {
    [CharacteristicsEnum.PHYS_ATK]: [36, 48],
    [CharacteristicsEnum.CRIT_DAMAGE]: [25, 34],
  },
  [RarityEnum.LEGENDARY]: {
    [CharacteristicsEnum.PHYS_ATK]: [48, 65],
    [CharacteristicsEnum.CRIT_DAMAGE]: [34, 45],
  },
};
