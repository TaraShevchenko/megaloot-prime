import {
  EQUIPMENT_TYPE,
  type EquipmentEntry,
  type EquipmentRegistry,
  type EquipmentType,
} from "./equipment.types";

export const formatEquipmentName = (rawId: string) =>
  rawId
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());

export const getEquipmentTypeLabel = (type: EquipmentType) =>
  formatEquipmentName(type);

export const groupEquipmentByType = (
  items: EquipmentEntry[],
): EquipmentRegistry => {
  const base = Object.fromEntries(
    EQUIPMENT_TYPE.map((type) => [type, [] as EquipmentEntry[]]),
  ) as EquipmentRegistry;

  return items.reduce<EquipmentRegistry>((acc, item) => {
    acc[item.type]?.push(item);
    return acc;
  }, base);
};
