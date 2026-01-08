import { CharacteristicsEnum, RarityEnum } from "shared/types";

export type EquipmentStatRanges = Record<
  RarityEnum,
  Partial<Record<CharacteristicsEnum, [number, number]>>
>;
