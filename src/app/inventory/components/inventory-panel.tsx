"use client";

import {
  CraftInventory,
  CharacterInventory,
  InventoryDndProvider,
} from "modules/inventory/client";
import { CraftInventoryControls } from "./craft-inventory-controls";
import { BackpackInventoryPanel } from "./backpack-inventory-panel";

export function InventoryPanel() {
  return (
    <InventoryDndProvider>
      <div className="flex flex-col gap-8">
        <BackpackInventoryPanel />
        <CharacterInventory />
        <CraftInventoryControls />
        <CraftInventory />
      </div>
    </InventoryDndProvider>
  );
}
