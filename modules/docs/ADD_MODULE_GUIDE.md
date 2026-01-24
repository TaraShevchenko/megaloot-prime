# Add Module Guide

This guide describes how to create a new feature module following the same
structure as `modules/monsters` and `modules/equipment`.

## 1) Create the module folder
- Create `modules/<module-name>/` in kebab-case (for example, `modules/inventory`).
- Keep module logic here; keep UI pages in `app/`.

## 2) Create the shared core
- Add `modules/<module-name>/shared/` for core data/types/utils that are safe
  for both server and client usage.
- Use a clear prefix for shared files, for example:
  - `shared/<module>.types.ts`
  - `shared/<module>.utils.ts`
  - `shared/<module>.data.ts` (if you have registries or constants)

## 3) Define the public API
- Create `modules/<module-name>/index.ts` for the server-safe public API.
- Export only items from `shared/` here.

Example:
```ts
export { createThing } from "./shared/<module>.utils";
export type { Thing } from "./shared/<module>.types";
```

## 4) Add a client entry
- Create `modules/<module-name>/client.ts` with `"use client";`.
- Re-export client-safe items from `shared/` here.
- Use this entry from client components instead of importing `index.ts`.

Example:
```ts
"use client";

export { createThing } from "./shared/<module>.utils";
export type { Thing } from "./shared/<module>.types";
```

## 5) Place UI in app/
- Create `app/<module-name>/page.tsx` for the route.
- Any demo/showcase UI should live in `app/<module-name>/` and import from
  `modules/<module-name>/client`.
- Do not place UI-specific code inside the module unless it is part of the
  module's core capabilities.

## 6) Add module docs (recommended)
- Add `modules/<module-name>/docs/` for module-specific guides.
- Keep steps concise and cross-link shared expectations if needed.

## References
- `modules/monsters/docs/ADD_MONSTER_GUIDE.md`
- `modules/equipment/docs/ADD_EQUIPMENT_GUIDE.md`
