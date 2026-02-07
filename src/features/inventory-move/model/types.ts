import type { EquipmentSlotId } from "@/entities/equipment";
import type { GameSession } from "@/entities/game-session";

export type InventoryLocation =
  | { area: "backpack"; index: number }
  | { area: "equipped"; slotId: EquipmentSlotId }
  | { area: "craft" };

export type InventoryMoveResult = {
  session: GameSession;
  error?: string;
};
