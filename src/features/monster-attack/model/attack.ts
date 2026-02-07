import type { GameSession } from "@/entities/game-session";
import { addInventoryItem } from "@/entities/inventory";
import { MonsterEnumSchema } from "@/entities/monster";
import type { CurrencyType,RandomFn  } from "@/shared";

import { type DropResult,rollDrop } from "./drop";

export type AttackResult = {
  session: GameSession;
  drop?: DropResult;
  error?: string;
};

const BASE_DAMAGE = 25;

const applyCurrencies = (
  current: Record<CurrencyType, number>,
  delta: Partial<Record<CurrencyType, number>>,
): Record<CurrencyType, number> => {
  const next = { ...current };
  (Object.keys(delta) as CurrencyType[]).forEach((key) => {
    const amount = delta[key] ?? 0;
    next[key] = (next[key] ?? 0) + amount;
  });
  return next;
};

const applyItemDrops = (
  inventory: GameSession["inventory"]["equipment"],
  items: GameSession["inventory"]["equipment"][number][],
): GameSession["inventory"]["equipment"] => {
  let next = inventory;
  items.forEach((item) => {
    if (!item) return;
    const added = addInventoryItem(next, item);
    if (added.index !== undefined) {
      next = added.items;
    }
  });
  return next;
};

export const attackMonster = (
  session: GameSession,
  monsterId: string,
  rng: RandomFn = Math.random,
): AttackResult => {
  const parsedId = MonsterEnumSchema.safeParse(monsterId);
  if (!parsedId.success) {
    return { session, error: "Monster not found." };
  }
  const typedId = parsedId.data;
  const target = session.monsters.find((monster) => monster.id === typedId);
  if (!target) {
    return { session, error: "Monster not found." };
  }
  if (target.currentHp <= 0) {
    return { session, error: "Monster is already defeated." };
  }

  const nextMonsters = session.monsters.map((monster) => {
    if (monster.id !== typedId) return monster;
    const nextHp = Math.max(0, monster.currentHp - BASE_DAMAGE);
    const alive = nextHp > 0;
    return { ...monster, currentHp: nextHp, alive };
  });

  const killed = nextMonsters.find((monster) => monster.id === typedId);
  if (!killed) {
    return { session: { ...session, monsters: nextMonsters } };
  }

  if (killed.currentHp > 0) {
    return { session: { ...session, monsters: nextMonsters } };
  }

  const drop = rollDrop(typedId, rng);
  const nextInventory = {
    equipment: applyItemDrops(session.inventory.equipment, drop.items),
  };

  return {
    session: {
      ...session,
      monsters: nextMonsters,
      inventory: nextInventory,
      currencies: applyCurrencies(session.currencies, drop.currencies),
    },
    drop,
  };
};
