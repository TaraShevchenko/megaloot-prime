import type { EquipmentSlotId } from "@/entities/equipment";
import type { GameSession } from "@/entities/game-session";
import { addInventoryItem } from "@/entities/inventory";

export type UnequipResult = {
  session: GameSession;
  error?: string;
};

export const unequipItem = (
  session: GameSession,
  slotId: EquipmentSlotId,
): UnequipResult => {
  const equippedItem = session.equipped[slotId];
  if (!equippedItem) {
    return { session, error: "Slot is already empty." };
  }
  const added = addInventoryItem(session.inventory.equipment, equippedItem);
  if (added.index === undefined) {
    return { session, error: "Inventory is full." };
  }

  return {
    session: {
      ...session,
      inventory: {
        equipment: added.items,
      },
      equipped: {
        ...session.equipped,
        [slotId]: null,
      },
    },
  };
};
