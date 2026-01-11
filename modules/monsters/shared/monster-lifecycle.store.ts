"use client";

import { createStore } from "zustand/vanilla";
import type {
  MonsterLifecycleActions,
  MonsterLifecycleStore,
  MonsterLifecycleStoreOptions,
  MonsterStoreState,
} from "./monster-lifecycle.types";

export const createMonsterLifecycleStore = ({
  monsterId,
  level,
  maxHp,
  onDeath,
}: MonsterLifecycleStoreOptions) =>
  createStore<MonsterStoreState>((set, get) => {
    const normalizedLevel = Math.max(1, Math.round(level));
    const boundedMax = Math.max(1, maxHp);

    return {
      level: normalizedLevel,
      maxHp: boundedMax,
      hp: boundedMax,
      isDead: false,
      takeDamage: (amount) => {
        const prev = get();
        const safeAmount = Math.max(0, Math.round(amount));
        if (safeAmount <= 0) {
          return;
        }
        const nextHp = Math.max(0, prev.hp - safeAmount);
        const nextIsDead = nextHp <= 0;

        set({
          hp: nextHp,
          isDead: nextIsDead,
        });

        if (!prev.isDead && nextIsDead && onDeath) {
          const actions: MonsterLifecycleActions = {
            takeDamage: get().takeDamage,
          };
          onDeath(
            {
              monsterId,
              hp: nextHp,
              maxHp: prev.maxHp,
              level: prev.level,
              isDead: nextIsDead,
            },
            actions,
          );
        }
      },
    };
  }) as MonsterLifecycleStore;
