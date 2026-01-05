import {
  CharacteristicsEnum,
  type CharacteristicsMap,
  type MonsterCharacteristics,
} from "shared/types";

export type StatRange = [number, number];

export type MonsterStatRanges = {
  base: Record<CharacteristicsEnum, StatRange>;
  growth: Record<CharacteristicsEnum, StatRange>;
};

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

const createSeededRandom = (seed: number) => {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
};

const randomInt = (rand: () => number, min: number, max: number) =>
  Math.floor(rand() * (max - min + 1)) + min;

export const createRandomCharacteristics = (
  seed: number,
  ranges: MonsterStatRanges,
): MonsterCharacteristics => {
  const rand = createSeededRandom(seed);
  const base = {} as CharacteristicsMap;
  const growth = {} as CharacteristicsMap;

  CHARACTERISTICS_ORDER.forEach((stat) => {
    const [baseMin, baseMax] = ranges.base[stat];
    const [growthMin, growthMax] = ranges.growth[stat];

    base[stat] = randomInt(rand, baseMin, baseMax);
    growth[stat] = randomInt(rand, growthMin, growthMax);
  });

  return { base, growth };
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
