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
  [RarityEnum.COMMON]: "Oakspell Wand",
  [RarityEnum.UNCOMMON]: "Earthshard Wand",
  [RarityEnum.RARE]: "Grimforge Wand",
  [RarityEnum.EPIC]: "Aurelius Wand",
  [RarityEnum.LEGENDARY]: "Celestium Wand",
};

export const STAT_RANGES: EquipmentStatRanges = {
  [RarityEnum.COMMON]: {
    [CharacteristicsEnum.MAGIC_ATK]: [12, 18],
    [CharacteristicsEnum.CRIT_CHANCE]: [1, 2],
  },
  [RarityEnum.UNCOMMON]: {
    [CharacteristicsEnum.MAGIC_ATK]: [18, 26],
    [CharacteristicsEnum.CRIT_CHANCE]: [2, 3],
  },
  [RarityEnum.RARE]: {
    [CharacteristicsEnum.MAGIC_ATK]: [26, 36],
    [CharacteristicsEnum.CRIT_CHANCE]: [3, 4],
  },
  [RarityEnum.EPIC]: {
    [CharacteristicsEnum.MAGIC_ATK]: [36, 48],
    [CharacteristicsEnum.CRIT_CHANCE]: [4, 6],
  },
  [RarityEnum.LEGENDARY]: {
    [CharacteristicsEnum.MAGIC_ATK]: [48, 65],
    [CharacteristicsEnum.CRIT_CHANCE]: [6, 8],
  },
};
