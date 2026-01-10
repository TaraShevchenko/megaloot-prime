"use client";

import { useState } from "react";
import { MONSTERS, type MonsterId } from "modules/monsters";
import { MonsterRow } from "./MonsterRow";

export function MonstersList() {
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
    <>
      {MONSTERS.map((monster, index) => (
        <MonsterRow
          key={monster.id}
          monster={monster}
          index={index}
          level={levels[monster.id] ?? 1}
          onLevelChange={(nextLevel) => updateLevel(monster.id, nextLevel)}
        />
      ))}
    </>
  );
}
