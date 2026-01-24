"use client";

import Image from "next/image";
import { RARITY_BACKGROUNDS } from "shared/types/rarity";
import { cn } from "shared/utils/cn";
import { useInventoryStore } from "./inventory.store";
import type { InventoryItem, InventorySlot } from "./inventory.types";

export function InventoryUi() {
  const slots = useInventoryStore((state) => state.slots);
  const dragIndex = useInventoryStore((state) => state.dragIndex);
  const hoverIndex = useInventoryStore((state) => state.hoverIndex);
  const dragStart = useInventoryStore((state) => state.dragStart);
  const dropOnSlot = useInventoryStore((state) => state.dropOnSlot);
  const dragEnter = useInventoryStore((state) => state.dragEnter);
  const dragLeave = useInventoryStore((state) => state.dragLeave);
  const dragEnd = useInventoryStore((state) => state.dragEnd);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2.5 sm:gap-3">
      {slots.map((slot, index) => (
        <InventorySlotCard
          key={index}
          slot={slot}
          index={index}
          isActive={dragIndex === index}
          isHover={hoverIndex === index}
          onDragStart={() => dragStart(index)}
          onDrop={() => dropOnSlot(index)}
          onDragEnter={() => dragEnter(index)}
          onDragLeave={dragLeave}
          onDragEnd={dragEnd}
        />
      ))}
    </div>
  );
}

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
}: InventorySlotCardProps) {
  return (
    <div
      className={cn(
        "relative aspect-square rounded-xl border border-white/10 bg-[#0b1320]/70 p-1.5 transition",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_40px_rgba(0,0,0,0.4)]",
        isActive && "border-cyan-300/80 ring-2 ring-cyan-400/40",
        isHover && "border-emerald-300/60 bg-[#102030]",
      )}
      onDragOver={(event) => {
        event.preventDefault();
        onDragEnter();
      }}
      onDragLeave={onDragLeave}
      onDrop={(event) => {
        event.preventDefault();
        onDrop();
      }}
      role="listitem"
      aria-label={slot ? `${slot.name} slot` : `Empty slot ${index + 1}`}
    >
      {slot ? (
        <InventoryItemCard
          item={slot}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/10 bg-white/5">
          <span className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
            Empty
          </span>
          <span className="text-xs text-slate-500">#{index + 1}</span>
        </div>
      )}
    </div>
  );
}

type InventoryItemCardProps = {
  item: InventoryItem;
  onDragStart: () => void;
  onDragEnd: () => void;
};

export function InventoryItemCard({
  item,
  onDragStart,
  onDragEnd,
}: InventoryItemCardProps) {
  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", item.instanceId);
        event.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragEnd={(event) => {
        event.preventDefault();
        onDragEnd();
      }}
      className="group relative flex h-full cursor-grab items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/5 p-2 transition hover:border-cyan-200/50 active:cursor-grabbing"
      style={{ backgroundImage: RARITY_BACKGROUNDS[item.rarity] }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40" />
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-black/35 shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
          <Image
            src={item.skin}
            alt={item.name}
            className="h-12 w-12 object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.45)]"
            style={{ imageRendering: "pixelated" }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20" />
        </div>
      </div>
    </div>
  );
}
