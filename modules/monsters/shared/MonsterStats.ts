import {
  CharacteristicsEnum,
  type CharacteristicsMap,
  type MonsterCharacteristics,
} from "shared/types";

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

export const getScaledCharacteristics = (
  stats: MonsterCharacteristics,
  level: number,
): CharacteristicsMap => {
  const scaled = {} as CharacteristicsMap;
  const normalizedLevel = Math.max(1, Math.floor(level));
  const multiplier = normalizedLevel - 1;

  CHARACTERISTICS_ORDER.forEach((stat) => {
    scaled[stat] = stats.base[stat] + stats.growth[stat] * multiplier;
  });

  return scaled;
};
