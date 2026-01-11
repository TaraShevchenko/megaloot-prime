import {
  ANIMATION_CONFIG as EVIL_WITCH_ANIMATION_CONFIG,
  CHARACTERISTICS as EVIL_WITCH_CHARACTERISTICS,
} from "modules/monsters/monsters/evil-witch/constants";
import {
  ANIMATION_CONFIG as FIRE_WORM_ANIMATION_CONFIG,
  CHARACTERISTICS as FIRE_WORM_CHARACTERISTICS,
} from "modules/monsters/monsters/fire-worm/constants";
import {
  ANIMATION_CONFIG as KNIGHT_ANIMATION_CONFIG,
  CHARACTERISTICS as KNIGHT_CHARACTERISTICS,
} from "modules/monsters/monsters/knight/constants";
import {
  ANIMATION_CONFIG as ORK_ANIMATION_CONFIG,
  CHARACTERISTICS as ORK_CHARACTERISTICS,
} from "modules/monsters/monsters/ork/constants";
import type { MonsterEntry } from "./monsters.types";
import { formatMonsterName } from "./monsters.utils";

export const MONSTER_IDS = [
  "EVIL_WITCH",
  "FIRE_WORM",
  "ORK",
  "KNIGHT",
] as const;

export const MONSTERS: MonsterEntry[] = [
  {
    id: "EVIL_WITCH",
    name: formatMonsterName("EVIL_WITCH"),
    characteristics: EVIL_WITCH_CHARACTERISTICS,
    frameSize: EVIL_WITCH_ANIMATION_CONFIG.frameSize,
    deathDurationMs: EVIL_WITCH_ANIMATION_CONFIG.animations.death.durationMs,
  },
  {
    id: "FIRE_WORM",
    name: formatMonsterName("FIRE_WORM"),
    characteristics: FIRE_WORM_CHARACTERISTICS,
    frameSize: FIRE_WORM_ANIMATION_CONFIG.frameSize,
    deathDurationMs: FIRE_WORM_ANIMATION_CONFIG.animations.death.durationMs,
  },
  {
    id: "KNIGHT",
    name: formatMonsterName("KNIGHT"),
    characteristics: KNIGHT_CHARACTERISTICS,
    frameSize: KNIGHT_ANIMATION_CONFIG.frameSize,
    deathDurationMs: KNIGHT_ANIMATION_CONFIG.animations.death.durationMs,
  },
  {
    id: "ORK",
    name: formatMonsterName("ORK"),
    characteristics: ORK_CHARACTERISTICS,
    frameSize: ORK_ANIMATION_CONFIG.frameSize,
    deathDurationMs: ORK_ANIMATION_CONFIG.animations.death.durationMs,
  },
];
