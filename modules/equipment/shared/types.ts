import { CharacteristicsEnum } from "shared/characteristics";
import { RarityEnum } from "shared/rarity";

export type EquipmentStatRanges = Record<
  RarityEnum,
  Partial<Record<CharacteristicsEnum, [number, number]>>
>;
