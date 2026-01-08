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
    [CharacteristicsEnum.HP]: [450, 450],
    [CharacteristicsEnum.MP]: [25, 25],
    [CharacteristicsEnum.PHYS_RESIST]: [30, 30],
    [CharacteristicsEnum.MAGIC_RESIST]: [20, 20],
    [CharacteristicsEnum.PHYS_ATK]: [50, 50],
    [CharacteristicsEnum.MAGIC_ATK]: [50, 50],
    [CharacteristicsEnum.CRIT_CHANCE]: [15, 15],
    [CharacteristicsEnum.CRIT_DAMAGE]: [50, 50],
    [CharacteristicsEnum.ACCURACY]: [50, 50],
    [CharacteristicsEnum.EVASION]: [15, 15],
    [CharacteristicsEnum.VAMPIRIC]: [3, 3],
  },
  growth: {
    [CharacteristicsEnum.HP]: [50, 50],
    [CharacteristicsEnum.MP]: [10, 10],
    [CharacteristicsEnum.PHYS_RESIST]: [10, 10],
    [CharacteristicsEnum.MAGIC_RESIST]: [10, 10],
    [CharacteristicsEnum.PHYS_ATK]: [10, 10],
    [CharacteristicsEnum.MAGIC_ATK]: [5, 5],
    [CharacteristicsEnum.CRIT_CHANCE]: [5, 1],
    [CharacteristicsEnum.CRIT_DAMAGE]: [10, 10],
    [CharacteristicsEnum.ACCURACY]: [5, 5],
    [CharacteristicsEnum.EVASION]: [5, 5],
    [CharacteristicsEnum.VAMPIRIC]: [2, 2],
  },
};

export const FIRE_WORM_CHARACTERISTICS = createRandomCharacteristics(
  2051,
  FIRE_WORM_STAT_RANGES,
);
