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
  [RarityEnum.COMMON]: "Rootcrusher Hammer",
  [RarityEnum.UNCOMMON]: "Gravelcore Hammer",
  [RarityEnum.RARE]: "Warforged Hammer",
  [RarityEnum.EPIC]: "Goldcrest Hammer",
  [RarityEnum.LEGENDARY]: "Diamondcore Hammer",
};

export const STAT_RANGES: EquipmentStatRanges = {
  [RarityEnum.COMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [14, 20],
    [CharacteristicsEnum.PHYS_DEF]: [1, 2],
  },
  [RarityEnum.UNCOMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [20, 28],
    [CharacteristicsEnum.PHYS_DEF]: [2, 3],
  },
  [RarityEnum.RARE]: {
    [CharacteristicsEnum.PHYS_ATK]: [28, 40],
    [CharacteristicsEnum.PHYS_DEF]: [3, 5],
  },
  [RarityEnum.EPIC]: {
    [CharacteristicsEnum.PHYS_ATK]: [40, 55],
    [CharacteristicsEnum.PHYS_DEF]: [5, 7],
  },
  [RarityEnum.LEGENDARY]: {
    [CharacteristicsEnum.PHYS_ATK]: [55, 75],
    [CharacteristicsEnum.PHYS_DEF]: [7, 10],
  },
};
