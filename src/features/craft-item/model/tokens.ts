import type { CraftTokens, ForgeAction, RarityUpgrade } from "@/entities/craft";

const clampLevelIndex = (level: number): number =>
  Math.max(0, Math.min(5, Math.floor(level) - 1));

const updateLevelToken = (
  tokens: CraftTokens,
  key: "addOrChangeChars" | "changeValueChars",
  level: number,
  amount: number,
): CraftTokens | null => {
  const index = clampLevelIndex(level);
  const cost = Math.max(0, Math.floor(amount));
  if (cost === 0) return tokens;
  const current = tokens[key][index] ?? 0;
  if (current < cost) return null;
  const nextList = [...tokens[key]];
  nextList[index] = Math.max(0, current - cost);
  return { ...tokens, [key]: nextList };
};

export const consumeAddOrChangeChar = (
  tokens: CraftTokens,
  level: number,
  amount = 1,
): CraftTokens | null =>
  updateLevelToken(tokens, "addOrChangeChars", level, amount);

export const consumeChangeValueChar = (
  tokens: CraftTokens,
  level: number,
  amount = 1,
): CraftTokens | null =>
  updateLevelToken(tokens, "changeValueChars", level, amount);

export const consumeForgeAction = (
  tokens: CraftTokens,
  action: ForgeAction,
  amount = 1,
): CraftTokens | null => {
  const cost = Math.max(0, Math.floor(amount));
  if (cost === 0) return tokens;
  const current = tokens.forgeActions[action] ?? 0;
  if (current < cost) return null;
  return {
    ...tokens,
    forgeActions: {
      ...tokens.forgeActions,
      [action]: Math.max(0, current - cost),
    },
  };
};

export const consumeRarityUpgrade = (
  tokens: CraftTokens,
  rarity: RarityUpgrade,
  amount = 1,
): CraftTokens | null => {
  const cost = Math.max(0, Math.floor(amount));
  if (cost === 0) return tokens;
  const current = tokens.rarityUpgrades[rarity] ?? 0;
  if (current < cost) return null;
  return {
    ...tokens,
    rarityUpgrades: {
      ...tokens.rarityUpgrades,
      [rarity]: Math.max(0, current - cost),
    },
  };
};
