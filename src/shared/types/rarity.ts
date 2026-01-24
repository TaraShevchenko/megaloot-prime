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
  [RarityEnum.COMMON]: "linear-gradient(134deg,#D9D9D9,#737373)",
  [RarityEnum.UNCOMMON]: "linear-gradient(134deg,#32E26C,#A4F8C0)",
  [RarityEnum.RARE]: "linear-gradient(134deg,#5C6FE8,#BBADE6)",
  [RarityEnum.EPIC]: "linear-gradient(134deg,#FFD900,#9650F8)",
  [RarityEnum.LEGENDARY]: "linear-gradient(134deg,#3BE8C5,#003C30)",
};

export const RARITY_LABELS: Record<RarityEnum, string> = {
  [RarityEnum.COMMON]: "Common",
  [RarityEnum.UNCOMMON]: "Uncommon",
  [RarityEnum.RARE]: "Rare",
  [RarityEnum.EPIC]: "Epic",
  [RarityEnum.LEGENDARY]: "Legendary",
};
