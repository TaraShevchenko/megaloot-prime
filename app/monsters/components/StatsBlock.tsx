"use client";

import {
  CHARACTERISTIC_LABELS,
  CHARACTERISTICS_ORDER,
  formatCharacteristicValue,
  getScaledCharacteristics,
} from "shared/types/characteristics";
import type { Characteristics } from "shared/types/characteristics";

type StatsBlockProps = {
  level: number;
  characteristics: Characteristics;
};

export function StatsBlock({ level, characteristics }: StatsBlockProps) {
  const safeLevel = Number.isFinite(level) ? level : 1;
  const scaled = getScaledCharacteristics(characteristics, safeLevel);

  return (
    <div
      className={
        "h-full rounded-2xl border border-[rgba(148,163,184,0.25)] bg-[#0f1622] p-4"
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
        <span>Base + Growth</span>
        <span>Level {safeLevel}</span>
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.6fr)] gap-x-4 gap-y-2">
        <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
          Characteristic
        </span>
        <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
          Value
        </span>
        <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
          Total
        </span>
        {CHARACTERISTICS_ORDER.map((stat) => {
          const base = characteristics.base[stat];
          const growth = characteristics.growth[stat];
          const total = scaled[stat];
          const baseLabel = formatCharacteristicValue(base);
          const growthLabel = formatCharacteristicValue(growth);

          return (
            <div key={stat} className="contents">
              <span className="text-base text-slate-100">
                {CHARACTERISTIC_LABELS[stat]}
              </span>
              <span className="font-mono text-base text-slate-300">
                {baseLabel}
                <span className="text-amber-200"> (+{growthLabel}/lv)</span>
              </span>
              <span className="font-mono text-base text-emerald-200">
                {total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
