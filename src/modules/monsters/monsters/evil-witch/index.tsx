"use client";

import { createMonsterAnimation } from "../../shared/monster-animation.hook";
import { ANIMATION_CONFIG } from "./constants";

const { MonsterAnimation, useMonsterAnimation } =
  createMonsterAnimation(ANIMATION_CONFIG);

export default MonsterAnimation;
export { useMonsterAnimation };
