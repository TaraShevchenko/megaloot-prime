import { z } from "zod";

import {
  CharacteristicsEnumSchema,
  CharacteristicsNumericMapSchema,
} from "@/shared/types/characteristics";
import { CURRENCY_TYPES } from "@/shared/types/currency";
import {
  EquipmentIdEnumSchema,
  EquipmentTypeEnumSchema,
} from "@/shared/types/equipment";
import { RarityEnumSchema } from "@/shared/types/rarity";
import {
  FORGE_ACTIONS,
  RARITY_UPGRADE_ORDER,
  createDefaultCraftTokens,
} from "@/entities/craft";
import type { CraftTokens } from "@/entities/craft";
import { BACKPACK_CAPACITY } from "@/entities/inventory";
import { STAT_SLOT_COUNT } from "@/entities/item";
import { MonsterEnumSchema } from "@/entities/monster";

import {
  EQUIPMENT_SLOT_IDS,
  type EquippedItems,
  type GameItem,
  type GameSession,
} from "./types";

const ItemStatsSchema = CharacteristicsNumericMapSchema.partial() as z.ZodType<
  GameItem["stats"]
>;

const RolledStatSlotSchema = z.object({
  stat: CharacteristicsEnumSchema,
  value: z.number(),
});

const RolledStatSlotEntrySchema = RolledStatSlotSchema.nullable();

const GameItemSchema = z.object({
  instanceId: z.string().min(1),
  definitionId: EquipmentIdEnumSchema,
  type: EquipmentTypeEnumSchema,
  rarity: RarityEnumSchema,
  stats: ItemStatsSchema,
  rolledStatSlots: z
    .array(RolledStatSlotEntrySchema)
    .length(STAT_SLOT_COUNT)
    .optional(),
}) as z.ZodType<GameItem>;

const EquippedSchema = z.object(
  Object.fromEntries(
    EQUIPMENT_SLOT_IDS.map((slot) => [slot, GameItemSchema.nullable()]),
  ) as Record<string, z.ZodTypeAny>,
) as unknown as z.ZodType<EquippedItems>;

const CurrenciesSchema = z.object(
  Object.fromEntries(
    CURRENCY_TYPES.map((currency) => [currency, z.number().min(0)]),
  ) as Record<string, z.ZodTypeAny>,
) as unknown as z.ZodType<GameSession["currencies"]>;

const MonsterSchema = z.object({
  id: MonsterEnumSchema,
  level: z.number().int().min(1),
  maxHp: z.number().min(0),
  currentHp: z.number().min(0),
  alive: z.boolean(),
});

const CraftTokensSchema = z.object({
  addOrChangeChars: z.array(z.number().min(0)).length(6),
  changeValueChars: z.array(z.number().min(0)).length(6),
  forgeActions: z.object(
    Object.fromEntries(
      FORGE_ACTIONS.map((action) => [action, z.number().min(0)]),
    ) as Record<string, z.ZodTypeAny>,
  ),
  rarityUpgrades: z.object(
    Object.fromEntries(
      RARITY_UPGRADE_ORDER.map((rarity) => [rarity, z.number().min(0)]),
    ) as Record<string, z.ZodTypeAny>,
  ),
}) as unknown as z.ZodType<CraftTokens>;

export const GameSessionSchema = z.object({
  version: z.literal(1),
  hero: z.object({
    baseStats: CharacteristicsNumericMapSchema,
  }),
  inventory: z.object({
    equipment: z.array(GameItemSchema.nullable()),
  }),
  equipped: EquippedSchema,
  craft: z.object({
    item: GameItemSchema.nullable(),
    tokens: CraftTokensSchema.optional(),
  }),
  currencies: CurrenciesSchema,
  monsters: z.array(MonsterSchema),
});

export const serializeSession = (session: GameSession): string =>
  JSON.stringify(session);

export const parseSession = (raw: string | null): GameSession | null => {
  if (!raw) return null;
  try {
    const parsed = GameSessionSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return null;
    const data = parsed.data;
    const tokens = data.craft.tokens ?? createDefaultCraftTokens();
    const paddedInventory =
      data.inventory.equipment.length >= BACKPACK_CAPACITY
        ? data.inventory.equipment
        : [
            ...data.inventory.equipment,
            ...Array.from(
              { length: BACKPACK_CAPACITY - data.inventory.equipment.length },
              () => null,
            ),
          ];

    return {
      ...data,
      inventory: {
        equipment: paddedInventory,
      },
      craft: {
        ...data.craft,
        tokens,
      },
    };
  } catch {
    return null;
  }
};


