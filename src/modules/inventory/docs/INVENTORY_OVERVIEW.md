# Обзор модуля инвентаря

Документ описывает текущие файлы, функции и текущие UI-возможности.

## 1) Структура и роли файлов
- `modules/inventory/index.ts`: серверный публичный API (типы + `createRandomInventoryItem`).
- `modules/inventory/client.ts`: клиентский API (store + UI + types + utils).
- `modules/inventory/shared/inventory.types.ts`: типы `InventoryItem`, `InventorySlot`, `InventoryType`.
- `modules/inventory/shared/inventory.utils.ts`: генерация предметов и ролл характеристик.
- `modules/inventory/shared/inventory.store.ts`: Zustand-хранилище со слотами, перетаскиванием и действиями.
- `modules/inventory/shared/inventory.ui.tsx`: UI компонентов инвентаря (сетка, слот, предмет).

## 2) Ключевые функции и действия
- `createRandomInventoryItem()`: собирает предмет из списка экипировки, редкости и роллов статов.
- `useInventoryStore`:
  - `addSlot()`: добавляет пустой слот.
  - `addItem(item)`: кладет предмет в первый свободный слот или пишет уведомление.
  - `addRandomItem()`: добавляет случайный предмет.
  - `dragStart(index)`: начинает перетаскивание из занятого слота.
  - `removeItem(index)`: удаляет предмет из слота по индексу.
  - `dropOnSlot(index)`: меняет местами предметы между слотами.
  - `dragEnter(index)`, `dragLeave()`, `dragEnd()`: состояние ховера и очистка drag.
- UI:
  - `InventoryUi`: сетка слотов.
  - `InventorySlotCard`: карточка слота и обработчики drop/hover.
  - `InventoryItemCard`: карточка предмета и обработчики drag.

## 3) Контекстное меню слота
- Триггер: правый клик (`contextmenu`) по слоту с предметом.
- Действия меню:
  - `Продать` -> удалить предмет из инвентаря, показать сумму золота с иконкой `modules/equipment/assets/gold.png`.
  - `Распылить` -> удалить предмет из инвентаря, показать сумму материалов с иконкой `modules/equipment/assets/equipment-part.png`.
- Суммы по действиям зависят от редкости предмета (локальные маппинги в UI).
