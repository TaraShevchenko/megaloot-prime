"use client";

import { useState } from "react";
import { cn } from "shared/utils/cn";
import type { RarityEnum } from "shared/rarity";
import { EquipmentCard } from "./components/EquipmentCard";
import { EQUIPMENT_ITEMS, type EquipmentId } from "./equipment.data";

export default function EquipmentPage() {
  const [rarities, setRarities] = useState<Record<EquipmentId, RarityEnum>>(
    () =>
      EQUIPMENT_ITEMS.reduce(
        (acc, equipment) => {
          acc[equipment.id] = equipment.defaultRarity;
          return acc;
        },
        {} as Record<EquipmentId, RarityEnum>,
      ),
  );

  const updateRarity = (id: EquipmentId, rarity: RarityEnum) => {
    setRarities((prev) => ({ ...prev, [id]: rarity }));
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full font-sans text-slate-100",
        "bg-[#0b0f14] bg-[radial-gradient(800px_400px_at_15%_-10%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(900px_500px_at_85%_-15%,rgba(251,191,36,0.18),transparent_60%)]",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-8">
        <header
          className={cn(
            "flex flex-col gap-3",
            "animate-[fade-rise_0.7s_ease_both]",
          )}
        >
          <p className="text-xs uppercase tracking-[0.6em] text-amber-200/80">
            Armory Log
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Equipment Field Table
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Prototype registry of equipment cards with selectable rarity skins.
            Items will expand into a list with stat panels later on.
          </p>
        </header>

        <section
          className={cn(
            "flex flex-col gap-6",
            "animate-[fade-rise_0.7s_ease_both]",
          )}
        >
          {EQUIPMENT_ITEMS.map((equipment, index) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              index={index}
              rarity={rarities[equipment.id] ?? equipment.defaultRarity}
              onRarityChange={(rarity) => updateRarity(equipment.id, rarity)}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
