import {
  EVIL_WITCH_ANIMATION_CONFIG,
  EVIL_WITCH_CHARACTERISTICS,
} from "modules/monsters/evil-witch/EvilWitch.constants";
import {
  FIRE_WORM_ANIMATION_CONFIG,
  FIRE_WORM_CHARACTERISTICS,
} from "modules/monsters/fire-worm/FireWorm.constants";
import {
  KNIGHT_ANIMATION_CONFIG,
  KNIGHT_CHARACTERISTICS,
} from "modules/monsters/knight/Knight.constants";
import {
  ORK_ANIMATION_CONFIG,
  ORK_CHARACTERISTICS,
} from "modules/monsters/ork/Ork.constants";
import { MonsterId } from "modules/monsters/useMonsterAnimation";
import type { MonsterCharacteristics } from "shared/types";

export type MonsterEntry = {
  id: MonsterId;
  name: string;
  characteristics: MonsterCharacteristics;
  frameSize: number;
};

export const MONSTERS: MonsterEntry[] = [
  {
    id: MonsterId.EvilWitch,
    name: EVIL_WITCH_ANIMATION_CONFIG.defaultTitle ?? "Evil witch",
    characteristics: EVIL_WITCH_CHARACTERISTICS,
    frameSize: EVIL_WITCH_ANIMATION_CONFIG.frameSize,
  },
  {
    id: MonsterId.FireWorm,
    name: FIRE_WORM_ANIMATION_CONFIG.defaultTitle ?? "Fire worm",
    characteristics: FIRE_WORM_CHARACTERISTICS,
    frameSize: FIRE_WORM_ANIMATION_CONFIG.frameSize,
  },
  {
    id: MonsterId.Ork,
    name: ORK_ANIMATION_CONFIG.defaultTitle ?? "Ork",
    characteristics: ORK_CHARACTERISTICS,
    frameSize: ORK_ANIMATION_CONFIG.frameSize,
  },
  {
    id: MonsterId.Knight,
    name: KNIGHT_ANIMATION_CONFIG.defaultTitle ?? "Ork",
    characteristics: KNIGHT_CHARACTERISTICS,
    frameSize: KNIGHT_ANIMATION_CONFIG.frameSize,
  },
];
