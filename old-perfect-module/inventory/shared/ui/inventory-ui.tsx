"use client";

import { useState, type MouseEvent } from "react";
import { useDndMonitor } from "@dnd-kit/core";
import { EquipmentStats } from "modules/equipment/client";
import { RarityEnum } from "shared/types/rarity";
import { Popover, PopoverContent, PopoverTrigger } from "shared/ui/popover";
import { useInventoryStore } from "../inventory.hooks";
import type { InventoryStoreHook } from "../inventory.store";
import type { InventorySlot } from "../inventory.types";
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
  gridClassName?: string;
};

export function InventoryUi({
  store = useInventoryStore,
  gridClassName,
}: InventoryUiProps) {
  const slots = store((state) => state.slots);
  const slotDefinitions = store((state) => state.slotDefinitions);
  const inventoryId = store((state) => state.id);
  const removeItem = store((state) => state.removeItem);
  const removeItemStack = store((state) => state.removeItemStack);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useDndMonitor({
    onDragStart: () => setOpenIndex(null),
    onDragEnd: () => setOpenIndex(null),
    onDragCancel: () => setOpenIndex(null),
  });

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
