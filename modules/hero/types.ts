import { Equipment } from "modules/equipment";
import { Inventory } from "modules/inventory";
import { Characteristics } from "shared/characteristics";

export type Hero = {
  hp: number;
  level: number;
  nickname: string;
  equipment: Equipment;
  inventory: Inventory;
  characteristics: Characteristics;
  // actionsHistory: any;
};
