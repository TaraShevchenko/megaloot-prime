import type {
  CharacteristicsEnum,
  CharacteristicsNumericMap,
} from "@/shared/types/characteristics";
import type { CurrencyType } from "@/shared/types/currency";
import type { EquipmentId, EquipmentType } from "@/shared/types/equipment";
import type { RarityEnum } from "@/shared/types/rarity";
import type { CraftTokens } from "@/entities/craft";
import type { Inventory } from "@/entities/inventory";
import type { RolledStatSlotEntry } from "@/entities/item";
import type { MonsterId } from "@/entities/monster";

export const EQUIPMENT_SLOT_IDS = [
  "NECKLACE",
  "HELMET",
  "GLOVES",
  "RING_1",
  "ARMOR",
  "WEAPON",
  "RING_2",
  "TROUSERS",
  "BOOTS",
] as const;

export type EquipmentSlotId = (typeof EQUIPMENT_SLOT_IDS)[number];

export type GameItem = {
  instanceId: string;
  definitionId: EquipmentId;
  type: EquipmentType;
  rarity: RarityEnum;
  stats: Partial<Record<CharacteristicsEnum, number>>;
  rolledStatSlots?: RolledStatSlotEntry[];
};

export type EquippedItems = Record<EquipmentSlotId, GameItem | null>;

export type MonsterState = {
  id: MonsterId;
  level: number;
  maxHp: number;
  currentHp: number;
  alive: boolean;
};

export type GameSession = {
  version: 1;
  hero: {
    baseStats: CharacteristicsNumericMap;
  };
  inventory: {
    equipment: Inventory<GameItem>;
  };
  equipped: EquippedItems;
  craft: {
    item: GameItem | null;
    tokens: CraftTokens;
  };
  currencies: Record<CurrencyType, number>;
  monsters: MonsterState[];
};


