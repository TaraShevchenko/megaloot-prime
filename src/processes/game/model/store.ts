import { create } from "zustand";

import type { GameSession } from "@/entities/game-session";
import type { RandomFn } from "@/shared";
import { createSeededRandom } from "@/shared";

export type Notice = {
  message: string;
  tone: "error" | "info";
};

type GameStoreState = {
  session: GameSession | null;
  storeOpen: boolean;
  notice: Notice | null;
  rng: RandomFn;
  setSession: (session: GameSession | null) => void;
  updateSession: (updater: (session: GameSession) => GameSession) => void;
  openStore: () => void;
  closeStore: () => void;
  setNotice: (notice: Notice | null) => void;
  setRng: (rng: RandomFn) => void;
};

const seed = Number(process.env.NEXT_PUBLIC_GAME_SEED ?? Number.NaN);
const initialRng = Number.isFinite(seed) ? createSeededRandom(seed) : Math.random;

export const useGameStore = create<GameStoreState>((set, get) => ({
  session: null,
  storeOpen: false,
  notice: null,
  rng: initialRng,
  setSession: (session) => set({ session }),
  updateSession: (updater) => {
    const current = get().session;
    if (!current) return;
    set({ session: updater(current) });
  },
  openStore: () => set({ storeOpen: true }),
  closeStore: () => set({ storeOpen: false }),
  setNotice: (notice) => set({ notice }),
  setRng: (rng) => set({ rng }),
}));
