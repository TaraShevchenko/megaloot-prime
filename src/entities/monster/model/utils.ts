import type {
  MonsterAnimationDefinition,
  MonsterAnimationName,
  MonsterId,
} from "./types";

export const formatMonsterName = (monsterId: MonsterId) =>
  monsterId
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());

export const getMonsterKeyframeBase = (rawId: string) => {
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  return safeId ? `monster-${safeId}` : "monster";
};

export const getMonsterKeyframesCss = (
  animations: Record<MonsterAnimationName, MonsterAnimationDefinition>,
  keyframeBase: string,
  frameSize: number,
) => {
  const entries = Object.entries(animations) as Array<
    [MonsterAnimationName, MonsterAnimationDefinition]
  >;
  return entries
    .map(([name, def]) => {
      const sheetWidth = def.frames * frameSize;
      return `@keyframes ${keyframeBase}-${name} { from { background-position: 0 0; } to { background-position: -${sheetWidth}px 0; } }`;
    })
    .join("\n");
};


