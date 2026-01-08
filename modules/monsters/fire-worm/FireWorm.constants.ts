import { CharacteristicsEnum } from "shared/types";
import attackSprite from "./assets/sprites/worm/attack.png";
import deathSprite from "./assets/sprites/worm/death.png";
import getHitSprite from "./assets/sprites/worm/get-hit.png";
import idleSprite from "./assets/sprites/worm/idle.png";
import type { MonsterAnimationConfig } from "../shared/MonsterAnimation.types";
import { createRandomCharacteristics } from "../shared/MonsterStats";
import type { MonsterStatRanges } from "../shared/MonsterStats";

const FRAME_SIZE = 180;
const FRAME_DURATION_MS = 100;

export const FIRE_WORM_ANIMATION_CONFIG: MonsterAnimationConfig = {
  keyframePrefix: "fire-worm",
  frameSize: FRAME_SIZE,
  defaultTitle: "Fire worm",
  animations: {
    idle: {
      sprite: idleSprite,
      frames: 9,
      sheetWidth: 1620,
      durationMs: 9 * FRAME_DURATION_MS,
    },
    attack: {
      sprite: attackSprite,
      frames: 16,
      sheetWidth: 2880,
      durationMs: 16 * FRAME_DURATION_MS,
    },
    death: {
      sprite: deathSprite,
      frames: 8,
      sheetWidth: 1440,
      durationMs: 8 * FRAME_DURATION_MS,
    },
    getHit: {
      sprite: getHitSprite,
      frames: 3,
      sheetWidth: 540,
      durationMs: 3 * FRAME_DURATION_MS,
    },
  },
};

export const FIRE_WORM_LEVEL = 10;

const FIRE_WORM_STAT_RANGES: MonsterStatRanges = {
  base: {
    [CharacteristicsEnum.HP]: [200, 3230],
    [CharacteristicsEnum.MP]: [40, 90],
    [CharacteristicsEnum.PHYS_RESIST]: [22, 48],
    [CharacteristicsEnum.MAGIC_RESIST]: [10, 24],
    [CharacteristicsEnum.PHYS_ATK]: [50, 90],
    [CharacteristicsEnum.MAGIC_ATK]: [18, 35],
    [CharacteristicsEnum.CRIT_CHANCE]: [5, 12],
    [CharacteristicsEnum.CRIT_DAMAGE]: [130, 180],
    [CharacteristicsEnum.ACCURACY]: [50, 82],
    [CharacteristicsEnum.EVASION]: [8, 20],
    [CharacteristicsEnum.VAMPIRIC]: [2, 9],
  },
  growth: {
    [CharacteristicsEnum.HP]: [12, 20],
    [CharacteristicsEnum.MP]: [3, 6],
    [CharacteristicsEnum.PHYS_RESIST]: [2, 5],
    [CharacteristicsEnum.MAGIC_RESIST]: [1, 3],
    [CharacteristicsEnum.PHYS_ATK]: [4, 8],
    [CharacteristicsEnum.MAGIC_ATK]: [1, 3],
    [CharacteristicsEnum.CRIT_CHANCE]: [1, 2],
    [CharacteristicsEnum.CRIT_DAMAGE]: [3, 6],
    [CharacteristicsEnum.ACCURACY]: [2, 5],
    [CharacteristicsEnum.EVASION]: [1, 3],
    [CharacteristicsEnum.VAMPIRIC]: [1, 2],
  },
};

export const FIRE_WORM_CHARACTERISTICS = createRandomCharacteristics(
  2051,
  FIRE_WORM_STAT_RANGES,
);
