"use client";

import { useCraftCurrencyStore } from "./shared/craft-currency.store";
import {
  useInventoryStore,
  useCharacterInventoryStore,
  useCraftInventoryStore,
} from "./shared/inventory.hooks";
import { INVENTORY_STORE_REGISTRY } from "./shared/inventory.registry";

export { InventoryUi } from "./shared/ui/inventory-ui";
export { InventoryItemCard } from "./shared/ui/inventory-item-card";
export { InventorySlotCard } from "./shared/ui/inventory-slot-card";
export { InventoryDndProvider } from "modules/inventory/shared/dnd/inventory-dnd-provider";
export { createRandomInventoryItem } from "./shared/inventory.utils";
export { BackpackInventory } from "./inventory/backpack-inventory";
export { CharacterInventory } from "./inventory/character-inventory";
export { CraftInventory } from "./inventory/craft-inventory";
export { inventoryPanelClasses } from "./shared/inventory-panel-classes";
export {
  equipmentPartIcon,
  goldIcon,
  ADD_ICONS,
  CHANGE_VALUE_ICONS,
} from "./shared/craft-currency.icons";
export type {
  InventoryType,
  InventoryItem,
  InventorySlot,
  InventorySlotDefinition,
  InventoryDragPayload,
} from "./shared/inventory.types";
export type { CraftCurrencyDragPayload } from "modules/inventory/shared/dnd/dnd.types";

export {
  useInventoryStore,
  useCharacterInventoryStore,
  useCraftInventoryStore,
};
export { useCraftCurrencyStore };
export { INVENTORY_STORE_REGISTRY };
