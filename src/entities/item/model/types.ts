import type { StaticImageData } from "next/image";

import type { CharacteristicsEnum } from "@/shared/types/characteristics";
import type { EquipmentId, EquipmentType } from "@/shared/types/equipment";
import type { RarityEnum } from "@/shared/types/rarity";

export type { EquipmentId, EquipmentType };
export {
  EQUIPMENT_IDS,
  EQUIPMENT_TYPE,
  EquipmentIdEnum,
  EquipmentTypeEnum,
} from "@/shared/types/equipment";

export type EquipmentStatRanges = Record<
  RarityEnum,
  Partial<Record<CharacteristicsEnum, [number, number]>>
>;

export type EquipmentSkinMap = Record<RarityEnum, StaticImageData>;
export type EquipmentNameMap = Record<RarityEnum, string>;

export type ItemDefinition = {
  id: EquipmentId;
  type: EquipmentType;
  name: EquipmentNameMap;
  skins: EquipmentSkinMap;
  defaultRarity: RarityEnum;
  statRanges: EquipmentStatRanges;
};

export type ItemStats = Partial<Record<CharacteristicsEnum, number>>;

export type RolledStatSlot = { stat: CharacteristicsEnum; value: number };
export type RolledStatSlotEntry = RolledStatSlot | null;

export type ItemInstance = {
  instanceId: string;
  definitionId: EquipmentId;
  type: EquipmentType;
  rarity: RarityEnum;
  stats: ItemStats;
  rolledStatSlots?: RolledStatSlotEntry[];
};


