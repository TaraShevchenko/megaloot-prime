"use client";

import { useState } from "react";
import type { MonsterId } from "modules/monsters/useMonsterAnimation";
import { cn } from "shared/utils/cn";
import { MonsterRow } from "./components/MonsterRow";
import { MONSTERS } from "./monsters.data";

export default function MonstersPage() {
  const [levels, setLevels] = useState<Record<MonsterId, number>>(() =>
    MONSTERS.reduce(
      (acc, monster) => {
        acc[monster.id] = 1;
        return acc;
      },
      {} as Record<MonsterId, number>,
    ),
  );

  const updateLevel = (id: MonsterId, nextLevel: number) => {
    if (!Number.isFinite(nextLevel)) {
      return;
    }
    const normalized = Math.max(1, Math.round(nextLevel));
    setLevels((prev) => ({ ...prev, [id]: normalized }));
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full font-sans text-slate-100",
        "bg-[#0b0f14] bg-[radial-gradient(800px_400px_at_15%_-10%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(900px_500px_at_85%_-15%,rgba(251,191,36,0.18),transparent_60%)]",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-8">
        <header
          className={cn(
            "flex flex-col gap-3",
            "animate-[fade-rise_0.7s_ease_both]",
          )}
        >
          <p className="text-xs uppercase tracking-[0.6em] text-amber-200/80">
            Bestiary Log
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Monsters Field Table
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Prototype registry with live animation controls and scaled combat
            stats. Values update per level using growth rates stored in each
            monster profile.
          </p>
        </header>

        <section
          className={cn(
            "flex flex-col gap-6",
            "animate-[fade-rise_0.7s_ease_both]",
          )}
        >
          {MONSTERS.map((monster, index) => (
            <MonsterRow
              key={monster.id}
              monster={monster}
              index={index}
              level={levels[monster.id] ?? 1}
              onLevelChange={(nextLevel) => updateLevel(monster.id, nextLevel)}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
