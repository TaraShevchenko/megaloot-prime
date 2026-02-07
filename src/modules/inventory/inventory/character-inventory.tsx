"use client";

import { useMemo } from "react";
import {
  CHARACTERISTIC_LABELS,
  CHARACTERISTICS_ORDER,
  type CharacteristicsEnum,
} from "shared/types/characteristics";
import { inventoryPanelClasses } from "../shared/inventory-panel-classes";
import { useCharacterInventoryStore } from "../shared/inventory.hooks";
import type { InventorySlot } from "../shared/inventory.types";
import { InventoryUi } from "../shared/ui/inventory-ui";

const formatTotal = (value: number) => {
  if (Number.isInteger(value)) return `${value}`;
  return value.toFixed(1);
};

const getCharacterInventoryTotals = (slots: InventorySlot[]) => {
  const totals = Object.fromEntries(
    CHARACTERISTICS_ORDER.map((stat) => [stat, 0]),
  ) as Record<CharacteristicsEnum, number>;

  slots.forEach((slot) => {
    if (!slot) return;

    CHARACTERISTICS_ORDER.forEach((stat) => {
      const value = slot.rolledStats?.[stat];
      if (typeof value !== "number") return;
      totals[stat] += value;
    });
  });

  return totals;
};

export function CharacterInventory() {
  const slots = useCharacterInventoryStore((state) => state.slots);
  const notice = useCharacterInventoryStore((state) => state.notice);

  const totals = useMemo(() => getCharacterInventoryTotals(slots), [slots]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <div className={inventoryPanelClasses}>
          <InventoryUi
            store={useCharacterInventoryStore}
            gridClassName="grid-cols-3 w-[240px] justify-start"
          />
        </div>

        <div className={inventoryPanelClasses}>
          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
              Totals
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {CHARACTERISTICS_ORDER.map((stat) => (
                <div key={stat} className="contents">
                  <div className="text-slate-200">
                    {CHARACTERISTIC_LABELS[stat]}
                  </div>
                  <div className="font-mono text-emerald-200">
                    {formatTotal(totals[stat])}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {notice ? (
        <div className="rounded-xl border border-amber-200/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
          {notice}
        </div>
      ) : null}
    </div>
  );
}
