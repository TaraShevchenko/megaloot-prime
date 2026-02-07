import type { EquipmentSlotId } from "@/entities/equipment";
import { isSlotCompatible } from "@/entities/equipment";
import type { GameSession } from "@/entities/game-session";
import { addInventoryItem, removeInventoryItem } from "@/entities/inventory";

export type EquipResult = {
  session: GameSession;
  error?: string;
};

export const swapEquipped = (
  session: GameSession,
  slotId: EquipmentSlotId,
  incomingId: string,
): EquipResult => {
  const { item, items } = removeInventoryItem(
    session.inventory.equipment,
    incomingId,
  );

  if (!item) {
    return { session, error: "Item not found in inventory." };
  }

  if (!isSlotCompatible(slotId, item.type)) {
    return { session, error: "Wrong equipment type for this slot." };
  }

  const currentlyEquipped = session.equipped[slotId];
  let nextInventory = items;
  if (currentlyEquipped) {
    const added = addInventoryItem(items, currentlyEquipped);
    if (added.index === undefined) {
      return { session, error: "Inventory is full." };
    }
    nextInventory = added.items;
  }

  return {
    session: {
      ...session,
      inventory: { equipment: nextInventory },
      equipped: {
        ...session.equipped,
        [slotId]: item,
      },
    },
  };
};

export const tryEquipItem = (
  session: GameSession,
  itemInstanceId: string,
  slotId: EquipmentSlotId,
): EquipResult => swapEquipped(session, slotId, itemInstanceId);
