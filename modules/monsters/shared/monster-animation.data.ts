"use client";

import { useMonsterAnimation as useEvilWitchAnimation } from "../monsters/evil-witch";
import { useMonsterAnimation as useFireWormAnimation } from "../monsters/fire-worm";
import { useMonsterAnimation as useKnightAnimation } from "../monsters/knight";
import { useMonsterAnimation as useOrkAnimation } from "../monsters/ork";
import { MonsterEnum } from "./monsters.types";
import type { MonsterId } from "./monsters.types";

type MonsterAnimationHookResult = ReturnType<typeof useEvilWitchAnimation>;
type MonsterAnimationHook = () => MonsterAnimationHookResult;

const monsterAnimationHooks: Record<MonsterId, MonsterAnimationHook> = {
  [MonsterEnum.EVIL_WITCH]: useEvilWitchAnimation,
  [MonsterEnum.FIRE_WORM]: useFireWormAnimation,
  [MonsterEnum.ORK]: useOrkAnimation,
  [MonsterEnum.KNIGHT]: useKnightAnimation,
};

export function useMonsterAnimation(
  monsterId: MonsterId,
): MonsterAnimationHookResult {
  return monsterAnimationHooks[monsterId]();
}
