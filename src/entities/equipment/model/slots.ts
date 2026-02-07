import type { EquipmentType } from "@/shared/types/equipment";
import { EquipmentTypeEnum } from "@/shared/types/equipment";

import type { EquipmentSlotId } from "./types";

export const EQUIPMENT_TYPES = Object.values(EquipmentTypeEnum);
export type { EquipmentType };

export const SLOT_TO_TYPE: Record<EquipmentSlotId, EquipmentType> = {
  NECKLACE: "NECKLACE",
  HELMET: "HELMET",
  GLOVES: "GLOVES",
  RING_1: "RING",
  ARMOR: "ARMOR",
  WEAPON: "WEAPON",
  RING_2: "RING",
  TROUSERS: "TROUSERS",
  BOOTS: "BOOTS",
};

export const EQUIPMENT_SLOT_LABELS: Record<EquipmentSlotId, string> = {
  NECKLACE: "Necklace",
  HELMET: "Helmet",
  GLOVES: "Gloves",
  RING_1: "Ring",
  ARMOR: "Armor",
  WEAPON: "Weapon",
  RING_2: "Ring",
  TROUSERS: "Trousers",
  BOOTS: "Boots",
};


