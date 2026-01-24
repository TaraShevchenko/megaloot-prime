import { StaticImageData } from "next/image";
import { CharacteristicsEnum } from "shared/types/characteristics";
import { RarityEnum } from "shared/types/rarity";
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
  "BRAID",
  "WAND",
  "AXE",
] as const;

export const EquipmentTypeEnumSchema = z.enum(EQUIPMENT_TYPE);
export type EquipmentType = z.infer<typeof EquipmentTypeEnumSchema>;
export const EquipmentTypeEnum = EquipmentTypeEnumSchema.enum;

export const EquipmentIdEnumSchema = z.enum(EQUIPMENT_IDS);
export type EquipmentId = z.infer<typeof EquipmentIdEnumSchema>;
export const EquipmentIdEnum = EquipmentIdEnumSchema.enum;

export type EquipmentStatRanges = Record<
  RarityEnum,
  Partial<Record<CharacteristicsEnum, [number, number]>>
>;

export type EquipmentSkinMap = Record<RarityEnum, StaticImageData>;

export type EquipmentEntry = {
  id: EquipmentId;
  type: EquipmentType;
  name: string;
  skins: EquipmentSkinMap;
  defaultRarity: RarityEnum;
  statRanges: EquipmentStatRanges;
};

export type EquipmentRegistry = Record<EquipmentType, EquipmentEntry[]>;

export type Equipment = {
  id: EquipmentId;
  type: EquipmentType;
  name: string;
  rarity: RarityEnum;
  characteristics: Partial<Record<CharacteristicsEnum, number>>;
  statRanges: EquipmentStatRanges;
};
