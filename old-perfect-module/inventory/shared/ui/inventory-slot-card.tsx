import { type MouseEvent } from "react";
import Image from "next/image";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { EQUIPMENT_ITEMS, type EquipmentEntry } from "modules/equipment";
import { EquipmentCard } from "modules/equipment/client";
import {
  DND_DROP_TYPE,
  DND_ITEM_TYPE,
  buildInventoryItemId,
  buildInventorySlotId,
} from "modules/inventory/shared/dnd/dnd.types";
import { RARITY_ORDER } from "shared/types/rarity";
import { cn } from "shared/utils/cn";
import type {
  InventoryItem,
  InventorySlot,
  InventorySlotDefinition,
} from "../inventory.types";

type InventorySlotCardProps = {
  className?: string;
  slot: InventorySlot;
  slotDefinition: InventorySlotDefinition;
  inventoryId: string;
  index: number;
  variant?: "default" | "large";
  onContextMenu: (event: MouseEvent<HTMLDivElement>) => void;
};

const EQUIPMENT_ENTRY_BY_KEY = new Map<string, EquipmentEntry>(
  EQUIPMENT_ITEMS.map((entry) => [`${entry.type}-${entry.id}`, entry]),
);

const getEquipmentEntry = (item: InventoryItem): EquipmentEntry => {
  const key = `${item.type}-${item.id}`;
  const entry = EQUIPMENT_ENTRY_BY_KEY.get(key);
  if (entry) return entry;

  const skins = RARITY_ORDER.reduce(
    (acc, rarity) => {
      acc[rarity] = item.skin;
      return acc;
    },
    {} as EquipmentEntry["skins"],
  );

  return {
    id: item.id,
    type: item.type,
    name: item.name,
    skins,
    defaultRarity: item.rarity,
    statRanges: item.statRanges,
  };
};

export function InventorySlotCard({
  className,
  slot,
  slotDefinition,
  inventoryId,
  index,
  variant = "default",
  onContextMenu,
}: InventorySlotCardProps) {
  const stackCount = slot?.stackCount ?? 1;
  const isLarge = variant === "large";
  const droppableId = buildInventorySlotId(inventoryId, index);
  const draggableId = buildInventoryItemId(inventoryId, index);

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: droppableId,
    data: {
      type: DND_DROP_TYPE.INVENTORY_SLOT,
      inventoryId,
      index,
    },
  });

  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
    isDragging,
  } = useDraggable({
    id: draggableId,
    data: slot
      ? {
          type: DND_ITEM_TYPE.INVENTORY_ITEM,
          payload: { inventoryId, index },
        }
      : undefined,
    disabled: !slot,
  });

  return (
    <div
      role="listitem"
      aria-label={
        slot ? `${slot.name} slot` : `${slotDefinition.label} slot ${index + 1}`
      }
      ref={setDropRef}
      className={cn("aspect-square p-1", isLarge && "p-2", className)}
      onContextMenu={onContextMenu}
    >
      <div
        className={cn(
          "relative h-full w-full select-none overflow-hidden rounded-xl border border-transparent transition",
          isOver && "border-cyan-200/80 ring-2 ring-cyan-200/40",
        )}
      >
        {slot ? (
          <div
            ref={setDragRef}
            {...attributes}
            {...listeners}
            className="flex h-full select-none items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <EquipmentCard
              className={cn("size-full", isLarge && "rounded-3xl p-8")}
              equipment={getEquipmentEntry(slot)}
              rarity={slot.rarity}
              imageClassName={isLarge ? "h-40 w-40" : undefined}
            />
            {stackCount > 1 ? (
              <div className="pointer-events-none absolute bottom-1 right-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-slate-50">
                {stackCount}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex h-full w-full select-none flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-white/5 p-2 text-center text-[10px] uppercase tracking-[0.3em] text-slate-500">
            {!!slotDefinition?.icon && (
              <Image
                src={slotDefinition.icon}
                alt={slotDefinition.label ?? ""}
                className="h-12 w-12 pointer-events-none brightness-50 saturate-0 opacity-40"
                style={{ imageRendering: "pixelated" }}
              />
            )}
            {!!slotDefinition?.label && (
              <span className="pointer-events-none">
                {slotDefinition.label}
              </span>
            )}
          </div>
        )}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-xl bg-black/30 transition-opacity",
            isDragging && "opacity-40",
            !isDragging && isOver && "opacity-20",
            !isDragging && !isOver && "opacity-0",
          )}
        />
      </div>
    </div>
  );
}
