"use client";

import { getEquipmentTypeLabel } from "modules/equipment";
import { create, type StoreApi } from "zustand";
import type { UseBoundStore } from "zustand";
import type {
  InventoryItem,
  InventorySlot,
  InventorySlotDefinition,
} from "./inventory.types";
import { createRandomInventoryItem } from "./inventory.utils";

const getAllowedTypesLabel = (definition?: InventorySlotDefinition) => {
  if (!definition?.allowedTypes?.length) return "Any";
  return definition.allowedTypes.map(getEquipmentTypeLabel).join(" / ");
};

const isItemAllowed = (
  definition: InventorySlotDefinition | undefined,
  item: InventoryItem,
) => {
  if (!definition?.allowedTypes?.length) return true;
  return definition.allowedTypes.includes(item.type);
};

const getStackLimit = (definition?: InventorySlotDefinition) =>
  Math.max(1, definition?.maxStack ?? 1);

const getStackCount = (item: InventoryItem) => Math.max(1, item.stackCount ?? 1);

const canStackTogether = (a: InventoryItem, b: InventoryItem) =>
  a.stackKey && b.stackKey && a.stackKey === b.stackKey;

export type InventoryState = {
  id: string;
  slots: InventorySlot[];
  slotDefinitions: InventorySlotDefinition[];
  dragIndex: number | null;
  hoverIndex: number | null;
  notice: string | null;
  addSlot: (definition?: InventorySlotDefinition) => void;
  addItem: (item: InventoryItem) => void;
  addRandomItem: () => void;
  removeItem: (index: number) => void;
  removeItemStack: (index: number) => void;
  takeItem: (index: number) => InventoryItem | null;
  placeItem: (index: number, item: InventoryItem) => boolean;
  canPlaceItem: (index: number, item: InventoryItem) => boolean;
  dragStart: (index: number) => void;
  dropOnSlot: (targetIndex: number) => void;
  dragEnter: (index: number) => void;
  dragLeave: () => void;
  dragEnd: () => void;
};

export type InventoryStoreHook = UseBoundStore<StoreApi<InventoryState>>;
export type InventoryStoreRegistry = Record<string, InventoryStoreHook>;

export const createInventoryStore = (config: {
  id: string;
  slotDefinitions: InventorySlotDefinition[];
  canPlaceItem?: (index: number, item: InventoryItem) => boolean;
}): InventoryStoreHook =>
  create<InventoryState>((set, get) => ({
    id: config.id,
    slots: Array.from(
      { length: config.slotDefinitions.length },
      () => undefined,
    ),
    slotDefinitions: config.slotDefinitions,
    dragIndex: null,
    hoverIndex: null,
    notice: null,
    addSlot: (definition) => {
      set((state) => ({
        slots: [...state.slots, undefined],
        slotDefinitions: [
          ...state.slotDefinitions,
          definition ?? {
            id: `slot-${state.slotDefinitions.length + 1}`,
            label: `Empty`,
          },
        ],
        notice: null,
      }));
    },
    addItem: (item) => {
      set((state) => {
        const canAccept = (index: number, nextItem: InventoryItem) => {
          const definition = state.slotDefinitions[index];
          if (!isItemAllowed(definition, nextItem)) return false;
          return config.canPlaceItem ? config.canPlaceItem(index, nextItem) : true;
        };

        const addToExistingIndex = state.slots.findIndex((slot, index) => {
          if (!slot) return false;
          const limit = getStackLimit(state.slotDefinitions[index]);
          if (limit <= 1) return false;
          if (!canAccept(index, slot)) return false;
          if (!canStackTogether(slot, item)) return false;
          return getStackCount(slot) + getStackCount(item) <= limit;
        });

        const nextSlots = [...state.slots];

        if (addToExistingIndex !== -1) {
          const current = nextSlots[addToExistingIndex];
          if (current) {
            nextSlots[addToExistingIndex] = {
              ...current,
              stackCount: getStackCount(current) + getStackCount(item),
            };
            return { slots: nextSlots, notice: null };
          }
        }

        const emptyIndex = state.slots.findIndex(
          (slot, index) => !slot && canAccept(index, item),
        );
        if (emptyIndex === -1) return { notice: "No free compatible slots!" };

        nextSlots[emptyIndex] = item;

        return { slots: nextSlots, notice: null };
      });
    },
    addRandomItem: () => {
      get().addItem(createRandomInventoryItem());
    },
    removeItem: (index) => {
      set((state) => {
        const current = state.slots[index];
        if (!current) return { notice: null };

        const updated = [...state.slots];
        const nextCount = getStackCount(current) - 1;
        updated[index] = nextCount > 0 ? { ...current, stackCount: nextCount } : undefined;

        return {
          slots: updated,
          dragIndex: state.dragIndex === index ? null : state.dragIndex,
          hoverIndex: state.hoverIndex === index ? null : state.hoverIndex,
          notice: null,
        };
      });
    },
    removeItemStack: (index) => {
      set((state) => {
        if (!state.slots[index]) return { notice: null };

        const updated = [...state.slots];
        updated[index] = undefined;

        return {
          slots: updated,
          dragIndex: state.dragIndex === index ? null : state.dragIndex,
          hoverIndex: state.hoverIndex === index ? null : state.hoverIndex,
          notice: null,
        };
      });
    },
    takeItem: (index) => {
      const current = get().slots[index];
      if (!current) return null;
      get().removeItemStack(index);
      return current;
    },
    placeItem: (index, item) => {
      if (!get().canPlaceItem(index, item)) {
        set({
          notice: `Slot accepts ${getAllowedTypesLabel(
            get().slotDefinitions[index],
          )}`,
        });
        return false;
      }

      const current = get().slots[index];
      if (current) {
        const limit = getStackLimit(get().slotDefinitions[index]);
        if (limit <= 1 || !canStackTogether(current, item)) {
          set({ notice: "Slot is already occupied." });
          return false;
        }

        const incomingCount = getStackCount(item);
        const nextCount = getStackCount(current) + incomingCount;
        if (nextCount > limit) {
          set({ notice: "Stack limit reached." });
          return false;
        }

        set((state) => {
          const nextSlots = [...state.slots];
          nextSlots[index] = { ...current, stackCount: nextCount };
          return { slots: nextSlots, notice: null };
        });

        return true;
      }

      set((state) => {
        const nextSlots = [...state.slots];
        nextSlots[index] = item;
        return { slots: nextSlots, notice: null };
      });

      return true;
    },
    canPlaceItem: (index, item) => {
      if (!isItemAllowed(get().slotDefinitions[index], item)) return false;
      return config.canPlaceItem ? config.canPlaceItem(index, item) : true;
    },
    dragStart: (index) => {
      if (!get().slots[index]) return;
      set({ dragIndex: index, notice: null });
    },
    dropOnSlot: (targetIndex) => {
      const { dragIndex } = get();
      if (dragIndex === null || dragIndex === targetIndex) {
        set({ dragIndex: null, hoverIndex: null });
        return;
      }

      set((state) => {
        const isPlaceable = (index: number, item: InventoryItem) => {
          const definition = state.slotDefinitions[index];
          if (!isItemAllowed(definition, item)) return false;
          return config.canPlaceItem ? config.canPlaceItem(index, item) : true;
        };

        const sourceItem = state.slots[dragIndex];
        if (!sourceItem) {
          return { dragIndex: null, hoverIndex: null };
        }

        const targetItem = state.slots[targetIndex];
        const targetAllowed = isPlaceable(targetIndex, sourceItem);
        const sourceAllowed =
          !targetItem ||
          isPlaceable(dragIndex, targetItem);

        if (!targetAllowed || !sourceAllowed) {
          return {
            notice: `Slot accepts ${getAllowedTypesLabel(
              state.slotDefinitions[targetIndex],
            )}`,
            dragIndex: null,
            hoverIndex: null,
          };
        }

        const updated = [...state.slots];
        [updated[targetIndex], updated[dragIndex]] = [
          updated[dragIndex],
          updated[targetIndex],
        ];

        return {
          slots: updated,
          dragIndex: null,
          hoverIndex: null,
          notice: null,
        };
      });
    },
    dragEnter: (index) => {
      set({ hoverIndex: index });
    },
    dragLeave: () => {
      set({ hoverIndex: null });
    },
    dragEnd: () => {
      set({ dragIndex: null, hoverIndex: null });
    },
  }));
