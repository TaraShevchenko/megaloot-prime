import { StaticImageData } from "next/image";
import { CharacteristicsEnum } from "shared/types/characteristics";
import { RarityEnum } from "shared/types/rarity";
import common from "../../trousers/ancient_trousers/assets/common.png";
import epic from "../../trousers/ancient_trousers/assets/epic.png";
import legendary from "../../trousers/ancient_trousers/assets/legendary.png";
import rare from "../../trousers/ancient_trousers/assets/rare.png";
import uncommon from "../../trousers/ancient_trousers/assets/uncommon.png";
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
