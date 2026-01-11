import type { StaticImageData } from "next/image";
import { EquipmentStatRanges } from "modules/equipment/shared/types";
import {
  SKIN_BY_RARITY as AXE_SKIN_BY_RARITY,
  STAT_RANGES as AXE_STAT_RANGES,
} from "modules/equipment/weapon/axe/constants";
import {
  SKIN_BY_RARITY as BRAIN_SKIN_BY_RARITY,
  STAT_RANGES as BRAIN_STAT_RANGES,
} from "modules/equipment/weapon/braid/constants";
import {
  STAT_RANGES as HAMMER_STAT_RANGES,
  SKIN_BY_RARITY as HAMMER_SKIN_BY_RARITY,
} from "modules/equipment/weapon/hammer/constants";
import {
  SKIN_BY_RARITY as SWORD_SKIN_BY_RARITY,
  STAT_RANGES as SWORD_STAT_RANGES,
} from "modules/equipment/weapon/sword/constants";
import {
  SKIN_BY_RARITY as WAND_SKIN_BY_RARITY,
  STAT_RANGES as WAND_STAT_RANGES,
} from "modules/equipment/weapon/wand/constants";
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
  {
    id: "braid",
    name: "Braid",
    skins: BRAIN_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statsRanges: BRAIN_STAT_RANGES,
  },
  {
    id: "wand",
    name: "Wand",
    skins: WAND_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statsRanges: WAND_STAT_RANGES,
  },
  {
    id: "axe",
    name: "Axe",
    skins: AXE_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statsRanges: AXE_STAT_RANGES,
  },
];
