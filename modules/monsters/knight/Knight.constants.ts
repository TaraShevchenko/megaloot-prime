import { CharacteristicsEnum } from "shared/types";
import attackSprite from "./assets/sprites/attack.png";
import deathSprite from "./assets/sprites/death.png";
import getHitSprite from "./assets/sprites/get-hit.png";
import idleSprite from "./assets/sprites/idle.png";
import type { MonsterAnimationConfig } from "../shared/MonsterAnimation.types";
import { createRandomCharacteristics } from "../shared/MonsterStats";
import type { MonsterStatRanges } from "../shared/MonsterStats";

const FRAME_SIZE = 200;
const FRAME_DURATION_MS = 100;

export const KNIGHT_ANIMATION_CONFIG: MonsterAnimationConfig = {
  keyframePrefix: "knight",
  frameSize: FRAME_SIZE,
  defaultTitle: "Knightrk",
  animations: {
    idle: {
      sprite: idleSprite,
      frames: 6,
      sheetWidth: 1200,
      durationMs: 6 * FRAME_DURATION_MS,
    },
    attack: {
      sprite: attackSprite,
      frames: 6,
      sheetWidth: 1200,
      durationMs: 6 * FRAME_DURATION_MS,
    },
    death: {
      sprite: deathSprite,
      frames: 4,
      sheetWidth: 800,
      durationMs: 4 * FRAME_DURATION_MS,
    },
    getHit: {
      sprite: getHitSprite,
      frames: 4,
      sheetWidth: 800,
      durationMs: 250,
    },
  },
};

const KNIGHT_STAT_RANGES: MonsterStatRanges = {
  base: {
    [CharacteristicsEnum.HP]: [50, 50],
    [CharacteristicsEnum.MP]: [20, 20],
    [CharacteristicsEnum.PHYS_RESIST]: [15, 15],
    [CharacteristicsEnum.MAGIC_RESIST]: [0, 0],
    [CharacteristicsEnum.PHYS_ATK]: [25, 25],
    [CharacteristicsEnum.MAGIC_ATK]: [0, 0],
    [CharacteristicsEnum.CRIT_CHANCE]: [10, 10],
    [CharacteristicsEnum.CRIT_DAMAGE]: [30, 30],
    [CharacteristicsEnum.ACCURACY]: [50, 50],
    [CharacteristicsEnum.EVASION]: [5, 5],
    [CharacteristicsEnum.VAMPIRIC]: [2, 2],
  },
  growth: {
    [CharacteristicsEnum.HP]: [25, 25],
    [CharacteristicsEnum.MP]: [10, 10],
    [CharacteristicsEnum.PHYS_RESIST]: [2, 2],
    [CharacteristicsEnum.MAGIC_RESIST]: [1, 1],
    [CharacteristicsEnum.PHYS_ATK]: [5, 5],
    [CharacteristicsEnum.MAGIC_ATK]: [1, 1],
    [CharacteristicsEnum.CRIT_CHANCE]: [1, 1],
    [CharacteristicsEnum.CRIT_DAMAGE]: [5, 5],
    [CharacteristicsEnum.ACCURACY]: [2, 2],
    [CharacteristicsEnum.EVASION]: [2, 2],
    [CharacteristicsEnum.VAMPIRIC]: [1, 1],
  },
};

export const KNIGHT_CHARACTERISTICS = createRandomCharacteristics(
  1107,
  KNIGHT_STAT_RANGES,
);
