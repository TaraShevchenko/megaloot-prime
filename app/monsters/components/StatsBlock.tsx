"use client";

import {
  CHARACTERISTIC_LABELS,
  CHARACTERISTICS_ORDER,
  getScaledCharacteristics,
} from "modules/monsters/shared/MonsterStats";
import type { MonsterCharacteristics } from "shared/types";

type StatsBlockProps = {
  level: number;
  characteristics: MonsterCharacteristics;
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

          return (
            <div key={stat} className="contents">
              <span className="text-base text-slate-100">
                {CHARACTERISTIC_LABELS[stat]}
              </span>
              <span className="font-mono text-base text-slate-300">
                {base}
                <span className="text-amber-200"> (+{growth}/lv)</span>
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
