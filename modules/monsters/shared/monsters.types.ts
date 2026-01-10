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
};
