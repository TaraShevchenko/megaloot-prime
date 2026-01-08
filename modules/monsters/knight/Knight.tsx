"use client";

import { createMonsterAnimation } from "../shared/MonsterAnimation.hook";
import { KNIGHT_ANIMATION_CONFIG } from "./Knight.constants";
import "./Knight.style.css";

const { MonsterAnimation, useMonsterAnimation } = createMonsterAnimation(
  KNIGHT_ANIMATION_CONFIG,
);

export default MonsterAnimation;
export const useKnightAnimation = useMonsterAnimation;
