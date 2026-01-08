"use client";

import { createMonsterAnimation } from "../shared/MonsterAnimation.hook";
import { ORK_ANIMATION_CONFIG } from "./Ork.constants";
import "./Ork.style.css";

const { MonsterAnimation, useMonsterAnimation } =
  createMonsterAnimation(ORK_ANIMATION_CONFIG);

export default MonsterAnimation;
export const useOrkAnimation = useMonsterAnimation;
