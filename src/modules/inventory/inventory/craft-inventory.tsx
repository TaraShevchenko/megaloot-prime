"use client";

import { useMemo, type DragEvent, type MouseEvent } from "react";
import Image from "next/image";
import {
  CHARACTERISTIC_LABELS,
  CHARACTERISTICS_ORDER,
  formatCharacteristicValue,
  rollCharacteristicValue,
  type CharacteristicsEnum,
} from "shared/types/characteristics";
import { RARITY_LABELS, RARITY_ORDER } from "shared/types/rarity";
import { cn } from "shared/utils/cn";
import {
  ADD_ICONS,
  CHANGE_VALUE_ICONS,
  equipmentPartIcon,
  goldIcon,
} from "../shared/craft-currency.icons";
import { useCraftCurrencyStore } from "../shared/craft-currency.store";
import { inventoryPanelClasses } from "../shared/inventory-panel-classes";
import {
  CRAFT_ITEM_SLOT_INDEX,
  useCraftInventoryStore,
} from "../shared/inventory.hooks";
import { INVENTORY_STORE_REGISTRY } from "../shared/inventory.registry";
import type { InventoryDragPayload, InventoryItem } from "../shared/inventory.types";
import { InventorySlotCard } from "../shared/ui/inventory-slot-card";

type CraftCurrencyDragPayload =
  | { type: "gold" }
  | { type: "parts" }
  | { type: "addChar"; level: number }
  | { type: "changeValueChar"; level: number };

const parsePayload = (
  event: DragEvent<HTMLDivElement>,
): InventoryDragPayload | null => {
  const payload = event.dataTransfer.getData("application/x-inventory-item");
  if (!payload) return null;
  try {
    const parsed = JSON.parse(payload) as InventoryDragPayload;
    if (!parsed?.inventoryId || typeof parsed.index !== "number") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const parseCraftCurrencyPayload = (
  event: DragEvent<HTMLDivElement>,
): CraftCurrencyDragPayload | null => {
  const payload = event.dataTransfer.getData("application/x-craft-currency");
  if (!payload) return null;
  try {
    const parsed = JSON.parse(payload) as CraftCurrencyDragPayload;
    if (!parsed?.type) return null;
    if (parsed.type === "addChar" || parsed.type === "changeValueChar") {
      if (typeof parsed.level !== "number" || !Number.isFinite(parsed.level)) {
        return null;
      }
    }
    return parsed;
  } catch {
    return null;
  }
};

const buildStackKey = (item: {
  type: string;
  id: string;
  rarity: string;
  rolledStats: Partial<Record<(typeof CHARACTERISTICS_ORDER)[number], number>>;
}) => {
  const stackKeyParts = CHARACTERISTICS_ORDER.map(
    (stat) => `${stat}:${item.rolledStats[stat] ?? ""}`,
  ).join("|");
  return `${item.type}:${item.id}:${item.rarity}:${stackKeyParts}`;
};

const pickRandom = <T,>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)]!;

const REPEAT_STAT_WEIGHT = 0.25;

const pickWeighted = <T,>(items: T[], weights: number[]): T => {
  const total = weights.reduce((sum, value) => sum + Math.max(0, value), 0);
  if (total <= 0) return pickRandom(items);

  const roll = Math.random() * total;
  let accumulator = 0;

  for (let index = 0; index < items.length; index += 1) {
    accumulator += Math.max(0, weights[index] ?? 0);
    if (roll <= accumulator) return items[index]!;
  }

  return items[items.length - 1]!;
};

const STAT_SLOT_COUNT = 6;

type RolledStatSlot = { stat: CharacteristicsEnum; value: number };
type RolledStatSlotEntry = RolledStatSlot | null;

const normalizeRolledStatSlots = (item: InventoryItem): RolledStatSlotEntry[] => {
  const maybeSlots = item.rolledStatSlots;

  if (Array.isArray(maybeSlots) && maybeSlots.length === STAT_SLOT_COUNT) {
    return maybeSlots.map((slot) => {
      if (!slot) return null;
      if (
        !slot.stat ||
        !CHARACTERISTICS_ORDER.includes(slot.stat) ||
        typeof slot.value !== "number" ||
        !Number.isFinite(slot.value)
      ) {
        return null;
      }
      return { stat: slot.stat, value: Math.round(slot.value) };
    });
  }

  const picked = CHARACTERISTICS_ORDER.filter(
    (stat) => typeof item?.rolledStats?.[stat] === "number",
  ).slice(0, STAT_SLOT_COUNT);

  return Array.from({ length: STAT_SLOT_COUNT }, (_, index) => {
    const stat = picked[index];
    const value = stat ? item?.rolledStats?.[stat] : undefined;
    return stat && typeof value === "number" && Number.isFinite(value)
      ? { stat, value: Math.round(value) }
      : null;
  });
};

const buildRolledStatsFromSlots = (
  slots: RolledStatSlotEntry[],
): Partial<Record<CharacteristicsEnum, number>> => {
  const rolled: Partial<Record<CharacteristicsEnum, number>> = {};

  for (const slot of slots) {
    if (!slot) continue;
    rolled[slot.stat] = (rolled[slot.stat] ?? 0) + Math.round(slot.value);
  }

  return rolled;
};

export function CraftInventory() {
  const slots = useCraftInventoryStore((state) => state.slots);
  const slotDefinitions = useCraftInventoryStore(
    (state) => state.slotDefinitions,
  );
  const inventoryId = useCraftInventoryStore((state) => state.id);
  const dragIndex = useCraftInventoryStore((state) => state.dragIndex);
  const hoverIndex = useCraftInventoryStore((state) => state.hoverIndex);
  const dragStart = useCraftInventoryStore((state) => state.dragStart);
  const dropOnSlot = useCraftInventoryStore((state) => state.dropOnSlot);
  const dragEnter = useCraftInventoryStore((state) => state.dragEnter);
  const dragLeave = useCraftInventoryStore((state) => state.dragLeave);
  const dragEnd = useCraftInventoryStore((state) => state.dragEnd);
  const notice = useCraftInventoryStore((state) => state.notice);

  const gold = useCraftCurrencyStore((state) => state.gold);
  const parts = useCraftCurrencyStore((state) => state.parts);
  const addOrChangeChars = useCraftCurrencyStore(
    (state) => state.addOrChangeChars,
  );
  const changeValueChars = useCraftCurrencyStore(
    (state) => state.changeValueChars,
  );

  const item = slots[CRAFT_ITEM_SLOT_INDEX];

  const forgeParams = useMemo(() => {
    if (!item) {
      return Array.from({ length: STAT_SLOT_COUNT }, () => ({
        stat: undefined,
        value: undefined,
      }));
    }

    const statSlots = normalizeRolledStatSlots(item);
    return statSlots.map((slot) => ({
      stat: slot?.stat,
      value: slot?.value,
    }));
  }, [item]);

  const applyCurrencyToCraftItem = (payload: CraftCurrencyDragPayload) => {
    const targetState = useCraftInventoryStore.getState();
    const current = targetState.slots[CRAFT_ITEM_SLOT_INDEX];
    if (!current) {
      useCraftInventoryStore.setState({ notice: "Drop currency on an item." });
      return;
    }

    const setCraftItem = (nextItem: typeof current) => {
      useCraftInventoryStore.setState((state) => {
        const nextSlots = [...state.slots];
        nextSlots[CRAFT_ITEM_SLOT_INDEX] = nextItem;
        return { slots: nextSlots };
      });
    };

    const currencyState = useCraftCurrencyStore.getState();
    const currentSlots = normalizeRolledStatSlots(current);
    const currentRolledStats = buildRolledStatsFromSlots(currentSlots);

    if (payload.type === "gold" || payload.type === "parts") {
      const currentIndex = RARITY_ORDER.indexOf(current.rarity);
      if (currentIndex === -1 || currentIndex >= RARITY_ORDER.length - 1) {
        useCraftInventoryStore.setState({ notice: "Item is already max rarity." });
        return;
      }

      const nextRarity = RARITY_ORDER[currentIndex + 1]!;
      const cost = currentIndex + 1;

      const spent =
        payload.type === "gold"
          ? currencyState.spendGold(cost)
          : currencyState.spendParts(cost);

      if (!spent) {
        useCraftInventoryStore.setState({
          notice: `Not enough ${payload.type}. Need ${cost}.`,
        });
        return;
      }

      // Upgrading rarity should NOT mutate existing rolled characteristics.
      const nextSlots = currentSlots.map((slot) =>
        slot ? { stat: slot.stat, value: slot.value } : null,
      );
      const nextRolledStats = { ...currentRolledStats };

      const nextItem = {
        ...current,
        rarity: nextRarity,
        rolledStats: nextRolledStats,
        rolledStatSlots: nextSlots,
        characteristics: nextRolledStats,
        stackKey: buildStackKey({
          type: current.type,
          id: current.id,
          rarity: nextRarity,
          rolledStats: nextRolledStats,
        }),
      };

      setCraftItem(nextItem);
      useCraftInventoryStore.setState({
        notice: `Upgraded rarity to ${RARITY_LABELS[nextRarity]} (cost ${cost} ${payload.type}).`,
      });
      return;
    }

    if (payload.type === "changeValueChar") {
      const levelIndex = Math.max(0, Math.min(5, payload.level - 1));
      const slot = currentSlots[levelIndex] ?? null;
      const stat = slot?.stat;
      if (!stat) {
        useCraftInventoryStore.setState({
          notice: "No characteristic in that slot to change value.",
        });
        return;
      }

      if ((currencyState.changeValueChars[levelIndex] ?? 0) < 1) {
        useCraftInventoryStore.setState({
          notice: `Not enough change-value (lvl ${payload.level}).`,
        });
        return;
      }

      const range = current.statRanges?.[current.rarity]?.[stat];
      if (!range) {
        useCraftInventoryStore.setState({
          notice: "This item cannot roll that characteristic.",
        });
        return;
      }

      currencyState.consumeChangeValueChar(payload.level, 1);

      const nextSlots = [...currentSlots];
      nextSlots[levelIndex] = { stat, value: Math.round(rollCharacteristicValue(range)) };

      const nextRolledStats = buildRolledStatsFromSlots(nextSlots);

      const nextItem = {
        ...current,
        rolledStats: nextRolledStats,
        rolledStatSlots: nextSlots,
        characteristics: nextRolledStats,
        stackKey: buildStackKey({
          type: current.type,
          id: current.id,
          rarity: current.rarity,
          rolledStats: nextRolledStats,
        }),
      };

      setCraftItem(nextItem);
      useCraftInventoryStore.setState({
        notice: `Changed value for ${CHARACTERISTIC_LABELS[stat]}.`,
      });
      return;
    }

    if (payload.type === "addChar") {
      const levelIndex = Math.max(0, Math.min(5, payload.level - 1));
      if ((currencyState.addOrChangeChars[levelIndex] ?? 0) < 1) {
        useCraftInventoryStore.setState({
          notice: `Not enough add (lvl ${payload.level}).`,
        });
        return;
      }

      if (currentSlots[levelIndex]) {
        useCraftInventoryStore.setState({
          notice: "That slot already has a characteristic.",
        });
        return;
      }
      const currentRanges = current.statRanges?.[current.rarity] ?? {};

      const presentStats = new Set<CharacteristicsEnum>(
        currentSlots.flatMap((slot) => (slot ? [slot.stat] : [])),
      );

      const candidates = CHARACTERISTICS_ORDER.filter((stat) =>
        Boolean(currentRanges[stat]),
      );

      if (candidates.length === 0) {
        useCraftInventoryStore.setState({
          notice: "This item has no available characteristics to roll.",
        });
        return;
      }

      const weights = candidates.map((stat) =>
        presentStats.has(stat) ? REPEAT_STAT_WEIGHT : 1,
      );

      const nextStat = pickWeighted(candidates, weights);

      const range = currentRanges[nextStat];
      if (!range) {
        useCraftInventoryStore.setState({
          notice: "This item cannot roll that characteristic.",
        });
        return;
      }

      currencyState.consumeAddOrChangeChar(payload.level, 1);

      const nextSlots = [...currentSlots];
      nextSlots[levelIndex] = { stat: nextStat, value: Math.round(rollCharacteristicValue(range)) };

      const nextRolledStats = buildRolledStatsFromSlots(nextSlots);

      const nextItem = {
        ...current,
        rolledStats: nextRolledStats,
        rolledStatSlots: nextSlots,
        characteristics: nextRolledStats,
        stackKey: buildStackKey({
          type: current.type,
          id: current.id,
          rarity: current.rarity,
          rolledStats: nextRolledStats,
        }),
      };

      setCraftItem(nextItem);
      useCraftInventoryStore.setState({
        notice: `Added ${CHARACTERISTIC_LABELS[nextStat]}.`,
      });
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, index: number) => {
    const craftCurrencyPayload = parseCraftCurrencyPayload(event);
    if (craftCurrencyPayload) {
      if (index !== CRAFT_ITEM_SLOT_INDEX) {
        useCraftInventoryStore.setState({
          notice: "Drop crafting currency on the item slot.",
        });
        return;
      }

      applyCurrencyToCraftItem(craftCurrencyPayload);
      return;
    }

    const payload = parsePayload(event);
    if (!payload) {
      dropOnSlot(index);
      return;
    }

    if (payload.inventoryId === inventoryId) {
      dragEnd();
      return;
    }

    const sourceStore = INVENTORY_STORE_REGISTRY[payload.inventoryId];
    if (!sourceStore) {
      dropOnSlot(index);
      return;
    }

    const sourceState = sourceStore.getState();
    const sourceItem = sourceState.slots[payload.index];
    if (!sourceItem) {
      dropOnSlot(index);
      return;
    }

    const targetState = useCraftInventoryStore.getState();
    if (!targetState.canPlaceItem(index, sourceItem)) {
      useCraftInventoryStore.setState({ notice: "Slot is restricted." });
      dragEnd();
      return;
    }

    const taken = sourceState.takeItem(payload.index);
    if (!taken) {
      dragEnd();
      return;
    }

    const targetItem = targetState.slots[index];

    if (targetState.placeItem(index, taken)) {
      sourceState.dragEnd();
      dragEnd();
      return;
    }

    if (targetItem) {
      const stackLimit = Math.max(
        1,
        targetState.slotDefinitions[index]?.maxStack ?? 1,
      );
      const stackable =
        stackLimit > 1 &&
        !!targetItem.stackKey &&
        !!taken.stackKey &&
        targetItem.stackKey === taken.stackKey;

      if (stackable) {
        sourceState.placeItem(payload.index, taken);
        sourceState.dragEnd();
        dragEnd();
        return;
      }

      const canSwapBack = sourceState.canPlaceItem(payload.index, targetItem);
      if (!canSwapBack) {
        sourceState.placeItem(payload.index, taken);
        sourceState.dragEnd();
        dragEnd();
        return;
      }

      const swappedOut = targetState.takeItem(index);
      if (!swappedOut) {
        sourceState.placeItem(payload.index, taken);
        sourceState.dragEnd();
        dragEnd();
        return;
      }

      if (!sourceState.placeItem(payload.index, swappedOut)) {
        targetState.placeItem(index, swappedOut);
        sourceState.placeItem(payload.index, taken);
        sourceState.dragEnd();
        dragEnd();
        return;
      }

      if (targetState.placeItem(index, taken)) {
        sourceState.dragEnd();
        dragEnd();
        return;
      }

      sourceState.takeItem(payload.index);
      sourceState.placeItem(payload.index, taken);
      targetState.placeItem(index, swappedOut);
      sourceState.dragEnd();
      dragEnd();
      return;
    }

    sourceState.placeItem(payload.index, taken);
    sourceState.dragEnd();
    dragEnd();
  };

  const renderItemSlot = (index: number) => (
    <div className="w-[225px]" key={slotDefinitions[index]?.id ?? index}>
      <InventorySlotCard
        slot={slots[index]}
        slotDefinition={slotDefinitions[index]}
        inventoryId={inventoryId}
        index={index}
        isActive={dragIndex === index}
        isHover={hoverIndex === index}
        variant="large"
        onDragStart={() => dragStart(index)}
        onDrop={(event: DragEvent<HTMLDivElement>) => handleDrop(event, index)}
        onDragEnter={() => dragEnter(index)}
        onDragLeave={dragLeave}
        onDragEnd={dragEnd}
        onContextMenu={(event: MouseEvent<HTMLDivElement>) =>
          event.preventDefault()
        }
      />
    </div>
  );

  const renderResourceSlot = (
    icon: typeof goldIcon,
    count: number,
    key: string,
    dragPayload?: CraftCurrencyDragPayload,
  ) => (
    <div
      key={key}
      className="aspect-square p-1 w-[88px]"
      draggable={!!dragPayload && count > 0}
      onDragStart={(event) => {
        if (!dragPayload || count <= 0) return;
        event.dataTransfer.setData(
          "application/x-craft-currency",
          JSON.stringify(dragPayload),
        );
        event.dataTransfer.effectAllowed = "move";
      }}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-xl border border-dashed border-white/10 bg-white/5",
          !!dragPayload && count > 0 && "cursor-grab active:cursor-grabbing",
          !!dragPayload && count <= 0 && "cursor-not-allowed",
        )}
      >
        <div className="flex h-full w-full items-center justify-center">
          <Image
            src={icon}
            alt=""
            aria-hidden="true"
            className={cn(
              "h-12 w-12 pointer-events-none",
              count > 0
                ? "brightness-100 saturate-100 opacity-90"
                : "brightness-50 saturate-0 opacity-40",
            )}
            style={{ imageRendering: "pixelated" }}
          />
        </div>
        {count > 0 ? (
          <div className="pointer-events-none absolute bottom-1 right-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-slate-50">
            {count}
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className={cn("w-fit", inventoryPanelClasses)}>
        <div className="flex flex-col gap-4">
          <div className="grid items-start justify-center gap-4 [grid-template-columns:auto_auto_auto]">
            <div className="grid grid-cols-1">
              {ADD_ICONS.map((icon, index) =>
                renderResourceSlot(
                  icon,
                  addOrChangeChars[index] ?? 0,
                  `add-slot-${index + 1}`,
                  { type: "addChar", level: index + 1 },
                ),
              )}
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                <div className="mt-2 flex flex-col gap-1 text-sm">
                  {forgeParams.map((param, index) => {
                    const statLabel = param.stat
                      ? CHARACTERISTIC_LABELS[param.stat]
                      : null;
                    const hasValue = typeof param.value === "number";
                    const statRange =
                      param.stat && item?.rarity
                        ? item?.statRanges?.[item.rarity]?.[param.stat]
                        : undefined;
                    return (
                      <div
                        key={index}
                        className={cn(
                          "font-mono text-[16px]",
                          hasValue ? "text-emerald-200" : "text-slate-400",
                        )}
                      >
                        {hasValue && statLabel ? (
                          <span>
                            {statLabel} {param.value}
                            {statRange ? (
                              <span className="ml-2 text-[12px] text-slate-400">
                                ({formatCharacteristicValue(statRange)})
                              </span>
                            ) : null}
                          </span>
                        ) : (
                          "unknown"
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1">
                {renderItemSlot(CRAFT_ITEM_SLOT_INDEX)}
              </div>

              <div className="flex items-center justify-center gap-2">
                {renderResourceSlot(goldIcon, gold, "gold-slot", { type: "gold" })}
                {renderResourceSlot(equipmentPartIcon, parts, "parts-slot", {
                  type: "parts",
                })}
              </div>
            </div>

            <div className="grid grid-cols-1">
              {CHANGE_VALUE_ICONS.map((icon, index) =>
                renderResourceSlot(
                  icon,
                  changeValueChars[index] ?? 0,
                  `change-value-slot-${index + 1}`,
                  { type: "changeValueChar", level: index + 1 },
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {notice ? (
        <div className="rounded-xl border border-amber-200/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
          {notice}
        </div>
      ) : null}
    </div>
  );
}
