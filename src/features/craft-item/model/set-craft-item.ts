import type { EquipmentSlotId } from "@/entities/equipment";
import type { GameSession } from "@/entities/game-session";
import { addInventoryItem, removeInventoryItem } from "@/entities/inventory";

export type CraftItemResult = {
  session: GameSession;
  error?: string;
};

const returnCraftItemToInventory = (session: GameSession): CraftItemResult => {
  if (!session.craft.item) return { session };
  const added = addInventoryItem(
    session.inventory.equipment,
    session.craft.item,
  );
  if (added.index === undefined) {
    return { session, error: "Inventory is full." };
  }
  return {
    session: {
      ...session,
      craft: { ...session.craft, item: null },
      inventory: {
        equipment: added.items,
      },
    },
  };
};

export const setCraftItemFromInventory = (
  session: GameSession,
  itemInstanceId: string,
): CraftItemResult => {
  const cleared = returnCraftItemToInventory(session);
  if (cleared.error) {
    return { session, error: cleared.error };
  }

  const { item, items } = removeInventoryItem(
    cleared.session.inventory.equipment,
    itemInstanceId,
  );

  if (!item) {
    return { session: cleared.session, error: "Item not found in inventory." };
  }
  return {
    session: {
      ...cleared.session,
      craft: { ...cleared.session.craft, item },
      inventory: { equipment: items },
    },
  };
};

export const setCraftItemFromEquipped = (
  session: GameSession,
  slotId: EquipmentSlotId,
): CraftItemResult => {
  const equippedItem = session.equipped[slotId];
  if (!equippedItem) {
    return { session, error: "No item in that slot." };
  }

  const cleared = returnCraftItemToInventory(session);
  if (cleared.error) {
    return { session, error: cleared.error };
  }
  return {
    session: {
      ...cleared.session,
      craft: { ...cleared.session.craft, item: equippedItem },
      equipped: {
        ...cleared.session.equipped,
        [slotId]: null,
      },
    },
  };
};

export const clearCraftItem = (session: GameSession): GameSession =>
  returnCraftItemToInventory(session).session;
