"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import type { EquipmentEntry } from "modules/equipment";
import {
  CHARACTERISTIC_LABELS,
  CHARACTERISTICS_ORDER,
  type CharacteristicsEnum,
} from "shared/types/characteristics";
import {
  RARITY_BACKGROUNDS,
  RARITY_LABELS,
  type RarityEnum,
} from "shared/types/rarity";
import { ActionButton } from "shared/ui/action-button";
import { cn } from "shared/utils/cn";
import equipmentPartIcon from "modules/equipment/assets/equipment-part.png";
import goldIcon from "modules/equipment/assets/gold.png";

type EquipmentStatsAction = {
  value: number;
  onClick: () => void;
};

type EquipmentStatsProps = {
  rarity: RarityEnum;
  statRanges?: EquipmentEntry["statRanges"];
  stats?: Partial<Record<CharacteristicsEnum, number>>;
  name?: string;
  sellAction?: EquipmentStatsAction;
  disenchantAction?: EquipmentStatsAction;
  className?: string;
  footer?: ReactNode;
};

export function EquipmentStats({
  rarity,
  statRanges,
  stats,
  name,
  sellAction,
  disenchantAction,
  className,
  footer,
}: EquipmentStatsProps) {
  const hasRolledStats = Boolean(stats);
  const rolledOrder = hasRolledStats
    ? CHARACTERISTICS_ORDER.filter((stat) => typeof stats?.[stat] === "number")
    : [];

  const rangesForRarity = statRanges?.[rarity] ?? {};
  const rangesOrder = CHARACTERISTICS_ORDER.filter(
    (stat) => rangesForRarity[stat],
  );

  const hasStats = hasRolledStats
    ? rolledOrder.length > 0
    : rangesOrder.length > 0;
  const hasActions = Boolean(sellAction || disenchantAction);

  return (
    <div
      className={cn(
        "w-72 rounded-2xl border border-[rgba(148,163,184,0.25)] bg-[#0f1622] p-4 text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-1">
          {name ? (
            <span className="text-sm font-semibold text-slate-100">{name}</span>
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-400">
            <span
              className="relative inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              <span
                className="absolute inset-0 rounded-full opacity-30"
                style={{ backgroundImage: RARITY_BACKGROUNDS[rarity] }}
                aria-hidden="true"
              />
              <span
                className="relative text-transparent"
                style={{
                  backgroundImage: RARITY_BACKGROUNDS[rarity],
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                {RARITY_LABELS[rarity]}
              </span>
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          {hasStats ? (
            (hasRolledStats ? rolledOrder : rangesOrder).map((stat) => {
              const value = stats?.[stat];
              const range = rangesForRarity[stat];

              if (!hasRolledStats && !range) return null;
              if (hasRolledStats && typeof value !== "number") return null;

              return (
                <div key={stat} className="contents">
                  <span className="text-base text-slate-100">
                    {CHARACTERISTIC_LABELS[stat]}
                  </span>
                  <span className="font-mono text-base text-emerald-200">
                    {hasRolledStats && typeof value === "number"
                      ? value
                      : `${range?.[0]} - ${range?.[1]}`}
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
        {hasActions ? (
          <div className="flex flex-wrap gap-2 border-t border-white/10 pt-2">
            {sellAction ? (
              <ActionButton
                tone="ember"
                className="flex justify-center flex-1"
                onClick={sellAction.onClick}
              >
                <span className="flex items-center gap-1 text-amber-200">
                  <Image
                    src={goldIcon}
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-4 object-contain"
                  />
                  <span>{sellAction.value}</span>
                </span>
              </ActionButton>
            ) : null}
            {disenchantAction ? (
              <ActionButton
                tone="sky"
                className="flex justify-center flex-1"
                onClick={disenchantAction.onClick}
              >
                <span className="flex items-center gap-1 text-cyan-200">
                  <Image
                    src={equipmentPartIcon}
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-4 object-contain"
                  />
                  <span>{disenchantAction.value}</span>
                </span>
              </ActionButton>
            ) : null}
          </div>
        ) : null}
        {footer ? (
          <div className="border-t border-white/10 pt-2">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
