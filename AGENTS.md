# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js App Router project. Key locations:
- `app/` contains routes and layouts (`app/page.tsx`, `app/home/page.tsx`, `app/layout.tsx`) plus global styles (`app/globals.css`).
- `modules/` holds feature modules. Example: `modules/monsters/evil-witch/` includes `index.tsx` and sprite assets.
- `shared/` contains cross-cutting utilities and types (e.g., `shared/utils/cn.ts`, `shared/types.ts`).
- `public/` hosts static assets served from the site root.
Configuration lives at the repo root (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `prettier.config.js`).

## Build, Test, and Development Commands
Use npm scripts in `package.json`:
- `npm run dev`: start the local dev server at `http://localhost:3000`.
- `npm run build`: produce a production build.
- `npm run start`: run the production server from the build output.
- `npm run lint`: run ESLint (Next core web vitals + TypeScript rules).
- `npm run format:check`: verify formatting with Prettier.
- `npm run format:write`: format files in-place.

## Coding Style & Naming Conventions
- TypeScript + React with Next.js App Router. Keep code in `.ts/.tsx`.
- Formatting is enforced by Prettier; default is 2-space indentation.
- ESLint config extends Next.js presets; keep components and hooks lint-clean.
- Component files use kebab-case filenames (e.g., `equipment-card.tsx`) while exported components stay PascalCase.
- Route files are convention-based (`page.tsx`, `layout.tsx`).
- Use path aliases from `tsconfig.json` (`app/*`, `modules/*`, `shared/*`) instead of deep relative imports when it improves clarity.

## Monsters Module
- Monster folders live in `modules/monsters/monsters/<monster-id>` using kebab-case and contain `assets/attack.png`, `assets/idle.png`, `assets/get-hit.png`, `assets/death.png`; keep sprite sheets horizontal with `sheetWidth` matching `frameSize * frames` and set `FRAME_SIZE`/`FRAME_DURATION_MS` constants in `constants.ts`.
- Each monster exports a `constants.ts` with `ANIMATION_CONFIG` (`MonsterAnimationConfig`) and `CHARACTERISTICS` (`CharacteristicsEnum`/`Characteristics` from `shared/characteristics`), and an `index.tsx` that is `"use client";` and uses `createMonsterAnimation(ANIMATION_CONFIG)` to export `default MonsterAnimation` plus `useMonsterAnimation`.
- Register new monsters in `modules/monsters/shared/monsters.data.ts` (add to `MONSTER_IDS` and `MONSTERS` using `formatMonsterName`) and wire hooks in `modules/monsters/shared/monster-animation.data.ts` (`monsterAnimationHooks` keyed by `MonsterEnum`).
- Reuse shared types/helpers (`modules/monsters/shared/monsters.types.ts`, `monster-animation.*`, `monster-lifecycle.*`, `monsters.utils.ts`) instead of redefining logic; keep lifecycle math normalized like the existing stores (level/hp bounded, no negative damage).
- Before editing/adding monsters, consult `modules/monsters/docs/ADD_MONSTER_GUIDE.md` for the step sequence and `modules/monsters/docs/SHARED_COMPONENTS.md` for expectations around shared animation/state components.

## Testing Guidelines
There is no test runner configured yet. If you add tests, document the new command(s) in this file and prefer conventional naming like `*.test.tsx` or a `__tests__/` folder near the module under test.

## Commit & Pull Request Guidelines
- Commit history is short, imperative, and lowercase (e.g., `init`). Keep messages concise and action-oriented.
- Pull requests should include a clear summary, testing status (commands run), and screenshots or clips for UI changes.
- Link any relevant issues or design references when applicable.
