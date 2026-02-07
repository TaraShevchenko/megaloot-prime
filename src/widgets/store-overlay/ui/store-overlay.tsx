"use client";

import { useMemo, useState } from "react";

import { CURRENCY_BY_ID } from "@/entities/currency";
import { CurrencyIcon } from "@/entities/currency/client";
import { EQUIPMENT_BY_ID } from "@/entities/item";
import { ItemCard, ItemStats } from "@/entities/item/client";
import { saveSession } from "@/features/persist-session";
import { buyStoreItem, STORE_ITEMS } from "@/features/store";
import { useGameStore, useSession, useStoreOpen } from "@/processes/game/client";
import { Button, Panel } from "@/shared";

export function StoreOverlay() {
  const isOpen = useStoreOpen();
  const session = useSession();
  const closeStore = useGameStore((state) => state.closeStore);
  const setSession = useGameStore((state) => state.setSession);
  const setNotice = useGameStore((state) => state.setNotice);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem = useMemo(
    () => STORE_ITEMS.find((entry) => entry.id === selectedId) ?? null,
    [selectedId],
  );

  if (!isOpen) return null;
  if (!session) return null;

  const handleBuy = (id: string) => {
    const result = buyStoreItem(session, id);
    if (result.error) {
      setNotice({ tone: "error", message: result.error });
      return;
    }
    setSession(result.session);
    saveSession(result.session);
    setNotice({ tone: "info", message: "Purchase complete." });
  };

  const gold = CURRENCY_BY_ID.GOLD;

  return (
    <div className="absolute inset-0 z-20 flex items-start justify-center rounded-xl bg-background/80 p-6 backdrop-blur-sm">
      <Panel
        title="Store"
        subtitle="Right-click to buy"
        actions={
          <Button tone="ghost" onClick={closeStore}>
            Close
          </Button>
        }
        className="w-full max-w-5xl"
      >
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {STORE_ITEMS.map((entry) => {
              const definition = EQUIPMENT_BY_ID[entry.definitionId];
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setSelectedId(entry.id)}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    handleBuy(entry.id);
                  }}
                  className="flex items-center gap-3 rounded-lg border border-border bg-muted p-3 text-left transition hover:bg-accent"
                >
                  <ItemCard definition={definition} rarity={entry.rarity} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">
                      {definition.name[entry.rarity]}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {definition.type}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <CurrencyIcon currency={gold} size={18} />
                    {entry.price}
                  </div>
                </button>
              );
            })}
          </div>
          <div>
            {selectedItem ? (
              <ItemStats
                definition={EQUIPMENT_BY_ID[selectedItem.definitionId]}
                rarity={selectedItem.rarity}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Select an item to inspect.
              </p>
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
}
