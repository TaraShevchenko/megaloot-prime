import type { StaticImageData } from "next/image";
import { EquipmentStatRanges } from "modules/equipment/shared/types";
import { STAT_RANGES as HAMMER_STAT_RANGES } from "modules/equipment/weapon/hammer/constants";
import { STAT_RANGES as SWORD_STAT_RANGES } from "modules/equipment/weapon/sword/constants";
import { RarityEnum } from "shared/rarity";
import hammerImage from "modules/equipment/weapon/hammer/lvl3.png";
import swordImage from "modules/equipment/weapon/sword/image.png";

export type EquipmentEntry = {
  id: string;
  name: string;
  image: StaticImageData;
  defaultRarity: RarityEnum;
  statsRanges: EquipmentStatRanges;
};

export type EquipmentId = EquipmentEntry["id"];

export const EQUIPMENT_ITEMS: EquipmentEntry[] = [
  {
    id: "sword",
    name: "Sword",
    image: swordImage,
    defaultRarity: RarityEnum.COMMON,
    statsRanges: SWORD_STAT_RANGES,
  },
  {
    id: "hammer",
    name: "Hammer",
    image: hammerImage,
    defaultRarity: RarityEnum.COMMON,
    statsRanges: HAMMER_STAT_RANGES,
  },
];
