"use client";

import { useState, type DragEvent, type MouseEvent } from "react";
import { EquipmentStats } from "modules/equipment/client";
import { RarityEnum } from "shared/types/rarity";
import { Popover, PopoverContent, PopoverTrigger } from "shared/ui/popover";
import { useInventoryStore } from "../inventory.hooks";
import {
  type InventoryStoreHook,
  type InventoryStoreRegistry,
} from "../inventory.store";
import type { InventoryDragPayload, InventorySlot } from "../inventory.types";
import { InventorySlotCard } from "./inventory-slot-card";

const SELL_VALUES: Record<RarityEnum, number> = {
  [RarityEnum.COMMON]: 12,
  [RarityEnum.UNCOMMON]: 24,
  [RarityEnum.RARE]: 45,
  [RarityEnum.EPIC]: 80,
  [RarityEnum.LEGENDARY]: 140,
};

const DISENCHANT_VALUES: Record<RarityEnum, number> = {
  [RarityEnum.COMMON]: 1,
  [RarityEnum.UNCOMMON]: 2,
  [RarityEnum.RARE]: 4,
  [RarityEnum.EPIC]: 7,
  [RarityEnum.LEGENDARY]: 12,
};

type InventoryUiProps = {
  store?: InventoryStoreHook;
  storeRegistry?: InventoryStoreRegistry;
  gridClassName?: string;
};

const parsePayload = (
  event: DragEvent<HTMLDivElement>,
): InventoryDragPayload | null => {
  const payload = event.dataTransfer.getData("application/x-inventory-item");
  if (!payload) return null;
  try {
    const parsed = JSON.parse(payload) as InventoryDragPayload;
    if (!parsed?.inventoryId || typeof parsed.index !== "number") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export function InventoryUi({
  store = useInventoryStore,
  storeRegistry,
  gridClassName,
}: InventoryUiProps) {
  const slots = store((state) => state.slots);
  const slotDefinitions = store((state) => state.slotDefinitions);
  const inventoryId = store((state) => state.id);
  const dragIndex = store((state) => state.dragIndex);
  const hoverIndex = store((state) => state.hoverIndex);
  const dragStart = store((state) => state.dragStart);
  const dropOnSlot = store((state) => state.dropOnSlot);
  const dragEnter = store((state) => state.dragEnter);
  const dragLeave = store((state) => state.dragLeave);
  const dragEnd = store((state) => state.dragEnd);
  const removeItem = store((state) => state.removeItem);
  const removeItemStack = store((state) => state.removeItemStack);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleContextMenu = (
    event: MouseEvent<HTMLDivElement>,
    index: number,
    slot: InventorySlot,
  ) => {
    event.preventDefault();
    if (!slot) return;
    setOpenIndex(index);
  };

  const handleOpenChange = (index: number, open: boolean) => {
    setOpenIndex((current) => {
      if (open) {
        return index;
      }
      return current === index ? null : current;
    });
  };

  const handleRemove = (index: number) => {
    removeItem(index);
    setOpenIndex(null);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, index: number) => {
    const payload = parsePayload(event);
    if (!payload || payload.inventoryId === inventoryId) {
      dropOnSlot(index);
      return;
    }

    if (!storeRegistry) {
      dropOnSlot(index);
      return;
    }

    const sourceStore = storeRegistry[payload.inventoryId];
    if (!sourceStore) {
      dropOnSlot(index);
      return;
    }

    const sourceState = sourceStore.getState();
    const item = sourceState.slots[payload.index];
    if (!item) {
      dropOnSlot(index);
      return;
    }

    const targetState = store.getState();
    if (!targetState.canPlaceItem(index, item)) {
      store.setState({ notice: "Slot is restricted." });
      dragEnd();
      return;
    }

    const taken = sourceState.takeItem(payload.index);
    if (!taken) {
      dragEnd();
      return;
    }

    const targetItem = targetState.slots[index];

    if (targetState.placeItem(index, taken)) {
      sourceState.dragEnd();
      dragEnd();
      return;
    }

    if (targetItem) {
      const stackLimit = Math.max(1, slotDefinitions[index]?.maxStack ?? 1);
      const stackable =
        stackLimit > 1 &&
        !!targetItem.stackKey &&
        !!taken.stackKey &&
        targetItem.stackKey === taken.stackKey;

      if (stackable) {
        sourceState.placeItem(payload.index, taken);
        sourceState.dragEnd();
        dragEnd();
        return;
      }

      const canSwapBack = sourceState.canPlaceItem(payload.index, targetItem);
      if (!canSwapBack) {
        sourceState.placeItem(payload.index, taken);
        sourceState.dragEnd();
        dragEnd();
        return;
      }

      const swappedOut = targetState.takeItem(index);
      if (!swappedOut) {
        sourceState.placeItem(payload.index, taken);
        sourceState.dragEnd();
        dragEnd();
        return;
      }

      if (!sourceState.placeItem(payload.index, swappedOut)) {
        targetState.placeItem(index, swappedOut);
        sourceState.placeItem(payload.index, taken);
        sourceState.dragEnd();
        dragEnd();
        return;
      }

      if (targetState.placeItem(index, taken)) {
        sourceState.dragEnd();
        dragEnd();
        return;
      }

      sourceState.takeItem(payload.index);
      sourceState.placeItem(payload.index, taken);
      targetState.placeItem(index, swappedOut);
      sourceState.dragEnd();
      dragEnd();
      return;
    }

    sourceState.placeItem(payload.index, taken);
    sourceState.dragEnd();
    dragEnd();
  };

  const gridTemplate =
    gridClassName ?? "grid-cols-[repeat(auto-fill,80px)] justify-start";

  return (
    <div className={`grid ${gridTemplate}`}>
      {slots.map((slot, index) => {
        const slotCardProps = {
          slot,
          slotDefinition: slotDefinitions[index],
          inventoryId,
          index,
          isActive: dragIndex === index,
          isHover: hoverIndex === index,
          onDragStart: () => {
            setOpenIndex(null);
            dragStart(index);
          },
          onDrop: (event: DragEvent<HTMLDivElement>) => {
            setOpenIndex(null);
            handleDrop(event, index);
          },
          onDragEnter: () => dragEnter(index),
          onDragLeave: dragLeave,
          onDragEnd: () => {
            setOpenIndex(null);
            dragEnd();
          },
          onContextMenu: (event: MouseEvent<HTMLDivElement>) =>
            handleContextMenu(event, index, slot),
        };

        if (!slot) {
          return (
            <InventorySlotCard
              key={slotDefinitions[index]?.id ?? index}
              {...slotCardProps}
            />
          );
        }

        return (
          <Popover
            key={slotDefinitions[index]?.id ?? index}
            open={openIndex === index}
            onOpenChange={(open) => handleOpenChange(index, open)}
          >
            <PopoverTrigger asChild>
              <button
                type="button"
                className="inline-flex w-full select-none rounded-2xl bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1622]"
                aria-label={`View stats for ${slot.name}`}
              >
                <InventorySlotCard {...slotCardProps} />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="center"
              side="right"
              sideOffset={12}
              className="border-0 bg-transparent p-0 shadow-none"
            >
              <EquipmentStats
                rarity={slot.rarity}
                statRanges={slot.statRanges}
                stats={slot.rolledStats}
                name={slot.name[slot.rarity]}
                sellAction={{
                  value: SELL_VALUES[slot.rarity],
                  onClick: () => handleRemove(index),
                }}
                disenchantAction={{
                  value: DISENCHANT_VALUES[slot.rarity],
                  onClick: () => {
                    removeItemStack(index);
                    setOpenIndex(null);
                  },
                }}
              />
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );
}
