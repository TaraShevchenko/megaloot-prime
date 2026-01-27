"use client";

import type { InventoryStoreRegistry } from "./inventory.store";
import {
  useCharacterInventoryStore,
  useCraftInventoryStore,
  useInventoryStore,
} from "./inventory.hooks";

export const INVENTORY_STORE_REGISTRY: InventoryStoreRegistry = {
  [useInventoryStore.getState().id]: useInventoryStore,
  [useCharacterInventoryStore.getState().id]: useCharacterInventoryStore,
  [useCraftInventoryStore.getState().id]: useCraftInventoryStore,
};
