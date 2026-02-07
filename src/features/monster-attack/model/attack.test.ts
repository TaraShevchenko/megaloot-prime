import { describe, expect, it } from "vitest";

import { EQUIPMENT_SLOT_IDS } from "@/entities/equipment";
import type { GameSession } from "@/entities/game-session";
import { createNewSession } from "@/entities/game-session";
import { DEFAULT_HERO_STATS } from "@/entities/hero";
import { BACKPACK_CAPACITY, createInventory } from "@/entities/inventory";
import { createMonsterState, MONSTERS } from "@/entities/monster";
import { attackMonster } from "@/features/monster-attack";
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

const buildSession = () => {
  const definition = MONSTERS[0];
  if (!definition) {
    throw new Error("Missing monster definitions");
  }
  return createNewSession({
    heroBaseStats: DEFAULT_HERO_STATS,
    inventory: createInventory(BACKPACK_CAPACITY),
    equipped: emptyEquipped(),
    currencies: emptyCurrencies,
    monsters: [createMonsterState(definition)],
    craftItem: null,
  });
};

describe("monster attack", () => {
  it("applies damage and drops loot on death", () => {
    let session = buildSession();
    const rng = () => 0;

    const monster = session.monsters[0];
    if (!monster) {
      throw new Error("Missing monster state");
    }
    for (let i = 0; i < 12; i += 1) {
      const result = attackMonster(session, monster.id, rng);
      session = result.session;
    }

    const updated = session.monsters[0];
    if (!updated) {
      throw new Error("Missing updated monster state");
    }
    expect(updated.alive).toBe(false);
    expect(
      session.inventory.equipment.some((item) => item !== null),
    ).toBe(true);
  });
});
