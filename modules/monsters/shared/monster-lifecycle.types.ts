"use client";

import type { StoreApi } from "zustand";
import { MonsterId } from "./monsters.types";

export type MonsterLifecycleState = {
  level: number;
  maxHp: number;
  hp: number;
  isDead: boolean;
};

export type MonsterLifecycleActions = {
  takeDamage: (amount: number) => void;
};

export type MonsterStoreState = MonsterLifecycleState & MonsterLifecycleActions;

export type MonsterLifecycleContext = MonsterLifecycleState & {
  monsterId: MonsterId;
};

export type MonsterLifecycleStoreOptions = {
  monsterId: MonsterId;
  level: number;
  maxHp: number;
  onDeath?: (
    context: MonsterLifecycleContext,
    actions: MonsterLifecycleActions,
  ) => void;
};

export type MonsterLifecycleStore = StoreApi<MonsterStoreState>;
