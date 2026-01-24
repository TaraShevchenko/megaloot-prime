"use client";

import {
  useInventoryStore,
  useCharacterInventoryStore,
} from "./shared/inventory.hooks";

export { InventoryUi } from "./shared/ui/inventory-ui";
export { InventoryItemCard } from "./shared/ui/inventory-item-card";
export { InventorySlotCard } from "./shared/ui/inventory-slot-card";
export { createRandomInventoryItem } from "./shared/inventory.utils";
export type {
  InventoryType,
  InventoryItem,
  InventorySlot,
  InventorySlotDefinition,
  InventoryDragPayload,
} from "./shared/inventory.types";

export { useInventoryStore, useCharacterInventoryStore };

export const INVENTORY_STORE_REGISTRY = {
  [useInventoryStore.getState().id]: useInventoryStore,
  [useCharacterInventoryStore.getState().id]: useCharacterInventoryStore,
};
