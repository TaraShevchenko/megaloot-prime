"use client";

import { MONSTER_BY_ID } from "@/entities/monster";
import { MonsterCard } from "@/entities/monster/client";
import { attackMonster } from "@/features/monster-attack";
import { AttackButton } from "@/features/monster-attack/client";
import { saveSession } from "@/features/persist-session";
import { useGameStore, useSession } from "@/processes/game/client";
import { Button } from "@/shared";

export function MonstersRow() {
  const session = useSession();
  const setSession = useGameStore((state) => state.setSession);
  const setNotice = useGameStore((state) => state.setNotice);
  const rng = useGameStore((state) => state.rng);
  const openStore = useGameStore((state) => state.openStore);

  if (!session) return null;

  const handleAttack = (monsterId: string) => {
    const result = attackMonster(session, monsterId, rng);
    if (result.error) {
      setNotice({ tone: "error", message: result.error });
      return;
    }
    if (result.drop && result.drop.items.length > 0) {
      setNotice({
        tone: "info",
        message: `Drop secured: ${result.drop.items.length} item(s).`,
      });
    }
    setSession(result.session);
    saveSession(result.session);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Hunt Grounds</h2>
          <p className="text-sm text-muted-foreground">
            Choose a target and strike.
          </p>
        </div>
        <Button tone="primary" onClick={openStore}>
          Store
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {session.monsters.map((monster) => {
          const definition =
            MONSTER_BY_ID[monster.id as keyof typeof MONSTER_BY_ID];
          if (!definition) return null;
          return (
            <MonsterCard
              key={monster.id}
              definition={definition}
              state={monster}
              actions={
                <AttackButton
                  disabled={monster.currentHp <= 0}
                  onClick={() => handleAttack(monster.id)}
                />
              }
            />
          );
        })}
      </div>
    </div>
  );
}
