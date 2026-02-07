import { z } from "zod";

export const CURRENCY_TYPES = [
  "GOLD",
  "EQUIPMENT_PART",
  "CRIMSON_GEM",
  "RARITY_INGOT",
] as const;

export const CurrencyEnumSchema = z.enum(CURRENCY_TYPES);
export type CurrencyType = z.infer<typeof CurrencyEnumSchema>;
export const CurrencyEnum = CurrencyEnumSchema.enum;
