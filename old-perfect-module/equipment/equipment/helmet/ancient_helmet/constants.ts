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
  [RarityEnum.COMMON]: "Helm of Twisted Branches",
  [RarityEnum.UNCOMMON]: "Stoneplate Helm",
  [RarityEnum.RARE]: "Ironclad Helm",
  [RarityEnum.EPIC]: "Helm of Radiant Dawn",
  [RarityEnum.LEGENDARY]: "Celestial Helmt",
};

export const STAT_RANGES: EquipmentStatRanges = {
  [RarityEnum.COMMON]: {
    [CharacteristicsEnum.PHYS_DEF]: [4, 7],
    [CharacteristicsEnum.MAGIC_DEF]: [2, 4],
    [CharacteristicsEnum.CRIT_CHANCE]: [1, 2],
  },
  [RarityEnum.UNCOMMON]: {
    [CharacteristicsEnum.PHYS_DEF]: [7, 10],
    [CharacteristicsEnum.MAGIC_DEF]: [4, 6],
    [CharacteristicsEnum.CRIT_CHANCE]: [2, 3],
  },
  [RarityEnum.RARE]: {
    [CharacteristicsEnum.PHYS_DEF]: [10, 14],
    [CharacteristicsEnum.MAGIC_DEF]: [6, 9],
    [CharacteristicsEnum.CRIT_CHANCE]: [3, 5],
  },
  [RarityEnum.EPIC]: {
    [CharacteristicsEnum.PHYS_DEF]: [14, 19],
    [CharacteristicsEnum.MAGIC_DEF]: [9, 12],
    [CharacteristicsEnum.CRIT_CHANCE]: [5, 7],
  },
  [RarityEnum.LEGENDARY]: {
    [CharacteristicsEnum.PHYS_DEF]: [19, 25],
    [CharacteristicsEnum.MAGIC_DEF]: [12, 16],
    [CharacteristicsEnum.CRIT_CHANCE]: [7, 10],
  },
};
