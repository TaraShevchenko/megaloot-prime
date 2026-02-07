import { z } from "zod";

export const RARITY_ORDER = [
  "COMMON",
  "UNCOMMON",
  "RARE",
  "EPIC",
  "LEGENDARY",
] as const;

export const RarityEnumSchema = z.enum(RARITY_ORDER);
export type RarityEnum = z.infer<typeof RarityEnumSchema>;
export const RarityEnum = RarityEnumSchema.enum;

export const RARITY_BACKGROUNDS: Record<RarityEnum, string> = {
  [RarityEnum.COMMON]: "linear-gradient(134deg,#d9d9d9,#737373)",
  [RarityEnum.UNCOMMON]: "linear-gradient(134deg,#32e26c,#a4f8c0)",
  [RarityEnum.RARE]: "linear-gradient(134deg,#5c6fe8,#bbade6)",
  [RarityEnum.EPIC]: "linear-gradient(134deg,#f4c430,#d15a17)",
  [RarityEnum.LEGENDARY]: "linear-gradient(134deg,#37c7c1,#0b4a4b)",
};

export const RARITY_LABELS: Record<RarityEnum, string> = {
  [RarityEnum.COMMON]: "Common",
  [RarityEnum.UNCOMMON]: "Uncommon",
  [RarityEnum.RARE]: "Rare",
  [RarityEnum.EPIC]: "Epic",
  [RarityEnum.LEGENDARY]: "Legendary",
};
