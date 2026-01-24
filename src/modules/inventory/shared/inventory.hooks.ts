"use client";

import {
  EQUIPMENT_INVENTORY_META,
  type EquipmentType,
  EquipmentTypeEnum,
} from "modules/equipment";
import { createInventoryStore } from "./inventory.store";

export const useInventoryStore = createInventoryStore({
  id: "backpack",
  slotDefinitions: Array.from({ length: 20 }, (_, index) => ({
    id: `slot-${index + 1}`,
    label: `Empty`,
  })),
});

export const useCharacterInventoryStore = createInventoryStore({
  id: "character",
  slotDefinitions: (
    [
      EquipmentTypeEnum.NECKLACE,
      EquipmentTypeEnum.HELMET,
      EquipmentTypeEnum.GLOVES,
      EquipmentTypeEnum.RING,
      EquipmentTypeEnum.ARMOR,
      EquipmentTypeEnum.WEAPON,
      EquipmentTypeEnum.RING,
      EquipmentTypeEnum.TROUSERS,
      EquipmentTypeEnum.BOOTS,
    ] as EquipmentType[]
  ).map((type, index) => ({
    id: `${type.toLowerCase()}-${index + 1}`,
    allowedTypes: [type],
    // label: EQUIPMENT_INVENTORY_META[type].label,
    icon: EQUIPMENT_INVENTORY_META[type].icon,
  })),
});
