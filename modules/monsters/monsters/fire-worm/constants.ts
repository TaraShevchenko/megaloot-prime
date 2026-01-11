import {
  CharacteristicsEnum,
  type Characteristics,
} from "shared/types/characteristics";
import attackSprite from "./assets/attack.png";
import deathSprite from "./assets/death.png";
import getHitSprite from "./assets/get-hit.png";
import idleSprite from "./assets/idle.png";
import type { MonsterAnimationConfig } from "../../shared/monster-animation.types";

const FRAME_SIZE = 180;
const FRAME_DURATION_MS = 100;

export const ANIMATION_CONFIG: MonsterAnimationConfig = {
  frameSize: FRAME_SIZE,
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

export const CHARACTERISTICS: Characteristics = {
  base: {
    [CharacteristicsEnum.HP]: 450,
    [CharacteristicsEnum.PHYS_DEF]: 30,
    [CharacteristicsEnum.MAGIC_DEF]: 20,
    [CharacteristicsEnum.PHYS_ATK]: 50,
    [CharacteristicsEnum.MAGIC_ATK]: 50,
    [CharacteristicsEnum.CRIT_CHANCE]: 15,
    [CharacteristicsEnum.CRIT_DAMAGE]: 50,
    [CharacteristicsEnum.VAMPIRIC]: 3,
  },
  growth: {
    [CharacteristicsEnum.HP]: 50,
    [CharacteristicsEnum.PHYS_DEF]: 10,
    [CharacteristicsEnum.MAGIC_DEF]: 10,
    [CharacteristicsEnum.PHYS_ATK]: 10,
    [CharacteristicsEnum.MAGIC_ATK]: 5,
    [CharacteristicsEnum.CRIT_CHANCE]: 2,
    [CharacteristicsEnum.CRIT_DAMAGE]: 10,
    [CharacteristicsEnum.VAMPIRIC]: 2,
  },
};
