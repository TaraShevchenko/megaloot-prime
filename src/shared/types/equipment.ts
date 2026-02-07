import { z } from "zod";

export const EQUIPMENT_TYPE = [
  "WEAPON",
  "ARMOR",
  "HELMET",
  "TROUSERS",
  "GLOVES",
  "RING",
  "NECKLACE",
  "BOOTS",
] as const;

export const EQUIPMENT_IDS = [
  "SWORD",
  "HAMMER",
  "SCYTHE",
  "WAND",
  "AXE",
  "ANCIENT_ARMOR",
  "ANCIENT_BOOTS",
  "ANCIENT_TROUSERS",
  "ANCIENT_HELMET",
] as const;

export const EquipmentTypeEnumSchema = z.enum(EQUIPMENT_TYPE);
export type EquipmentType = z.infer<typeof EquipmentTypeEnumSchema>;
export const EquipmentTypeEnum = EquipmentTypeEnumSchema.enum;

export const EquipmentIdEnumSchema = z.enum(EQUIPMENT_IDS);
export type EquipmentId = z.infer<typeof EquipmentIdEnumSchema>;
export const EquipmentIdEnum = EquipmentIdEnumSchema.enum;
