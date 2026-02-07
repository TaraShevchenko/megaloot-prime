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
  [RarityEnum.COMMON]: "Trousers",
  [RarityEnum.UNCOMMON]: "Sabatons",
  [RarityEnum.RARE]: "Forgedplate Trousers",
  [RarityEnum.EPIC]: "Goldenflare Trousers",
  [RarityEnum.LEGENDARY]: "Prismveil Trousers",
};

export const STAT_RANGES: EquipmentStatRanges = {
  [RarityEnum.COMMON]: {
    [CharacteristicsEnum.HP]: [25, 40],
    [CharacteristicsEnum.PHYS_DEF]: [3, 6],
  },
  [RarityEnum.UNCOMMON]: {
    [CharacteristicsEnum.HP]: [40, 55],
    [CharacteristicsEnum.PHYS_DEF]: [6, 9],
  },
  [RarityEnum.RARE]: {
    [CharacteristicsEnum.HP]: [55, 75],
    [CharacteristicsEnum.PHYS_DEF]: [9, 12],
  },
  [RarityEnum.EPIC]: {
    [CharacteristicsEnum.HP]: [75, 100],
    [CharacteristicsEnum.PHYS_DEF]: [12, 16],
  },
  [RarityEnum.LEGENDARY]: {
    [CharacteristicsEnum.HP]: [100, 135],
    [CharacteristicsEnum.PHYS_DEF]: [16, 21],
  },
};
