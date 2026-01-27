"use client";

import { useMemo } from "react";
import { ActionButton } from "shared/ui/action-button";
import {
  BackpackInventory,
  inventoryPanelClasses,
  useInventoryStore,
} from "modules/inventory/client";

export function BackpackInventoryPanel() {
  const slots = useInventoryStore((state) => state.slots);
  const addSlot = useInventoryStore((state) => state.addSlot);
  const addRandomItem = useInventoryStore((state) => state.addRandomItem);

  const filledCount = useMemo(() => slots.filter(Boolean).length, [slots]);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className={inventoryPanelClasses}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-300">
            <span className="rounded-full border border-white/10 px-3 py-1 font-semibold text-cyan-100">
              Slots: {filledCount}/{slots.length}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 font-semibold text-emerald-100">
              Free: {slots.length - filledCount}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 font-semibold text-amber-100">
              Drag to swap
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <ActionButton
              tone="sky"
              label="Spawn random item"
              onClick={() => addRandomItem()}
            />
            <ActionButton
              tone="emerald"
              label="Add slot"
              onClick={() => addSlot()}
            />
          </div>
        </div>
      </div>

      <BackpackInventory />
    </div>
  );
}
