"use client";

import type { StoreApi, UseBoundStore } from "zustand";
import { cn } from "shared/utils/cn";
import type {
  MonsterAnimationConfig,
  MonsterAnimationProps,
  MonsterAnimationState,
} from "./MonsterAnimation.types";

type MonsterAnimationUIProps = MonsterAnimationProps & {
  config: MonsterAnimationConfig;
  useStore: UseBoundStore<StoreApi<MonsterAnimationState>>;
};

export function MonsterAnimationUI({
  config,
  useStore,
  className,
  title,
}: MonsterAnimationUIProps) {
  const animation = useStore((state) => state.animation);
  const playId = useStore((state) => state.playId);
  const startQueued = useStore((state) => state.startQueued);
  const finish = useStore((state) => state.finish);
  const data = config.animations[animation];
  const baseClassName = cn("bg-no-repeat", className);
  const displayTitle = title ?? config.defaultTitle ?? "Monster";
  const frameSize = `${config.frameSize}px`;

  if (animation === "idle") {
    return (
      <div
        key={playId}
        className={baseClassName}
        role="img"
        aria-label={displayTitle}
        onAnimationIteration={startQueued}
        onAnimationStart={startQueued}
        style={{
          width: frameSize,
          height: frameSize,
          backgroundImage: `url(${data.sprite.src})`,
          backgroundSize: `${data.sheetWidth}px ${frameSize}`,
          animation: `${config.keyframePrefix}-idle ${data.durationMs}ms steps(${data.frames}) infinite`,
        }}
      />
    );
  }

  const expected = animation;
  return (
    <div
      key={playId}
      className={baseClassName}
      role="img"
      aria-label={displayTitle}
      onAnimationEnd={() => finish(expected)}
      style={{
        width: frameSize,
        height: frameSize,
        backgroundImage: `url(${data.sprite.src})`,
        backgroundSize: `${data.sheetWidth}px ${frameSize}`,
        animation: `${config.keyframePrefix}-${animation} ${data.durationMs}ms steps(${data.frames}) 1`,
        animationFillMode: "forwards",
      }}
    />
  );
}
