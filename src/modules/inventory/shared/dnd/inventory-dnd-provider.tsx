"use client";

import type { ReactNode } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragCancelEvent,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { INVENTORY_STORE_REGISTRY } from "modules/inventory/shared/inventory.registry";
import type { InventoryStoreRegistry } from "modules/inventory/shared/inventory.store";
import { handleInventoryItemDrop } from "./inventory-dnd.handlers";
import {
  isInventoryDragData,
  isInventoryDropData,
} from "./dnd.types";

type InventoryDndProviderProps = {
  children: ReactNode;
  storeRegistry?: InventoryStoreRegistry;
};

export function InventoryDndProvider({
  children,
  storeRegistry = INVENTORY_STORE_REGISTRY,
}: InventoryDndProviderProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = ({ active }: DragStartEvent) => {
    const activeData = active.data.current;
    if (!isInventoryDragData(activeData)) return;
    const sourceStore = storeRegistry[activeData.payload.inventoryId];
    sourceStore?.getState().dragStart(activeData.payload.index);
  };

  const handleDragCancel = ({ active }: DragCancelEvent) => {
    const activeData = active.data.current;
    if (!isInventoryDragData(activeData)) return;
    const sourceStore = storeRegistry[activeData.payload.inventoryId];
    sourceStore?.getState().dragEnd();
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeData = active.data.current;
    if (!isInventoryDragData(activeData)) return;

    const overData = over?.data.current;
    if (overData && isInventoryDropData(overData)) {
      handleInventoryItemDrop({
        source: activeData.payload,
        target: overData,
        storeRegistry,
      });
      return;
    }

    const sourceStore = storeRegistry[activeData.payload.inventoryId];
    sourceStore?.getState().dragEnd();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContext>
  );
}
