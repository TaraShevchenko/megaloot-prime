export type RandomFn = () => number;

export const createSeededRandom = (seed: number): RandomFn => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

export const randomBetween = (
  min: number,
  max: number,
  rng: RandomFn = Math.random,
): number => {
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  return low + (high - low) * rng();
};

export const randomInt = (
  min: number,
  max: number,
  rng: RandomFn = Math.random,
): number => {
  const low = Math.ceil(Math.min(min, max));
  const high = Math.floor(Math.max(min, max));
  return Math.floor(low + (high - low + 1) * rng());
};

export const pickOne = <T>(items: readonly T[], rng: RandomFn = Math.random): T => {
  if (items.length === 0) {
    throw new Error("Cannot pick from empty list.");
  }
  const index = randomInt(0, items.length - 1, rng);
  const item = items[index];
  if (item === undefined) {
    throw new Error("Failed to pick an item.");
  }
  return item;
};

export const pickWeighted = <T>(
  items: readonly T[],
  weights: readonly number[],
  rng: RandomFn = Math.random,
): T => {
  if (items.length === 0) {
    throw new Error("Cannot pick from empty list.");
  }
  const total = weights.reduce((sum, value) => sum + Math.max(0, value), 0);
  if (total <= 0) {
    return pickOne(items, rng);
  }

  const roll = rng() * total;
  let accumulator = 0;
  for (let index = 0; index < items.length; index += 1) {
    accumulator += Math.max(0, weights[index] ?? 0);
    if (roll <= accumulator) {
      return items[index] ?? pickOne(items, rng);
    }
  }

  return items[items.length - 1] ?? pickOne(items, rng);
};
