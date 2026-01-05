"use client";

import { useEvilWitchAnimation } from "./evil-witch/EvilWitch";
import { useFireWormAnimation } from "./fire-worm/FireWorm";

export enum MonsterId {
  EvilWitch = "evil-witch",
  FireWorm = "fire-worm",
}

type MonsterAnimationHookResult = ReturnType<typeof useEvilWitchAnimation>;

export function useMonsterAnimation(
  monsterId: MonsterId,
): MonsterAnimationHookResult {
  const evilWitch = useEvilWitchAnimation();
  const fireWorm = useFireWormAnimation();

  if (monsterId === MonsterId.EvilWitch) {
    return evilWitch;
  }

  return fireWorm;
}
