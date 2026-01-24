"use client";

import { create } from "zustand";
import type { InventoryItem, InventorySlot } from "./inventory.types";
import { createRandomInventoryItem } from "./inventory.utils";

const DEFAULT_SLOTS = 20;

const createEmptySlots = (amount: number): InventorySlot[] =>
  Array.from({ length: amount }, () => undefined);

type InventoryState = {
  slots: InventorySlot[];
  dragIndex: number | null;
  hoverIndex: number | null;
  notice: string | null;
  addSlot: () => void;
  addItem: (item: InventoryItem) => void;
  addRandomItem: () => void;
  dragStart: (index: number) => void;
  dropOnSlot: (targetIndex: number) => void;
  dragEnter: (index: number) => void;
  dragLeave: () => void;
  dragEnd: () => void;
};

export const useInventoryStore = create<InventoryState>((set, get) => ({
  slots: createEmptySlots(DEFAULT_SLOTS),
  dragIndex: null,
  hoverIndex: null,
  notice: null,
  addSlot: () => {
    set((state) => ({
      slots: [...state.slots, undefined],
      notice: null,
    }));
  },
  addItem: (item) => {
    set((state) => {
      const emptyIndex = state.slots.findIndex((slot) => !slot);
      if (emptyIndex === -1) {
        return { notice: "No free slots!" };
      }

      const nextSlots = [...state.slots];
      nextSlots[emptyIndex] = item;

      return { slots: nextSlots, notice: null };
    });
  },
  addRandomItem: () => {
    get().addItem(createRandomInventoryItem());
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
      const updated = [...state.slots];
      [updated[targetIndex], updated[dragIndex]] = [
        updated[dragIndex],
        updated[targetIndex],
      ];

      return {
        slots: updated,
        dragIndex: null,
        hoverIndex: null,
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
