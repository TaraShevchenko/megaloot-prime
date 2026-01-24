import type { EquipmentEntry } from "modules/equipment";
import { EquipmentCard, EquipmentStats } from "modules/equipment/client";
import {
  RARITY_LABELS,
  RARITY_ORDER,
  type RarityEnum,
} from "shared/types/rarity";
import { cn } from "shared/utils/cn";

type EquipmentPreviewProps = {
  equipment: EquipmentEntry;
  rarity: RarityEnum;
  index: number;
  onRarityChange: (rarity: RarityEnum) => void;
  className?: string;
};

export function EquipmentPreview({
  equipment,
  rarity,
  index,
  onRarityChange,
  className,
}: EquipmentPreviewProps) {
  return (
    <div
      className={cn(
        "group rounded-3xl border border-[rgba(148,163,184,0.25)] bg-[#101826] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-6",
        "animate-[fade-rise_0.6s_ease_both]",
        className,
      )}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400">
              Equipment
            </p>
            <h2 className="text-xl font-semibold text-slate-100">
              {equipment.name}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Rarity: {RARITY_LABELS[rarity]}
            </p>
          </div>

          <EquipmentCard
            equipment={equipment}
            rarity={rarity}
            className="cursor-pointer transition hover:brightness-110"
          />

          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Select rarity"
          >
            {RARITY_ORDER.map((entry) => (
              <button
                key={entry}
                type="button"
                onClick={() => onRarityChange(entry)}
                className={cn(
                  "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition",
                  entry === rarity
                    ? "border-amber-200/80 bg-white/10 text-amber-100"
                    : "border-slate-500/60 text-slate-300 hover:border-slate-300/80",
                )}
                aria-pressed={entry === rarity}
              >
                {RARITY_LABELS[entry]}
              </button>
            ))}
          </div>
        </div>
        <EquipmentStats
          rarity={rarity}
          statRanges={equipment.statRanges}
          name={equipment.name}
        />
      </div>
    </div>
  );
}
