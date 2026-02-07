# Структура проекта (по скриншоту)
Документ описывает структуру проекта, показанную на `Architecture/File structure.png`, с фокусом на дереве `src/`.

## Структура `src/`

- `src/app/`: точки входа Next.js App Router (роуты, layout, страницы и т.д.).
- `src/modules/`: модульная часть (фичи/домены).
  - `src/modules/docs/`: модуль документации и связанные ресурсы.
    - `src/modules/docs/assets/`: ассеты документации (картинки и т.п.).
    - `src/modules/docs/docs/`: контент документации (MD/MDX или аналог).
    - `src/modules/docs/equipment/`: подпапка по тематике equipment (как отдельный подмодуль внутри docs).
    - `src/modules/docs/shared/`: общее для docs (компоненты/утилиты).
    - `src/modules/docs/client.ts`: клиентские хелперы/точка входа docs.
    - `src/modules/docs/index.ts`: публичный API модуля docs (exports).
  - `src/modules/hero/`: модуль hero (содержимое не раскрыто на скриншоте).
  - `src/modules/inventory/`: модуль inventory.
    - `src/modules/inventory/docs/`: документация/контент по inventory.
    - `src/modules/inventory/inventory/`: реализация фичи inventory.
    - `src/modules/inventory/shared/`: общее для inventory (компоненты/утилиты).
    - `src/modules/inventory/client.ts`: клиентские хелперы/точка входа inventory.
    - `src/modules/inventory/index.ts`: публичный API модуля inventory (exports).
  - `src/modules/monsters/`: модуль monsters.
    - `src/modules/monsters/docs/`: документация/контент по monsters.
    - `src/modules/monsters/monsters/`: реализация фичи monsters.
    - `src/modules/monsters/shared/`: общее для monsters (компоненты/утилиты).
    - `src/modules/monsters/client.ts`: клиентские хелперы/точка входа monsters.
    - `src/modules/monsters/index.ts`: публичный API модуля monsters (exports).
- `src/shared/`: общее для всего приложения (важно избегать связности фич через shared).
  - `src/shared/types/`: общие TypeScript-типы/интерфейсы.
  - `src/shared/ui/`: общие UI-компоненты (примитивы/дизайн-система).
  - `src/shared/utils/`: общие утилиты (желательно чистые функции/хелперы).

## Предлагаемое уточнение структуры: `entities` и `features`

Если мы хотим ввести более строгие архитектурные правила (и проще их линтить), удобно явно разделить:

- `entities`: "что это за сущность домена" (hero, monster, inventory item).
- `features`: "что делает пользователь" (equip item, create monster, search inventory).

Вариант 1 (чистый FSD на верхнем уровне `src/`):

- `src/app/`
- `src/features/`
- `src/entities/`
- `src/shared/`

Вариант 2 (оставить `src/modules/`, но внутри каждого модуля ввести слои):

- `src/modules/<module>/entities/`: сущности домена в рамках модуля.
- `src/modules/<module>/features/`: пользовательские сценарии в рамках модуля.
- `src/modules/<module>/shared/` или `lib/`: внутренние утилиты модуля.

Важно: при варианте 2 правила импортов должны оставаться направленными (например, `features -> entities -> shared`), иначе `modules/` превращается в "внутри можно все" и строгие границы теряются.

## Public API и разделение client/server (Next.js App Router)

Для Next.js критично не "заражать" общий public API директивой `"use client"`.
Поэтому публичный API модуля лучше разделять на 2 входа:

- `src/modules/<module>/index.ts`: только server-safe/универсальные экспорты (без `"use client"` и без реэкспорта client-only кода).
- `src/modules/<module>/client.ts`: client-only экспорты (в начале файла `"use client"`; сюда выносятся компоненты/хуки/утилиты, которые обязаны выполняться в браузере).

Опционально, для симметрии и более строгих правил:

- `src/modules/<module>/server.ts`: server-only экспорты (например, доступ к секретам, direct DB, server actions).
