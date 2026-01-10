export type AnimationName = "idle" | "attack" | "death" | "getHit";

export type AnimationDefinition = {
  sprite: { src: string };
  frames: number;
  sheetWidth: number;
  durationMs: number;
};

export type MonsterAnimationConfig = {
  frameSize: number;
  animations: Record<AnimationName, AnimationDefinition>;
  defaultTitle?: string;
};

export type MonsterAnimationProps = {
  className?: string;
  title?: string;
};

export type MonsterAnimationState = {
  animation: AnimationName;
  queued: AnimationName | null;
  playId: number;
  request: (name: AnimationName) => void;
  startQueued: () => void;
  finish: (expected: AnimationName) => void;
};
