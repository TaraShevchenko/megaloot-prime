# План рефакторинга Craft Inventory

## Область
- Основной компонент: `src/modules/inventory/inventory/craft-inventory.tsx`.
- Общий UI: `src/modules/inventory/shared/ui/inventory-ui.tsx`, `src/modules/inventory/shared/ui/inventory-slot-card.tsx`.
- Логика: craft currency store/types и inventory store hooks.

## Цели
- Вынести drag & drop в переиспользуемый слой (через библиотеку или общий адаптер).
- Заменить `renderResourceSlot` на общий UI слотов, чтобы currency drag/apply работал во всех инвентарях.
- Правой кнопкой мыши — apply currency/actions; левой — перемещение.
- Контекстное меню для предметов; для currency — popover обмена (ап/даунгрейд золота/частей).
- Gold/parts больше не повышают редкость (апгрейд редкости только через rarity‑upgrade токены).

## Шаг 1 — Карта ответственности и текущая структура
Статус: готово (выделено в `craft-inventory.tsx`).
- Пометить зоны ответственности внутри `craft-inventory.tsx`:
  - Парсинг и маршрутизация DnD (`parsePayload`, `parseCraftCurrencyPayload`, `handleDrop`, `onDragStart` в currency слоте).
  - Применение крафтовых действий (`applyCurrencyToCraftItem`).
  - Рендер слотов (`renderItemSlot`, `renderResourceSlot`).
  - Поведение контекстного меню (сейчас `preventDefault`).
- Зафиксировать, что можно переиспользовать между инвентарями (drag/apply currency, контекстные меню/popover).

## Шаг 2 — Выбор DnD подхода
Статус: готово (выбран `dnd-kit`).
- Сравнить варианты и выбрать один:
  - `dnd-kit` (современный, гибкий, удобен для кастомных input и правой/левой кнопки).
  - `react-dnd` (мощный, но тяжелее и более “старомодный”).
  - Внутренний адаптер (оставить HTML5 DnD, вынести в общие хуки и payload).
- Критерии:
  - Разделение правого/левого drag.
  - Кастомные payload (currency + inventory item).
  - Повторное использование во всех инвентарях.
### Решение
- **Выбрано:** `dnd-kit`.
- **Почему:** Дает гибкий контроль над жестами/кнопками, удобнее реализовать “правый drag = apply” и кастомные правила без слоев вокруг HTML5 API. Подходит для сложной логики инвентаря и расширения в будущем.

## Шаг 2a — Чеклист миграции на dnd‑kit
Статус: готово (пакеты установлены, `DndContext` есть).
- Установить пакеты: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` (если понадобятся).
- Добавить `DndContext` (глобально или только для инвентарных маршрутов).
- Определить типы drag:
  - `INVENTORY_ITEM`, `CRAFT_CURRENCY`.
- Определить payload типы:
  - `InventoryDragPayload`, `CraftCurrencyDragPayload` (экспортировать из shared).
- Заменить прямую работу с `dataTransfer` на `useDraggable`/`useDroppable` в общих слотах.

## Шаг 2b — Общие DnD адаптеры/хуки
Статус: частично (есть `shared/dnd`, но нет отдельных хуков `use-*`).
- Создать `shared/dnd/` (инфраструктура DnD, общая для модулей):
  - `dnd.types.ts` → константы типов + payload типы.
  - `use-inventory-dnd.ts` → draggable + droppable для item слотов (move/swap).
  - `use-currency-dnd.ts` → draggable для currency слотов.
  - `use-craft-currency-drop.ts` → droppable для применения currency к craft слоту.
- API минимальный и типизированный: UI компоненты только прокидывают payload и callbacks.

## Шаг 2c — Миграция Craft Inventory (dnd‑kit)
Статус: готово (craft inventory использует `dnd-kit`).
- Перевести `InventorySlotCard` и новый `CurrencySlotCard` на `useDraggable`/`useDroppable`.
- Крафтовый слот принимает:
  - `INVENTORY_ITEM` (перемещение/свап),
  - `CRAFT_CURRENCY` (apply по правому drag).
- Удалить `parsePayload`/`parseCraftCurrencyPayload` и DOM‑обработчики `onDragStart/onDrop` из `craft-inventory.tsx`.

## Шаг 2d — Миграция обычных инвентарей (dnd‑kit)
Статус: готово (inventory UI уже на `dnd-kit`).
- Перевести `InventoryUi` на общий `use-inventory-dnd`.
- Удалить DOM‑парсинг `dataTransfer` и связанные `handleDrop` в `inventory-ui.tsx`.
- Оставить логику контекстного меню/поповеров, но DnD состояние получать через dnd‑kit.

## Шаг 2e — Семантика правой/левой кнопки (dnd‑kit)
Статус: не начато.
- Гейтинг старта drag по кнопке в кастомном sensor/активации:
  - Левая кнопка → `INVENTORY_ITEM`.
  - Правая кнопка → `CRAFT_CURRENCY` (для currency слотов) и открыть контекстное меню.
- Гарантировать, что правый клик не запускает левый drag.

## Шаг 2f — Валидация
Статус: не начато.
- Проверить: left‑drag move, right‑drag apply, hover состояния, кросс‑инвентарное перемещение.
- Проверить: currency падает только на craft слот.

## Шаг 3 — Перенос UI слотов в общий слой
Статус: не начато.
- Перенести `renderResourceSlot` в shared UI:
  - расширить `inventory-ui.tsx` или `inventory-slot-card.tsx` (currency‑variant).
  - входы: `slotType`, `payload`, `count`, `draggable`, обработчики.
- Убедиться, что craft UI использует общий компонент, а не inline‑render.
- Подтвердить, что currency‑drop на item слот поддержан через общий слот.

## Шаг 4 — Семантика правой/левой кнопки
Статус: не начато.
- Единый контракт:
  - Левая кнопка: move items.
  - Правая кнопка: apply currency/actions и контекстные меню.
- Гейт старта DnD по кнопке.
- Убедиться, что правая кнопка не запускает левый сценарий.

## Шаг 5 — Контекстное меню + Currency Popover
Статус: не начато.
- Items: контекстное меню (список действий).
- Currencies: popover обмена (upgrade/downgrade gold/parts).
- Общий менеджер контекстных меню/поповеров для всех инвентарей.

## Шаг 6 — Удалить повышение редкости от gold/parts
Статус: не начато (логика апгрейда gold/parts ещё есть).
- В `applyCurrencyToCraftItem`:
  - убрать ветку `gold`/`parts`, повышающую редкость.
  - оставить `setRarity` только через rarity‑upgrade токены.
- Обновить notices/сообщения.

## Шаг 7 — Стабилизация и проверка
Статус: не начато.
- Проверить основные сценарии:
  - Left‑drag move items.
  - Right‑drag apply currency/actions.
  - Right‑click меню для items; popover для currency.
  - Редкость меняется только rarity‑upgrade токенами.
- Проверить все инвентари, использующие общий slot UI.

## Примечания
- Держать клиентскую логику минимальной в shared UI, изолировать в smallest client components.
- Избегать SSR warnings: store/hooks использовать только внутри client‑компонентов.
