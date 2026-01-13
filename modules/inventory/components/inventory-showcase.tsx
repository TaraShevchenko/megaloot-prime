"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { RARITY_BACKGROUNDS } from "shared/types/rarity";
import { cn } from "shared/utils/cn";
import type { InventoryItem, InventorySlot } from "../types";
import { createRandomInventoryItem } from "../utils";

// TODO: Добавь документацию как создавать новый модуль, на основе modules\monsters и modules\equipment. Потому что я попросил агента создать модуль inventory и там нет папки shared там нет нормальных public api client и default(без use client),
// TODO: Этот компонент должен быть в app и все что не касаеться базовых возможностей модуля inventory тут быть недолжно

const DEFAULT_SLOTS = 20;

export function InventoryShowcase() {
  const [slots, setSlots] = useState<InventorySlot[]>(() =>
    Array.from({ length: DEFAULT_SLOTS }, () => undefined),
  );
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const filledCount = useMemo(() => slots.filter(Boolean).length, [slots]);

  const resetDragState = () => {
    setDragIndex(null);
    setHoverIndex(null);
  };

  const handleSpawnItem = () => {
    const emptyIndex = slots.findIndex((slot) => !slot);
    if (emptyIndex === -1) {
      setNotice("No free slots - add space to spawn more loot.");
      return;
    }

    const nextSlots = [...slots];
    nextSlots[emptyIndex] = createRandomInventoryItem();
    setSlots(nextSlots);
    setNotice(null);
  };

  const handleAddSlot = () => {
    setSlots((prev) => [...prev, undefined]);
    setNotice(null);
  };

  const handleDragStart = (index: number) => {
    if (!slots[index]) return;
    setDragIndex(index);
    setNotice(null);
  };

  const handleDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) {
      resetDragState();
      return;
    }

    setSlots((prev) => {
      const updated = [...prev];
      [updated[targetIndex], updated[dragIndex]] = [
        updated[dragIndex],
        updated[targetIndex],
      ];
      return updated;
    });

    resetDragState();
  };

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-[#05080f] text-slate-50",
        "bg-[radial-gradient(900px_600px_at_20%_0%,rgba(59,130,246,0.15),transparent_55%),radial-gradient(1000px_700px_at_80%_-10%,rgba(16,185,129,0.18),transparent_55%)]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(148,163,184,0.08),transparent_30%,rgba(96,165,250,0.12))]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,#1f2937,1px,transparent_0)] [background-size:32px_32px]" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6">
        <header className="flex flex-col gap-3 animate-[fade-rise_0.6s_ease_both]">
          <p className="text-[10px] uppercase tracking-[0.5em] text-emerald-200/80">
            Inventory Lab
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Drag & Drop Storage
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Compact inventory grid: drag items between slots, spawn random loot,
            and expand capacity.
          </p>
        </header>

        <div className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 bg-[linear-gradient(120deg,rgba(56,189,248,0.08),rgba(14,165,233,0.03),rgba(16,185,129,0.08))] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm animate-[fade-rise_0.65s_ease_both]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-300">
              <span className="rounded-full border border-white/10 px-3 py-1 font-semibold text-cyan-100">
                Slots: {filledCount}/{slots.length}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 font-semibold text-emerald-100">
                Free: {slots.length - filledCount}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 font-semibold text-amber-100">
                Drag to swap
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSpawnItem}
                className="rounded-xl border border-cyan-300/50 bg-[linear-gradient(120deg,rgba(14,165,233,0.4),rgba(14,165,233,0.15))] px-4 py-2 text-sm font-semibold text-slate-50 shadow-[0_12px_40px_rgba(56,189,248,0.25)] transition hover:-translate-y-[1px] hover:shadow-[0_16px_44px_rgba(56,189,248,0.35)] focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
              >
                Spawn random item
              </button>
              <button
                type="button"
                onClick={handleAddSlot}
                className="rounded-xl border border-emerald-300/40 bg-[linear-gradient(120deg,rgba(16,185,129,0.45),rgba(16,185,129,0.16))] px-4 py-2 text-sm font-semibold text-slate-50 shadow-[0_12px_40px_rgba(16,185,129,0.25)] transition hover:-translate-y-[1px] hover:shadow-[0_16px_44px_rgba(16,185,129,0.35)] focus:outline-none focus:ring-2 focus:ring-emerald-300/70"
              >
                Add slot
              </button>
            </div>
          </div>

          {notice ? (
            <div className="rounded-xl border border-amber-200/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
              {notice}
            </div>
          ) : null}

          <div className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2.5 sm:gap-3">
            {slots.map((slot, index) => (
              <InventorySlotCard
                key={index}
                slot={slot}
                index={index}
                isActive={dragIndex === index}
                isHover={hoverIndex === index}
                onDragStart={() => handleDragStart(index)}
                onDrop={() => handleDrop(index)}
                onDragEnter={() => setHoverIndex(index)}
                onDragLeave={() => setHoverIndex(null)}
                onDragEnd={resetDragState}
              />
            ))}
          </div>
        </div>
      </div>
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

function InventorySlotCard({
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

function InventoryItemCard({
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
