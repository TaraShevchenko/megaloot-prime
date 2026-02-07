import { CharacteristicsEnum } from "@/shared/types/characteristics";
import { RarityEnum } from "@/shared/types/rarity";

import armorCommon from "../assets/armor/ancient_armor/common.png";
import armorEpic from "../assets/armor/ancient_armor/epic.png";
import armorLegendary from "../assets/armor/ancient_armor/legendary.png";
import armorRare from "../assets/armor/ancient_armor/rare.png";
import armorUncommon from "../assets/armor/ancient_armor/uncommon.png";
import bootsCommon from "../assets/boots/ancient_boots/common.png";
import bootsEpic from "../assets/boots/ancient_boots/epic.png";
import bootsLegendary from "../assets/boots/ancient_boots/legendary.png";
import bootsRare from "../assets/boots/ancient_boots/rare.png";
import bootsUncommon from "../assets/boots/ancient_boots/uncommon.png";
import helmetCommon from "../assets/helmet/ancient_helmet/common.png";
import helmetEpic from "../assets/helmet/ancient_helmet/epic.png";
import helmetLegendary from "../assets/helmet/ancient_helmet/legendary.png";
import helmetRare from "../assets/helmet/ancient_helmet/rare.png";
import helmetUncommon from "../assets/helmet/ancient_helmet/uncommon.png";
import trousersCommon from "../assets/trousers/ancient_trousers/common.png";
import trousersEpic from "../assets/trousers/ancient_trousers/epic.png";
import trousersLegendary from "../assets/trousers/ancient_trousers/legendary.png";
import trousersRare from "../assets/trousers/ancient_trousers/rare.png";
import trousersUncommon from "../assets/trousers/ancient_trousers/uncommon.png";
import axeCommon from "../assets/weapon/axe/common.png";
import axeEpic from "../assets/weapon/axe/epic.png";
import axeLegendary from "../assets/weapon/axe/legendary.png";
import axeRare from "../assets/weapon/axe/rare.png";
import axeUncommon from "../assets/weapon/axe/uncommon.png";
import hammerCommon from "../assets/weapon/hammer/common.png";
import hammerEpic from "../assets/weapon/hammer/epic.png";
import hammerLegendary from "../assets/weapon/hammer/legendary.png";
import hammerRare from "../assets/weapon/hammer/rare.png";
import hammerUncommon from "../assets/weapon/hammer/uncommon.png";
import scytheCommon from "../assets/weapon/scythe/common.png";
import scytheEpic from "../assets/weapon/scythe/epic.png";
import scytheLegendary from "../assets/weapon/scythe/legendary.png";
import scytheRare from "../assets/weapon/scythe/rare.png";
import scytheUncommon from "../assets/weapon/scythe/uncommon.png";
import swordCommon from "../assets/weapon/sword/common.png";
import swordEpic from "../assets/weapon/sword/epic.png";
import swordLegendary from "../assets/weapon/sword/legendary.png";
import swordRare from "../assets/weapon/sword/rare.png";
import swordUncommon from "../assets/weapon/sword/uncommon.png";
import wandCommon from "../assets/weapon/wand/common.png";
import wandEpic from "../assets/weapon/wand/epic.png";
import wandLegendary from "../assets/weapon/wand/legendary.png";
import wandRare from "../assets/weapon/wand/rare.png";
import wandUncommon from "../assets/weapon/wand/uncommon.png";
import type { EquipmentId, EquipmentType, ItemDefinition } from "./types";
import { EquipmentIdEnum, EquipmentTypeEnum } from "./types";
import { formatEquipmentName, groupEquipmentByType } from "./utils";

const AXE: ItemDefinition = {
  id: EquipmentIdEnum.AXE,
  type: EquipmentTypeEnum.WEAPON,
  name: {
    [RarityEnum.COMMON]: "Woodfang Axe",
    [RarityEnum.UNCOMMON]: "Rockbreaker Axe",
    [RarityEnum.RARE]: "Ironfall Axe",
    [RarityEnum.EPIC]: "Sunflare Axe",
    [RarityEnum.LEGENDARY]: "Crystalbane Axe",
  },
  skins: {
    [RarityEnum.COMMON]: axeCommon,
    [RarityEnum.UNCOMMON]: axeUncommon,
    [RarityEnum.RARE]: axeRare,
    [RarityEnum.EPIC]: axeEpic,
    [RarityEnum.LEGENDARY]: axeLegendary,
  },
  defaultRarity: RarityEnum.COMMON,
  statRanges: {
    [RarityEnum.COMMON]: {
      [CharacteristicsEnum.PHYS_ATK]: [12, 18],
      [CharacteristicsEnum.CRIT_DAMAGE]: [8, 12],
    },
    [RarityEnum.UNCOMMON]: {
      [CharacteristicsEnum.PHYS_ATK]: [18, 26],
      [CharacteristicsEnum.CRIT_DAMAGE]: [12, 18],
    },
    [RarityEnum.RARE]: {
      [CharacteristicsEnum.PHYS_ATK]: [26, 36],
      [CharacteristicsEnum.CRIT_DAMAGE]: [18, 25],
    },
    [RarityEnum.EPIC]: {
      [CharacteristicsEnum.PHYS_ATK]: [36, 48],
      [CharacteristicsEnum.CRIT_DAMAGE]: [25, 34],
    },
    [RarityEnum.LEGENDARY]: {
      [CharacteristicsEnum.PHYS_ATK]: [48, 65],
      [CharacteristicsEnum.CRIT_DAMAGE]: [34, 45],
    },
  },
};

const HAMMER: ItemDefinition = {
  id: EquipmentIdEnum.HAMMER,
  type: EquipmentTypeEnum.WEAPON,
  name: {
    [RarityEnum.COMMON]: "Rootcrusher Hammer",
    [RarityEnum.UNCOMMON]: "Gravelcore Hammer",
    [RarityEnum.RARE]: "Warforged Hammer",
    [RarityEnum.EPIC]: "Goldcrest Hammer",
    [RarityEnum.LEGENDARY]: "Diamondcore Hammer",
  },
  skins: {
    [RarityEnum.COMMON]: hammerCommon,
    [RarityEnum.UNCOMMON]: hammerUncommon,
    [RarityEnum.RARE]: hammerRare,
    [RarityEnum.EPIC]: hammerEpic,
    [RarityEnum.LEGENDARY]: hammerLegendary,
  },
  defaultRarity: RarityEnum.COMMON,
  statRanges: {
    [RarityEnum.COMMON]: {
      [CharacteristicsEnum.PHYS_ATK]: [14, 20],
      [CharacteristicsEnum.PHYS_DEF]: [1, 2],
    },
    [RarityEnum.UNCOMMON]: {
      [CharacteristicsEnum.PHYS_ATK]: [20, 28],
      [CharacteristicsEnum.PHYS_DEF]: [2, 3],
    },
    [RarityEnum.RARE]: {
      [CharacteristicsEnum.PHYS_ATK]: [28, 40],
      [CharacteristicsEnum.PHYS_DEF]: [3, 5],
    },
    [RarityEnum.EPIC]: {
      [CharacteristicsEnum.PHYS_ATK]: [40, 55],
      [CharacteristicsEnum.PHYS_DEF]: [5, 7],
    },
    [RarityEnum.LEGENDARY]: {
      [CharacteristicsEnum.PHYS_ATK]: [55, 75],
      [CharacteristicsEnum.PHYS_DEF]: [7, 10],
    },
  },
};

const SCYTHE: ItemDefinition = {
  id: EquipmentIdEnum.SCYTHE,
  type: EquipmentTypeEnum.WEAPON,
  name: {
    [RarityEnum.COMMON]: "Oak Scythe",
    [RarityEnum.UNCOMMON]: "Gravecarver",
    [RarityEnum.RARE]: "Steel Harvest",
    [RarityEnum.EPIC]: "Sunreaper",
    [RarityEnum.LEGENDARY]: "Diamond Death",
  },
  skins: {
    [RarityEnum.COMMON]: scytheCommon,
    [RarityEnum.UNCOMMON]: scytheUncommon,
    [RarityEnum.RARE]: scytheRare,
    [RarityEnum.EPIC]: scytheEpic,
    [RarityEnum.LEGENDARY]: scytheLegendary,
  },
  defaultRarity: RarityEnum.COMMON,
  statRanges: {
    [RarityEnum.COMMON]: {
      [CharacteristicsEnum.PHYS_ATK]: [10, 15],
      [CharacteristicsEnum.VAMPIRIC]: [1, 2],
    },
    [RarityEnum.UNCOMMON]: {
      [CharacteristicsEnum.PHYS_ATK]: [15, 22],
      [CharacteristicsEnum.VAMPIRIC]: [2, 3],
    },
    [RarityEnum.RARE]: {
      [CharacteristicsEnum.PHYS_ATK]: [22, 31],
      [CharacteristicsEnum.VAMPIRIC]: [3, 4],
    },
    [RarityEnum.EPIC]: {
      [CharacteristicsEnum.PHYS_ATK]: [31, 42],
      [CharacteristicsEnum.VAMPIRIC]: [4, 6],
    },
    [RarityEnum.LEGENDARY]: {
      [CharacteristicsEnum.PHYS_ATK]: [42, 58],
      [CharacteristicsEnum.VAMPIRIC]: [6, 8],
    },
  },
};

const SWORD: ItemDefinition = {
  id: EquipmentIdEnum.SWORD,
  type: EquipmentTypeEnum.WEAPON,
  name: {
    [RarityEnum.COMMON]: "Oakbound Sword",
    [RarityEnum.UNCOMMON]: "Stoneheart Sword",
    [RarityEnum.RARE]: "Steelrend Sword",
    [RarityEnum.EPIC]: "Dawnbringer Sword",
    [RarityEnum.LEGENDARY]: "Eternashard Sword",
  },
  skins: {
    [RarityEnum.COMMON]: swordCommon,
    [RarityEnum.UNCOMMON]: swordUncommon,
    [RarityEnum.RARE]: swordRare,
    [RarityEnum.EPIC]: swordEpic,
    [RarityEnum.LEGENDARY]: swordLegendary,
  },
  defaultRarity: RarityEnum.COMMON,
  statRanges: {
    [RarityEnum.COMMON]: {
      [CharacteristicsEnum.PHYS_ATK]: [11, 16],
      [CharacteristicsEnum.CRIT_CHANCE]: [2, 3],
    },
    [RarityEnum.UNCOMMON]: {
      [CharacteristicsEnum.PHYS_ATK]: [16, 23],
      [CharacteristicsEnum.CRIT_CHANCE]: [3, 5],
    },
    [RarityEnum.RARE]: {
      [CharacteristicsEnum.PHYS_ATK]: [23, 32],
      [CharacteristicsEnum.CRIT_CHANCE]: [5, 7],
    },
    [RarityEnum.EPIC]: {
      [CharacteristicsEnum.PHYS_ATK]: [32, 44],
      [CharacteristicsEnum.CRIT_CHANCE]: [7, 10],
    },
    [RarityEnum.LEGENDARY]: {
      [CharacteristicsEnum.PHYS_ATK]: [44, 60],
      [CharacteristicsEnum.CRIT_CHANCE]: [10, 14],
    },
  },
};

const WAND: ItemDefinition = {
  id: EquipmentIdEnum.WAND,
  type: EquipmentTypeEnum.WEAPON,
  name: {
    [RarityEnum.COMMON]: "Oakspell Wand",
    [RarityEnum.UNCOMMON]: "Earthshard Wand",
    [RarityEnum.RARE]: "Grimforge Wand",
    [RarityEnum.EPIC]: "Aurelius Wand",
    [RarityEnum.LEGENDARY]: "Celestium Wand",
  },
  skins: {
    [RarityEnum.COMMON]: wandCommon,
    [RarityEnum.UNCOMMON]: wandUncommon,
    [RarityEnum.RARE]: wandRare,
    [RarityEnum.EPIC]: wandEpic,
    [RarityEnum.LEGENDARY]: wandLegendary,
  },
  defaultRarity: RarityEnum.COMMON,
  statRanges: {
    [RarityEnum.COMMON]: {
      [CharacteristicsEnum.MAGIC_ATK]: [12, 18],
      [CharacteristicsEnum.CRIT_CHANCE]: [1, 2],
    },
    [RarityEnum.UNCOMMON]: {
      [CharacteristicsEnum.MAGIC_ATK]: [18, 26],
      [CharacteristicsEnum.CRIT_CHANCE]: [2, 3],
    },
    [RarityEnum.RARE]: {
      [CharacteristicsEnum.MAGIC_ATK]: [26, 36],
      [CharacteristicsEnum.CRIT_CHANCE]: [3, 4],
    },
    [RarityEnum.EPIC]: {
      [CharacteristicsEnum.MAGIC_ATK]: [36, 48],
      [CharacteristicsEnum.CRIT_CHANCE]: [4, 6],
    },
    [RarityEnum.LEGENDARY]: {
      [CharacteristicsEnum.MAGIC_ATK]: [48, 65],
      [CharacteristicsEnum.CRIT_CHANCE]: [6, 8],
    },
  },
};

const ANCIENT_ARMOR: ItemDefinition = {
  id: EquipmentIdEnum.ANCIENT_ARMOR,
  type: EquipmentTypeEnum.ARMOR,
  name: {
    [RarityEnum.COMMON]: "Jacket",
    [RarityEnum.UNCOMMON]: "Cuirass",
    [RarityEnum.RARE]: "Steelrend Armor",
    [RarityEnum.EPIC]: "Sunfire Armor",
    [RarityEnum.LEGENDARY]: "Eternashard Armor",
  },
  skins: {
    [RarityEnum.COMMON]: armorCommon,
    [RarityEnum.UNCOMMON]: armorUncommon,
    [RarityEnum.RARE]: armorRare,
    [RarityEnum.EPIC]: armorEpic,
    [RarityEnum.LEGENDARY]: armorLegendary,
  },
  defaultRarity: RarityEnum.COMMON,
  statRanges: {
    [RarityEnum.COMMON]: {
      [CharacteristicsEnum.HP]: [40, 60],
      [CharacteristicsEnum.PHYS_DEF]: [6, 10],
      [CharacteristicsEnum.MAGIC_DEF]: [3, 6],
    },
    [RarityEnum.UNCOMMON]: {
      [CharacteristicsEnum.HP]: [60, 85],
      [CharacteristicsEnum.PHYS_DEF]: [10, 14],
      [CharacteristicsEnum.MAGIC_DEF]: [6, 9],
    },
    [RarityEnum.RARE]: {
      [CharacteristicsEnum.HP]: [85, 120],
      [CharacteristicsEnum.PHYS_DEF]: [14, 20],
      [CharacteristicsEnum.MAGIC_DEF]: [9, 13],
    },
    [RarityEnum.EPIC]: {
      [CharacteristicsEnum.HP]: [120, 165],
      [CharacteristicsEnum.PHYS_DEF]: [20, 28],
      [CharacteristicsEnum.MAGIC_DEF]: [13, 18],
    },
    [RarityEnum.LEGENDARY]: {
      [CharacteristicsEnum.HP]: [165, 220],
      [CharacteristicsEnum.PHYS_DEF]: [28, 38],
      [CharacteristicsEnum.MAGIC_DEF]: [18, 24],
    },
  },
};

const ANCIENT_BOOTS: ItemDefinition = {
  id: EquipmentIdEnum.ANCIENT_BOOTS,
  type: EquipmentTypeEnum.BOOTS,
  name: {
    [RarityEnum.COMMON]: "Boots",
    [RarityEnum.UNCOMMON]: "Greaves",
    [RarityEnum.RARE]: "Rivetsoul Boots",
    [RarityEnum.EPIC]: "Auricstride Boots",
    [RarityEnum.LEGENDARY]: "Starforged Boots",
  },
  skins: {
    [RarityEnum.COMMON]: bootsCommon,
    [RarityEnum.UNCOMMON]: bootsUncommon,
    [RarityEnum.RARE]: bootsRare,
    [RarityEnum.EPIC]: bootsEpic,
    [RarityEnum.LEGENDARY]: bootsLegendary,
  },
  defaultRarity: RarityEnum.COMMON,
  statRanges: {
    [RarityEnum.COMMON]: {
      [CharacteristicsEnum.PHYS_DEF]: [2, 4],
      [CharacteristicsEnum.CRIT_CHANCE]: [1, 2],
    },
    [RarityEnum.UNCOMMON]: {
      [CharacteristicsEnum.PHYS_DEF]: [4, 6],
      [CharacteristicsEnum.CRIT_CHANCE]: [2, 3],
    },
    [RarityEnum.RARE]: {
      [CharacteristicsEnum.PHYS_DEF]: [6, 8],
      [CharacteristicsEnum.CRIT_CHANCE]: [3, 4],
    },
    [RarityEnum.EPIC]: {
      [CharacteristicsEnum.PHYS_DEF]: [8, 11],
      [CharacteristicsEnum.CRIT_CHANCE]: [4, 6],
    },
    [RarityEnum.LEGENDARY]: {
      [CharacteristicsEnum.PHYS_DEF]: [11, 15],
      [CharacteristicsEnum.CRIT_CHANCE]: [6, 8],
    },
  },
};

const ANCIENT_HELMET: ItemDefinition = {
  id: EquipmentIdEnum.ANCIENT_HELMET,
  type: EquipmentTypeEnum.HELMET,
  name: {
    [RarityEnum.COMMON]: "Helm of Twisted Branches",
    [RarityEnum.UNCOMMON]: "Stoneplate Helm",
    [RarityEnum.RARE]: "Ironclad Helm",
    [RarityEnum.EPIC]: "Helm of Radiant Dawn",
    [RarityEnum.LEGENDARY]: "Celestial Helmt",
  },
  skins: {
    [RarityEnum.COMMON]: helmetCommon,
    [RarityEnum.UNCOMMON]: helmetUncommon,
    [RarityEnum.RARE]: helmetRare,
    [RarityEnum.EPIC]: helmetEpic,
    [RarityEnum.LEGENDARY]: helmetLegendary,
  },
  defaultRarity: RarityEnum.COMMON,
  statRanges: {
    [RarityEnum.COMMON]: {
      [CharacteristicsEnum.PHYS_DEF]: [4, 7],
      [CharacteristicsEnum.MAGIC_DEF]: [2, 4],
      [CharacteristicsEnum.CRIT_CHANCE]: [1, 2],
    },
    [RarityEnum.UNCOMMON]: {
      [CharacteristicsEnum.PHYS_DEF]: [7, 10],
      [CharacteristicsEnum.MAGIC_DEF]: [4, 6],
      [CharacteristicsEnum.CRIT_CHANCE]: [2, 3],
    },
    [RarityEnum.RARE]: {
      [CharacteristicsEnum.PHYS_DEF]: [10, 14],
      [CharacteristicsEnum.MAGIC_DEF]: [6, 9],
      [CharacteristicsEnum.CRIT_CHANCE]: [3, 5],
    },
    [RarityEnum.EPIC]: {
      [CharacteristicsEnum.PHYS_DEF]: [14, 19],
      [CharacteristicsEnum.MAGIC_DEF]: [9, 12],
      [CharacteristicsEnum.CRIT_CHANCE]: [5, 7],
    },
    [RarityEnum.LEGENDARY]: {
      [CharacteristicsEnum.PHYS_DEF]: [19, 25],
      [CharacteristicsEnum.MAGIC_DEF]: [12, 16],
      [CharacteristicsEnum.CRIT_CHANCE]: [7, 10],
    },
  },
};

const ANCIENT_TROUSERS: ItemDefinition = {
  id: EquipmentIdEnum.ANCIENT_TROUSERS,
  type: EquipmentTypeEnum.TROUSERS,
  name: {
    [RarityEnum.COMMON]: "Trousers",
    [RarityEnum.UNCOMMON]: "Sabatons",
    [RarityEnum.RARE]: "Forgedplate Trousers",
    [RarityEnum.EPIC]: "Goldenflare Trousers",
    [RarityEnum.LEGENDARY]: "Prismveil Trousers",
  },
  skins: {
    [RarityEnum.COMMON]: trousersCommon,
    [RarityEnum.UNCOMMON]: trousersUncommon,
    [RarityEnum.RARE]: trousersRare,
    [RarityEnum.EPIC]: trousersEpic,
    [RarityEnum.LEGENDARY]: trousersLegendary,
  },
  defaultRarity: RarityEnum.COMMON,
  statRanges: {
    [RarityEnum.COMMON]: {
      [CharacteristicsEnum.HP]: [25, 40],
      [CharacteristicsEnum.PHYS_DEF]: [3, 6],
    },
    [RarityEnum.UNCOMMON]: {
      [CharacteristicsEnum.HP]: [40, 55],
      [CharacteristicsEnum.PHYS_DEF]: [6, 9],
    },
    [RarityEnum.RARE]: {
      [CharacteristicsEnum.HP]: [55, 75],
      [CharacteristicsEnum.PHYS_DEF]: [9, 12],
    },
    [RarityEnum.EPIC]: {
      [CharacteristicsEnum.HP]: [75, 100],
      [CharacteristicsEnum.PHYS_DEF]: [12, 16],
    },
    [RarityEnum.LEGENDARY]: {
      [CharacteristicsEnum.HP]: [100, 135],
      [CharacteristicsEnum.PHYS_DEF]: [16, 21],
    },
  },
};

export const EQUIPMENT_ITEMS: ItemDefinition[] = [
  AXE,
  SCYTHE,
  HAMMER,
  SWORD,
  WAND,
  ANCIENT_ARMOR,
  ANCIENT_BOOTS,
  ANCIENT_TROUSERS,
  ANCIENT_HELMET,
];

export const EQUIPMENT_BY_ID = Object.fromEntries(
  EQUIPMENT_ITEMS.map((item) => [item.id, item]),
) as Record<EquipmentId, ItemDefinition>;

export const EQUIPMENT_BY_TYPE = groupEquipmentByType(EQUIPMENT_ITEMS);

export const EQUIPMENT_TYPES = Object.values(EquipmentTypeEnum);

export const EQUIPMENT_TYPE_LABELS: Record<EquipmentType, string> =
  Object.fromEntries(
    Object.values(EquipmentTypeEnum).map((type) => [type, formatEquipmentName(type)]),
  ) as Record<EquipmentType, string>;


