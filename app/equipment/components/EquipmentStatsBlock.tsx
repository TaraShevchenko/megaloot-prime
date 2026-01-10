import {
  CHARACTERISTIC_LABELS,
  CHARACTERISTICS_ORDER,
} from "modules/monsters/shared/MonsterStats";
import { RARITY_LABELS, type RarityEnum } from "shared/types";
import type { EquipmentEntry } from "../equipment.data";

type EquipmentStatsBlockProps = {
  rarity: RarityEnum;
  statsRanges: EquipmentEntry["statsRanges"];
};

export function EquipmentStatsBlock({
  rarity,
  statsRanges,
}: EquipmentStatsBlockProps) {
  const statsForRarity = statsRanges[rarity] ?? {};
  const statsOrder = CHARACTERISTICS_ORDER.filter(
    (stat) => statsForRarity[stat],
  );
  const hasStats = statsOrder.length > 0;

  return (
    <div className="h-full rounded-2xl border border-[rgba(148,163,184,0.25)] bg-[#0f1622] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
        <span>Stat range</span>
        <span>{RARITY_LABELS[rarity]}</span>
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-x-4 gap-y-2">
        <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
          Characteristic
        </span>
        <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
          Range
        </span>
        {hasStats ? (
          statsOrder.map((stat) => {
            const range = statsForRarity[stat];
            if (!range) {
              return null;
            }

            const [min, max] = range;
            return (
              <div key={stat} className="contents">
                <span className="text-base text-slate-100">
                  {CHARACTERISTIC_LABELS[stat]}
                </span>
                <span className="font-mono text-base text-emerald-200">
                  {min} - {max}
                </span>
              </div>
            );
          })
        ) : (
          <span className="col-span-2 text-sm text-slate-400">
            No stats available for this rarity.
          </span>
        )}
      </div>
    </div>
  );
}
