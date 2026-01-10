import type { StaticImageData } from "next/image";
import { EquipmentStatRanges } from "modules/equipment/shared/types";
import {
  STAT_RANGES as HAMMER_STAT_RANGES,
  SKIN_BY_RARITY as HAMMER_SKIN_BY_RARITY,
} from "modules/equipment/weapon/hammer/constants";
import {
  SKIN_BY_RARITY as SWORD_SKIN_BY_RARITY,
  STAT_RANGES as SWORD_STAT_RANGES,
} from "modules/equipment/weapon/sword/constants";
import { RarityEnum } from "shared/rarity";

export type EquipmentEntry = {
  id: string;
  name: string;
  skins: Record<RarityEnum, StaticImageData>;
  defaultRarity: RarityEnum;
  statsRanges: EquipmentStatRanges;
};

export type EquipmentId = EquipmentEntry["id"];

export const EQUIPMENT_ITEMS: EquipmentEntry[] = [
  {
    id: "sword",
    name: "Sword",
    skins: SWORD_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statsRanges: SWORD_STAT_RANGES,
  },
  {
    id: "hammer",
    name: "Hammer",
    skins: HAMMER_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statsRanges: HAMMER_STAT_RANGES,
  },
];
