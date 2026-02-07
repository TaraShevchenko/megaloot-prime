"use client";

import { useMemo, useState, type MouseEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import {
  type CraftCurrencyDragPayload,
  DND_ITEM_TYPE,
  buildCraftCurrencyId,
  isCraftCurrencyDragData,
  isInventoryDropData,
} from "modules/inventory/shared/dnd/dnd.types";
import {
  CHARACTERISTIC_LABELS,
  CHARACTERISTICS_ORDER,
  formatCharacteristicValue,
  rollCharacteristicValue,
  type CharacteristicValue,
  type CharacteristicsEnum,
} from "shared/types/characteristics";
import {
  RARITY_LABELS,
  RARITY_ORDER,
  RarityEnum,
  type RarityEnum as RarityEnumType,
} from "shared/types/rarity";
import { cn } from "shared/utils/cn";
import {
  ADD_ICONS,
  CHANGE_VALUE_ICONS,
  cloneItemIcon,
  equipmentPartIcon,
  goldIcon,
  improve3RandomIcon,
  improveRandomIcon,
  improveSelectedIcon,
  rarityUpdateToEpicIcon,
  rarityUpdateToLegendaryIcon,
  rarityUpdateToRareIcon,
  rarityUpdateToUncommonIcon,
  removeRandomIcon,
  removeSelectedIcon,
} from "../shared/craft-currency.icons";
import { useCraftCurrencyStore } from "../shared/craft-currency.store";
import {
  FORGE_ACTIONS,
  type RarityUpgrade,
} from "../shared/craft-currency.types";
import { inventoryPanelClasses } from "../shared/inventory-panel-classes";
import {
  CRAFT_ITEM_SLOT_INDEX,
  useCraftInventoryStore,
  useInventoryStore,
} from "../shared/inventory.hooks";
import type { InventoryItem } from "../shared/inventory.types";
import { InventorySlotCard } from "../shared/ui/inventory-slot-card";

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

const rollChance = (chance: number): boolean => Math.random() < chance;

const pickDistinct = <T,>(items: T[], count: number): T[] => {
  const picked: T[] = [];
  const pool = [...items];
  while (pool.length > 0 && picked.length < count) {
    const item = pickRandom(pool);
    picked.push(item);
    pool.splice(pool.indexOf(item), 1);
  }
  return picked;
};

const createInstanceId = (): string =>
  `loot-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;

const STAT_SLOT_COUNT = 6;

type RolledStatSlot = { stat: CharacteristicsEnum; value: number };
type RolledStatSlotEntry = RolledStatSlot | null;

const normalizeRolledStatSlots = (
  item: InventoryItem,
): RolledStatSlotEntry[] => {
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

const getRangeBounds = (
  value: CharacteristicValue,
): { min: number; max: number } => {
  if (Array.isArray(value)) {
    const [first, second] = value;
    return { min: Math.min(first, second), max: Math.max(first, second) };
  }

  return { min: value, max: value };
};

const clampToRange = (value: number, range: CharacteristicValue): number => {
  const { min, max } = getRangeBounds(range);
  return Math.max(min, Math.min(max, value));
};

export function CraftInventory() {
  const slots = useCraftInventoryStore((state) => state.slots);
  const slotDefinitions = useCraftInventoryStore(
    (state) => state.slotDefinitions,
  );
  const inventoryId = useCraftInventoryStore((state) => state.id);
  const notice = useCraftInventoryStore((state) => state.notice);

  const gold = useCraftCurrencyStore((state) => state.gold);
  const parts = useCraftCurrencyStore((state) => state.parts);
  const addOrChangeChars = useCraftCurrencyStore(
    (state) => state.addOrChangeChars,
  );
  const changeValueChars = useCraftCurrencyStore(
    (state) => state.changeValueChars,
  );
  const forgeActions = useCraftCurrencyStore((state) => state.forgeActions);
  const rarityUpgrades = useCraftCurrencyStore((state) => state.rarityUpgrades);

  const item = slots[CRAFT_ITEM_SLOT_INDEX];
  const [selectedStatIndex, setSelectedStatIndex] = useState<number | null>(
    null,
  );

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

  // Responsibility: Craft action application (currency -> item mutations).
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

    const updateFromSlots = (
      nextSlots: RolledStatSlotEntry[],
      options?: { rarity?: RarityEnumType },
    ) => {
      const nextRarity = options?.rarity ?? current.rarity;
      const nextRolledStats = buildRolledStatsFromSlots(nextSlots);

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
      return nextItem;
    };

    if (payload.type === "gold" || payload.type === "parts") {
      const currentIndex = RARITY_ORDER.indexOf(current.rarity);
      if (currentIndex === -1 || currentIndex >= RARITY_ORDER.length - 1) {
        useCraftInventoryStore.setState({
          notice: "Item is already max rarity.",
        });
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
      updateFromSlots(nextSlots, { rarity: nextRarity });
      useCraftInventoryStore.setState({
        notice: `Upgraded rarity to ${RARITY_LABELS[nextRarity]} (cost ${cost} ${payload.type}).`,
      });
      return;
    }

    if (payload.type === "setRarity") {
      const targetRarity = payload.rarity;
      const currentIndex = RARITY_ORDER.indexOf(current.rarity);
      const targetIndex = RARITY_ORDER.indexOf(targetRarity);
      if (targetIndex === -1) {
        useCraftInventoryStore.setState({ notice: "Invalid rarity." });
        return;
      }

      if (targetIndex <= currentIndex) {
        useCraftInventoryStore.setState({
          notice: `Item is already ${RARITY_LABELS[current.rarity]} or higher.`,
        });
        return;
      }

      if ((currencyState.rarityUpgrades[targetRarity] ?? 0) < 1) {
        useCraftInventoryStore.setState({
          notice: `Not enough rarity-upgrade (${RARITY_LABELS[targetRarity]}).`,
        });
        return;
      }

      const spent = currencyState.consumeRarityUpgrade(targetRarity, 1);
      if (!spent) {
        useCraftInventoryStore.setState({
          notice: `Not enough rarity-upgrade (${RARITY_LABELS[targetRarity]}).`,
        });
        return;
      }

      const nextSlots = currentSlots.map((slot) =>
        slot ? { stat: slot.stat, value: slot.value } : null,
      );
      updateFromSlots(nextSlots, { rarity: targetRarity });
      useCraftInventoryStore.setState({
        notice: `Updated rarity to ${RARITY_LABELS[targetRarity]}.`,
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
      nextSlots[levelIndex] = {
        stat,
        value: Math.round(rollCharacteristicValue(range)),
      };
      updateFromSlots(nextSlots);
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
      nextSlots[levelIndex] = {
        stat: nextStat,
        value: Math.round(rollCharacteristicValue(range)),
      };
      updateFromSlots(nextSlots);
      useCraftInventoryStore.setState({
        notice: `Added ${CHARACTERISTIC_LABELS[nextStat]}.`,
      });
      return;
    }

    if (FORGE_ACTIONS.includes(payload.type)) {
      const action = payload.type;
      const hasToken = (currencyState.forgeActions[action] ?? 0) > 0;
      if (!hasToken) {
        useCraftInventoryStore.setState({ notice: `Not enough ${action}.` });
        return;
      }

      const filledIndexes = currentSlots.flatMap((slot, index) =>
        slot ? [index] : [],
      );

      const getSelectedIndex = (): number | null => {
        if (selectedStatIndex === null) return null;
        if (selectedStatIndex < 0 || selectedStatIndex >= STAT_SLOT_COUNT) {
          return null;
        }
        return selectedStatIndex;
      };

      const spendAction = () => {
        const spent = currencyState.consumeForgeAction(action, 1);
        if (!spent) {
          useCraftInventoryStore.setState({ notice: `Not enough ${action}.` });
          return false;
        }
        return true;
      };

      const canImproveSlotAt = (index: number): boolean => {
        const slot = currentSlots[index];
        if (!slot) return false;
        const range = current.statRanges?.[current.rarity]?.[slot.stat];
        if (!range) return false;
        const { min, max } = getRangeBounds(range);
        return max > min;
      };

      const improveSlotAt = (index: number): boolean => {
        const slot = currentSlots[index];
        if (!slot) return false;
        const range = current.statRanges?.[current.rarity]?.[slot.stat];
        if (!range) return false;

        const { min, max } = getRangeBounds(range);
        if (max <= min) return false;

        const delta = Math.max(1, Math.round((max - min) * 0.15));
        const nextValue = clampToRange(slot.value + delta, range);
        if (nextValue === slot.value) return false;

        currentSlots[index] = { stat: slot.stat, value: Math.round(nextValue) };
        return true;
      };

      const removeSlotAt = (index: number): boolean => {
        if (!currentSlots[index]) return false;
        currentSlots[index] = null;
        return true;
      };

      if (action === "removeRandomChar") {
        if (filledIndexes.length === 0) {
          useCraftInventoryStore.setState({
            notice: "No characteristics to remove.",
          });
          return;
        }
        if (!spendAction()) return;
        const index = pickRandom(filledIndexes);
        removeSlotAt(index);
        updateFromSlots([...currentSlots]);
        useCraftInventoryStore.setState({
          notice: "Removed random characteristic.",
        });
        return;
      }

      if (action === "removeSelectedChar") {
        const index = getSelectedIndex();
        if (index === null) {
          useCraftInventoryStore.setState({
            notice: "Select a characteristic first.",
          });
          return;
        }
        if (!currentSlots[index]) {
          useCraftInventoryStore.setState({
            notice: "Selected slot has no characteristic.",
          });
          return;
        }
        if (!spendAction()) return;
        removeSlotAt(index);
        updateFromSlots([...currentSlots]);
        useCraftInventoryStore.setState({
          notice: "Removed selected characteristic.",
        });
        return;
      }

      if (action === "improveRandomChar") {
        const improvableIndexes = filledIndexes.filter((index) =>
          canImproveSlotAt(index),
        );
        if (improvableIndexes.length === 0) {
          useCraftInventoryStore.setState({
            notice: "No characteristics to improve.",
          });
          return;
        }
        if (!spendAction()) return;
        const index = pickRandom(improvableIndexes);
        const improved = improveSlotAt(index);
        if (!improved) {
          useCraftInventoryStore.setState({
            notice: "Could not improve characteristic.",
          });
          return;
        }
        updateFromSlots([...currentSlots]);
        useCraftInventoryStore.setState({
          notice: "Improved random characteristic.",
        });
        return;
      }

      if (action === "improveSelectedChar") {
        const index = getSelectedIndex();
        if (index === null) {
          useCraftInventoryStore.setState({
            notice: "Select a characteristic first.",
          });
          return;
        }
        if (!currentSlots[index]) {
          useCraftInventoryStore.setState({
            notice: "Selected slot has no characteristic.",
          });
          return;
        }
        if (!canImproveSlotAt(index)) {
          useCraftInventoryStore.setState({
            notice: "Selected characteristic cannot be improved.",
          });
          return;
        }
        if (!spendAction()) return;
        const improved = improveSlotAt(index);
        if (!improved) {
          useCraftInventoryStore.setState({
            notice: "Could not improve characteristic.",
          });
          return;
        }
        updateFromSlots([...currentSlots]);
        useCraftInventoryStore.setState({
          notice: "Improved selected characteristic.",
        });
        return;
      }

      if (action === "improve3RandomChar") {
        const improvableIndexes = filledIndexes.filter((index) =>
          canImproveSlotAt(index),
        );
        if (improvableIndexes.length === 0) {
          useCraftInventoryStore.setState({
            notice: "No characteristics to improve.",
          });
          return;
        }
        if (!spendAction()) return;

        const pickedIndexes = pickDistinct(improvableIndexes, 3);

        let improvedCount = 0;
        for (const index of pickedIndexes) {
          if (improveSlotAt(index)) improvedCount += 1;
        }

        let removedCount = 0;
        if (rollChance(0.2)) {
          const filledAfterImprove = currentSlots.flatMap((slot, index) =>
            slot ? [index] : [],
          );
          const removalIndexes = pickDistinct(filledAfterImprove, 3);
          for (const index of removalIndexes) {
            if (removeSlotAt(index)) removedCount += 1;
          }
        }

        updateFromSlots([...currentSlots]);
        useCraftInventoryStore.setState({
          notice:
            removedCount > 0
              ? `Improved ${improvedCount} characteristics, but removed ${removedCount}.`
              : `Improved ${improvedCount} characteristics.`,
        });
        return;
      }

      if (action === "cloneItem") {
        const backpackState = useInventoryStore.getState();
        const hasFreeSlot = backpackState.slots.some((slot) => !slot);
        if (!hasFreeSlot) {
          useCraftInventoryStore.setState({
            notice: "Backpack is full.",
          });
          return;
        }
        if (!spendAction()) return;

        const clone: InventoryItem = {
          ...current,
          instanceId: createInstanceId(),
        };

        backpackState.addItem(clone);
        const backpackNotice = useInventoryStore.getState().notice;

        useCraftInventoryStore.setState({
          notice: backpackNotice
            ? `Clone failed: ${backpackNotice}`
            : "Cloned item into backpack.",
        });
        return;
      }
    }
  };

  useDndMonitor({
    onDragEnd: ({ active, over }) => {
      const activeData = active.data.current;
      if (!isCraftCurrencyDragData(activeData)) return;
      if (!over) return;

      const overData = over.data.current;
      if (
        !isInventoryDropData(overData) ||
        overData.inventoryId !== inventoryId ||
        overData.index !== CRAFT_ITEM_SLOT_INDEX
      ) {
        useCraftInventoryStore.setState({
          notice: "Drop crafting currency on the item slot.",
        });
        return;
      }

      applyCurrencyToCraftItem(activeData.payload);
    },
  });

  // Responsibility: UI slot rendering (item slots).
  const renderItemSlot = (index: number) => (
    <div className="w-[200px]" key={slotDefinitions[index]?.id ?? index}>
      <InventorySlotCard
        className="p-0"
        slot={slots[index]}
        slotDefinition={slotDefinitions[index]}
        inventoryId={inventoryId}
        index={index}
        variant="large"
        // Responsibility: Context menu behavior (currently suppresses default).
        onContextMenu={(event: MouseEvent<HTMLDivElement>) =>
          event.preventDefault()
        }
      />
    </div>
  );

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className={cn("w-fit", inventoryPanelClasses)}>
        <div className="flex flex-col gap-4">
          <div className="grid items-stretch justify-center gap-4 [grid-template-columns:auto_auto_auto_auto_auto]">
            <div className="grid grid-cols-1">
              {ADD_ICONS.map((icon, index) => (
                <CraftCurrencySlot
                  key={`add-slot-${index + 1}`}
                  icon={icon}
                  count={addOrChangeChars[index] ?? 0}
                  payload={{ type: "addChar", level: index + 1 }}
                />
              ))}
            </div>

            <div className="grid grid-cols-1">
              {[
                {
                  icon: removeRandomIcon,
                  key: "remove-random",
                  count: forgeActions.removeRandomChar ?? 0,
                  payload: { type: "removeRandomChar" as const },
                },
                {
                  icon: removeSelectedIcon,
                  key: "remove-selected",
                  count: forgeActions.removeSelectedChar ?? 0,
                  payload: { type: "removeSelectedChar" as const },
                },
                {
                  icon: improveRandomIcon,
                  key: "improve-random",
                  count: forgeActions.improveRandomChar ?? 0,
                  payload: { type: "improveRandomChar" as const },
                },
                {
                  icon: improveSelectedIcon,
                  key: "improve-selected",
                  count: forgeActions.improveSelectedChar ?? 0,
                  payload: { type: "improveSelectedChar" as const },
                },
                {
                  icon: improve3RandomIcon,
                  key: "improve-3-random",
                  count: forgeActions.improve3RandomChar ?? 0,
                  payload: { type: "improve3RandomChar" as const },
                },
                {
                  icon: cloneItemIcon,
                  key: "clone-item",
                  count: forgeActions.cloneItem ?? 0,
                  payload: { type: "cloneItem" as const },
                },
              ].map(({ icon, key, count, payload }) => (
                <CraftCurrencySlot
                  key={`forge-${key}`}
                  icon={icon}
                  count={count}
                  payload={payload}
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 self-stretch min-h-0">
              {renderItemSlot(CRAFT_ITEM_SLOT_INDEX)}

              <div className="w-full flex-1 min-h-0 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                <div className="mt-2 flex flex-1 min-h-0 flex-col gap-1 overflow-auto text-sm">
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
                          "font-mono text-[16px] cursor-pointer rounded-md px-1.5 py-0.5 transition",
                          hasValue ? "text-emerald-200" : "text-slate-400",
                          selectedStatIndex === index &&
                            "bg-white/5 ring-1 ring-cyan-200/40",
                        )}
                        onClick={() => setSelectedStatIndex(index)}
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
            </div>

            <div className="grid grid-cols-1">
              {[
                {
                  icon: goldIcon,
                  key: "gold",
                  count: gold,
                  payload: { type: "gold" as const },
                },
                {
                  icon: equipmentPartIcon,
                  key: "parts",
                  count: parts,
                  payload: { type: "parts" as const },
                },
                {
                  icon: rarityUpdateToUncommonIcon,
                  key: "rarity-uncommon",
                  count:
                    rarityUpgrades[RarityEnum.UNCOMMON as RarityUpgrade] ?? 0,
                  payload: {
                    type: "setRarity" as const,
                    rarity: RarityEnum.UNCOMMON as RarityUpgrade,
                  },
                },
                {
                  icon: rarityUpdateToRareIcon,
                  key: "rarity-rare",
                  count: rarityUpgrades[RarityEnum.RARE as RarityUpgrade] ?? 0,
                  payload: {
                    type: "setRarity" as const,
                    rarity: RarityEnum.RARE as RarityUpgrade,
                  },
                },
                {
                  icon: rarityUpdateToEpicIcon,
                  key: "rarity-epic",
                  count: rarityUpgrades[RarityEnum.EPIC as RarityUpgrade] ?? 0,
                  payload: {
                    type: "setRarity" as const,
                    rarity: RarityEnum.EPIC as RarityUpgrade,
                  },
                },
                {
                  icon: rarityUpdateToLegendaryIcon,
                  key: "rarity-legendary",
                  count:
                    rarityUpgrades[RarityEnum.LEGENDARY as RarityUpgrade] ?? 0,
                  payload: {
                    type: "setRarity" as const,
                    rarity: RarityEnum.LEGENDARY as RarityUpgrade,
                  },
                },
              ].map(({ icon, key, count, payload }) => (
                <CraftCurrencySlot
                  key={key}
                  icon={icon}
                  count={count}
                  payload={payload}
                />
              ))}
            </div>

            <div className="grid grid-cols-1">
              {CHANGE_VALUE_ICONS.map((icon, index) => (
                <CraftCurrencySlot
                  key={`change-value-slot-${index + 1}`}
                  icon={icon}
                  count={changeValueChars[index] ?? 0}
                  payload={{ type: "changeValueChar", level: index + 1 }}
                />
              ))}
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

type CraftCurrencySlotProps = {
  icon: StaticImageData;
  count: number;
  payload: CraftCurrencyDragPayload;
};

function CraftCurrencySlot({ icon, count, payload }: CraftCurrencySlotProps) {
  const isDraggable = count > 0;
  const { setNodeRef, attributes, listeners } = useDraggable({
    id: buildCraftCurrencyId(payload),
    data: {
      type: DND_ITEM_TYPE.CRAFT_CURRENCY,
      payload,
    },
    disabled: !isDraggable,
  });

  return (
    <div
      ref={setNodeRef}
      className="aspect-square p-1 w-[88px]"
      {...attributes}
      {...listeners}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-xl border border-dashed border-white/10 bg-white/5",
          isDraggable && "cursor-grab active:cursor-grabbing",
          !isDraggable && "cursor-not-allowed",
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
}
