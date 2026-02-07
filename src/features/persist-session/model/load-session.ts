import type { GameSession } from "@/entities/game-session";
import { parseSession } from "@/entities/game-session";
import { getLocalStorageItem,STORAGE_KEYS } from "@/shared";

export const loadSession = (): GameSession | null => {
  const raw = getLocalStorageItem(STORAGE_KEYS.session);
  return parseSession(raw);
};
