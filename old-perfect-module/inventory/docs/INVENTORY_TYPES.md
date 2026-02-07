# Типы модуля `inventory`

Источник типов: `src/modules/inventory/shared/inventory.types.ts`.

См. также: `src/modules/inventory/docs/INVENTORY_OVERVIEW.md`.

## Зависимости доменной модели

- `modules/equipment`: `Equipment`, `EquipmentType` — инвентарь хранит экземпляры экипировки.
- `shared/types/characteristics`: `CharacteristicsEnum` — ключи для ролла статов.
- `next/image`: `StaticImageData` — тип для `skin` (спрайт/иконка предмета).

## `InventoryItem`

Файл: `src/modules/inventory/shared/inventory.types.ts`.

```ts
export type InventoryItem = Equipment & {
  instanceId: string;
  rolledStats: Partial<Record<CharacteristicsEnum, number>>;
  skin: StaticImageData;
};
```

Семантика полей:

- `Equipment` (из `modules/equipment`) задаёт базовые поля предмета: `id`, `type`, `name`, `rarity`, `statRanges`, `characteristics`, и т.д.
- `instanceId` — уникальный id экземпляра (используется в drag-and-drop как `text/plain` и для отладки).
- `rolledStats` — «выпавшие» статы для конкретного экземпляра.
- `skin` — выбранный спрайт/иконка для текущей редкости.

Примечание: в текущей реализации генератора (`createRandomInventoryItem`) `characteristics` и `rolledStats` синхронизированы (фактически одно и то же содержимое). Если будут разные источники статов, важно определить, какое поле является source of truth.

## `InventorySlot` и `InventoryType`

```ts
export type InventorySlot = InventoryItem | undefined;

export type InventoryType = {
  slots: InventorySlot[];
  slotDefinitions: InventorySlotDefinition[];
};
```

Инварианты:

- `slots.length` и `slotDefinitions.length` предполагаются согласованными (особенно для UI-сетки).
- «пустой слот» — это `undefined` (не `null`).

## `InventorySlotDefinition`

```ts
export type InventorySlotDefinition = {
  id: string;
  allowedTypes?: EquipmentType[];
  label?: string;
  icon?: StaticImageData;
};
```

Назначение:

- `id` — стабильный идентификатор для ключей рендера/поиска (например `slot-1`, `weapon-1`).
- `allowedTypes` — список разрешённых типов экипировки для слота (если не задан — слот принимает любой `EquipmentType`).
- `label` / `icon` — метаданные для отображения пустого слота (в `InventorySlotCard`).

## `InventoryDragPayload`

```ts
export type InventoryDragPayload = {
  inventoryId: string;
  index: number;
};
```

Использование:

- сериализуется в JSON и кладётся в `dataTransfer` под ключом `application/x-inventory-item`;
- `inventoryId` должен совпадать с `InventoryState.id` для корректного определения «внутри/между» инвентарями;
- `index` — позиция слота в `slots[]`.

## Стор (Zustand): `InventoryState`

Источник: `src/modules/inventory/shared/inventory.store.ts`.

Ключевые поля состояния:

- `id: string` — идентификатор инвентаря (например `backpack`, `character`).
- `slots`, `slotDefinitions` — данные инвентаря.
- `dragIndex`, `hoverIndex` — UI-состояние drag-and-drop.
- `notice: string | null` — сообщение для пользователя.

Ключевые операции:

- `addItem(item)` — добавляет в первый свободный совместимый слот.
- `placeItem(index, item) -> boolean` — пытается поставить в конкретный слот (используется при переносе между инвентарями).
- `dropOnSlot(targetIndex)` — swap внутри одного инвентаря с проверкой ограничений слотов.

## Инстансы стора (hooks)

Источник: `src/modules/inventory/shared/inventory.hooks.ts`.

Текущие инстансы:

- `useInventoryStore` — «рюкзак» (20 универсальных слотов).
- `useCharacterInventoryStore` — «экипировка персонажа» (слоты с `allowedTypes` и иконками из `modules/equipment`).

Реэкспорт для UI/страниц: `modules/inventory/client`.
