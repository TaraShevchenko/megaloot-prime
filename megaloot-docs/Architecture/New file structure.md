# New File Structure (MVP)

Ниже предложена полная структура проекта под MVP с 2 страницами (`welcome`, `game`) и разделением на слои `shared / entities / features / widgets / app` (FSD-стиль), с учетом нюансов Next.js App Router (server/client boundaries).

Ключевая цель: убрать кросс-импорты между "inventory/equipment" за счет четких границ и направленных зависимостей.

## Правила слоев (импортов)

- `shared` не импортирует ничего из `entities/features/widgets/app`.
- `entities` импортируют только из `shared`.
- `features` импортируют из `shared` и `entities`.
- `widgets` импортируют из `shared/entities/features`.
- `app` импортирует из `shared/entities/features/widgets` (и не держит бизнес-логику).

## Public API и client-only код

Для каждого слайса (entity/feature/widget) поддерживаем 2 входа:

- `index.ts`: server-safe и/или универсальные экспорты (без `"use client"` и без реэкспорта client-only).
- `client.ts`: client-only экспорты (в начале файла `"use client"`), например React хуки, DnD, dnd-kit.

Снаружи слайса импортируем только:

- `@/entities/x` или `@/entities/x/client`
- `@/features/y` или `@/features/y/client`
- `@/widgets/z` или `@/widgets/z/client`

Никаких deep-imports типа `@/entities/x/ui/...` из других слайсов.

## Дерево `src/` (полный вариант под MVP)

```text
src/
  app/
    layout.tsx
    globals.css
    providers.tsx
    (routes)/
      welcome/
        page.tsx
      game/
        page.tsx

  shared/
    config/
      routes.ts
      storage-keys.ts
    lib/
      cn.ts
      assert.ts
    storage/
      local-storage.ts
    types/
      brand.ts
    ui/
      button/
        button.tsx
        index.ts
      panel/
        panel.tsx
        index.ts
      progress-bar/
        progress-bar.tsx
        index.ts
    test-utils/
      render.tsx
    index.ts

  entities/
    game-session/
      model/
        types.ts
        serialize.ts
      lib/
        create-new-session.ts
      index.ts
      client.ts

    hero/
      model/
        types.ts
        stats.ts
      index.ts

    monster/
      assets/
        evil-witch/
          attack.png
          death.png
          get-hit.png
          idle.png
        fire-worm/
          attack.png
          death.png
          get-hit.png
          idle.png
        knight/
          attack.png
          death.png
          get-hit.png
          idle.png
        ork/
          attack.png
          death.png
          get-hit.png
          idle.png
      model/
        types.ts
        constants.ts
      ui/
        monster-card.tsx
        monster-sprite.tsx
      index.ts

    item/
      model/
        types.ts
        constants.ts
      ui/
        item-card.tsx
      index.ts

    inventory/
      model/
        types.ts
        ops.ts
      index.ts

    equipment/
      model/
        types.ts
        slots.ts
        ops.ts
      index.ts

    currency/
      model/
        types.ts
      ui/
        currency-icon.tsx
      index.ts

  features/
    start-new-game/
      ui/
        start-new-game-button.tsx
      model/
        start-new-game.ts
      index.ts
      client.ts

    continue-game/
      ui/
        continue-game-button.tsx
      model/
        continue-game.ts
      index.ts
      client.ts

    persist-session/
      model/
        load-session.ts
        save-session.ts
        has-session.ts
      index.ts
      client.ts

    monster-attack/
      ui/
        attack-button.tsx
      model/
        attack.ts
      index.ts
      client.ts

    inventory-dnd/
      ui/
        dnd-provider.tsx
      model/
        types.ts
        handlers.ts
      index.ts
      client.ts

    equip-item/
      model/
        equip.ts
        unequip.ts
      index.ts

  widgets/
    welcome-actions/
      ui/
        welcome-actions.tsx
      index.ts
      client.ts

    monsters-row/
      ui/
        monsters-row.tsx
      index.ts

    backpack-inventory/
      ui/
        backpack-inventory.tsx
      index.ts
      client.ts

    equipped-inventory/
      ui/
        equipped-inventory.tsx
      index.ts
      client.ts

    hero-stats/
      ui/
        hero-stats.tsx
      index.ts

    craft-currencies/
      ui/
        craft-currencies.tsx
      index.ts

    game-layout/
      ui/
        game-layout.tsx
      index.ts

  processes/
    game/
      model/
        store.ts
        selectors.ts
      index.ts
      client.ts
```

## Как это ложится на MVP страницы

`welcome`:

- `widgets/welcome-actions` отображает 1 кнопку:
  - если `features/persist-session` говорит, что сейв есть: `features/continue-game`
  - иначе: `features/start-new-game`

`game`:

- `widgets/game-layout` делит экран (60% слева, 40% справа).
- Слева:
  - `widgets/monsters-row` (монстры в ряд/несколько рядов)
  - `widgets/backpack-inventory` (предметы в рюкзаке)
- Справа:
  - `widgets/equipped-inventory` (экип)
  - `widgets/hero-stats` (таблица статов)
  - `widgets/craft-currencies` (валюты крафта)

## Почему inventory и equipment перестанут "перемешиваться"

- Общие типы/операции для инвентаря находятся в `entities/inventory` и `entities/item`.
- Экип как отдельная модель в `entities/equipment`.
- "Перетаскивание" и "экипирование" становятся features:
  - `features/inventory-dnd` отвечает за DnD и события.
  - `features/equip-item` содержит правила перемещения item -> equipment slot и обратно.
- UI панелей становится widgets, которые берут entity-модели и подключают features через публичные API.

## Тестирование (минимум под MVP)

- Unit:
  - `entities/*/model/**` (ops, serialize, stats)
  - `features/*/model/**` (equip, has-session, start/continue)
- Component:
  - `entities/*/ui/**`
  - `widgets/*/ui/**`
- E2E:
  - `welcome -> start new -> game`
  - `welcome -> continue -> game`

