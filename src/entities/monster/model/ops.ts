import { CharacteristicsEnum, getScaledCharacteristics } from "@/shared/types/characteristics";

import type { MonsterDefinition, MonsterState } from "./types";

export const createMonsterState = (definition: MonsterDefinition): MonsterState => {
  const scaled = getScaledCharacteristics(definition.characteristics, definition.level);
  const maxHp = Math.max(1, Math.round(scaled[CharacteristicsEnum.HP] ?? 1));

  return {
    id: definition.id,
    level: definition.level,
    maxHp,
    currentHp: maxHp,
    alive: true,
  };
};


