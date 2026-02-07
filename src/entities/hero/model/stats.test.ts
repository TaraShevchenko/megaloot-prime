import { describe, expect, it } from "vitest";

import { calculateHeroStats,DEFAULT_HERO_STATS  } from "@/entities/hero";
import { CharacteristicsEnum } from "@/shared";

describe("hero stats", () => {
  it("sums modifiers with base stats", () => {
    const result = calculateHeroStats(DEFAULT_HERO_STATS, [
      { [CharacteristicsEnum.HP]: 20 },
      { [CharacteristicsEnum.PHYS_ATK]: 5 },
    ]);

    expect(result[CharacteristicsEnum.HP]).toBe(
      DEFAULT_HERO_STATS[CharacteristicsEnum.HP] + 20,
    );
    expect(result[CharacteristicsEnum.PHYS_ATK]).toBe(
      DEFAULT_HERO_STATS[CharacteristicsEnum.PHYS_ATK] + 5,
    );
  });
});


