# Гайд по добавлению экипировки

Этот гайд повторяет логику `modules/monsters` и помогает держать публичное API в порядке.

## 1) Выбрать тип и папку
- Поддерживаемые типы перечислены в `modules/equipment/shared/equipment.types.ts` (`EQUIPMENT_TYPE_ORDER`): `WEAPON`, `ARMOR`, `HELMET`, `TROUSERS`, `GLOVES`, `RING`, `NECKLACE`, `BOOTS`.
- Для каждого типа есть папка в `modules/equipment/equipment/<type>/` (например, `modules/equipment/equipment/weapon/`).

## 2) Создать модуль предмета
- Добавьте папку `modules/equipment/equipment/<type>/<equipment-id>/` в kebab-case (например, `flaming-sword`).
- Поместите в неё папку `assets/` с файлами по редкостям: `common.png`, `uncommon.png`, `rare.png`, `epic.png`, `legendary.png`.
- Создайте `constants.ts` рядом с `assets/` и опишите скины и статы:

```ts
import { CharacteristicsEnum } from "shared/types/characteristics";
import { RarityEnum } from "shared/types/rarity";
import {
  EquipmentSkinMap,
  EquipmentStatRanges,
} from "modules/equipment";
import common from "./assets/common.png";
import uncommon from "./assets/uncommon.png";
import rare from "./assets/rare.png";
import epic from "./assets/epic.png";
import legendary from "./assets/legendary.png";

export const SKIN_BY_RARITY: EquipmentSkinMap = {
  [RarityEnum.COMMON]: common,
  [RarityEnum.UNCOMMON]: uncommon,
  [RarityEnum.RARE]: rare,
  [RarityEnum.EPIC]: epic,
  [RarityEnum.LEGENDARY]: legendary,
};

export const STAT_RANGES: EquipmentStatRanges = {
  [RarityEnum.COMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [10, 20],
  },
  [RarityEnum.UNCOMMON]: {
    [CharacteristicsEnum.PHYS_ATK]: [15, 25],
  },
  [RarityEnum.RARE]: {
    [CharacteristicsEnum.PHYS_ATK]: [20, 30],
  },
  [RarityEnum.EPIC]: {
    [CharacteristicsEnum.PHYS_ATK]: [25, 35],
  },
  [RarityEnum.LEGENDARY]: {
    [CharacteristicsEnum.PHYS_ATK]: [30, 40],
  },
};
```

Примечания:
- `EquipmentStatRanges` хранит пары `[min, max]` для конкретной характеристики на каждую редкость.
- Используйте существующие картинки по редкостям или кладите новые в `assets/`.

## 3) Зарегистрировать предмет в публичном API
- Откройте `modules/equipment/shared/equipment.data.ts`.
- Импортируйте `SKIN_BY_RARITY` и `STAT_RANGES` нового предмета.
- Добавьте запись в массив типа (сейчас `weaponEquipment`, для других типов создайте аналогичную секцию):

```ts
import {
  SKIN_BY_RARITY as FLAMING_SWORD_SKINS,
  STAT_RANGES as FLAMING_SWORD_RANGES,
} from "modules/equipment/equipment/weapon/flaming-sword/constants";

const weaponEquipment: EquipmentEntry[] = [
  // ...
  {
    id: "FLAMING_SWORD",
    type: EquipmentTypeEnum.WEAPON,
    name: formatEquipmentName("FLAMING_SWORD"),
    skins: FLAMING_SWORD_SKINS,
    defaultRarity: RarityEnum.COMMON,
    statRanges: FLAMING_SWORD_RANGES,
  },
];
```

- Если добавляете новый тип, убедитесь, что он есть в `EQUIPMENT_TYPE_ORDER` и создана папка `modules/equipment/equipment/<type>/`.

## 4) Использовать публичное API
- Импортируйте из `modules/equipment`: `EQUIPMENT_ITEMS`, `EQUIPMENT_BY_TYPE`, `EQUIPMENT_TYPES`, `EquipmentId`, `EquipmentEntry`, `EquipmentTypeEnum`, `formatEquipmentName`.
- Для группировки по типу можно взять готовый `EQUIPMENT_BY_TYPE` или вызвать `groupEquipmentByType(EQUIPMENT_ITEMS)`.

## 5) Проверить визуально
- Запустите `npm run dev` и откройте `/equipment`, чтобы убедиться, что карточка отображается и переключает редкости.
