"use client";

import Image, { type StaticImageData } from "next/image";
import { type DragEvent, useMemo, useState } from "react";

import {
  ADD_ICONS,
  CHANGE_VALUE_ICONS,
  cloneItemIcon,
  improve3RandomIcon,
  improveRandomIcon,
  improveSelectedIcon,
  rarityUpdateToEpicIcon,
  rarityUpdateToLegendaryIcon,
  rarityUpdateToRareIcon,
  rarityUpdateToUncommonIcon,
  removeRandomIcon,
  removeSelectedIcon,
} from "@/entities/craft";
import { RARITY_UPGRADE_ORDER } from "@/entities/craft";
import { CURRENCY_BY_ID } from "@/entities/currency";
import { EQUIPMENT_BY_ID, normalizeRolledStatSlots, STAT_SLOT_COUNT } from "@/entities/item";
import { ItemCard } from "@/entities/item/client";
import {
  applyCraftAction,
  CRAFT_CURRENCY_DRAG_TYPE,
  isCraftCurrencyDragData,
  type CraftCurrencyDragPayload,
} from "@/features/craft-item";
import {
  INVENTORY_DRAG_TYPE,
  isInventoryDragData,
  moveInventoryItem,
  type InventoryLocation,
} from "@/features/inventory-move";
import { saveSession } from "@/features/persist-session";
import { useGameStore, useSession } from "@/processes/game/client";
import { CHARACTERISTIC_LABELS, formatCharacteristicValue } from "@/shared/types/characteristics";
import { RARITY_LABELS } from "@/shared/types/rarity";
import { cn, getDragData, Panel, setDragData } from "@/shared";

const FORGE_ACTION_SLOTS = [
  {
    key: "remove-random",
    icon: removeRandomIcon,
    payload: { type: "removeRandomChar" as const },
    label: "Remove random",
  },
  {
    key: "remove-selected",
    icon: removeSelectedIcon,
    payload: { type: "removeSelectedChar" as const },
    label: "Remove selected",
  },
  {
    key: "improve-random",
    icon: improveRandomIcon,
    payload: { type: "improveRandomChar" as const },
    label: "Improve random",
  },
  {
    key: "improve-selected",
    icon: improveSelectedIcon,
    payload: { type: "improveSelectedChar" as const },
    label: "Improve selected",
  },
  {
    key: "improve-3-random",
    icon: improve3RandomIcon,
    payload: { type: "improve3RandomChar" as const },
    label: "Improve 3 random",
  },
  {
    key: "clone-item",
    icon: cloneItemIcon,
    payload: { type: "cloneItem" as const },
    label: "Clone item",
  },
];

export function CraftCurrencies() {
  const session = useSession();
  const rng = useGameStore((state) => state.rng);
  const setSession = useGameStore((state) => state.setSession);
  const setNotice = useGameStore((state) => state.setNotice);
  const [selectedStatIndex, setSelectedStatIndex] = useState<number | null>(null);
  const [isOverCraft, setIsOverCraft] = useState(false);
  const [isDraggingItem, setIsDraggingItem] = useState(false);

  if (!session) return null;

  const craftItem = session.craft.item;
  const craftTokens = session.craft.tokens;
  const definition = craftItem
    ? EQUIPMENT_BY_ID[craftItem.definitionId]
    : null;

  const gold = session.currencies.GOLD ?? 0;
  const parts = session.currencies.EQUIPMENT_PART ?? 0;
  const craftSlots = useMemo(
    () =>
      craftItem
        ? normalizeRolledStatSlots(craftItem.stats, craftItem.rolledStatSlots)
        : Array.from({ length: STAT_SLOT_COUNT }, () => null),
    [craftItem],
  );

  const handleDropOnCraftSlot = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOverCraft(false);

    const data = getDragData(event.dataTransfer);
    if (isInventoryDragData(data)) {
      const result = moveInventoryItem(session, data.payload, { area: "craft" });
      if (result.error) {
        setNotice({ tone: "error", message: result.error });
        return;
      }
      setSession(result.session);
      saveSession(result.session);
      return;
    }

    if (isCraftCurrencyDragData(data)) {
      const result = applyCraftAction(session, data.payload, {
        rng,
        selectedStatIndex,
      });
      if (result.error) {
        setNotice({ tone: "error", message: result.error });
        return;
      }
      setSession(result.session);
      saveSession(result.session);
      if (result.info) {
        setNotice({ tone: "info", message: result.info });
      }
    }
  };

  return (
    <Panel
      className="p-3"
      title="Crafting"
      subtitle="Drop currencies on the item slot to modify it"
    >
      <div className="grid gap-4 lg:grid-cols-[auto_auto_1fr_auto_auto]">
        <div className="grid grid-cols-1">
          {ADD_ICONS.map((icon, index) => (
            <CraftTokenSlot
              key={`add-slot-${index + 1}`}
              icon={icon}
              count={craftTokens.addOrChangeChars[index] ?? 0}
              payload={{ type: "addChar", level: index + 1 }}
              label={`Add characteristic (lvl ${index + 1})`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1">
          {FORGE_ACTION_SLOTS.map(({ key, icon, payload, label }) => (
            <CraftTokenSlot
              key={key}
              icon={icon}
              count={craftTokens.forgeActions[payload.type] ?? 0}
              payload={payload}
              label={label}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 self-stretch">
          <div
            className={cn(
              "flex h-24 w-24 items-center justify-center rounded-xl border border-border bg-muted/40 transition",
              !craftItem && "border-dashed",
              isOverCraft && "border-primary/60 ring-2 ring-primary/20",
            )}
            onDragEnter={() => setIsOverCraft(true)}
            onDragLeave={(event) => {
              if (
                event.currentTarget.contains(event.relatedTarget as Node | null)
              ) {
                return;
              }
              setIsOverCraft(false);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
            }}
            onDrop={handleDropOnCraftSlot}
            data-craft-slot
          >
            {craftItem && definition ? (
              <div
                draggable
                onDragStart={(event) => {
                  setIsDraggingItem(true);
                  setDragData(event.dataTransfer, {
                    type: INVENTORY_DRAG_TYPE,
                    payload: { area: "craft" } as InventoryLocation,
                  });
                }}
                onDragEnd={() => setIsDraggingItem(false)}
                className={cn(isDraggingItem && "opacity-60")}
              >
                <ItemCard
                  definition={definition}
                  rarity={craftItem.rarity}
                  className="h-20 w-20 p-2"
                  imageClassName="h-16 w-16"
                />
              </div>
            ) : (
              <div className="h-6 w-6 rounded-full bg-border/60" aria-hidden="true" />
            )}
          </div>

          <div className="w-full rounded-xl border border-border bg-muted/40 p-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Stats
            </div>
            <div className="mt-2 flex flex-col gap-1">
              {craftSlots.map((slot, index) => {
                const statLabel = slot?.stat
                  ? CHARACTERISTIC_LABELS[slot.stat]
                  : null;
                const statRange =
                  slot?.stat && craftItem && definition
                    ? definition.statRanges?.[craftItem.rarity]?.[slot.stat]
                    : undefined;
                const hasValue = typeof slot?.value === "number";

                return (
                  <button
                    key={`stat-slot-${index}`}
                    type="button"
                    className={cn(
                      "rounded-md px-2 py-1 text-left text-sm font-mono transition",
                      hasValue ? "text-emerald-200" : "text-muted-foreground",
                      selectedStatIndex === index &&
                        "bg-primary/10 ring-1 ring-primary/30",
                    )}
                    onClick={() => setSelectedStatIndex(index)}
                  >
                    {hasValue && statLabel ? (
                      <span>
                        {statLabel} {slot?.value}
                        {statRange ? (
                          <span className="ml-2 text-[11px] text-muted-foreground">
                            ({formatCharacteristicValue(statRange)})
                          </span>
                        ) : null}
                      </span>
                    ) : (
                      "unknown"
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1">
          <CraftTokenSlot
            icon={CURRENCY_BY_ID.GOLD.icon}
            count={gold}
            payload={{ type: "gold" }}
            label={`Gold (${gold})`}
          />
          <CraftTokenSlot
            icon={CURRENCY_BY_ID.EQUIPMENT_PART.icon}
            count={parts}
            payload={{ type: "parts" }}
            label={`Parts (${parts})`}
          />
          {[
            {
              rarity: RARITY_UPGRADE_ORDER[0],
              icon: rarityUpdateToUncommonIcon,
            },
            {
              rarity: RARITY_UPGRADE_ORDER[1],
              icon: rarityUpdateToRareIcon,
            },
            {
              rarity: RARITY_UPGRADE_ORDER[2],
              icon: rarityUpdateToEpicIcon,
            },
            {
              rarity: RARITY_UPGRADE_ORDER[3],
              icon: rarityUpdateToLegendaryIcon,
            },
          ]
            .filter((entry) => entry.rarity)
            .map((entry) => {
              const rarity = entry.rarity!;
              return (
                <CraftTokenSlot
                  key={`rarity-${rarity}`}
                  icon={entry.icon}
                  count={craftTokens.rarityUpgrades[rarity] ?? 0}
                  payload={{ type: "setRarity", rarity }}
                  label={`Upgrade to ${RARITY_LABELS[rarity]}`}
                />
              );
            })}
        </div>

        <div className="grid grid-cols-1">
          {CHANGE_VALUE_ICONS.map((icon, index) => (
            <CraftTokenSlot
              key={`change-value-slot-${index + 1}`}
              icon={icon}
              count={craftTokens.changeValueChars[index] ?? 0}
              payload={{ type: "changeValueChar", level: index + 1 }}
              label={`Change value (lvl ${index + 1})`}
            />
          ))}
        </div>
      </div>
    </Panel>
  );
}

type CraftTokenSlotProps = {
  icon: StaticImageData;
  count: number;
  payload: CraftCurrencyDragPayload;
  label?: string;
};

function CraftTokenSlot({ icon, count, payload, label }: CraftTokenSlotProps) {
  const isDraggable = count > 0;

  return (
    <div
      draggable={isDraggable}
      onDragStart={(event) => {
        if (!isDraggable) {
          event.preventDefault();
          return;
        }
        setDragData(event.dataTransfer, {
          type: CRAFT_CURRENCY_DRAG_TYPE,
          payload,
        });
      }}
      className="aspect-square w-[88px] p-1"
      title={label}
    >
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/50",
          isDraggable && "cursor-grab active:cursor-grabbing",
          !isDraggable && "cursor-not-allowed opacity-60",
        )}
      >
        <Image
          src={icon}
          alt=""
          aria-hidden="true"
          className="h-12 w-12 object-contain"
          style={{ imageRendering: "pixelated" }}
        />
        {count > 0 ? (
          <div className="pointer-events-none absolute bottom-1 right-1 rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] font-semibold">
            {count}
          </div>
        ) : null}
      </div>
    </div>
  );
}
