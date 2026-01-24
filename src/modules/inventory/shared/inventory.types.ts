import { StaticImageData } from "next/image";
import { type Equipment, type EquipmentType } from "modules/equipment";
import { CharacteristicsEnum } from "shared/types/characteristics";

export type InventoryItem = Equipment & {
  instanceId: string;
  rolledStats: Partial<Record<CharacteristicsEnum, number>>;
  skin: StaticImageData;
};

export type InventorySlot = InventoryItem | undefined;

export type InventorySlotDefinition = {
  id: string;
  allowedTypes?: EquipmentType[];
  label?: string;
  icon?: StaticImageData;
};

export type InventoryDragPayload = {
  inventoryId: string;
  index: number;
};

export type InventoryType = {
  slots: InventorySlot[];
  slotDefinitions: InventorySlotDefinition[];
};
