import { StaticImageData } from "next/image";
import { Equipment } from "modules/equipment";
import { CharacteristicsEnum } from "shared/types/characteristics";

export type InventoryItem = Equipment & {
  instanceId: string;
  rolledStats: Partial<Record<CharacteristicsEnum, number>>;
  skin: StaticImageData;
};

export type InventorySlot = InventoryItem | undefined;

export type Inventory = {
  slots: InventorySlot[];
  slotsAmount: number;
};
