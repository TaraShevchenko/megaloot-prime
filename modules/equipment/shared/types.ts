import { CharacteristicsEnum } from "shared/characteristics";
import { RarityEnum } from "shared/rarity";

export type EquipmentStatRanges = Record<
  RarityEnum,
  Partial<Record<CharacteristicsEnum, [number, number]>>
>;

export type Equipment = {
  id: string;
  name: string;
  rarity: RarityEnum;
  characteristics: Partial<Record<CharacteristicsEnum, number>>;
  statRanges: EquipmentStatRanges;
};
