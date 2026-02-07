import type { ForgeAction, RarityUpgrade } from "@/entities/craft";
import type { GameSession } from "@/entities/game-session";

export type CraftCurrencyDragPayload =
  | { type: "gold" }
  | { type: "parts" }
  | { type: "addChar"; level: number }
  | { type: "changeValueChar"; level: number }
  | { type: ForgeAction }
  | { type: "setRarity"; rarity: RarityUpgrade };

export type CraftActionResult = {
  session: GameSession;
  error?: string;
  info?: string;
};
