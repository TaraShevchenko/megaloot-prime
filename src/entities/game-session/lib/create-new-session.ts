import type { CharacteristicsNumericMap } from "@/shared/types/characteristics";
import type { CurrencyType } from "@/shared/types/currency";
import { createDefaultCraftTokens, type CraftTokens } from "@/entities/craft";
import { BACKPACK_CAPACITY } from "@/entities/inventory";

import type { EquippedItems, GameItem, GameSession, MonsterState } from "../model/types";

type CreateNewSessionOptions = {
  heroBaseStats: CharacteristicsNumericMap;
  inventory: GameSession["inventory"]["equipment"];
  equipped: EquippedItems;
  currencies: Record<CurrencyType, number>;
  monsters: MonsterState[];
  craftItem?: GameItem | null;
  craftTokens?: CraftTokens;
};

export const createNewSession = ({
  heroBaseStats,
  inventory,
  equipped,
  currencies,
  monsters,
  craftItem = null,
  craftTokens,
}: CreateNewSessionOptions): GameSession => {
  const paddedInventory =
    inventory.length >= BACKPACK_CAPACITY
      ? inventory
      : [
          ...inventory,
          ...Array.from(
            { length: BACKPACK_CAPACITY - inventory.length },
            () => null,
          ),
        ];

  return {
    version: 1,
    hero: {
      baseStats: heroBaseStats,
    },
    inventory: {
      equipment: paddedInventory,
    },
    equipped,
    craft: {
      item: craftItem,
      tokens: craftTokens ?? createDefaultCraftTokens(),
    },
    currencies,
    monsters,
  };
};


