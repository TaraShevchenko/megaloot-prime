"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "@/shared/lib/cn";

import type {
  MonsterAnimationName,
  MonsterDefinition,
  MonsterState,
} from "../model/types";
import {
  getMonsterKeyframeBase,
  getMonsterKeyframesCss,
} from "../model/utils";

type MonsterSpriteProps = {
  definition: MonsterDefinition;
  state?: Pick<MonsterState, "id" | "currentHp" | "alive">;
  isDead?: boolean;
  className?: string;
  size?: number;
};

type MonsterAnimationState = {
  animation: MonsterAnimationName;
  queued: MonsterAnimationName | null;
  playId: number;
};

const useMonsterAnimationState = () => {
  const [state, setState] = useState<MonsterAnimationState>({
    animation: "idle",
    queued: null,
    playId: 0,
  });

  const request = useCallback((name: MonsterAnimationName) => {
    setState((prev) => ({ ...prev, queued: name }));
  }, []);

  const startQueued = useCallback(() => {
    setState((prev) => {
      if (!prev.queued || prev.animation !== "idle") {
        return prev;
      }
      return {
        animation: prev.queued,
        queued: null,
        playId: prev.playId + 1,
      };
    });
  }, []);

  const finish = useCallback((expected: MonsterAnimationName) => {
    setState((prev) => {
      if (prev.animation !== expected) {
        return prev;
      }
      return {
        ...prev,
        animation: "idle",
        playId: prev.playId + 1,
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      animation: "idle",
      queued: null,
      playId: 0,
    });
  }, []);

  return { ...state, request, startQueued, finish, reset };
};

export function MonsterSprite({
  definition,
  state,
  isDead: isDeadProp,
  className,
  size,
}: MonsterSpriteProps) {
  const { animation, playId, request, startQueued, finish, reset } =
    useMonsterAnimationState();
  const trackedState =
    state && state.id === definition.id ? state : undefined;
  const prevHpRef = useRef(trackedState?.currentHp ?? null);
  const prevAliveRef = useRef(trackedState?.alive ?? null);
  const displaySize = size ?? 128;
  const frameSize = `${displaySize}px`;
  const isDead = trackedState
    ? trackedState.currentHp <= 0 || !trackedState.alive
    : Boolean(isDeadProp);
  const currentHp = trackedState?.currentHp;
  const alive = trackedState?.alive;

  useEffect(() => {
    reset();
    prevHpRef.current = null;
    prevAliveRef.current = null;
  }, [definition.id, reset]);

  useEffect(() => {
    if (currentHp === undefined || alive === undefined) return;
    const prevHp = prevHpRef.current ?? currentHp;
    const prevAlive = prevAliveRef.current ?? alive;
    const isNowDead = currentHp <= 0 || !alive;
    const tookDamage = currentHp < prevHp;

    if (isNowDead && prevAlive) {
      request("death");
    } else if (tookDamage && !isNowDead) {
      request("getHit");
    }

    prevHpRef.current = currentHp;
    prevAliveRef.current = alive;
  }, [alive, currentHp, request]);

  const data = definition.animations[animation];
  const sprite = definition.sprites[animation];
  const sheetWidth = data.frames * displaySize;

  const rawId = useId();
  const keyframeBase = getMonsterKeyframeBase(rawId);
  const keyframesCss = useMemo(() => {
    return getMonsterKeyframesCss(
      definition.animations,
      keyframeBase,
      displaySize,
    );
  }, [definition.animations, keyframeBase, displaySize]);

  const baseStyle = {
    width: frameSize,
    height: frameSize,
    backgroundImage: `url(${sprite.src})`,
    backgroundSize: `${sheetWidth}px ${frameSize}`,
    animationName: `${keyframeBase}-${animation}`,
    animationDuration: `${data.durationMs}ms`,
    animationTimingFunction: `steps(${data.frames})`,
  };

  if (animation === "idle") {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl border border-border bg-muted p-3",
          isDead && "opacity-50 grayscale",
          className,
        )}
      >
        <style>{keyframesCss}</style>
        <div
          key={playId}
          className="block bg-no-repeat"
          role="img"
          aria-label={definition.name}
          onAnimationIteration={startQueued}
          onAnimationStart={startQueued}
          style={{
            ...baseStyle,
            animationIterationCount: "infinite",
          }}
        />
      </div>
    );
  }

  const expected = animation;
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-xl border border-border bg-muted p-3",
        isDead && "opacity-50 grayscale",
        className,
      )}
    >
      <style>{keyframesCss}</style>
      <div
        key={playId}
        className="block bg-no-repeat"
        role="img"
        aria-label={definition.name}
        onAnimationEnd={() => finish(expected)}
        style={{
          ...baseStyle,
          animationIterationCount: 1,
          animationFillMode: "forwards",
        }}
      />
    </div>
  );
}


