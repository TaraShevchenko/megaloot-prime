import { CRAFT_CURRENCY_DRAG_TYPE } from "./constants";
import type { CraftCurrencyDragPayload } from "./types";

export type CraftCurrencyDragData = {
  type: typeof CRAFT_CURRENCY_DRAG_TYPE;
  payload: CraftCurrencyDragPayload;
};

export const isCraftCurrencyDragData = (
  data: unknown,
): data is CraftCurrencyDragData =>
  Boolean(
    data &&
      typeof data === "object" &&
      "type" in data &&
      "payload" in data &&
      (data as CraftCurrencyDragData).type === CRAFT_CURRENCY_DRAG_TYPE,
  );
