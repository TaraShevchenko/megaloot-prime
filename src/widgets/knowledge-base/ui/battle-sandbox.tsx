"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { EQUIPMENT_SLOT_IDS } from "@/entities/equipment";
import type { GameSession } from "@/entities/game-session";
import { createNewSession } from "@/entities/game-session";
import { DEFAULT_HERO_STATS } from "@/entities/hero";
import { BACKPACK_CAPACITY, createInventory } from "@/entities/inventory";
import { createMonsterState, MONSTERS } from "@/entities/monster";
import { MonsterCard } from "@/entities/monster/client";
import { attackMonster } from "@/features/monster-attack";
import { AttackButton } from "@/features/monster-attack/client";
import type { CurrencyType } from "@/shared";
import { createSeededRandom, Panel } from "@/shared";

const INITIAL_CURRENCIES: Record<CurrencyType, number> = {
  GOLD: 0,
  EQUIPMENT_PART: 0,
  CRIMSON_GEM: 0,
  RARITY_INGOT: 0,
};

const createEmptyEquipped = () =>
  Object.fromEntries(
    EQUIPMENT_SLOT_IDS.map((slot) => [slot, null]),
  ) as GameSession["equipped"];

const buildSession = (monsterIndex: number) => {
  const definition = MONSTERS[monsterIndex] ?? MONSTERS[0];
  if (!definition) {
    return createNewSession({
      heroBaseStats: DEFAULT_HERO_STATS,
      inventory: createInventory(BACKPACK_CAPACITY),
      equipped: createEmptyEquipped(),
      currencies: INITIAL_CURRENCIES,
      monsters: [],
      craftItem: null,
    });
  }
  return createNewSession({
    heroBaseStats: DEFAULT_HERO_STATS,
    inventory: createInventory(BACKPACK_CAPACITY),
    equipped: createEmptyEquipped(),
    currencies: INITIAL_CURRENCIES,
    monsters: [createMonsterState(definition)],
    craftItem: null,
  });
};

export function BattleSandbox() {
  const rngRef = useRef(createSeededRandom(2025));
  const [index, setIndex] = useState(0);
  const [session, setSession] = useState<GameSession>(() => buildSession(0));
  const [log, setLog] = useState<string[]>([]);

  const definition = useMemo(() => MONSTERS[index] ?? MONSTERS[0], [index]);
  const monsterState = session.monsters[0];

  useEffect(() => {
    setSession(buildSession(index));
    setLog([]);
  }, [index]);

  const handleAttack = () => {
    if (!definition) {
      setLog((prev) => ["Error: No monster selected.", ...prev].slice(0, 6));
      return;
    }
    const result = attackMonster(session, definition.id, rngRef.current);
    setSession(result.session);
    if (result.error) {
      setLog((prev) => [`Error: ${result.error}`, ...prev].slice(0, 6));
      return;
    }
    if (result.drop) {
      const itemCount = result.drop.items.length;
      const gold = result.drop.currencies.GOLD ?? 0;
      const parts = result.drop.currencies.EQUIPMENT_PART ?? 0;
      const summary = `Drop: ${itemCount} item(s), ${gold} gold, ${parts} parts.`;
      setLog((prev) => [summary, ...prev].slice(0, 6));
    }
  };

  return (
    <Panel title="Battle Sandbox" subtitle="Isolated combat demo">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-muted-foreground">Monster</span>
        <select
          value={index}
          onChange={(event) => setIndex(Number(event.target.value))}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {MONSTERS.map((monster, idx) => (
            <option key={monster.id} value={idx}>
              {monster.name}
            </option>
          ))}
        </select>
      </div>
      {monsterState && definition ? (
        <div className="mt-4 space-y-3">
          <MonsterCard
            definition={definition}
            state={monsterState}
            actions={<AttackButton onClick={handleAttack} />}
          />
          <div className="rounded-lg border border-border bg-muted p-3 text-sm text-muted-foreground">
            Inventory: {session.inventory.equipment.filter(Boolean).length} item(s), Gold: {session.currencies.GOLD}
          </div>
          <div className="rounded-lg border border-border bg-muted p-3">
            <div className="text-xs font-medium text-muted-foreground">
              Combat Log
            </div>
            {log.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                No attacks yet.
              </p>
            ) : (
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {log.map((entry, idx) => (
                  <li key={`${entry}-${idx}`}>{entry}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          No monsters available.
        </p>
      )}
    </Panel>
  );
}
