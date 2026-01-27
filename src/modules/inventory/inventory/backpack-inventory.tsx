"use client";

import { useInventoryStore } from "../shared/inventory.hooks";
import { INVENTORY_STORE_REGISTRY } from "../shared/inventory.registry";
import { InventoryUi } from "../shared/ui/inventory-ui";
import { inventoryPanelClasses } from "../shared/inventory-panel-classes";

export function BackpackInventory() {
  const notice = useInventoryStore((state) => state.notice);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className={inventoryPanelClasses}>
        <InventoryUi
          store={useInventoryStore}
          storeRegistry={INVENTORY_STORE_REGISTRY}
        />
      </div>

      {notice ? (
        <div className="rounded-xl border border-amber-200/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
          {notice}
        </div>
      ) : null}
    </div>
  );
}
