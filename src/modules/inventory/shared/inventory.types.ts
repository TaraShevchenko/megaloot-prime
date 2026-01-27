import { StaticImageData } from "next/image";
import { type Equipment, type EquipmentType } from "modules/equipment";
import { CharacteristicsEnum } from "shared/types/characteristics";

export type InventoryItem = Equipment & {
  instanceId: string;
  stackKey: string;
  stackCount?: number;
  rolledStats: Partial<Record<CharacteristicsEnum, number>>;
  rolledStatSlots?: Array<{ stat: CharacteristicsEnum; value: number } | null>;
  skin: StaticImageData;
};

export type InventorySlot = InventoryItem | undefined;

export type InventorySlotDefinition = {
  id: string;
  allowedTypes?: EquipmentType[];
  label?: string;
  icon?: StaticImageData;
  maxStack?: number;
};

export type InventoryDragPayload = {
  inventoryId: string;
  index: number;
};

export type InventoryType = {
  slots: InventorySlot[];
  slotDefinitions: InventorySlotDefinition[];
};
