import { FORGE_ACTIONS, RARITY_UPGRADE_ORDER, type CraftTokens } from "./types";

const DEFAULT_CRAFT_TOKEN_AMOUNT = 100;

export const createDefaultCraftTokens = (): CraftTokens => ({
  addOrChangeChars: Array.from(
    { length: 6 },
    () => DEFAULT_CRAFT_TOKEN_AMOUNT,
  ),
  changeValueChars: Array.from(
    { length: 6 },
    () => DEFAULT_CRAFT_TOKEN_AMOUNT,
  ),
  forgeActions: Object.fromEntries(
    FORGE_ACTIONS.map((action) => [action, DEFAULT_CRAFT_TOKEN_AMOUNT]),
  ) as CraftTokens["forgeActions"],
  rarityUpgrades: Object.fromEntries(
    RARITY_UPGRADE_ORDER.map((rarity) => [rarity, DEFAULT_CRAFT_TOKEN_AMOUNT]),
  ) as CraftTokens["rarityUpgrades"],
});
