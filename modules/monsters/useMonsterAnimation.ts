"use client";

import { useKnightAnimation } from "modules/monsters/knight/Knight";
import { useEvilWitchAnimation } from "./evil-witch/EvilWitch";
import { useFireWormAnimation } from "./fire-worm/FireWorm";
import { useOrkAnimation } from "./ork/Ork";

export enum MonsterId {
  EvilWitch = "evil-witch",
  FireWorm = "fire-worm",
  Ork = "ork",
  Knight = "knight",
}

type MonsterAnimationHookResult = ReturnType<typeof useEvilWitchAnimation>;

export function useMonsterAnimation(
  monsterId: MonsterId,
): MonsterAnimationHookResult {
  const evilWitch = useEvilWitchAnimation();
  const fireWorm = useFireWormAnimation();
  const ork = useOrkAnimation();
  const knight = useKnightAnimation();

  const monsters = {
    [MonsterId.EvilWitch]: evilWitch,
    [MonsterId.FireWorm]: fireWorm,
    [MonsterId.Ork]: ork,
    [MonsterId.Knight]: knight,
  };

  return monsters[monsterId];
}
