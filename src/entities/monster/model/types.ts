import type { StaticImageData } from "next/image";
import { z } from "zod";

import type { Characteristics } from "@/shared/types/characteristics";

export const MONSTER_IDS = ["EVIL_WITCH", "FIRE_WORM", "ORK", "KNIGHT"] as const;

export const MonsterEnumSchema = z.enum(MONSTER_IDS);
export type MonsterId = z.infer<typeof MonsterEnumSchema>;
export const MonsterEnum = MonsterEnumSchema.enum;

export type MonsterAnimationName = "idle" | "attack" | "death" | "getHit";

export type MonsterAnimationDefinition = {
  frames: number;
  durationMs: number;
};

export type MonsterAnimations = Record<
  MonsterAnimationName,
  MonsterAnimationDefinition
>;

export type MonsterSprites = {
  idle: StaticImageData;
  attack: StaticImageData;
  death: StaticImageData;
  getHit: StaticImageData;
};

export type MonsterDefinition = {
  id: MonsterId;
  name: string;
  level: number;
  characteristics: Characteristics;
  frameSize: number;
  sprites: MonsterSprites;
  animations: MonsterAnimations;
};

export type MonsterState = {
  id: MonsterId;
  level: number;
  maxHp: number;
  currentHp: number;
  alive: boolean;
};


