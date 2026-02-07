import { CharacteristicsEnum } from "@/shared/types/characteristics";

import evilWitchAttack from "../assets/evil-witch/attack.png";
import evilWitchDeath from "../assets/evil-witch/death.png";
import evilWitchGetHit from "../assets/evil-witch/get-hit.png";
import evilWitchIdle from "../assets/evil-witch/idle.png";
import fireWormAttack from "../assets/fire-worm/attack.png";
import fireWormDeath from "../assets/fire-worm/death.png";
import fireWormGetHit from "../assets/fire-worm/get-hit.png";
import fireWormIdle from "../assets/fire-worm/idle.png";
import knightAttack from "../assets/knight/attack.png";
import knightDeath from "../assets/knight/death.png";
import knightGetHit from "../assets/knight/get-hit.png";
import knightIdle from "../assets/knight/idle.png";
import orkAttack from "../assets/ork/attack.png";
import orkDeath from "../assets/ork/death.png";
import orkGetHit from "../assets/ork/get-hit.png";
import orkIdle from "../assets/ork/idle.png";
import type { MonsterDefinition, MonsterId } from "./types";
import { MonsterEnum } from "./types";
import { formatMonsterName } from "./utils";

export const MONSTERS: MonsterDefinition[] = [
  {
    id: MonsterEnum.EVIL_WITCH,
    name: formatMonsterName(MonsterEnum.EVIL_WITCH),
    level: 1,
    frameSize: 280,
    sprites: {
      idle: evilWitchIdle,
      attack: evilWitchAttack,
      death: evilWitchDeath,
      getHit: evilWitchGetHit,
    },
    animations: {
      idle: { frames: 10, durationMs: 1000 },
      attack: { frames: 13, durationMs: 1300 },
      death: { frames: 18, durationMs: 1800 },
      getHit: { frames: 3, durationMs: 500 },
    },
    characteristics: {
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
    },
  },
  {
    id: MonsterEnum.FIRE_WORM,
    name: formatMonsterName(MonsterEnum.FIRE_WORM),
    level: 1,
    frameSize: 180,
    sprites: {
      idle: fireWormIdle,
      attack: fireWormAttack,
      death: fireWormDeath,
      getHit: fireWormGetHit,
    },
    animations: {
      idle: { frames: 9, durationMs: 900 },
      attack: { frames: 16, durationMs: 1600 },
      death: { frames: 8, durationMs: 800 },
      getHit: { frames: 3, durationMs: 300 },
    },
    characteristics: {
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
    },
  },
  {
    id: MonsterEnum.KNIGHT,
    name: formatMonsterName(MonsterEnum.KNIGHT),
    level: 1,
    frameSize: 200,
    sprites: {
      idle: knightIdle,
      attack: knightAttack,
      death: knightDeath,
      getHit: knightGetHit,
    },
    animations: {
      idle: { frames: 6, durationMs: 600 },
      attack: { frames: 6, durationMs: 600 },
      death: { frames: 4, durationMs: 400 },
      getHit: { frames: 4, durationMs: 250 },
    },
    characteristics: {
      base: {
        [CharacteristicsEnum.HP]: 50,
        [CharacteristicsEnum.PHYS_DEF]: 15,
        [CharacteristicsEnum.MAGIC_DEF]: 0,
        [CharacteristicsEnum.PHYS_ATK]: 25,
        [CharacteristicsEnum.MAGIC_ATK]: 0,
        [CharacteristicsEnum.CRIT_CHANCE]: 10,
        [CharacteristicsEnum.CRIT_DAMAGE]: 30,
        [CharacteristicsEnum.VAMPIRIC]: 2,
      },
      growth: {
        [CharacteristicsEnum.HP]: 25,
        [CharacteristicsEnum.PHYS_DEF]: 2,
        [CharacteristicsEnum.MAGIC_DEF]: 1,
        [CharacteristicsEnum.PHYS_ATK]: 5,
        [CharacteristicsEnum.MAGIC_ATK]: 1,
        [CharacteristicsEnum.CRIT_CHANCE]: 1,
        [CharacteristicsEnum.CRIT_DAMAGE]: 5,
        [CharacteristicsEnum.VAMPIRIC]: 1,
      },
    },
  },
  {
    id: MonsterEnum.ORK,
    name: formatMonsterName(MonsterEnum.ORK),
    level: 1,
    frameSize: 200,
    sprites: {
      idle: orkIdle,
      attack: orkAttack,
      death: orkDeath,
      getHit: orkGetHit,
    },
    animations: {
      idle: { frames: 6, durationMs: 600 },
      attack: { frames: 6, durationMs: 600 },
      death: { frames: 4, durationMs: 400 },
      getHit: { frames: 4, durationMs: 250 },
    },
    characteristics: {
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
    },
  },
];

export const MONSTER_BY_ID = Object.fromEntries(
  MONSTERS.map((monster) => [monster.id, monster]),
) as Record<MonsterId, MonsterDefinition>;


