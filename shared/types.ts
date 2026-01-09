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

export const CHARACTERISTICS_ORDER: CharacteristicsEnum[] = [
  CharacteristicsEnum.HP,
  CharacteristicsEnum.MP,
  CharacteristicsEnum.PHYS_RESIST,
  CharacteristicsEnum.MAGIC_RESIST,
  CharacteristicsEnum.PHYS_ATK,
  CharacteristicsEnum.MAGIC_ATK,
  CharacteristicsEnum.CRIT_CHANCE,
  CharacteristicsEnum.CRIT_DAMAGE,
  CharacteristicsEnum.ACCURACY,
  CharacteristicsEnum.EVASION,
  CharacteristicsEnum.VAMPIRIC,
];

export const CHARACTERISTIC_LABELS: Record<CharacteristicsEnum, string> = {
  [CharacteristicsEnum.HP]: "HP",
  [CharacteristicsEnum.MP]: "MP",
  [CharacteristicsEnum.PHYS_RESIST]: "Phys DEF",
  [CharacteristicsEnum.MAGIC_RESIST]: "Magic DEF",
  [CharacteristicsEnum.PHYS_ATK]: "Phys ATK",
  [CharacteristicsEnum.MAGIC_ATK]: "Magic ATK",
  [CharacteristicsEnum.CRIT_CHANCE]: "Crit %",
  [CharacteristicsEnum.CRIT_DAMAGE]: "Crit Dmg",
  [CharacteristicsEnum.ACCURACY]: "Accuracy",
  [CharacteristicsEnum.EVASION]: "Evasion",
  [CharacteristicsEnum.VAMPIRIC]: "Vampiric",
};

export enum RarityEnum {
  COMMON = "COMMON",
  UNCOMMON = "UNCOMMON",
  RARE = "RARE",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY",
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
