import { Characteristics } from "shared/characteristics";
import z from "zod";
import { MONSTER_IDS } from "./monsters.data";

export const MonsterEnumSchema = z.enum(MONSTER_IDS);
export type MonsterId = z.infer<typeof MonsterEnumSchema>;
export const MonsterEnum = MonsterEnumSchema.enum;

export type Monster = {
  id: MonsterId;
  name: string;
  level: number;
  hp: number;
  characteristics: Characteristics;
};

export type MonsterEntry = {
  id: MonsterId;
  name: string;
  characteristics: Characteristics;
  frameSize: number;
  deathDurationMs: number;
};

export type MonsterLifecycleContext = {
  monsterId: MonsterId;
  hp: number;
  maxHp: number;
  level: number;
  isDead: boolean;
};

export type MonsterLifecycleHandlers = {
  onHealthChange?: (
    context: MonsterLifecycleContext,
    actions: MonsterLifecycleActions,
  ) => void;
  onDeath?: (
    context: MonsterLifecycleContext,
    actions: MonsterLifecycleActions,
  ) => void;
  onRevive?: (
    context: MonsterLifecycleContext,
    actions: MonsterLifecycleActions,
  ) => void;
};

export type MonsterStoreState = {
  level: number;
  maxHp: number;
  hp: number;
  isDead: boolean;
  setLevel: (level: number, nextMaxHp: number) => void;
  setMaxHp: (maxHp: number) => void;
  setHp: (hp: number) => void;
  takePercentDamage: (percentOfMax: number) => void;
  restoreFull: () => void;
};

export type MonsterLifecycleActions = Pick<
  MonsterStoreState,
  "setLevel" | "setMaxHp" | "setHp" | "takePercentDamage" | "restoreFull"
>;
