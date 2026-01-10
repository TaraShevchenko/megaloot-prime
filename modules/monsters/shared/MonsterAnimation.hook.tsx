"use client";

import { useCallback } from "react";
import { createMonsterAnimationStore } from "./MonsterAnimation.store";
import type {
  MonsterAnimationConfig,
  MonsterAnimationProps,
} from "./MonsterAnimation.types";
import { MonsterAnimationUI } from "./MonsterAnimation.ui";

export function createMonsterAnimation(config: MonsterAnimationConfig) {
  const useStore = createMonsterAnimationStore();

  function MonsterAnimation({ className, ...props }: MonsterAnimationProps) {
    return (
      <MonsterAnimationUI
        {...props}
        config={config}
        useStore={useStore}
        className={className}
      />
    );
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
