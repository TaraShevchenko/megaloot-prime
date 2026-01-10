"use client";

import { create } from "zustand";
import type { MonsterStoreState } from "./monsters.types";

type MonsterLifecycleInit = {
  level: number;
  maxHp: number;
};

export const createMonsterLifecycleStore = ({
  level,
  maxHp,
}: MonsterLifecycleInit) =>
  create<MonsterStoreState>((set, get) => ({
    level,
    maxHp,
    hp: maxHp,
    isDead: false,
    setLevel: (nextLevel, nextMaxHp) => {
      const normalizedLevel = Math.max(1, Math.round(nextLevel));
      const boundedMax = Math.max(1, nextMaxHp);

      set(() => ({
        level: normalizedLevel,
        maxHp: boundedMax,
        hp: boundedMax,
        isDead: false,
      }));
    },
    setMaxHp: (nextMaxHp) => {
      const boundedMax = Math.max(1, nextMaxHp);
      set((state) => {
        const boundedHp = Math.min(Math.max(0, state.hp), boundedMax);
        return {
          ...state,
          maxHp: boundedMax,
          hp: boundedHp,
          isDead: boundedHp <= 0,
        };
      });
    },
    setHp: (nextHp) => {
      set((state) => {
        const bounded = Math.min(Math.max(0, nextHp), state.maxHp);
        return {
          ...state,
          hp: bounded,
          isDead: bounded <= 0,
        };
      });
    },
    takePercentDamage: (percentOfMax) => {
      const { maxHp, hp } = get();
      const safePercent = Math.max(0, percentOfMax);
      const damage = Math.max(1, Math.round((maxHp * safePercent) / 100));
      const nextHp = Math.max(0, hp - damage);

      set({
        hp: nextHp,
        isDead: nextHp <= 0,
      });
    },
    restoreFull: () =>
      set((state) => ({
        ...state,
        hp: state.maxHp,
        isDead: false,
      })),
  }));
