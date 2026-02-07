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
  [RarityEnum.COMMON]: "Oakbound Sword",
  [RarityEnum.UNCOMMON]: "Stoneheart Sword",
  [RarityEnum.RARE]: "Steelrend Sword",
  [RarityEnum.EPIC]: "Dawnbringer Sword",
  [RarityEnum.LEGENDARY]: "Eternashard Sword",
};

export const STAT_RANGES: EquipmentStatRanges = {
  [RarityEnum.COMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [11, 16],
    [CharacteristicsEnum.CRIT_CHANCE]: [2, 3],
  },
  [RarityEnum.UNCOMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [16, 23],
    [CharacteristicsEnum.CRIT_CHANCE]: [3, 5],
  },
  [RarityEnum.RARE]: {
    [CharacteristicsEnum.PHYS_ATK]: [23, 32],
    [CharacteristicsEnum.CRIT_CHANCE]: [5, 7],
  },
  [RarityEnum.EPIC]: {
    [CharacteristicsEnum.PHYS_ATK]: [32, 44],
    [CharacteristicsEnum.CRIT_CHANCE]: [7, 10],
  },
  [RarityEnum.LEGENDARY]: {
    [CharacteristicsEnum.PHYS_ATK]: [44, 60],
    [CharacteristicsEnum.CRIT_CHANCE]: [10, 14],
  },
};
