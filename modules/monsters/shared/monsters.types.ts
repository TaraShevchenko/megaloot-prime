import { MonsterId } from "modules/monsters";
import { Characteristics } from "shared/characteristics";

export type Monster = {
  id: MonsterId;
  name: string;
  level: number;
  hp: number;
  characteristics: Characteristics;
};
