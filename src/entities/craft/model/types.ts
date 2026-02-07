import { RarityEnum, type RarityEnum as RarityEnumType } from "@/shared/types/rarity";

export const FORGE_ACTIONS = [
  "removeRandomChar",
  "removeSelectedChar",
  "improveRandomChar",
  "improveSelectedChar",
  "improve3RandomChar",
  "cloneItem",
] as const;

export type ForgeAction = (typeof FORGE_ACTIONS)[number];

export const RARITY_UPGRADE_ORDER = [
  RarityEnum.UNCOMMON,
  RarityEnum.RARE,
  RarityEnum.EPIC,
  RarityEnum.LEGENDARY,
] as const satisfies readonly RarityEnumType[];

export type RarityUpgrade = (typeof RARITY_UPGRADE_ORDER)[number];

export type CraftTokens = {
  addOrChangeChars: number[];
  changeValueChars: number[];
  forgeActions: Record<ForgeAction, number>;
  rarityUpgrades: Record<RarityUpgrade, number>;
};
