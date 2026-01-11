import {
  CharacteristicsEnum,
  type Characteristics,
} from "shared/types/characteristics";
import attackSprite from "./assets/attack.png";
import deathSprite from "./assets/death.png";
import getHitSprite from "./assets/get-hit.png";
import idleSprite from "./assets/idle.png";
import type { MonsterAnimationConfig } from "../../shared/monster-animation.types";

const FRAME_SIZE = 200;
const FRAME_DURATION_MS = 100;

export const ANIMATION_CONFIG: MonsterAnimationConfig = {
  frameSize: FRAME_SIZE,
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

export const CHARACTERISTICS: Characteristics = {
  base: {
    [CharacteristicsEnum.HP]: 70,
    [CharacteristicsEnum.PHYS_DEF]: 5,
    [CharacteristicsEnum.MAGIC_DEF]: 0,
    [CharacteristicsEnum.PHYS_ATK]: 25,
    [CharacteristicsEnum.MAGIC_ATK]: 0,
    [CharacteristicsEnum.CRIT_CHANCE]: 10,
    [CharacteristicsEnum.CRIT_DAMAGE]: 30,
    [CharacteristicsEnum.VAMPIRIC]: 2,
  },
  growth: {
    [CharacteristicsEnum.HP]: 30,
    [CharacteristicsEnum.PHYS_DEF]: 1,
    [CharacteristicsEnum.MAGIC_DEF]: 1,
    [CharacteristicsEnum.PHYS_ATK]: 10,
    [CharacteristicsEnum.MAGIC_ATK]: 2,
    [CharacteristicsEnum.CRIT_CHANCE]: 1,
    [CharacteristicsEnum.CRIT_DAMAGE]: 5,
    [CharacteristicsEnum.VAMPIRIC]: 1,
  },
};
