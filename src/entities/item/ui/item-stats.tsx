"use client";

import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import type { CharacteristicsEnum } from "@/shared/types/characteristics";
import { CHARACTERISTIC_LABELS, CHARACTERISTICS_ORDER } from "@/shared/types/characteristics";
import type { RarityEnum } from "@/shared/types/rarity";
import { RARITY_BACKGROUNDS, RARITY_LABELS } from "@/shared/types/rarity";

import type { ItemDefinition, ItemStats } from "../model/types";

type ItemStatsProps = {
  definition?: ItemDefinition;
  rarity: RarityEnum;
  stats?: ItemStats;
  name?: string;
  className?: string;
  footer?: ReactNode;
};

export function ItemStats({
  definition,
  rarity,
  stats,
  name,
  className,
  footer,
}: ItemStatsProps) {
  const displayName = name ?? definition?.name[rarity];
  const ranges = definition?.statRanges?.[rarity] ?? {};

  const visibleOrder = stats
    ? CHARACTERISTICS_ORDER.filter((stat) => typeof stats[stat] === "number")
    : CHARACTERISTICS_ORDER.filter((stat) => Boolean(ranges[stat]));

  return (
    <div
      className={cn(
        "w-72 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          {displayName ? (
            <span className="text-sm font-semibold">{displayName}</span>
          ) : null}
          <span
            className="relative inline-flex items-center rounded-full border border-border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em]"
          >
            <span
              className="absolute inset-0 rounded-full opacity-40"
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
        <div className="grid grid-cols-2 gap-2">
          {visibleOrder.length > 0 ? (
            visibleOrder.map((stat) => {
              const value = stats?.[stat as CharacteristicsEnum];
              const range = ranges[stat as CharacteristicsEnum];

              return (
                <div key={stat} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    {CHARACTERISTIC_LABELS[stat as CharacteristicsEnum]}
                  </span>
                  <span className="text-sm font-semibold">
                    {typeof value === "number"
                      ? Math.round(value)
                      : range
                        ? `${range[0]}-${range[1]}`
                        : "-"}
                  </span>
                </div>
              );
            })
          ) : (
            <span className="col-span-2 text-sm text-muted-foreground">
              No stats available for this rarity.
            </span>
          )}
        </div>
        {footer ? <div className="border-t border-border pt-2">{footer}</div> : null}
      </div>
    </div>
  );
}


