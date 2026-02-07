"use client";

import { useMemo, useState } from "react";

import {
  EQUIPMENT_ITEMS,
  EQUIPMENT_TYPE_LABELS,
  EQUIPMENT_TYPES,
} from "@/entities/item";
import { ItemCard, ItemStats } from "@/entities/item/client";
import type { RarityEnum } from "@/shared";
import { Panel, RARITY_ORDER } from "@/shared";

const ALL_TYPES = "ALL";
const ALL_RARITIES = "ALL";

export function ItemCatalog() {
  const [typeFilter, setTypeFilter] = useState<string>(ALL_TYPES);
  const [rarityFilter, setRarityFilter] = useState<string>(ALL_RARITIES);
  const [selectedId, setSelectedId] = useState<string>(
    EQUIPMENT_ITEMS[0]?.id ?? "",
  );

  const filtered = useMemo(() => {
    return EQUIPMENT_ITEMS.filter((item) =>
      typeFilter === ALL_TYPES ? true : item.type === typeFilter,
    );
  }, [typeFilter]);

  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0];
  if (!selected) {
    return (
      <Panel title="Equipment Library" subtitle="Filter by type and rarity to inspect">
        <p className="text-sm text-muted-foreground">No equipment available.</p>
      </Panel>
    );
  }
  const displayRarity =
    rarityFilter === ALL_RARITIES
      ? selected?.defaultRarity
      : (rarityFilter as RarityEnum);

  return (
    <Panel
      title="Equipment Library"
      subtitle="Filter by type and rarity to inspect"
    >
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Type</span>
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value={ALL_TYPES}>All</option>
            {EQUIPMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {EQUIPMENT_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Rarity</span>
          <select
            value={rarityFilter}
            onChange={(event) => setRarityFilter(event.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value={ALL_RARITIES}>All</option>
            {RARITY_ORDER.map((rarity) => (
              <option key={rarity} value={rarity}>
                {rarity}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((item) => {
            const rarity =
              rarityFilter === ALL_RARITIES
                ? item.defaultRarity
                : (rarityFilter as RarityEnum);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className="flex items-center gap-3 rounded-lg border border-border bg-muted p-3 text-left transition hover:bg-accent"
              >
                <ItemCard definition={item} rarity={rarity} />
                <div>
                  <div className="text-sm font-semibold">
                    {item.name[rarity]}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.type}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div>
          {selected ? (
            <ItemStats
              definition={selected}
              rarity={displayRarity ?? selected.defaultRarity}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              Select an item to inspect.
            </p>
          )}
        </div>
      </div>
    </Panel>
  );
}
