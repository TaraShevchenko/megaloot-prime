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
  COMMON = "COMMON",
  UNCOMMON = "UNCOMMON",
  RARE = "RARE",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY",
}

export type CharacteristicsMap = Record<CharacteristicsEnum, number>;

export type MonsterCharacteristics = {
  base: CharacteristicsMap;
  growth: CharacteristicsMap;
};
