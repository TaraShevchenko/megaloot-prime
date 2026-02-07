import type { GameSession } from "@/entities/game-session";
import { addInventoryItem } from "@/entities/inventory";
import { createItemInstance, EQUIPMENT_BY_ID } from "@/entities/item";
import { CurrencyEnum } from "@/shared";

import { STORE_ITEMS } from "./store-items";

export type BuyResult = {
  session: GameSession;
  error?: string;
};

export const buyStoreItem = (
  session: GameSession,
  storeItemId: string,
): BuyResult => {
  const item = STORE_ITEMS.find((entry) => entry.id === storeItemId);
  if (!item) {
    return { session, error: "Store item not found." };
  }

  const gold = session.currencies[CurrencyEnum.GOLD] ?? 0;
  if (gold < item.price) {
    return { session, error: "Not enough gold." };
  }

  const definition = EQUIPMENT_BY_ID[item.definitionId];
  const instance = createItemInstance(definition, { rarity: item.rarity });
  const added = addInventoryItem(session.inventory.equipment, instance);
  if (added.index === undefined) {
    return { session, error: "Inventory is full." };
  }

  return {
    session: {
      ...session,
      inventory: {
        equipment: added.items,
      },
      currencies: {
        ...session.currencies,
        [CurrencyEnum.GOLD]: gold - item.price,
      },
    },
  };
};
