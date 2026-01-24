import {
  CharacteristicsEnum,
  type Characteristics,
} from "shared/types/characteristics";
import attackSprite from "./assets/attack.png";
import deathSprite from "./assets/death.png";
import getHitSprite from "./assets/get-hit.png";
import idleSprite from "./assets/idle.png";
import type { MonsterAnimationConfig } from "../../shared/monster-animation.types";

const FRAME_SIZE = 280;
const FRAME_DURATION_MS = 100;

export const ANIMATION_CONFIG: MonsterAnimationConfig = {
  frameSize: FRAME_SIZE,
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

export const CHARACTERISTICS: Characteristics = {
  base: {
    [CharacteristicsEnum.HP]: 250,
    [CharacteristicsEnum.PHYS_DEF]: 20,
    [CharacteristicsEnum.MAGIC_DEF]: 25,
    [CharacteristicsEnum.PHYS_ATK]: 10,
    [CharacteristicsEnum.MAGIC_ATK]: 100,
    [CharacteristicsEnum.CRIT_CHANCE]: 20,
    [CharacteristicsEnum.CRIT_DAMAGE]: 50,
    [CharacteristicsEnum.VAMPIRIC]: 5,
  },
  growth: {
    [CharacteristicsEnum.HP]: 50,
    [CharacteristicsEnum.PHYS_DEF]: 1,
    [CharacteristicsEnum.MAGIC_DEF]: 2,
    [CharacteristicsEnum.PHYS_ATK]: 1,
    [CharacteristicsEnum.MAGIC_ATK]: 5,
    [CharacteristicsEnum.CRIT_CHANCE]: 2,
    [CharacteristicsEnum.CRIT_DAMAGE]: 10,
    [CharacteristicsEnum.VAMPIRIC]: 2,
  },
};
