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
  [RarityEnum.COMMON]: "Jacket",
  [RarityEnum.UNCOMMON]: "Cuirass",
  [RarityEnum.RARE]: "Steelrend Armor",
  [RarityEnum.EPIC]: "Sunfire Armor",
  [RarityEnum.LEGENDARY]: "Eternashard Armor",
};

export const STAT_RANGES: EquipmentStatRanges = {
  [RarityEnum.COMMON]: {
    [CharacteristicsEnum.HP]: [40, 60],
    [CharacteristicsEnum.PHYS_DEF]: [6, 10],
    [CharacteristicsEnum.MAGIC_DEF]: [3, 6],
  },
  [RarityEnum.UNCOMMON]: {
    [CharacteristicsEnum.HP]: [60, 85],
    [CharacteristicsEnum.PHYS_DEF]: [10, 14],
    [CharacteristicsEnum.MAGIC_DEF]: [6, 9],
  },
  [RarityEnum.RARE]: {
    [CharacteristicsEnum.HP]: [85, 120],
    [CharacteristicsEnum.PHYS_DEF]: [14, 20],
    [CharacteristicsEnum.MAGIC_DEF]: [9, 13],
  },
  [RarityEnum.EPIC]: {
    [CharacteristicsEnum.HP]: [120, 165],
    [CharacteristicsEnum.PHYS_DEF]: [20, 28],
    [CharacteristicsEnum.MAGIC_DEF]: [13, 18],
  },
  [RarityEnum.LEGENDARY]: {
    [CharacteristicsEnum.HP]: [165, 220],
    [CharacteristicsEnum.PHYS_DEF]: [28, 38],
    [CharacteristicsEnum.MAGIC_DEF]: [18, 24],
  },
};
