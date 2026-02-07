# Forge / Кузница (экипировка)

План функциональности “кузницы” для переработки статов предмета. Документ привязан к текущей типизации: если текст расходится с кодом — приоритет у типов.

## TL;DR
- Рарности, характеристики и список предметов берём из кода как “источник истины”; в рамках этой фичи **не добавляем** новые рарности и **не вводим** новые типы оружия/экипировки.
- “Кузница” меняет только **аффиксы** (доп. статы) предмета:
  - **красный камень**: добавляет/заменяет *тип* стата;
  - **синий камень**: рероллит *значение* стата, не меняя тип.
- “Слоты 1–6” — это правило дизайна/UX; текущая модель статов как `Record` не хранит порядок, поэтому для слотов нужно добавить структуру данных.

## Источники истины (текущий код)
- `src/shared/types/rarity.ts`: `RarityEnum`, `RARITY_ORDER`, `RARITY_LABELS`
- `src/shared/types/characteristics.ts`: `CharacteristicsEnum`, `CHARACTERISTICS_ORDER`, `CHARACTERISTIC_LABELS`
- `src/modules/equipment/shared/equipment.types.ts`: `Equipment`, `EquipmentStatRanges`, `EquipmentType`, `EquipmentId`

## Проверка: никаких “новых придуманных” рарностей/типов
Ниже перечислены **реально существующие** значения (на момент написания документа).

### Рарности (`RarityEnum`)
```ts
type RarityEnum = "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY";
```

### Характеристики (`CharacteristicsEnum`)
```ts
type CharacteristicsEnum =
  | "HP"
  | "PHYS_DEF"
  | "MAGIC_DEF"
  | "PHYS_ATK"
  | "MAGIC_ATK"
  | "CRIT_CHANCE"
  | "CRIT_DAMAGE"
  | "VAMPIRIC";
```

### Типы экипировки (`EquipmentType`)
```ts
type EquipmentType =
  | "WEAPON"
  | "ARMOR"
  | "HELMET"
  | "TROUSERS"
  | "GLOVES"
  | "RING"
  | "NECKLACE"
  | "BOOTS";
```

### ID предметов (`EquipmentId`)
```ts
type EquipmentId =
  | "SWORD"
  | "HAMMER"
  | "SCYTHE"
  | "WAND"
  | "AXE"
  | "ANCIENT_ARMOR"
  | "ANCIENT_BOOTS"
  | "ANCIENT_TROUSERS"
  | "ANCIENT_HELMET";
```

## Текущая модель статов предмета (как в типах)
`Equipment` уже содержит:
- `rarity: RarityEnum`
- `characteristics: Partial<Record<CharacteristicsEnum, number>>`
- `statRanges: EquipmentStatRanges`

`EquipmentStatRanges` задаёт, какие статы доступны на конкретном предмете для конкретной рарности, и в каких диапазонах:
```ts
type EquipmentStatRanges = Record<
  RarityEnum,
  Partial<Record<CharacteristicsEnum, [number, number]>>
>;
```

Следствия:
- рарность **не добавляет новые типы** характеристик: она только выбирает диапазоны через `statRanges[rarity]`;
- “разрешённые” статы = ключи, которые есть в `statRanges[rarity]`;
- “чем выше рарность — тем выше значения” не является гарантией типов: баланс задаётся конкретными `STAT_RANGES` в `src/modules/equipment/equipment/**/constants.ts` (например, `src/modules/equipment/equipment/weapon/wand/constants.ts`).

## Задумка “кузницы”
Кузница — UI + логика, которая применяет “камни” к предмету и изменяет его аффиксы (доп. статы).

### Ограничение по слотам
Дизайн-правило: у предмета максимум **6** аффиксов (“слоты 1–6”).

Важно: текущая модель `characteristics` как `Record`:
- не хранит порядок (нельзя однозначно сказать, какой стат “в слоте 1”);
- не хранит пустые слоты;
- не может содержать два одинаковых стата.

Если слоты принципиальны (“уровень камня = номер слота”), их нужно явно смоделировать.

## Правила кузницы (псевдологика)

### Разрешённые статы для предмета
Для выбранной `rarity` допустимы только характеристики, у которых есть диапазон:
```ts
const allowedStats = Object.keys(equipment.statRanges[equipment.rarity]);
```

### Генерация/реролл значения
- При добавлении новой характеристики или смене её типа значение генерируется заново в диапазоне `[min, max] = statRanges[rarity][statType]`.
- При реролле значения (без смены типа) диапазон **тот же**, меняется только число.

### Красный камень: добавление/замена типа (аффикс)
Назначение: управляет тем, **какие** статы стоят на предмете.

Правило:
- если целевой слот пустой — добавить стат (если не превышаем лимит 6);
- если слот занят — заменить тип стата на другой разрешённый.

После выбора `nextStatType` значение генерируется заново по `statRanges[rarity][nextStatType]`.

Ограничения:
- `nextStatType` обязан быть разрешён (должен иметь диапазон в `statRanges[rarity]`);
- если сохраняем модель без дублей — `nextStatType` должен быть уникальным среди статов предмета.

### Синий камень: реролл значения (аффикс)
Назначение: управляет тем, **насколько сильный** стат (не меняя его тип).

Правило:
- тип стата не меняется;
- значение пересчитывается заново в диапазоне `statRanges[rarity][statType]`.

## Что нужно добавить в текущую структуру проекта

### 1) Выбрать и добавить модель слотов (ключевой разрыв)
Сейчас: `characteristics: Record<stat, value>` не хранит слотность и порядок.

Варианты:

**Вариант A (рекомендуется): явные слоты**
- В `src/modules/equipment/shared/forge.types.ts`:
  - `EquipmentAffixSlot = { stat: CharacteristicsEnum; value: number } | null`
  - `EquipmentAffixes = [EquipmentAffixSlot, EquipmentAffixSlot, EquipmentAffixSlot, EquipmentAffixSlot, EquipmentAffixSlot, EquipmentAffixSlot]`
- В `src/modules/inventory/shared/inventory.types.ts` (или рядом, если предметы живут там): хранить `affixes` на инстансе предмета.
- При необходимости оставить `Record` как “вычисляемый” вид: `affixes -> characteristics` одной функцией.

**Вариант B (самый простой): отказаться от “уровень камня = слот”**
- Камни применяются “к выбранному стату” (по ключу), а не к слоту 1–6.
- Не требует хранить порядок, но меняет дизайн.

### 2) Добавить чистую доменную логику кузницы (без UI)
Добавить файл(ы) в `src/modules/equipment/shared/`:
- `forge.utils.ts`: `getAllowedStats`, `rollStatValue`, `applyRedStone`, `applyBlueStone`, валидация лимита/диапазонов/уникальности.
- `forge.types.ts`: типы для результата применения камня, ошибок валидации, слотов и т.п.

Рекомендация: переиспользовать `rollCharacteristicValue` из `src/shared/types/characteristics.ts` (если подходят правила округления).

### 3) Решить, где “живут” камни и как они тратятся
Сейчас инвентарь (`src/modules/inventory/shared/inventory.types.ts`) описывает только предметы-экипировку.

Если камни — предметы инвентаря:
- расширить модель `InventoryItem` до discriminated union:
  - `InventoryEquipmentItem` (как сейчас)
  - `InventoryConsumableItem` (камни, материалы, валюты; со стекуемостью/количеством)
- обновить `src/modules/inventory/shared/inventory.store.ts` и UI-карточки под union-тип.

Если камни — отдельный “ресурс кузницы” (не предметы инвентаря):
- добавить store/слайс с количеством камней и списанием при применении (проще, но менее гибко).

### 4) UI (App Router)
Добавить маршрут и компоненты:
- `src/app/equipment/forge/page.tsx`
- `src/app/equipment/forge/components/*` (минимальный `"use client"` — только панели/интерактив)

### 5) Публичные экспорты модуля
- В `src/modules/equipment/index.ts` (server-safe): экспортировать типы/утилиты кузницы (чистые, без `"use client"`).
- В `src/modules/equipment/client.ts`: экспортировать клиентские компоненты/хуки/сторы кузницы (если появятся).
