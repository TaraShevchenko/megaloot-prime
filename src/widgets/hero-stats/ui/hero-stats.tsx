"use client";

import { recalculateHeroStats } from "@/features/equip-item";
import { useSession } from "@/processes/game/client";
import { CHARACTERISTIC_LABELS, CHARACTERISTICS_ORDER, Panel } from "@/shared";

export function HeroStats() {
  const session = useSession();
  if (!session) return null;

  const stats = recalculateHeroStats(session);

  return (
    <Panel title="Hero Stats" subtitle="Base plus equipped bonuses">
      <div className="grid grid-cols-2 gap-2">
        {CHARACTERISTICS_ORDER.map((stat) => (
          <div
            key={stat}
            className="flex items-center justify-between rounded-md border border-border bg-muted px-3 py-2"
          >
            <span className="text-xs text-muted-foreground">
              {CHARACTERISTIC_LABELS[stat]}
            </span>
            <span className="text-sm font-semibold">
              {Math.round(stats[stat])}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
