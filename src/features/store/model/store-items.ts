import { EQUIPMENT_ITEMS } from "@/entities/item";
import type { EquipmentId } from "@/shared";
import { RarityEnum } from "@/shared";

export type StoreItem = {
  id: string;
  definitionId: EquipmentId;
  rarity: RarityEnum;
  price: number;
};

const priceByRarity: Record<RarityEnum, number> = {
  [RarityEnum.COMMON]: 45,
  [RarityEnum.UNCOMMON]: 75,
  [RarityEnum.RARE]: 120,
  [RarityEnum.EPIC]: 190,
  [RarityEnum.LEGENDARY]: 260,
};

export const STORE_ITEMS: StoreItem[] = EQUIPMENT_ITEMS.slice(0, 6).map(
  (definition, index) => {
    const rarity =
      index % 3 === 0
        ? RarityEnum.UNCOMMON
        : index % 3 === 1
          ? RarityEnum.RARE
          : RarityEnum.COMMON;
    return {
      id: `${definition.id}-${rarity}`,
      definitionId: definition.id,
      rarity,
      price: priceByRarity[rarity],
    };
  },
);
