import { type MouseEvent } from "react";
import { EQUIPMENT_ITEMS, type EquipmentEntry } from "modules/equipment";
import { EquipmentCard } from "modules/equipment/client";
import { RARITY_ORDER } from "shared/types/rarity";
import { cn } from "shared/utils/cn";
import type { InventoryItem, InventorySlot } from "../inventory.types";

type InventorySlotCardProps = {
  slot: InventorySlot;
  index: number;
  isActive: boolean;
  isHover: boolean;
  onDragStart: () => void;
  onDrop: () => void;
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
      aria-label={slot ? `${slot.name} slot` : `Empty slot ${index + 1}`}
      className={cn(
        "relative aspect-square overflow-hidden rounded-xl transition",
      )}
      onDrop={(event) => {
        event.preventDefault();
        onDrop();
      }}
      onDragOver={(event) => {
        event.preventDefault();
        onDragEnter();
      }}
      onDragLeave={onDragLeave}
      onContextMenu={onContextMenu}
    >
      {slot ? (
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData("text/plain", slot.instanceId);
            event.dataTransfer.effectAllowed = "move";
            onDragStart();
          }}
          onDragEnd={(event) => {
            event.preventDefault();
            onDragEnd();
          }}
          className="flex h-full items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <EquipmentCard
            equipment={getEquipmentEntry(slot)}
            rarity={slot.rarity}
          />
        </div>
      ) : (
        <div className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-white/10 bg-white/5 p-2 text-center text-[11px] uppercase tracking-[0.3em] text-slate-500">
          Empty
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
  );
}
