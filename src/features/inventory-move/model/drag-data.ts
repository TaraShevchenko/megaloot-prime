import { INVENTORY_DRAG_TYPE } from "./constants";
import type { InventoryLocation } from "./types";

export type InventoryDragData = {
  type: typeof INVENTORY_DRAG_TYPE;
  payload: InventoryLocation;
};

export const isInventoryDragData = (
  data: unknown,
): data is InventoryDragData =>
  Boolean(
    data &&
      typeof data === "object" &&
      "type" in data &&
      "payload" in data &&
      (data as InventoryDragData).type === INVENTORY_DRAG_TYPE,
  );
