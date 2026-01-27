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
  [RarityEnum.COMMON]: "Oak Scythe",
  [RarityEnum.UNCOMMON]: "Gravecarver",
  [RarityEnum.RARE]: "Steel Harvest",
  [RarityEnum.EPIC]: "Sunreaper",
  [RarityEnum.LEGENDARY]: "Diamond Death",
};

export const STAT_RANGES: EquipmentStatRanges = {
  [RarityEnum.COMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [10, 15],
    [CharacteristicsEnum.VAMPIRIC]: [1, 2],
  },
  [RarityEnum.UNCOMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [15, 22],
    [CharacteristicsEnum.VAMPIRIC]: [2, 3],
  },
  [RarityEnum.RARE]: {
    [CharacteristicsEnum.PHYS_ATK]: [22, 31],
    [CharacteristicsEnum.VAMPIRIC]: [3, 4],
  },
  [RarityEnum.EPIC]: {
    [CharacteristicsEnum.PHYS_ATK]: [31, 42],
    [CharacteristicsEnum.VAMPIRIC]: [4, 6],
  },
  [RarityEnum.LEGENDARY]: {
    [CharacteristicsEnum.PHYS_ATK]: [42, 58],
    [CharacteristicsEnum.VAMPIRIC]: [6, 8],
  },
};
