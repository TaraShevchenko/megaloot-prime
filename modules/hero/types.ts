import { Characteristics } from "shared/characteristics";

export type Hero = {
  hp: number;
  level: number;
  nickname: string;
  equipment: any;
  inventory: any;
  characteristics: Characteristics;
  actionsHistory: any;
};
