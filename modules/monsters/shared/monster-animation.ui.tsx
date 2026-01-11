"use client";

import { useId, useMemo } from "react";
import { cn } from "shared/utils/cn";
import type { StoreApi, UseBoundStore } from "zustand";
import type {
  MonsterAnimationConfig,
  MonsterAnimationProps,
  MonsterAnimationState,
} from "./monster-animation.types";
import {
  getMonsterKeyframeBase,
  getMonsterKeyframesCss,
} from "./monsters.utils";

type MonsterAnimationUIProps = MonsterAnimationProps & {
  config: MonsterAnimationConfig;
  useStore: UseBoundStore<StoreApi<MonsterAnimationState>>;
};

export function MonsterAnimationUi({
  config,
  useStore,
  className,
  title,
}: MonsterAnimationUIProps) {
  // Store-driven animation state and handlers.
  const animation = useStore((state) => state.animation);
  const playId = useStore((state) => state.playId);
  const startQueued = useStore((state) => state.startQueued);
  const finish = useStore((state) => state.finish);

  // Derived config values for display and layout.
  const data = config.animations[animation];
  const baseClassName = cn("block bg-no-repeat", className);
  const displayTitle = title ?? config.defaultTitle ?? "Monster";
  const frameSize = `${config.frameSize}px`;

  // Stable keyframe naming and generated CSS.
  const rawId = useId();
  const keyframeBase = getMonsterKeyframeBase(rawId);
  const keyframesCss = useMemo(() => {
    return getMonsterKeyframesCss(config.animations, keyframeBase);
  }, [config.animations, keyframeBase]);
  const keyframesStyle = <style>{keyframesCss}</style>;

  // Base inline style for current animation.
  const baseStyle = {
    width: frameSize,
    height: frameSize,
    backgroundImage: `url(${data.sprite.src})`,
    backgroundSize: `${data.sheetWidth}px ${frameSize}`,
    animationName: `${keyframeBase}-${animation}`,
    animationDuration: `${data.durationMs}ms`,
    animationTimingFunction: `steps(${data.frames})`,
  };

  if (animation === "idle") {
    return (
      <>
        {keyframesStyle}
        <div
          key={playId}
          className={baseClassName}
          role="img"
          aria-label={displayTitle}
          onAnimationIteration={startQueued}
          onAnimationStart={startQueued}
          style={{
            ...baseStyle,
            animationIterationCount: "infinite",
          }}
        />
      </>
    );
  }

  const expected = animation;
  return (
    <>
      {keyframesStyle}
      <div
        key={playId}
        className={baseClassName}
        role="img"
        aria-label={displayTitle}
        onAnimationEnd={() => finish(expected)}
        style={{
          ...baseStyle,
          animationIterationCount: 1,
          animationFillMode: "forwards",
        }}
      />
    </>
  );
}
