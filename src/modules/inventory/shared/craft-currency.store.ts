"use client";

import { create } from "zustand";

type CraftCurrencyState = {
  gold: number;
  parts: number;
  addOrChangeChars: number[];
  changeValueChars: number[];
  setGold: (amount: number) => void;
  setParts: (amount: number) => void;
  setAddOrChangeChar: (level: number, amount: number) => void;
  setChangeValueChar: (level: number, amount: number) => void;
  spendGold: (amount: number) => boolean;
  spendParts: (amount: number) => boolean;
  consumeAddOrChangeChar: (level: number, amount?: number) => boolean;
  consumeChangeValueChar: (level: number, amount?: number) => boolean;
  reset: () => void;
};

const DEFAULT_CRAFT_CURRENCY_AMOUNT = 100;

export const useCraftCurrencyStore = create<CraftCurrencyState>((set, get) => ({
  gold: DEFAULT_CRAFT_CURRENCY_AMOUNT,
  parts: DEFAULT_CRAFT_CURRENCY_AMOUNT,
  addOrChangeChars: Array.from(
    { length: 6 },
    () => DEFAULT_CRAFT_CURRENCY_AMOUNT,
  ),
  changeValueChars: Array.from(
    { length: 6 },
    () => DEFAULT_CRAFT_CURRENCY_AMOUNT,
  ),
  setGold: (amount) => set({ gold: Math.max(0, Math.floor(amount)) }),
  setParts: (amount) => set({ parts: Math.max(0, Math.floor(amount)) }),
  setAddOrChangeChar: (level, amount) =>
    set((state) => {
      const index = Math.max(0, Math.min(5, Math.floor(level) - 1));
      const next = [...state.addOrChangeChars];
      next[index] = Math.max(0, Math.floor(amount));
      return { addOrChangeChars: next };
    }),
  setChangeValueChar: (level, amount) =>
    set((state) => {
      const index = Math.max(0, Math.min(5, Math.floor(level) - 1));
      const next = [...state.changeValueChars];
      next[index] = Math.max(0, Math.floor(amount));
      return { changeValueChars: next };
    }),
  spendGold: (amount) => {
    const cost = Math.max(0, Math.floor(amount));
    if (cost === 0) return true;
    const current = get().gold;
    if (current < cost) return false;
    set({ gold: current - cost });
    return true;
  },
  spendParts: (amount) => {
    const cost = Math.max(0, Math.floor(amount));
    if (cost === 0) return true;
    const current = get().parts;
    if (current < cost) return false;
    set({ parts: current - cost });
    return true;
  },
  consumeAddOrChangeChar: (level, amount = 1) => {
    const index = Math.max(0, Math.min(5, Math.floor(level) - 1));
    const cost = Math.max(0, Math.floor(amount));
    if (cost === 0) return true;
    const current = get().addOrChangeChars[index] ?? 0;
    if (current < cost) return false;
    set((state) => {
      const next = [...state.addOrChangeChars];
      next[index] = Math.max(0, (next[index] ?? 0) - cost);
      return { addOrChangeChars: next };
    });
    return true;
  },
  consumeChangeValueChar: (level, amount = 1) => {
    const index = Math.max(0, Math.min(5, Math.floor(level) - 1));
    const cost = Math.max(0, Math.floor(amount));
    if (cost === 0) return true;
    const current = get().changeValueChars[index] ?? 0;
    if (current < cost) return false;
    set((state) => {
      const next = [...state.changeValueChars];
      next[index] = Math.max(0, (next[index] ?? 0) - cost);
      return { changeValueChars: next };
    });
    return true;
  },
  reset: () =>
    set({
      gold: DEFAULT_CRAFT_CURRENCY_AMOUNT,
      parts: DEFAULT_CRAFT_CURRENCY_AMOUNT,
      addOrChangeChars: Array.from(
        { length: 6 },
        () => DEFAULT_CRAFT_CURRENCY_AMOUNT,
      ),
      changeValueChars: Array.from(
        { length: 6 },
        () => DEFAULT_CRAFT_CURRENCY_AMOUNT,
      ),
    }),
}));
