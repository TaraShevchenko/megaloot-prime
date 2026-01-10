"use client";

import { useCallback } from "react";
import { createMonsterAnimationStore } from "./monster-animation.store";
import type {
  MonsterAnimationConfig,
  MonsterAnimationProps,
} from "./monster-animation.types";
import { MonsterAnimationUi } from "./monster-animation.ui";

export function createMonsterAnimation(config: MonsterAnimationConfig) {
  const useStore = createMonsterAnimationStore();

  function MonsterAnimation({ className, ...props }: MonsterAnimationProps) {
    return (
      <MonsterAnimationUi
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
