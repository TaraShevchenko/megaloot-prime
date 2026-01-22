import {
  NAME_BY_RARITY as ANCIENT_ARMOR_NAME_BY_RARITY,
  SKIN_BY_RARITY as ANCIENT_ARMOR_SKIN_BY_RARITY,
  STAT_RANGES as ANCIENT_ARMOR_STAT_RANGES,
} from "modules/equipment/equipment/armor/ancient_armor/constants";
import {
  NAME_BY_RARITY as ANCIENT_BOOTS_NAME_BY_RARITY,
  SKIN_BY_RARITY as ANCIENT_BOOTS_SKIN_BY_RARITY,
  STAT_RANGES as ANCIENT_BOOTS_STAT_RANGES,
} from "modules/equipment/equipment/boots/ancient_boots/constants";
import {
  NAME_BY_RARITY as ANCIENT_HELMET_NAME_BY_RARITY,
  SKIN_BY_RARITY as ANCIENT_HELMET_SKIN_BY_RARITY,
  STAT_RANGES as ANCIENT_HELMET_STAT_RANGES,
} from "modules/equipment/equipment/helmet/ancient_helmet/constants";
import {
  NAME_BY_RARITY as ANCIENT_TROUSERS_NAME_BY_RARITY,
  SKIN_BY_RARITY as ANCIENT_TROUSERS_SKIN_BY_RARITY,
  STAT_RANGES as ANCIENT_TROUSERS_STAT_RANGES,
} from "modules/equipment/equipment/trousers/ancient_trousers/constants";
import {
  NAME_BY_RARITY as AXE_NAME_BY_RARITY,
  SKIN_BY_RARITY as AXE_SKIN_BY_RARITY,
  STAT_RANGES as AXE_STAT_RANGES,
} from "modules/equipment/equipment/weapon/axe/constants";
import {
  NAME_BY_RARITY as HAMMER_NAME_BY_RARITY,
  SKIN_BY_RARITY as HAMMER_SKIN_BY_RARITY,
  STAT_RANGES as HAMMER_STAT_RANGES,
} from "modules/equipment/equipment/weapon/hammer/constants";
import {
  NAME_BY_RARITY as SCYTHE_NAME_BY_RARITY,
  SKIN_BY_RARITY as SCYTHE_SKIN_BY_RARITY,
  STAT_RANGES as SCYTHE_STAT_RANGES,
} from "modules/equipment/equipment/weapon/scythe/constants";
import {
  NAME_BY_RARITY as SWORD_NAME_BY_RARITY,
  SKIN_BY_RARITY as SWORD_SKIN_BY_RARITY,
  STAT_RANGES as SWORD_STAT_RANGES,
} from "modules/equipment/equipment/weapon/sword/constants";
import {
  NAME_BY_RARITY as WAND_NAME_BY_RARITY,
  SKIN_BY_RARITY as WAND_SKIN_BY_RARITY,
  STAT_RANGES as WAND_STAT_RANGES,
} from "modules/equipment/equipment/weapon/wand/constants";
import { RarityEnum } from "shared/types/rarity";
import {
  EquipmentIdEnum,
  EquipmentTypeEnum,
  type EquipmentEntry,
  type EquipmentRegistry,
  type EquipmentType,
} from "./equipment.types";
import { formatEquipmentName, groupEquipmentByType } from "./equipment.utils";

export const EQUIPMENT_TYPE_ORDER = [
  "WEAPON",
  "ARMOR",
  "HELMET",
  "TROUSERS",
  "GLOVES",
  "RING",
  "NECKLACE",
  "BOOTS",
] as const;

const weaponEquipment: EquipmentEntry[] = [
  {
    id: EquipmentIdEnum.AXE,
    type: EquipmentTypeEnum.WEAPON,
    name: AXE_NAME_BY_RARITY,
    skins: AXE_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: AXE_STAT_RANGES,
  },
  {
    id: EquipmentIdEnum.SCYTHE,
    type: EquipmentTypeEnum.WEAPON,
    name: SCYTHE_NAME_BY_RARITY,
    skins: SCYTHE_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: SCYTHE_STAT_RANGES,
  },
  {
    id: EquipmentIdEnum.HAMMER,
    type: EquipmentTypeEnum.WEAPON,
    name: HAMMER_NAME_BY_RARITY,
    skins: HAMMER_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: HAMMER_STAT_RANGES,
  },
  {
    id: EquipmentIdEnum.SWORD,
    type: EquipmentTypeEnum.WEAPON,
    name: SWORD_NAME_BY_RARITY,
    skins: SWORD_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: SWORD_STAT_RANGES,
  },
  {
    id: EquipmentIdEnum.WAND,
    type: EquipmentTypeEnum.WEAPON,
    name: WAND_NAME_BY_RARITY,
    skins: WAND_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: WAND_STAT_RANGES,
  },
  {
    id: EquipmentIdEnum.ANCIENT_ARMOR,
    type: EquipmentTypeEnum.WEAPON,
    name: ANCIENT_ARMOR_NAME_BY_RARITY,
    skins: ANCIENT_ARMOR_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: ANCIENT_ARMOR_STAT_RANGES,
  },
  {
    id: EquipmentIdEnum.ANCIENT_BOOTS,
    type: EquipmentTypeEnum.WEAPON,
    name: ANCIENT_BOOTS_NAME_BY_RARITY,
    skins: ANCIENT_BOOTS_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: ANCIENT_BOOTS_STAT_RANGES,
  },
  {
    id: EquipmentIdEnum.ANCIENT_TROUSERS,
    type: EquipmentTypeEnum.WEAPON,
    name: ANCIENT_TROUSERS_NAME_BY_RARITY,
    skins: ANCIENT_TROUSERS_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: ANCIENT_TROUSERS_STAT_RANGES,
  },
  {
    id: EquipmentIdEnum.ANCIENT_HELMET,
    type: EquipmentTypeEnum.WEAPON,
    name: ANCIENT_HELMET_NAME_BY_RARITY,
    skins: ANCIENT_HELMET_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: ANCIENT_HELMET_STAT_RANGES,
  },
];

export const EQUIPMENT_ITEMS: EquipmentEntry[] = [...weaponEquipment];

export const EQUIPMENT_BY_TYPE: EquipmentRegistry =
  groupEquipmentByType(EQUIPMENT_ITEMS);

export const EQUIPMENT_TYPES = EQUIPMENT_TYPE_ORDER;
export const EQUIPMENT_TYPE_LABELS: Record<EquipmentType, string> =
  Object.fromEntries(
    EQUIPMENT_TYPE_ORDER.map((type) => [type, formatEquipmentName(type)]),
  ) as Record<EquipmentType, string>;

export const WEAPON_EQUIPMENT = weaponEquipment;
