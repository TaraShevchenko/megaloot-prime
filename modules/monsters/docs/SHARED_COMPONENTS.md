# Shared-компоненты монстров

Ключевые точки по файлам из `modules/monsters/shared` и `shared/characteristics.ts`.

## monsters.types.ts
- Centralizes MonsterEnum, MonsterId, MonsterEntry, Monster, and MonsterEnumSchema built on MONSTER_IDS.
- MONSTER_IDS теперь лежит в этом файле и экспортируется наружу.
- UI-компоненты берут MonsterEntry/Monster, а хуки — MonsterEnum/MonsterId здесь.

## monster-lifecycle.store.ts
- Zustand-стор минимальной жизнедеятельности монстра: хранит `level`, `maxHp`, `hp`, `isDead`.
- Действия: `takeDamage`. Вычисления в абсолютных величинах.
- При переходе в `isDead` дергает `onDeath`, передавая контекст монстра и ссылки на действия.

## monster-animation.hook.tsx
- Фабрика `createMonsterAnimation` привязывает конфиг анимаций к компоненту и хуку.
- `MonsterAnimation` прокидывает `config` и `useStore` в UI-слой.
- `useMonsterAnimation` дает `Monster` и методы `playAttack`, `playDeath`, `playGetHit`.

## monster-animation.store.ts
- Zustand-стор хранит `animation`, очередь `queued` и `playId`.
- `request` ставит анимацию в очередь.
- `startQueued` запускает очередь только когда текущая анимация `idle`.
- `finish` возвращает состояние в `idle` и обновляет `playId`.

## monster-animation.types.ts
- Типы для имен анимаций, описаний спрайтов и конфига.
- `MonsterAnimationProps` описывает только `className` и `title`.
- `MonsterAnimationState` задает контракт стора.

## monster-animation.ui.tsx
- Рендерит спрайт и динамически генерирует keyframes для всех анимаций.
- В `idle` анимация зациклена и может принять очередь.
- В не-`idle` анимации проигрываются один раз и фиксируют последний кадр.
- `playId` принудительно сбрасывает CSS-анимацию при смене состояния.

## shared/characteristics.ts
- Задает порядок характеристик и их подписи.
- `getScaledCharacteristics` масштабирует базу по уровню и росту.
- Содержит zod-схемы и типы для характеристик.
