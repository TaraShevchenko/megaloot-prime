"use client";

export {
  InventoryUi,
  InventoryItemCard,
  InventorySlotCard,
} from "./shared/inventory.ui";
export { useInventoryStore } from "./shared/inventory.store";
export { createRandomInventoryItem } from "./shared/inventory.utils";
export type {
  InventoryType,
  InventoryItem,
  InventorySlot,
} from "./shared/inventory.types";
