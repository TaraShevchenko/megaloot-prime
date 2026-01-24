# Гайд по добавлению модуля

Этот гайд описывает рекомендуемую структуру нового модуля, ориентированную на
`modules/monsters` и `modules/equipment`.

## 1) Создайте папку модуля
- Создайте `modules/<module-name>/` в kebab-case (например, `modules/inventory`).
- Логику модуля держите здесь; UI-маршруты — в `app/`.

## 2) Создайте shared-ядро (если есть общие типы/данные/утилиты)
- Добавьте `modules/<module-name>/shared/` для кода, безопасного для сервера и
  клиента.
- Используйте префикс модуля в именах файлов, например:
  - `shared/<module>.types.ts`
  - `shared/<module>.utils.ts`
  - `shared/<module>.data.ts` (для регистров/констант)
- Если модуль состоит только из типов, допускается один файл
  `modules/<module-name>/types.ts` без `shared/`.

## 3) Определите публичный API
- Рекомендуется создать `modules/<module-name>/index.ts` для server-safe API.
- Экспортируйте здесь только то, что лежит в `shared/`.
- Если у модуля нет `shared/`, можно экспортировать типы напрямую из
  `types.ts`.

Пример:
```ts
export { createThing } from "./shared/<module>.utils";
export type { Thing } from "./shared/<module>.types";
```

## 4) Добавьте клиентский вход (по необходимости)
- `modules/<module-name>/client.ts` опционален; создавайте его с `"use client";`,
  когда у модуля есть компоненты/хуки, требующие строго клиентского рендеринга.
- В клиентских компонентах импортируйте модуль через `modules/<module-name>/client`,
  а не через `index.ts`.

Пример:
```ts
"use client";

export { createThing } from "./shared/<module>.utils";
export type { Thing } from "./shared/<module>.types";
```

## 5) Размещайте UI в app/ (если нужен маршрут/демо)
- Создайте `app/<module-name>/page.tsx`, если модулю нужен маршрут или витрина.
- Демо/страничные компоненты держите в `app/<module-name>/components/` и
  импортируйте модуль через `modules/<module-name>/client`.
- UI-компоненты, которые являются частью ядра модуля, можно хранить в
  `shared/` и экспортировать через `client.ts`.

## 6) Добавьте документацию модуля (рекомендуется)
- Создайте `modules/<module-name>/docs/` для модульных гайдов.
- Пишите коротко и давайте ссылки на общие ожидания.

## Дополнительно: ассеты модуля (опционально)
- Для общих изображений/спрайтов модуля используйте
  `modules/<module-name>/assets/`.

## Ссылки
- `modules/monsters/docs/ADD_MONSTER_GUIDE.md`
- `modules/equipment/docs/ADD_EQUIPMENT_GUIDE.md`
