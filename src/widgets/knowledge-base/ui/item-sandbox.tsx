"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { CRAFT_CURRENCY_SLOTS, CURRENCY_BY_ID } from "@/entities/currency";
import { CurrencyIcon } from "@/entities/currency/client";
import { EQUIPMENT_SLOT_IDS } from "@/entities/equipment";
import type { GameSession } from "@/entities/game-session";
import { createNewSession } from "@/entities/game-session";
import { DEFAULT_HERO_STATS } from "@/entities/hero";
import { BACKPACK_CAPACITY, createInventory } from "@/entities/inventory";
import { createItemInstance, EQUIPMENT_ITEMS } from "@/entities/item";
import { ItemCard, ItemStats } from "@/entities/item/client";
import { applyCurrency } from "@/features/craft-item";
import type { CurrencyType, RarityEnum } from "@/shared";
import { createSeededRandom, Panel, RARITY_ORDER } from "@/shared";

const INITIAL_CURRENCIES: Record<CurrencyType, number> = {
  GOLD: 60,
  EQUIPMENT_PART: 6,
  CRIMSON_GEM: 4,
  RARITY_INGOT: 2,
};

const createEmptyEquipped = () =>
  Object.fromEntries(
    EQUIPMENT_SLOT_IDS.map((slot) => [slot, null]),
  ) as GameSession["equipped"];

export function ItemSandbox() {
  const rngRef = useRef(createSeededRandom(1337));
  const initialDefinition = EQUIPMENT_ITEMS[0];
  const initialRarity = (RARITY_ORDER[0] ?? "COMMON") as RarityEnum;
  const [selectedId, setSelectedId] = useState<string>(
    initialDefinition?.id ?? "",
  );
  const [rarity, setRarity] = useState<RarityEnum>(initialRarity);
  const [session, setSession] = useState<GameSession>(() => {
    if (!initialDefinition) {
      return createNewSession({
        heroBaseStats: DEFAULT_HERO_STATS,
        inventory: createInventory(BACKPACK_CAPACITY),
        equipped: createEmptyEquipped(),
        currencies: INITIAL_CURRENCIES,
        monsters: [],
        craftItem: null,
      });
    }
    return createNewSession({
      heroBaseStats: DEFAULT_HERO_STATS,
      inventory: createInventory(BACKPACK_CAPACITY),
      equipped: createEmptyEquipped(),
      currencies: INITIAL_CURRENCIES,
      monsters: [],
      craftItem: createItemInstance(initialDefinition, {
        rarity: initialRarity,
        rng: rngRef.current,
      }),
    });
  });
  const [log, setLog] = useState<string[]>([]);

  const definition = useMemo(
    () => EQUIPMENT_ITEMS.find((item) => item.id === selectedId) ?? EQUIPMENT_ITEMS[0],
    [selectedId],
  );

  useEffect(() => {
    if (!definition) return;
    const next = createNewSession({
      heroBaseStats: DEFAULT_HERO_STATS,
      inventory: createInventory(BACKPACK_CAPACITY),
      equipped: createEmptyEquipped(),
      currencies: INITIAL_CURRENCIES,
      monsters: [],
      craftItem: createItemInstance(definition, { rarity, rng: rngRef.current }),
    });
    setSession(next);
    setLog([]);
  }, [definition, rarity]);

  const handleApply = (currencyId: CurrencyType) => {
    const result = applyCurrency(session, currencyId, rngRef.current);
    if (result.error) {
      setLog((prev) => [`Error: ${result.error}`, ...prev].slice(0, 6));
      return;
    }
    setSession(result.session);
    setLog((prev) => [`Applied ${CURRENCY_BY_ID[currencyId].label}.`, ...prev].slice(0, 6));
  };

  if (!definition) {
    return (
      <Panel title="Item Sandbox" subtitle="Simulate craft effects">
        <p className="text-sm text-muted-foreground">No equipment available.</p>
      </Panel>
    );
  }

  const craftStats = session.craft.item?.stats;

  return (
    <Panel title="Item Sandbox" subtitle="Simulate craft effects">
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Item</span>
          <select
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {EQUIPMENT_ITEMS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name[item.defaultRarity]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Rarity</span>
          <select
            value={rarity}
            onChange={(event) => setRarity(event.target.value as RarityEnum)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {RARITY_ORDER.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <ItemCard definition={definition} rarity={rarity} />
            <div>
              <div className="text-sm font-semibold">
                {definition.name[rarity]}
              </div>
              <div className="text-xs text-muted-foreground">
                {definition.type}
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            {CRAFT_CURRENCY_SLOTS.map((currencyId) => {
              const currency = CURRENCY_BY_ID[currencyId];
              const amount = session.currencies[currencyId] ?? 0;
              return (
                <button
                  key={currencyId}
                  type="button"
                  onClick={() => handleApply(currencyId)}
                  className="flex items-center gap-3 rounded-lg border border-border bg-muted px-3 py-2 text-left transition hover:bg-accent"
                >
                  <CurrencyIcon currency={currency} size={26} />
                  <div className="flex-1">
                    <div className="text-xs font-semibold">{currency.label}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {currency.description}
                    </div>
                  </div>
                  <span className="text-xs font-semibold">{amount}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-3">
          <ItemStats
            definition={definition}
            rarity={rarity}
            {...(craftStats ? { stats: craftStats } : {})}
          />
          <div className="rounded-lg border border-border bg-muted p-3">
            <div className="text-xs font-medium text-muted-foreground">
              Recent Actions
            </div>
            {log.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                No actions yet.
              </p>
            ) : (
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {log.map((entry, index) => (
                  <li key={`${entry}-${index}`}>{entry}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
}
