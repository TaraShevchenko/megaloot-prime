import type { GameSession } from "@/entities/game-session";
import { serializeSession } from "@/entities/game-session";
import { setLocalStorageItem,STORAGE_KEYS } from "@/shared";

export const saveSession = (session: GameSession): void => {
  const raw = serializeSession(session);
  setLocalStorageItem(STORAGE_KEYS.session, raw);
};
