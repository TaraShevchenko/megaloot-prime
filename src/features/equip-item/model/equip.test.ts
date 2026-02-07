import { describe, expect, it } from "vitest";

import { EQUIPMENT_SLOT_IDS } from "@/entities/equipment";
import type { GameSession } from "@/entities/game-session";
import { createNewSession } from "@/entities/game-session";
import { DEFAULT_HERO_STATS } from "@/entities/hero";
import { BACKPACK_CAPACITY, createInventory } from "@/entities/inventory";
import { createItemInstance, EQUIPMENT_ITEMS } from "@/entities/item";
import { tryEquipItem } from "@/features/equip-item";
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

const createSession = (items: ReturnType<typeof createItemInstance>[]) =>
  createNewSession({
    heroBaseStats: DEFAULT_HERO_STATS,
    inventory: createInventory(BACKPACK_CAPACITY, items),
    equipped: emptyEquipped(),
    currencies: emptyCurrencies,
    monsters: [],
    craftItem: null,
  });

describe("equip-item", () => {
  it("swaps items when slot is occupied", () => {
    const weapons = EQUIPMENT_ITEMS.filter((item) => item.type === "WEAPON");
    const firstDefinition = weapons[0];
    const secondDefinition = weapons[1];
    if (!firstDefinition || !secondDefinition) {
      throw new Error("Missing weapon definitions");
    }
    const first = createItemInstance(firstDefinition);
    const second = createItemInstance(secondDefinition);
    const session = createSession([first, second]);

    const equippedOnce = tryEquipItem(session, first.instanceId, "WEAPON").session;
    const equippedTwice = tryEquipItem(
      equippedOnce,
      second.instanceId,
      "WEAPON",
    ).session;

    expect(equippedTwice.equipped.WEAPON?.instanceId).toBe(second.instanceId);
    expect(
      equippedTwice.inventory.equipment.find(
        (item) => item?.instanceId === first.instanceId,
      ),
    ).toBeTruthy();
  });

  it("rejects wrong slot type", () => {
    const armor = EQUIPMENT_ITEMS.find((item) => item.type === "ARMOR");
    if (!armor) throw new Error("Missing armor definition");
    const instance = createItemInstance(armor);
    const session = createSession([instance]);

    const result = tryEquipItem(session, instance.instanceId, "WEAPON");
    expect(result.error).toBeTruthy();
  });
});
