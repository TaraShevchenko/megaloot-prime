import { describe, expect, it } from "vitest";

import { EQUIPMENT_SLOT_IDS } from "@/entities/equipment";
import type { GameSession } from "@/entities/game-session";
import { createNewSession, parseSession, serializeSession } from "@/entities/game-session";
import { DEFAULT_HERO_STATS } from "@/entities/hero";
import { BACKPACK_CAPACITY, createInventory } from "@/entities/inventory";
import type { CurrencyType } from "@/shared";

const emptyEquipped = (): GameSession["equipped"] =>
  Object.fromEntries(
    EQUIPMENT_SLOT_IDS.map((slot) => [slot, null]),
  ) as GameSession["equipped"];

const emptyCurrencies: Record<CurrencyType, number> = {
  GOLD: 0,
  EQUIPMENT_PART: 0,
  CRIMSON_GEM: 0,
  RARITY_INGOT: 0,
};

describe("game session serialize", () => {
  it("round-trips valid session", () => {
    const session = createNewSession({
      heroBaseStats: DEFAULT_HERO_STATS,
      inventory: createInventory(BACKPACK_CAPACITY),
      equipped: emptyEquipped(),
      currencies: emptyCurrencies,
      monsters: [],
      craftItem: null,
    });

    const parsed = parseSession(serializeSession(session));
    expect(parsed).toEqual(session);
  });

  it("returns null for invalid payload", () => {
    const parsed = parseSession("{ invalid");
    expect(parsed).toBeNull();
  });
});


