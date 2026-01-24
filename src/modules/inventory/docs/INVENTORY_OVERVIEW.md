# Обзор модуля `inventory`

Модуль отвечает за:

- модель «инвентарь как набор слотов»;
- client-side стор (Zustand) с drag-and-drop;
- UI-сетку слотов и поповер со статами/действиями;
- генерацию случайного предмета на базе `modules/equipment`.

Связанный документ: `src/modules/inventory/docs/INVENTORY_TYPES.md`.

## TL;DR

- Server-safe API: `modules/inventory` (типы + `createRandomInventoryItem`).
- Client API: `modules/inventory/client` (хуки стора, UI, `INVENTORY_STORE_REGISTRY`).
- Перетаскивание внутри инвентаря — swap, между инвентарями — «перемещение» (source -> target) через `storeRegistry`.

## Публичный API

### `modules/inventory` (server-safe)

Файл: `src/modules/inventory/index.ts`.

Экспортирует:

- `createRandomInventoryItem()`
- типы: `InventoryType`, `InventoryItem`, `InventorySlot`, `InventorySlotDefinition`

### `modules/inventory/client` (client-only)

Файл: `src/modules/inventory/client.ts`.

Экспортирует:

- UI: `InventoryUi`, `InventorySlotCard`, `InventoryItemCard`
- хуки стора: `useInventoryStore`, `useCharacterInventoryStore`
- `INVENTORY_STORE_REGISTRY` — реестр стора по `inventoryId` для drag-and-drop между инвентарями

Пример использования (см. `src/app/inventory/components/inventory-panel.tsx`):

```tsx
import {
  INVENTORY_STORE_REGISTRY,
  InventoryUi,
  useInventoryStore,
} from "modules/inventory/client";

<InventoryUi
  store={useInventoryStore}
  storeRegistry={INVENTORY_STORE_REGISTRY}
/>;
```

## Структура файлов (source of truth)

- `src/modules/inventory/index.ts` — server-safe публичный API.
- `src/modules/inventory/client.ts` — client API (реэкспорт UI/хуков/типов + `INVENTORY_STORE_REGISTRY`).
- `src/modules/inventory/shared/inventory.types.ts` — типы данных (слот, предмет, дефиниции слотов, payload drag-and-drop).
- `src/modules/inventory/shared/inventory.utils.ts` — генерация `InventoryItem` из `modules/equipment` и ролл статов/редкости.
- `src/modules/inventory/shared/inventory.store.ts` — фабрика стора `createInventoryStore` + контракт `InventoryState`.
- `src/modules/inventory/shared/inventory.hooks.ts` — конкретные инстансы стора (`backpack`, `character`) и их slot definitions.
- `src/modules/inventory/shared/ui/inventory-ui.tsx` — сетка + popover, обработка drag-and-drop внутри/между сторами.
- `src/modules/inventory/shared/ui/inventory-slot-card.tsx` — слот (empty/item), источник drag payload.
- `src/modules/inventory/shared/ui/inventory-item-card.tsx` — отдельная карточка предмета (не используется в текущем `InventoryUi`, но экспортируется как building block).

## Архитектура и поток данных

### 1) Модель

Инвентарь (`InventoryType`) — это:

- `slots: (InventoryItem | undefined)[]`
- `slotDefinitions: InventorySlotDefinition[]`

Слот может быть ограничен по типу экипировки (см. `InventorySlotDefinition.allowedTypes`).

### 2) Zustand store (`InventoryState`)

Стор хранит:

- `slots`, `slotDefinitions`
- `dragIndex`, `hoverIndex` — UI-состояние перетаскивания
- `notice` — человекочитаемое сообщение об ошибке (нет места, ограничение слота, и т.п.)

Ключевые операции:

- `addItem()` — кладёт предмет в первый свободный «совместимый» слот.
- `placeItem()` / `canPlaceItem()` — проверка/установка предмета в конкретный слот.
- `dropOnSlot()` — swap предметов внутри одного стора с проверкой ограничений.

### 3) Drag-and-drop протокол

Источник (`InventorySlotCard`) пишет в `dataTransfer`:

- MIME: `application/x-inventory-item`
- payload: JSON `{"inventoryId": "...", "index": number}` (тип `InventoryDragPayload`)

При drop:

- если `payload.inventoryId === target.inventoryId` → используется `dropOnSlot()` (swap внутри стора);
- если инвентарь другой и передан `storeRegistry` → берётся `sourceStore`, проверяется `target.canPlaceItem()`, затем выполняется `target.placeItem()` + `source.removeItem()` (перемещение).

## UI: сетка, поповер, действия

`InventoryUi` рендерит сетку `InventorySlotCard` и (для занятых слотов) показывает `Popover` с `EquipmentStats`.

Действия поповера:

- «Sell» (иконка `modules/equipment/assets/gold.png`) — удаляет предмет из слота.
- «Disenchant» (иконка `modules/equipment/assets/equipment-part.png`) — удаляет предмет из слота.

Значения для действий задаются локально в `src/modules/inventory/shared/ui/inventory-ui.tsx` (маппинги `SELL_VALUES` и `DISENCHANT_VALUES` по `RarityEnum`).

## Инварианты и ограничения

- Длины `slots` и `slotDefinitions` ожидаются согласованными (на старте и при `addSlot()`).
- `dropOnSlot()` разрешает swap только если оба предмета удовлетворяют ограничениям своих целевых слотов.
- Между сторами перенос сейчас реализован только как «перемещение в пустой слот» (swap между сторами не поддержан).

## Расширение модуля (рекомендуемый путь)

- Новые инвентари/варианты slot definitions — добавлять в `src/modules/inventory/shared/inventory.hooks.ts` и реэкспортировать через `src/modules/inventory/client.ts`.
- Общие типы и сериализуемые данные — держать в `shared/`, реэкспортировать через `src/modules/inventory/index.ts` (server-safe).
