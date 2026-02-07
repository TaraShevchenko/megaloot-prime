import { isSlotCompatible } from "@/entities/equipment";
import type { GameItem, GameSession } from "@/entities/game-session";

import type { InventoryLocation, InventoryMoveResult } from "./types";

const isBackpackIndexValid = (
  session: GameSession,
  index: number,
): boolean => index >= 0 && index < session.inventory.equipment.length;

const getItemAt = (
  session: GameSession,
  location: InventoryLocation,
): GameItem | null | undefined => {
  if (location.area === "backpack") {
    if (!isBackpackIndexValid(session, location.index)) return undefined;
    return session.inventory.equipment[location.index] ?? null;
  }
  if (location.area === "equipped") {
    return session.equipped[location.slotId] ?? null;
  }
  return session.craft.item ?? null;
};

const setItemAt = (
  session: GameSession,
  location: InventoryLocation,
  item: GameItem | null,
): GameSession | null => {
  if (location.area === "backpack") {
    if (!isBackpackIndexValid(session, location.index)) return null;
    const nextSlots = [...session.inventory.equipment];
    nextSlots[location.index] = item;
    return {
      ...session,
      inventory: { equipment: nextSlots },
    };
  }
  if (location.area === "equipped") {
    return {
      ...session,
      equipped: {
        ...session.equipped,
        [location.slotId]: item,
      },
    };
  }
  return {
    ...session,
    craft: {
      ...session.craft,
      item,
    },
  };
};

const canPlaceItem = (
  session: GameSession,
  location: InventoryLocation,
  item: GameItem,
): boolean => {
  if (location.area === "equipped") {
    return isSlotCompatible(location.slotId, item.type);
  }
  if (location.area === "backpack") {
    return isBackpackIndexValid(session, location.index);
  }
  return true;
};

const isSameLocation = (a: InventoryLocation, b: InventoryLocation): boolean => {
  if (a.area !== b.area) return false;
  if (a.area === "backpack" && b.area === "backpack") {
    return a.index === b.index;
  }
  if (a.area === "equipped" && b.area === "equipped") {
    return a.slotId === b.slotId;
  }
  return a.area === "craft" && b.area === "craft";
};

export const moveInventoryItem = (
  session: GameSession,
  source: InventoryLocation,
  target: InventoryLocation,
): InventoryMoveResult => {
  if (isSameLocation(source, target)) return { session };

  const sourceItem = getItemAt(session, source);
  if (sourceItem === undefined) {
    return { session, error: "Invalid source slot." };
  }
  if (!sourceItem) {
    return { session, error: "No item in that slot." };
  }

  if (!canPlaceItem(session, target, sourceItem)) {
    return { session, error: "Slot is restricted." };
  }

  const targetItem = getItemAt(session, target);
  if (targetItem === undefined) {
    return { session, error: "Invalid target slot." };
  }

  if (targetItem && !canPlaceItem(session, source, targetItem)) {
    return { session, error: "Cannot swap with that slot." };
  }

  const cleared = setItemAt(session, source, targetItem ?? null);
  if (!cleared) {
    return { session, error: "Invalid source slot." };
  }

  const updated = setItemAt(cleared, target, sourceItem);
  if (!updated) {
    return { session, error: "Invalid target slot." };
  }

  return { session: updated };
};
