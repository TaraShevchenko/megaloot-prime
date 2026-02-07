export type InventoryItem = {
  instanceId: string;
};

export type InventorySlot<TItem extends InventoryItem = InventoryItem> =
  | TItem
  | null;

export type Inventory<TItem extends InventoryItem = InventoryItem> =
  InventorySlot<TItem>[];


