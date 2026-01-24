"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import equipmentPartIcon from "modules/equipment/assets/equipment-part.png";
import goldIcon from "modules/equipment/assets/gold.png";
import { RARITY_BACKGROUNDS, RarityEnum } from "shared/types/rarity";
import { cn } from "shared/utils/cn";
import { useInventoryStore } from "./inventory.store";
import type { InventoryItem, InventorySlot } from "./inventory.types";

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

type ContextMenuState = {
  index: number;
  x: number;
  y: number;
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
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contextMenu) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current?.contains(event.target as Node)) {
        return;
      }
      setContextMenu(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContextMenu(null);
      }
    };

    const handleScroll = () => {
      setContextMenu(null);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [contextMenu]);

  const contextItem = contextMenu ? slots[contextMenu.index] : undefined;
  const sellValue = contextItem ? SELL_VALUES[contextItem.rarity] : 0;
  const disenchantValue = contextItem
    ? DISENCHANT_VALUES[contextItem.rarity]
    : 0;

  const handleContextMenu = (
    event: MouseEvent<HTMLDivElement>,
    index: number,
    slot: InventorySlot,
  ) => {
    event.preventDefault();
    if (!slot) return;

    const menuWidth = 220;
    const menuHeight = 118;
    const padding = 12;
    const x = Math.max(
      padding,
      Math.min(event.clientX, window.innerWidth - menuWidth - padding),
    );
    const y = Math.max(
      padding,
      Math.min(event.clientY, window.innerHeight - menuHeight - padding),
    );

    setContextMenu({ index, x, y });
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2.5 sm:gap-3">
        {slots.map((slot, index) => (
          <InventorySlotCard
            key={index}
            slot={slot}
            index={index}
            isActive={dragIndex === index}
            isHover={hoverIndex === index}
            onDragStart={() => {
              setContextMenu(null);
              dragStart(index);
            }}
            onDrop={() => {
              setContextMenu(null);
              dropOnSlot(index);
            }}
            onDragEnter={() => dragEnter(index)}
            onDragLeave={dragLeave}
            onDragEnd={dragEnd}
            onContextMenu={(event) => handleContextMenu(event, index, slot)}
          />
        ))}
      </div>
      {contextMenu && contextItem && (
        <div
          ref={menuRef}
          className="fixed z-50 w-56 rounded-xl border border-white/10 bg-[#0b1320]/95 p-2 text-slate-100 shadow-[0_18px_60px_rgba(0,0,0,0.5)] backdrop-blur"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          role="menu"
          aria-label={`Inventory actions for ${contextItem.name}`}
          onContextMenu={(event) => event.preventDefault()}
        >
          <div className="px-2 pb-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
            {contextItem.name}
          </div>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold transition hover:bg-white/5"
            onClick={() => {
              removeItem(contextMenu.index);
              setContextMenu(null);
            }}
            aria-label={`Продать за ${sellValue} золота`}
          >
            <span className="text-slate-100">Продать</span>
            <span className="ml-auto flex items-center gap-1 text-amber-200">
              <Image
                src={goldIcon}
                alt=""
                aria-hidden="true"
                className="h-4 w-4 object-contain"
              />
              <span>{sellValue}</span>
            </span>
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold transition hover:bg-white/5"
            onClick={() => {
              removeItem(contextMenu.index);
              setContextMenu(null);
            }}
            aria-label={`Распылить за ${disenchantValue} материалов`}
          >
            <span className="text-slate-100">Распылить</span>
            <span className="ml-auto flex items-center gap-1 text-cyan-200">
              <Image
                src={equipmentPartIcon}
                alt=""
                aria-hidden="true"
                className="h-4 w-4 object-contain"
              />
              <span>{disenchantValue}</span>
            </span>
          </button>
        </div>
      )}
    </>
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
  onContextMenu: (event: MouseEvent<HTMLDivElement>) => void;
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
      onContextMenu={onContextMenu}
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
