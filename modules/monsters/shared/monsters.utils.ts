import type {
  AnimationDefinition,
  AnimationName,
} from "./monster-animation.types";
import type { MonsterId } from "./monsters.types";

export const formatMonsterName = (monsterId: MonsterId) =>
  monsterId.replace(/-/g, " ").replace(/^\w/, (match) => match.toUpperCase());

export const getMonsterKeyframeBase = (rawId: string) => {
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  return safeId ? `monster-${safeId}` : "monster";
};

export const getMonsterKeyframesCss = (
  animations: Record<AnimationName, AnimationDefinition>,
  keyframeBase: string,
) => {
  const entries = Object.entries(animations) as Array<
    [AnimationName, AnimationDefinition]
  >;
  return entries
    .map(
      ([name, def]) =>
        `@keyframes ${keyframeBase}-${name} { from { background-position: 0 0; } to { background-position: -${def.sheetWidth}px 0; } }`,
    )
    .join("\n");
};
