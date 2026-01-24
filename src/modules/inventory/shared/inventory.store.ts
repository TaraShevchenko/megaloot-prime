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
        const emptyIndex = state.slots.findIndex(
          (slot, index) =>
            !slot && isItemAllowed(state.slotDefinitions[index], item),
        );
        if (emptyIndex === -1) {
          return { notice: "No free compatible slots!" };
        }

        const nextSlots = [...state.slots];
        nextSlots[emptyIndex] = item;

        return { slots: nextSlots, notice: null };
      });
    },
    addRandomItem: () => {
      get().addItem(createRandomInventoryItem());
    },
    removeItem: (index) => {
      set((state) => {
        if (!state.slots[index]) {
          return { notice: null };
        }

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
      get().removeItem(index);
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

      if (get().slots[index]) {
        set({ notice: "Slot is already occupied." });
        return false;
      }

      set((state) => {
        const nextSlots = [...state.slots];
        nextSlots[index] = item;
        return { slots: nextSlots, notice: null };
      });

      return true;
    },
    canPlaceItem: (index, item) =>
      isItemAllowed(get().slotDefinitions[index], item),
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
        const sourceItem = state.slots[dragIndex];
        if (!sourceItem) {
          return { dragIndex: null, hoverIndex: null };
        }

        const targetItem = state.slots[targetIndex];
        const targetAllowed = isItemAllowed(
          state.slotDefinitions[targetIndex],
          sourceItem,
        );
        const sourceAllowed =
          !targetItem ||
          isItemAllowed(state.slotDefinitions[dragIndex], targetItem);

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
