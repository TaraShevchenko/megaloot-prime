import type {
  ForgeAction,
  RarityUpgrade,
} from "modules/inventory/shared/craft-currency.types";

export const DND_ITEM_TYPE = {
  INVENTORY_ITEM: "inventory-item",
  CRAFT_CURRENCY: "craft-currency",
} as const;

export const DND_DROP_TYPE = {
  INVENTORY_SLOT: "inventory-slot",
} as const;

export type InventoryDragPayload = {
  inventoryId: string;
  index: number;
};

export type CraftCurrencyDragPayload =
  | { type: "gold" }
  | { type: "parts" }
  | { type: "addChar"; level: number }
  | { type: "changeValueChar"; level: number }
  | { type: ForgeAction }
  | { type: "setRarity"; rarity: RarityUpgrade };

export type InventoryDragData = {
  type: typeof DND_ITEM_TYPE.INVENTORY_ITEM;
  payload: InventoryDragPayload;
};

export type CraftCurrencyDragData = {
  type: typeof DND_ITEM_TYPE.CRAFT_CURRENCY;
  payload: CraftCurrencyDragPayload;
};

export type DndDragData = InventoryDragData | CraftCurrencyDragData;

export type InventoryDropData = {
  type: typeof DND_DROP_TYPE.INVENTORY_SLOT;
  inventoryId: string;
  index: number;
};

export type DndDropData = InventoryDropData;

export const buildInventorySlotId = (inventoryId: string, index: number) =>
  `${DND_DROP_TYPE.INVENTORY_SLOT}:${inventoryId}:${index}`;

export const buildInventoryItemId = (inventoryId: string, index: number) =>
  `${DND_ITEM_TYPE.INVENTORY_ITEM}:${inventoryId}:${index}`;

export const buildCraftCurrencyId = (payload: CraftCurrencyDragPayload) => {
  if (payload.type === "addChar" || payload.type === "changeValueChar") {
    return `${DND_ITEM_TYPE.CRAFT_CURRENCY}:${payload.type}:${payload.level}`;
  }
  if (payload.type === "setRarity") {
    return `${DND_ITEM_TYPE.CRAFT_CURRENCY}:${payload.type}:${payload.rarity}`;
  }
  return `${DND_ITEM_TYPE.CRAFT_CURRENCY}:${payload.type}`;
};

export const isInventoryDragData = (data: unknown): data is InventoryDragData =>
  Boolean(
    data &&
      typeof data === "object" &&
      "type" in data &&
      "payload" in data &&
      (data as InventoryDragData).type === DND_ITEM_TYPE.INVENTORY_ITEM,
  );

export const isCraftCurrencyDragData = (
  data: unknown,
): data is CraftCurrencyDragData =>
  Boolean(
    data &&
      typeof data === "object" &&
      "type" in data &&
      "payload" in data &&
      (data as CraftCurrencyDragData).type === DND_ITEM_TYPE.CRAFT_CURRENCY,
  );

export const isInventoryDropData = (data: unknown): data is InventoryDropData =>
  Boolean(
    data &&
      typeof data === "object" &&
      "type" in data &&
      (data as InventoryDropData).type === DND_DROP_TYPE.INVENTORY_SLOT,
  );
