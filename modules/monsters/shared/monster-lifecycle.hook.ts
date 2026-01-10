"use client";

import { useEffect, useMemo } from "react";
import type { StoreApi, UseBoundStore } from "zustand";
import { createMonsterLifecycleStore } from "./monster-lifecycle.store";
import type {
  MonsterId,
  MonsterLifecycleActions,
  MonsterLifecycleHandlers,
  MonsterStoreState,
} from "./monsters.types";

type UseMonsterLifecycleOptions = {
  monsterId: MonsterId;
  level: number;
  maxHp: number;
  handlers?: MonsterLifecycleHandlers;
};

type MonsterLifecycleHookResult = {
  useStore: UseBoundStore<StoreApi<MonsterStoreState>>;
  hp: number;
  maxHp: number;
  level: number;
  isDead: boolean;
  takeDamagePercent: (percent: number) => void;
  restoreFull: () => void;
};

export function useMonsterLifecycle({
  monsterId,
  level,
  maxHp,
  handlers,
}: UseMonsterLifecycleOptions): MonsterLifecycleHookResult {
  const useStore = useMemo(
    () => createMonsterLifecycleStore({ level, maxHp }),
    [],
  );

  const hp = useStore((state) => state.hp);
  const currentMaxHp = useStore((state) => state.maxHp);
  const currentLevel = useStore((state) => state.level);
  const isDead = useStore((state) => state.isDead);

  useEffect(() => {
    useStore.getState().setLevel(level, maxHp);
  }, [level, maxHp, useStore]);

  useEffect(() => {
    if (!handlers) {
      return;
    }

    const actions: MonsterLifecycleActions = {
      setLevel: useStore.getState().setLevel,
      setMaxHp: useStore.getState().setMaxHp,
      setHp: useStore.getState().setHp,
      takePercentDamage: useStore.getState().takePercentDamage,
      restoreFull: useStore.getState().restoreFull,
    };

    const unsubscribe = useStore.subscribe((state, prevState) => {
      const context = {
        monsterId,
        hp: state.hp,
        maxHp: state.maxHp,
        level: state.level,
        isDead: state.isDead,
      };

      if (handlers.onHealthChange && state.hp !== prevState.hp) {
        handlers.onHealthChange(context, actions);
      }

      if (!prevState.isDead && state.isDead && handlers.onDeath) {
        handlers.onDeath(context, actions);
      }

      if (prevState.isDead && !state.isDead && handlers.onRevive) {
        handlers.onRevive(context, actions);
      }
    });

    return unsubscribe;
  }, [handlers, monsterId, useStore]);

  const takeDamagePercent = (percent: number) => {
    useStore.getState().takePercentDamage(percent);
  };

  const restoreFull = () => {
    useStore.getState().restoreFull();
  };

  return {
    useStore,
    hp,
    maxHp: currentMaxHp,
    level: currentLevel,
    isDead,
    takeDamagePercent,
    restoreFull,
  };
}
