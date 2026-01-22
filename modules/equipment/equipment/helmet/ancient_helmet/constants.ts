import { StaticImageData } from "next/image";
import { CharacteristicsEnum } from "shared/types/characteristics";
import { RarityEnum } from "shared/types/rarity";
import common from "../../helmet/ancient_helmet/assets/common.png";
import epic from "../../helmet/ancient_helmet/assets/epic.png";
import legendary from "../../helmet/ancient_helmet/assets/legendary.png";
import rare from "../../helmet/ancient_helmet/assets/rare.png";
import uncommon from "../../helmet/ancient_helmet/assets/uncommon.png";
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
