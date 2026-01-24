export {
  EQUIPMENT_BY_TYPE,
  EQUIPMENT_ITEMS,
  EQUIPMENT_TYPE_ORDER,
  EQUIPMENT_TYPES,
  EQUIPMENT_TYPE_LABELS,
  WEAPON_EQUIPMENT,
} from "./shared/equipment.data";

export {
  EquipmentTypeEnum,
  EquipmentIdEnum,
  type Equipment,
  type EquipmentEntry,
  type EquipmentId,
  type EquipmentRegistry,
  type EquipmentSkinMap,
  type EquipmentStatRanges,
  type EquipmentType,
} from "./shared/equipment.types";

export {
  formatEquipmentName,
  getEquipmentTypeLabel,
  groupEquipmentByType,
} from "./shared/equipment.utils";
