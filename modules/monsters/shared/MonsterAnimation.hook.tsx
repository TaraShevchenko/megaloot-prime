"use client";

import { useCallback } from "react";
import { MonsterAnimationUI } from "./MonsterAnimation.ui";
import { createMonsterAnimationStore } from "./MonsterAnimation.store";
import type {
  MonsterAnimationConfig,
  MonsterAnimationProps,
} from "./MonsterAnimation.types";

export function createMonsterAnimation(config: MonsterAnimationConfig) {
  const useStore = createMonsterAnimationStore();

  function MonsterAnimation(props: MonsterAnimationProps) {
    return <MonsterAnimationUI {...props} config={config} useStore={useStore} />;
  }

  function useMonsterAnimation() {
    const request = useStore((state) => state.request);
    const playAttack = useCallback(() => request("attack"), [request]);
    const playDeath = useCallback(() => request("death"), [request]);
    const playGetHit = useCallback(() => request("getHit"), [request]);

    return {
      Monster: MonsterAnimation,
      playAttack,
      playDeath,
      playGetHit,
    };
  }

  return { MonsterAnimation, useMonsterAnimation };
}
