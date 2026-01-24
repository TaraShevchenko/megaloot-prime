"use client";

import { useState, type MouseEvent } from "react";
import { EquipmentStats } from "modules/equipment/client";
import { RarityEnum } from "shared/types/rarity";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "shared/ui/popover";
import { useInventoryStore } from "../inventory.store";
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

export function InventoryUi() {
  const slots = useInventoryStore((state) => state.slots);
  const dragIndex = useInventoryStore((state) => state.dragIndex);
  const hoverIndex = useInventoryStore((state) => state.hoverIndex);
  const dragStart = useInventoryStore((state) => state.dragStart);
  const dropOnSlot = useInventoryStore((state) => state.dropOnSlot);
  const dragEnter = useInventoryStore((state) => state.dragEnter);
  const dragLeave = useInventoryStore((state) => state.dragLeave);
  const dragEnd = useInventoryStore((state) => state.dragEnd);
  const removeItem = useInventoryStore((state) => state.removeItem);
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

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2">
      {slots.map((slot, index) => {
        const slotCardProps = {
          slot,
          index,
          isActive: dragIndex === index,
          isHover: hoverIndex === index,
          onDragStart: () => {
            setOpenIndex(null);
            dragStart(index);
          },
          onDrop: () => {
            setOpenIndex(null);
            dropOnSlot(index);
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
          return <InventorySlotCard key={index} {...slotCardProps} />;
        }

        return (
          <Popover
            key={index}
            open={openIndex === index}
            onOpenChange={(open) => handleOpenChange(index, open)}
          >
            <PopoverTrigger asChild>
              <button
                type="button"
                className="inline-flex w-full rounded-2xl bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1622]"
                aria-label={`View stat ranges for ${slot.name}`}
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
                name={slot.name}
                sellAction={{
                  value: SELL_VALUES[slot.rarity],
                  onClick: () => handleRemove(index),
                }}
                disenchantAction={{
                  value: DISENCHANT_VALUES[slot.rarity],
                  onClick: () => handleRemove(index),
                }}
              />
            </PopoverContent>
          </Popover>
        );
      })}
    </div>
  );
}
