"use client";

import { createMonsterAnimation } from "../shared/MonsterAnimation.hook";
import { EVIL_WITCH_ANIMATION_CONFIG } from "./EvilWitch.constants";
import "./EvilWitch.style.css";

const { MonsterAnimation, useMonsterAnimation } = createMonsterAnimation(
  EVIL_WITCH_ANIMATION_CONFIG,
);

export default MonsterAnimation;
export const useEvilWitchAnimation = useMonsterAnimation;
