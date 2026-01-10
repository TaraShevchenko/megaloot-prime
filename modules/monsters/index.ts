"use client";

import type { Characteristics } from "shared/characteristics";
import { useMonsterAnimation as useEvilWitchAnimation } from "./evil-witch";
import {
  ANIMATION_CONFIG as EVIL_WITCH_ANIMATION_CONFIG,
  CHARACTERISTICS as EVIL_WITCH_CHARACTERISTICS,
} from "./evil-witch/constants";
import { useMonsterAnimation as useFireWormAnimation } from "./fire-worm";
import {
  ANIMATION_CONFIG as FIRE_WORM_ANIMATION_CONFIG,
  CHARACTERISTICS as FIRE_WORM_CHARACTERISTICS,
} from "./fire-worm/constants";
import { useMonsterAnimation as useKnightAnimation } from "./knight";
import {
  ANIMATION_CONFIG as KNIGHT_ANIMATION_CONFIG,
  CHARACTERISTICS as KNIGHT_CHARACTERISTICS,
} from "./knight/constants";
import { useMonsterAnimation as useOrkAnimation } from "./ork";
import {
  ANIMATION_CONFIG as ORK_ANIMATION_CONFIG,
  CHARACTERISTICS as ORK_CHARACTERISTICS,
} from "./ork/constants";
import { formatMonsterName } from "./shared/monsters.utils";

export enum MonsterId {
  EvilWitch = "evil-witch",
  FireWorm = "fire-worm",
  Ork = "ork",
  Knight = "knight",
}

export type MonsterEntry = {
  id: MonsterId;
  name: string;
  characteristics: Characteristics;
  frameSize: number;
};

export const MONSTERS: MonsterEntry[] = [
  {
    id: MonsterId.EvilWitch,
    name: formatMonsterName(MonsterId.EvilWitch),
    characteristics: EVIL_WITCH_CHARACTERISTICS,
    frameSize: EVIL_WITCH_ANIMATION_CONFIG.frameSize,
  },
  {
    id: MonsterId.FireWorm,
    name: formatMonsterName(MonsterId.FireWorm),
    characteristics: FIRE_WORM_CHARACTERISTICS,
    frameSize: FIRE_WORM_ANIMATION_CONFIG.frameSize,
  },
  {
    id: MonsterId.Knight,
    name: formatMonsterName(MonsterId.Knight),
    characteristics: KNIGHT_CHARACTERISTICS,
    frameSize: KNIGHT_ANIMATION_CONFIG.frameSize,
  },
  {
    id: MonsterId.Ork,
    name: formatMonsterName(MonsterId.Ork),
    characteristics: ORK_CHARACTERISTICS,
    frameSize: ORK_ANIMATION_CONFIG.frameSize,
  },
];

type MonsterAnimationHookResult = ReturnType<typeof useEvilWitchAnimation>;
type MonsterAnimationHook = () => MonsterAnimationHookResult;

const monsterAnimationHooks: Record<MonsterId, MonsterAnimationHook> = {
  [MonsterId.EvilWitch]: useEvilWitchAnimation,
  [MonsterId.FireWorm]: useFireWormAnimation,
  [MonsterId.Ork]: useOrkAnimation,
  [MonsterId.Knight]: useKnightAnimation,
};

export function useMonsterAnimation(
  monsterId: MonsterId,
): MonsterAnimationHookResult {
  return monsterAnimationHooks[monsterId]();
}
