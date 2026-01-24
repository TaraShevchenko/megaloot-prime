"use client";

import { useMemo } from "react";
import {
  INVENTORY_STORE_REGISTRY,
  InventoryUi,
  useCharacterInventoryStore,
  useInventoryStore,
} from "modules/inventory/client";
import { ActionButton } from "shared/ui/action-button";

const panelClasses =
  "flex justify-center min-h-[70px] flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 bg-[linear-gradient(120deg,rgba(56,189,248,0.08),rgba(14,165,233,0.03),rgba(16,185,129,0.08))] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm animate-[fade-rise_0.65s_ease_both]";

export function InventoryPanel() {
  const slots = useInventoryStore((state) => state.slots);
  const notice = useInventoryStore((state) => state.notice);
  const addSlot = useInventoryStore((state) => state.addSlot);
  const addRandomItem = useInventoryStore((state) => state.addRandomItem);

  const characterSlots = useCharacterInventoryStore((state) => state.slots);
  const characterNotice = useCharacterInventoryStore((state) => state.notice);

  const filledCount = useMemo(() => slots.filter(Boolean).length, [slots]);
  const characterFilled = useMemo(
    () => characterSlots.filter(Boolean).length,
    [characterSlots],
  );

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <div className={panelClasses}>
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

        <div className={panelClasses}>
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

      <div className="flex w-full flex-col gap-4 lg:max-w-[290px]">
        <div className={panelClasses}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-300">
              <span className="rounded-full border border-white/10 px-3 py-1 font-semibold text-cyan-100">
                Filled: {characterFilled}/{characterSlots.length}
              </span>
            </div>
          </div>
        </div>

        <div className={panelClasses}>
          <InventoryUi
            store={useCharacterInventoryStore}
            storeRegistry={INVENTORY_STORE_REGISTRY}
          />
        </div>

        {characterNotice ? (
          <div className="rounded-xl border border-amber-200/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
            {characterNotice}
          </div>
        ) : null}
      </div>
    </div>
  );
}
