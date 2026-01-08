export enum CharacteristicsEnum {
  HP = "HP",
  MP = "MP",
  PHYS_RESIST = "DEF",
  MAGIC_RESIST = "SPA",
  PHYS_ATK = "PHYS_ATK",
  MAGIC_ATK = "MAGIC_ATK",
  CRIT_CHANCE = "CRIT_CHANCE",
  CRIT_DAMAGE = "CRIT_DAMAGE",
  ACCURACY = "ACCURACY",
  EVASION = "EVASION",
  VAMPIRIC = "VAMPIRIC",
}

export enum RarityEnum {
  COMMON = "COMMON", // BG: #D9D9D9 -> #737373 (134deg)
  UNCOMMON = "UNCOMMON", // BG: #32E26C -> #A4F8C0 (134deg)
  RARE = "RARE", // BG: #5C6FE8 -> #BBADE6 (134deg)
  EPIC = "EPIC", // BG: #FFD900 -> #9650F8 (134deg)
  LEGENDARY = "LEGENDARY", // BG: #3BE8C5 -> #003C30 (134deg)
}

export const RARITY_BACKGROUNDS: Record<RarityEnum, string> = {
  [RarityEnum.COMMON]: "linear-gradient(134deg,#D9D9D9,#737373)",
  [RarityEnum.UNCOMMON]: "linear-gradient(134deg,#32E26C,#A4F8C0)",
  [RarityEnum.RARE]: "linear-gradient(134deg,#5C6FE8,#BBADE6)",
  [RarityEnum.EPIC]: "linear-gradient(134deg,#FFD900,#9650F8)",
  [RarityEnum.LEGENDARY]: "linear-gradient(134deg,#3BE8C5,#003C30)",
};

export const RARITY_ORDER: RarityEnum[] = [
  RarityEnum.COMMON,
  RarityEnum.UNCOMMON,
  RarityEnum.RARE,
  RarityEnum.EPIC,
  RarityEnum.LEGENDARY,
];

export const RARITY_LABELS: Record<RarityEnum, string> = {
  [RarityEnum.COMMON]: "Common",
  [RarityEnum.UNCOMMON]: "Uncommon",
  [RarityEnum.RARE]: "Rare",
  [RarityEnum.EPIC]: "Epic",
  [RarityEnum.LEGENDARY]: "Legendary",
};

export type CharacteristicsMap = Record<CharacteristicsEnum, number>;

export type MonsterCharacteristics = {
  base: CharacteristicsMap;
  growth: CharacteristicsMap;
};
