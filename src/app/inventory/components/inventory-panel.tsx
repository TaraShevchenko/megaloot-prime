"use client";

import { useMemo } from "react";
import { InventoryUi, useInventoryStore } from "modules/inventory/client";

export function InventoryPanel() {
  const slots = useInventoryStore((state) => state.slots);
  const notice = useInventoryStore((state) => state.notice);
  const addSlot = useInventoryStore((state) => state.addSlot);
  const addRandomItem = useInventoryStore((state) => state.addRandomItem);

  const filledCount = useMemo(() => slots.filter(Boolean).length, [slots]);

  return (
    <>
      <div className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 bg-[linear-gradient(120deg,rgba(56,189,248,0.08),rgba(14,165,233,0.03),rgba(16,185,129,0.08))] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm animate-[fade-rise_0.65s_ease_both]">
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
            <button
              type="button"
              onClick={addRandomItem}
              className="rounded-xl border border-cyan-300/50 bg-[linear-gradient(120deg,rgba(14,165,233,0.4),rgba(14,165,233,0.15))] px-4 py-2 text-sm font-semibold text-slate-50 shadow-[0_12px_40px_rgba(56,189,248,0.25)] transition hover:-translate-y-[1px] hover:shadow-[0_16px_44px_rgba(56,189,248,0.35)] focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
            >
              Spawn random item
            </button>
            <button
              type="button"
              onClick={addSlot}
              className="rounded-xl border border-emerald-300/40 bg-[linear-gradient(120deg,rgba(16,185,129,0.45),rgba(16,185,129,0.16))] px-4 py-2 text-sm font-semibold text-slate-50 shadow-[0_12px_40px_rgba(16,185,129,0.25)] transition hover:-translate-y-[1px] hover:shadow-[0_16px_44px_rgba(16,185,129,0.35)] focus:outline-none focus:ring-2 focus:ring-emerald-300/70"
            >
              Add slot
            </button>
          </div>
        </div>

        {notice ? (
          <div className="rounded-xl border border-amber-200/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
            {notice}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 bg-[linear-gradient(120deg,rgba(56,189,248,0.08),rgba(14,165,233,0.03),rgba(16,185,129,0.08))] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm animate-[fade-rise_0.65s_ease_both]">
        <InventoryUi />
      </div>
    </>
  );
}
