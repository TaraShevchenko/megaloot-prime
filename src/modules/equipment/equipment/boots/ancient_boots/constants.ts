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
  [RarityEnum.COMMON]: "Boots",
  [RarityEnum.UNCOMMON]: "Greaves",
  [RarityEnum.RARE]: "Rivetsoul Boots",
  [RarityEnum.EPIC]: "Auricstride Boots",
  [RarityEnum.LEGENDARY]: "Starforged Boots",
};

export const STAT_RANGES: EquipmentStatRanges = {
  [RarityEnum.COMMON]: {
    [CharacteristicsEnum.PHYS_DEF]: [2, 4],
    [CharacteristicsEnum.CRIT_CHANCE]: [1, 2],
  },
  [RarityEnum.UNCOMMON]: {
    [CharacteristicsEnum.PHYS_DEF]: [4, 6],
    [CharacteristicsEnum.CRIT_CHANCE]: [2, 3],
  },
  [RarityEnum.RARE]: {
    [CharacteristicsEnum.PHYS_DEF]: [6, 8],
    [CharacteristicsEnum.CRIT_CHANCE]: [3, 4],
  },
  [RarityEnum.EPIC]: {
    [CharacteristicsEnum.PHYS_DEF]: [8, 11],
    [CharacteristicsEnum.CRIT_CHANCE]: [4, 6],
  },
  [RarityEnum.LEGENDARY]: {
    [CharacteristicsEnum.PHYS_DEF]: [11, 15],
    [CharacteristicsEnum.CRIT_CHANCE]: [6, 8],
  },
};
