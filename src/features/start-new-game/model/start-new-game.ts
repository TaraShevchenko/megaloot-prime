import { EQUIPMENT_SLOT_IDS } from "@/entities/equipment";
import type { GameSession } from "@/entities/game-session";
import { createNewSession } from "@/entities/game-session";
import { DEFAULT_HERO_STATS } from "@/entities/hero";
import { BACKPACK_CAPACITY, createInventory } from "@/entities/inventory";
import { createItemInstance, EQUIPMENT_ITEMS } from "@/entities/item";
import { createMonsterState, MONSTERS } from "@/entities/monster";
import type { CurrencyType, RandomFn } from "@/shared";

const INITIAL_CURRENCY_BALANCE: Record<CurrencyType, number> = {
  GOLD: 120,
  EQUIPMENT_PART: 6,
  CRIMSON_GEM: 3,
  RARITY_INGOT: 1,
};

const createEmptyEquipped = () =>
  Object.fromEntries(
    EQUIPMENT_SLOT_IDS.map((slotId) => [slotId, null]),
  ) as GameSession["equipped"];

export const startNewGame = (options?: {
  rng?: RandomFn;
}): GameSession => {
  const seedItems = EQUIPMENT_ITEMS.map((definition) =>
    createItemInstance(
      definition,
      options?.rng ? { rng: options.rng } : undefined,
    ),
  );
  const inventory = createInventory(BACKPACK_CAPACITY, seedItems);
  const monsters = MONSTERS.map((definition) => createMonsterState(definition));

  return createNewSession({
    heroBaseStats: DEFAULT_HERO_STATS,
    inventory,
    equipped: createEmptyEquipped(),
    currencies: INITIAL_CURRENCY_BALANCE,
    monsters,
    craftItem: null,
  });
};
