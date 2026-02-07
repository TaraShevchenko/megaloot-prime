"use client";

import { useMemo, useState } from "react";

import { MONSTERS } from "@/entities/monster";
import { MonsterSprite } from "@/entities/monster/client";
import {
  CHARACTERISTIC_LABELS,
  CHARACTERISTICS_ORDER,
  CharacteristicsEnum,
  getScaledCharacteristics,
  Panel,
} from "@/shared";

export function MonsterCatalog() {
  const [selectedId, setSelectedId] = useState<string>(
    MONSTERS[0]?.id ?? "",
  );
  const selected = useMemo(
    () => MONSTERS.find((monster) => monster.id === selectedId) ?? MONSTERS[0],
    [selectedId],
  );

  if (!selected) {
    return (
      <Panel title="Monster Codex" subtitle="Real stats and sprite sheets">
        <p className="text-sm text-muted-foreground">No monsters available.</p>
      </Panel>
    );
  }

  const scaled = getScaledCharacteristics(
    selected.characteristics,
    selected.level,
  );

  return (
    <Panel title="Monster Codex" subtitle="Real stats and sprite sheets">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {MONSTERS.map((monster) => (
            <button
              key={monster.id}
              type="button"
              onClick={() => setSelectedId(monster.id)}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted p-3 text-left transition hover:bg-accent"
            >
              <MonsterSprite definition={monster} />
              <div>
                <div className="text-sm font-semibold">{monster.name}</div>
                <div className="text-xs text-muted-foreground">
                  Level {monster.level}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {selected && scaled ? (
            <>
              <div className="rounded-lg border border-border bg-muted p-3">
                <div className="text-sm font-semibold">{selected.name}</div>
                <div className="text-xs text-muted-foreground">
                  HP formula:{" "}
                  {selected.characteristics.base[CharacteristicsEnum.HP]} +{" "}
                  {selected.characteristics.growth[CharacteristicsEnum.HP]} *
                  (lvl-1)
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CHARACTERISTICS_ORDER.map((stat) => (
                  <div
                    key={stat}
                    className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2"
                  >
                    <span className="text-xs text-muted-foreground">
                      {CHARACTERISTIC_LABELS[stat]}
                    </span>
                    <span className="text-sm font-semibold">
                      {Math.round(scaled[stat])}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a monster to inspect.
            </p>
          )}
        </div>
      </div>
    </Panel>
  );
}
