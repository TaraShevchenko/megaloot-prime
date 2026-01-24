import { Characteristics } from "shared/types/characteristics";
import z from "zod";

export const MONSTER_IDS = [
  "EVIL_WITCH",
  "FIRE_WORM",
  "ORK",
  "KNIGHT",
] as const;

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
