"use client";

import { createMonsterAnimation } from "../shared/MonsterAnimation.hook";
import { FIRE_WORM_ANIMATION_CONFIG } from "./FireWorm.constants";
import "./FireWorm.style.css";

const { MonsterAnimation, useMonsterAnimation } = createMonsterAnimation(
  FIRE_WORM_ANIMATION_CONFIG,
);

export default MonsterAnimation;
export const useFireWormAnimation = useMonsterAnimation;
