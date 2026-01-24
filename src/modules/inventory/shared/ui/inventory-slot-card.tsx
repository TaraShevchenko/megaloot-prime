import { type DragEvent, type MouseEvent } from "react";
import Image from "next/image";
import { EQUIPMENT_ITEMS, type EquipmentEntry } from "modules/equipment";
import { EquipmentCard } from "modules/equipment/client";
import { RARITY_ORDER } from "shared/types/rarity";
import { cn } from "shared/utils/cn";
import type {
  InventoryDragPayload,
  InventoryItem,
  InventorySlot,
  InventorySlotDefinition,
} from "../inventory.types";

type InventorySlotCardProps = {
  slot: InventorySlot;
  slotDefinition: InventorySlotDefinition;
  inventoryId: string;
  index: number;
  isActive: boolean;
  isHover: boolean;
  onDragStart: () => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDragEnd: () => void;
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
  slot,
  slotDefinition,
  inventoryId,
  index,
  isActive,
  isHover,
  onDragStart,
  onDrop,
  onDragEnter,
  onDragLeave,
  onDragEnd,
  onContextMenu,
}: InventorySlotCardProps) {
  return (
    <div
      role="listitem"
      aria-label={
        slot ? `${slot.name} slot` : `${slotDefinition.label} slot ${index + 1}`
      }
      className="aspect-square p-1"
      onDrop={(event) => {
        event.preventDefault();
        onDrop(event);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        onDragEnter();
      }}
      onDragLeave={onDragLeave}
      onContextMenu={onContextMenu}
    >
      <div
        className={cn(
          "relative h-full w-full select-none overflow-hidden rounded-xl border border-transparent transition",
          isHover && "border-cyan-200/80 ring-2 ring-cyan-200/40",
        )}
      >
        {slot ? (
          <div
            draggable
            onDragStart={(event) => {
              const payload: InventoryDragPayload = {
                inventoryId,
                index,
              };
              event.dataTransfer.setData(
                "application/x-inventory-item",
                JSON.stringify(payload),
              );
              event.dataTransfer.setData("text/plain", slot.instanceId);
              event.dataTransfer.effectAllowed = "move";
              onDragStart();
            }}
            onDragEnd={(event) => {
              event.preventDefault();
              onDragEnd();
            }}
            className="flex h-full select-none items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <EquipmentCard
              className="size-full"
              equipment={getEquipmentEntry(slot)}
              rarity={slot.rarity}
            />
          </div>
        ) : (
          <div className="flex h-full w-full select-none flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-white/5 p-2 text-center text-[10px] uppercase tracking-[0.3em] text-slate-500">
            {!!slotDefinition?.icon && (
              <Image
                src={slotDefinition.icon}
                alt={slotDefinition.label ?? ""}
                className="h-12 w-12 opacity-70 pointer-events-none"
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
            isActive && "opacity-40",
            !isActive && isHover && "opacity-20",
            !isActive && !isHover && "opacity-0",
          )}
        />
      </div>
    </div>
  );
}
