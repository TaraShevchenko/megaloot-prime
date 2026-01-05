"use client";

import { create } from "zustand";
import type { MonsterAnimationState } from "./MonsterAnimation.types";

export const createMonsterAnimationStore = () =>
  create<MonsterAnimationState>((set, get) => ({
    animation: "idle",
    queued: null,
    playId: 0,
    request: (name) => {
      set({ queued: name });
    },
    startQueued: () => {
      const { queued, animation } = get();
      if (!queued || animation !== "idle") {
        return;
      }

      set((state) => ({
        animation: queued,
        queued: null,
        playId: state.playId + 1,
      }));
    },
    finish: (expected) => {
      const { animation } = get();
      if (animation !== expected) {
        return;
      }

      set((state) => ({
        animation: "idle",
        playId: state.playId + 1,
      }));
    },
  }));
