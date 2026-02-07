import type { InventoryItem, InventorySlot } from "./types";

export const addInventoryItem = <TItem extends InventoryItem>(
  items: InventorySlot<TItem>[],
  item: TItem,
): { items: InventorySlot<TItem>[]; index?: number } => {
  const index = items.findIndex((slot) => !slot);
  if (index === -1) {
    return { items };
  }

  const next = [...items];
  next[index] = item;
  return { items: next, index };
};

export const removeInventoryItem = <TItem extends InventoryItem>(
  items: InventorySlot<TItem>[],
  instanceId: string,
): { item?: TItem; items: InventorySlot<TItem>[]; index?: number } => {
  const index = items.findIndex((entry) => entry?.instanceId === instanceId);
  if (index === -1) {
    return { items };
  }

  const next = [...items];
  const removed = next[index] ?? undefined;
  next[index] = null;
  return removed ? { item: removed, items: next, index } : { items: next };
};

export const replaceInventoryItem = <TItem extends InventoryItem>(
  items: InventorySlot<TItem>[],
  updated: TItem,
): InventorySlot<TItem>[] =>
  items.map((entry) =>
    entry?.instanceId === updated.instanceId ? updated : entry,
  );

export const removeInventoryItemAt = <TItem extends InventoryItem>(
  items: InventorySlot<TItem>[],
  index: number,
): { item?: TItem; items: InventorySlot<TItem>[] } => {
  if (index < 0 || index >= items.length) {
    return { items };
  }

  const next = [...items];
  const removed = next[index] ?? undefined;
  next[index] = null;
  return removed ? { item: removed, items: next } : { items: next };
};

export const createInventory = <TItem extends InventoryItem>(
  size: number,
  seedItems: TItem[] = [],
): InventorySlot<TItem>[] => {
  const slots = Array.from({ length: Math.max(0, size) }, () => null) as Array<
    InventorySlot<TItem>
  >;

  seedItems.forEach((item) => {
    const index = slots.findIndex((slot) => !slot);
    if (index === -1) return;
    slots[index] = item;
  });

  return slots;
};


