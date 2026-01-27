"use client";

import {
  CraftInventory,
  CharacterInventory,
} from "modules/inventory/client";
import { CraftInventoryControls } from "./craft-inventory-controls";
import { BackpackInventoryPanel } from "./backpack-inventory-panel";

export function InventoryPanel() {
  return (
    <div className="flex flex-col gap-8">
      <BackpackInventoryPanel />
      <CharacterInventory />
      <CraftInventoryControls />
      <CraftInventory />
    </div>
  );
}
