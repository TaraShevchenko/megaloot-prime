# Гайд по добавлению монстра

Этот гайд объясняет, как добавить новый модуль монстра в `modules/monsters`.

## 1) Создать папку монстра
- Создайте `modules/monsters/<monster-id>/` в kebab-case (например, `ice-golem`).
- Добавьте `assets/` со спрайт-листами: `idle.png`, `attack.png`, `get-hit.png`, `death.png`.
- Каждый спрайт-лист — горизонтальная лента кадров. Убедитесь, что `sheetWidth = frameSize * frames`.

## 2) Добавить константы
Создайте `modules/monsters/<monster-id>/constants.ts`:

```ts
import { CharacteristicsEnum, type MonsterCharacteristics } from "shared/types";
import idleSprite from "./assets/idle.png";
import attackSprite from "./assets/attack.png";
import getHitSprite from "./assets/get-hit.png";
import deathSprite from "./assets/death.png";
import type { MonsterAnimationConfig } from "../shared/MonsterAnimation.types";

const FRAME_SIZE = 200;
const FRAME_DURATION_MS = 100;

export const ANIMATION_CONFIG: MonsterAnimationConfig = {
  frameSize: FRAME_SIZE,
  animations: {
    idle: {
      sprite: idleSprite,
      frames: 8,
      sheetWidth: FRAME_SIZE * 8,
      durationMs: 8 * FRAME_DURATION_MS,
    },
    attack: {
      sprite: attackSprite,
      frames: 10,
      sheetWidth: FRAME_SIZE * 10,
      durationMs: 10 * FRAME_DURATION_MS,
    },
    death: {
      sprite: deathSprite,
      frames: 12,
      sheetWidth: FRAME_SIZE * 12,
      durationMs: 12 * FRAME_DURATION_MS,
    },
    getHit: {
      sprite: getHitSprite,
      frames: 4,
      sheetWidth: FRAME_SIZE * 4,
      durationMs: 4 * FRAME_DURATION_MS,
    },
  },
  defaultTitle: "Ice Golem",
};

export const CHARACTERISTICS: MonsterCharacteristics = {
  base: {
    [CharacteristicsEnum.HP]: 200,
    [CharacteristicsEnum.MP]: 50,
    [CharacteristicsEnum.PHYS_RESIST]: 20,
    [CharacteristicsEnum.MAGIC_RESIST]: 10,
    [CharacteristicsEnum.PHYS_ATK]: 25,
    [CharacteristicsEnum.MAGIC_ATK]: 5,
    [CharacteristicsEnum.CRIT_CHANCE]: 5,
    [CharacteristicsEnum.CRIT_DAMAGE]: 25,
    [CharacteristicsEnum.ACCURACY]: 30,
    [CharacteristicsEnum.EVASION]: 10,
    [CharacteristicsEnum.VAMPIRIC]: 0,
  },
  growth: {
    [CharacteristicsEnum.HP]: 30,
    [CharacteristicsEnum.MP]: 8,
    [CharacteristicsEnum.PHYS_RESIST]: 2,
    [CharacteristicsEnum.MAGIC_RESIST]: 1,
    [CharacteristicsEnum.PHYS_ATK]: 3,
    [CharacteristicsEnum.MAGIC_ATK]: 1,
    [CharacteristicsEnum.CRIT_CHANCE]: 1,
    [CharacteristicsEnum.CRIT_DAMAGE]: 3,
    [CharacteristicsEnum.ACCURACY]: 2,
    [CharacteristicsEnum.EVASION]: 1,
    [CharacteristicsEnum.VAMPIRIC]: 0,
  },
};
```

Примечания:
- `defaultTitle` опционален и используется как aria-label для спрайта.
- Держите `frameSize`, `frames` и `sheetWidth` согласованными с артами.

## 3) Добавить точку входа монстра
Создайте `modules/monsters/<monster-id>/index.tsx`:

```tsx
"use client";

import { createMonsterAnimation } from "../shared/MonsterAnimation.hook";
import { ANIMATION_CONFIG } from "./constants";

const { MonsterAnimation, useMonsterAnimation } = createMonsterAnimation(
  ANIMATION_CONFIG,
);

export default MonsterAnimation;
export { useMonsterAnimation };
```

## 4) Зарегистрировать монстра
Обновите `modules/monsters/index.ts`:
- Добавьте новый элемент в `MonsterId`.
- Импортируйте новый хук `useMonsterAnimation`.
- Импортируйте `ANIMATION_CONFIG` и `CHARACTERISTICS`.
- Добавьте новый элемент в `MONSTERS` с `frameSize: ANIMATION_CONFIG.frameSize`.
- Добавьте новый хук в `monsterAnimationHooks`.

## 5) Проверить в UI
- Запустите приложение: `npm run dev`.
- Откройте `http://localhost:3000/monsters` и убедитесь, что монстр отображается.
