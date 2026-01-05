import attackSprite from "./assets/sprites/attack.png";
import deathSprite from "./assets/sprites/death.png";
import getHitSprite from "./assets/sprites/get-hit.png";
import idleSprite from "./assets/sprites/idle.png";
import { CharacteristicsEnum } from "shared/types";
import { createRandomCharacteristics } from "../shared/MonsterStats";
import type { MonsterStatRanges } from "../shared/MonsterStats";
import type { MonsterAnimationConfig } from "../shared/MonsterAnimation.types";

const FRAME_SIZE = 280;
const FRAME_DURATION_MS = 100;

export const EVIL_WITCH_ANIMATION_CONFIG: MonsterAnimationConfig = {
  keyframePrefix: "evil-witch",
  frameSize: FRAME_SIZE,
  defaultTitle: "Evil witch",
  animations: {
    idle: {
      sprite: idleSprite,
      frames: 10,
      sheetWidth: 2800,
      durationMs: 10 * FRAME_DURATION_MS,
    },
    attack: {
      sprite: attackSprite,
      frames: 13,
      sheetWidth: 3640,
      durationMs: 13 * FRAME_DURATION_MS,
    },
    death: {
      sprite: deathSprite,
      frames: 18,
      sheetWidth: 5040,
      durationMs: 18 * FRAME_DURATION_MS,
    },
    getHit: {
      sprite: getHitSprite,
      frames: 3,
      sheetWidth: 840,
      durationMs: 500,
    },
  },
};

export const EVIL_WITCH_LEVEL = 14;

const EVIL_WITCH_STAT_RANGES: MonsterStatRanges = {
  base: {
    [CharacteristicsEnum.HP]: [140, 220],
    [CharacteristicsEnum.MP]: [120, 200],
    [CharacteristicsEnum.PHYS_RESIST]: [12, 28],
    [CharacteristicsEnum.MAGIC_RESIST]: [18, 40],
    [CharacteristicsEnum.PHYS_ATK]: [22, 40],
    [CharacteristicsEnum.MAGIC_ATK]: [70, 120],
    [CharacteristicsEnum.CRIT_CHANCE]: [8, 18],
    [CharacteristicsEnum.CRIT_DAMAGE]: [150, 210],
    [CharacteristicsEnum.ACCURACY]: [55, 85],
    [CharacteristicsEnum.EVASION]: [14, 30],
    [CharacteristicsEnum.VAMPIRIC]: [4, 12],
  },
  growth: {
    [CharacteristicsEnum.HP]: [8, 14],
    [CharacteristicsEnum.MP]: [8, 14],
    [CharacteristicsEnum.PHYS_RESIST]: [1, 3],
    [CharacteristicsEnum.MAGIC_RESIST]: [2, 4],
    [CharacteristicsEnum.PHYS_ATK]: [2, 4],
    [CharacteristicsEnum.MAGIC_ATK]: [6, 10],
    [CharacteristicsEnum.CRIT_CHANCE]: [1, 2],
    [CharacteristicsEnum.CRIT_DAMAGE]: [4, 7],
    [CharacteristicsEnum.ACCURACY]: [2, 4],
    [CharacteristicsEnum.EVASION]: [2, 4],
    [CharacteristicsEnum.VAMPIRIC]: [1, 2],
  },
};

export const EVIL_WITCH_CHARACTERISTICS = createRandomCharacteristics(
  1107,
  EVIL_WITCH_STAT_RANGES,
);
