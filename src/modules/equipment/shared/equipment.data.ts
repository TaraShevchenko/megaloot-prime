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
import armorIcon from "modules/equipment/assets/armor.png";
import bootsIcon from "modules/equipment/assets/boots.png";
import glovesIcon from "modules/equipment/assets/gloves.png";
import helmetIcon from "modules/equipment/assets/helmet.png";
import necklaceIcon from "modules/equipment/assets/necklace.png";
import ringIcon from "modules/equipment/assets/ring.png";
import trousersIcon from "modules/equipment/assets/trousers.png";
import weaponIcon from "modules/equipment/assets/weapon.png";
import { RarityEnum } from "shared/types/rarity";
import {
  EquipmentIdEnum,
  EQUIPMENT_TYPE,
  EquipmentTypeEnum,
  type EquipmentEntry,
  type EquipmentRegistry,
  type EquipmentType,
} from "./equipment.types";
import { formatEquipmentName, groupEquipmentByType } from "./equipment.utils";
import type { StaticImageData } from "next/image";

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

export const EQUIPMENT_TYPES = EQUIPMENT_TYPE;
export const EQUIPMENT_TYPE_LABELS: Record<EquipmentType, string> =
  Object.fromEntries(
    EQUIPMENT_TYPE.map((type) => [type, formatEquipmentName(type)]),
  ) as Record<EquipmentType, string>;

export const WEAPON_EQUIPMENT = weaponEquipment;

export const EQUIPMENT_INVENTORY_META: Record<
  EquipmentType,
  { label: string; icon: StaticImageData }
> = {
  WEAPON: { label: formatEquipmentName("WEAPON"), icon: weaponIcon },
  ARMOR: { label: formatEquipmentName("ARMOR"), icon: armorIcon },
  HELMET: { label: formatEquipmentName("HELMET"), icon: helmetIcon },
  TROUSERS: { label: formatEquipmentName("TROUSERS"), icon: trousersIcon },
  GLOVES: { label: formatEquipmentName("GLOVES"), icon: glovesIcon },
  RING: { label: formatEquipmentName("RING"), icon: ringIcon },
  NECKLACE: { label: formatEquipmentName("NECKLACE"), icon: necklaceIcon },
  BOOTS: { label: formatEquipmentName("BOOTS"), icon: bootsIcon },
};
