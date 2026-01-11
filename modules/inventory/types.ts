import { Equipment } from "modules/equipment";

export type InventorySlot = Equipment | undefined;

export type Inventory = {
  slots: InventorySlot[];
  slotsAmount: number;
};
