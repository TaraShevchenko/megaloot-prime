import {
  SKIN_BY_RARITY as AXE_SKIN_BY_RARITY,
  STAT_RANGES as AXE_STAT_RANGES,
} from "modules/equipment/equipment/weapon/axe/constants";
import {
  SKIN_BY_RARITY as BRAID_SKIN_BY_RARITY,
  STAT_RANGES as BRAID_STAT_RANGES,
} from "modules/equipment/equipment/weapon/braid/constants";
import {
  SKIN_BY_RARITY as HAMMER_SKIN_BY_RARITY,
  STAT_RANGES as HAMMER_STAT_RANGES,
} from "modules/equipment/equipment/weapon/hammer/constants";
import {
  SKIN_BY_RARITY as SWORD_SKIN_BY_RARITY,
  STAT_RANGES as SWORD_STAT_RANGES,
} from "modules/equipment/equipment/weapon/sword/constants";
import {
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
    id: EquipmentIdEnum.SWORD,
    type: EquipmentTypeEnum.WEAPON,
    name: formatEquipmentName(EquipmentIdEnum.SWORD),
    skins: SWORD_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: SWORD_STAT_RANGES,
  },
  {
    id: EquipmentIdEnum.HAMMER,
    type: EquipmentTypeEnum.WEAPON,
    name: formatEquipmentName(EquipmentIdEnum.HAMMER),
    skins: HAMMER_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: HAMMER_STAT_RANGES,
  },
  {
    id: EquipmentIdEnum.BRAID,
    type: EquipmentTypeEnum.WEAPON,
    name: formatEquipmentName(EquipmentIdEnum.BRAID),
    skins: BRAID_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: BRAID_STAT_RANGES,
  },
  {
    id: EquipmentIdEnum.WAND,
    type: EquipmentTypeEnum.WEAPON,
    name: formatEquipmentName(EquipmentIdEnum.WAND),
    skins: WAND_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: WAND_STAT_RANGES,
  },
  {
    id: EquipmentIdEnum.AXE,
    type: EquipmentTypeEnum.WEAPON,
    name: formatEquipmentName(EquipmentIdEnum.AXE),
    skins: AXE_SKIN_BY_RARITY,
    defaultRarity: RarityEnum.COMMON,
    statRanges: AXE_STAT_RANGES,
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
