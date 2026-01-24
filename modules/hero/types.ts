import { Equipment } from "modules/equipment";
import { InventoryType } from "modules/inventory";
import { Characteristics } from "shared/types/characteristics";

export type Hero = {
  hp: number;
  level: number;
  nickname: string;
  equipment: Equipment;
  inventory: InventoryType;
  characteristics: Characteristics;
  // actionsHistory: any;
};
