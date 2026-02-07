import type { InventoryStoreRegistry } from "modules/inventory/shared/inventory.store";
import type { InventoryDragPayload, InventoryDropData } from "./dnd.types";

type InventoryDropParams = {
  source: InventoryDragPayload;
  target: InventoryDropData;
  storeRegistry: InventoryStoreRegistry;
};

export const handleInventoryItemDrop = ({
  source,
  target,
  storeRegistry,
}: InventoryDropParams) => {
  const targetStore = storeRegistry[target.inventoryId];
  if (!targetStore) return;

  if (source.inventoryId === target.inventoryId) {
    targetStore.getState().dropOnSlot(target.index);
    return;
  }

  const sourceStore = storeRegistry[source.inventoryId];
  if (!sourceStore) {
    targetStore.getState().dropOnSlot(target.index);
    return;
  }

  const sourceState = sourceStore.getState();
  const sourceItem = sourceState.slots[source.index];
  if (!sourceItem) {
    targetStore.getState().dropOnSlot(target.index);
    return;
  }

  const targetState = targetStore.getState();
  if (!targetState.canPlaceItem(target.index, sourceItem)) {
    targetStore.setState({ notice: "Slot is restricted." });
    targetState.dragEnd();
    sourceState.dragEnd();
    return;
  }

  const taken = sourceState.takeItem(source.index);
  if (!taken) {
    targetState.dragEnd();
    sourceState.dragEnd();
    return;
  }

  const targetItem = targetState.slots[target.index];

  if (targetState.placeItem(target.index, taken)) {
    sourceState.dragEnd();
    targetState.dragEnd();
    return;
  }

  if (targetItem) {
    const stackLimit = Math.max(
      1,
      targetState.slotDefinitions[target.index]?.maxStack ?? 1,
    );
    const stackable =
      stackLimit > 1 &&
      !!targetItem.stackKey &&
      !!taken.stackKey &&
      targetItem.stackKey === taken.stackKey;

    if (stackable) {
      sourceState.placeItem(source.index, taken);
      sourceState.dragEnd();
      targetState.dragEnd();
      return;
    }

    const canSwapBack = sourceState.canPlaceItem(source.index, targetItem);
    if (!canSwapBack) {
      sourceState.placeItem(source.index, taken);
      sourceState.dragEnd();
      targetState.dragEnd();
      return;
    }

    const swappedOut = targetState.takeItem(target.index);
    if (!swappedOut) {
      sourceState.placeItem(source.index, taken);
      sourceState.dragEnd();
      targetState.dragEnd();
      return;
    }

    if (!sourceState.placeItem(source.index, swappedOut)) {
      targetState.placeItem(target.index, swappedOut);
      sourceState.placeItem(source.index, taken);
      sourceState.dragEnd();
      targetState.dragEnd();
      return;
    }

    if (targetState.placeItem(target.index, taken)) {
      sourceState.dragEnd();
      targetState.dragEnd();
      return;
    }

    sourceState.takeItem(source.index);
    sourceState.placeItem(source.index, taken);
    targetState.placeItem(target.index, swappedOut);
    sourceState.dragEnd();
    targetState.dragEnd();
    return;
  }

  sourceState.placeItem(source.index, taken);
  sourceState.dragEnd();
  targetState.dragEnd();
};
