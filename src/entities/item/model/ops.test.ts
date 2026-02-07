import { describe, expect, it } from "vitest";

import { createItemInstance, EQUIPMENT_ITEMS, rollItemStats } from "@/entities/item";
import { createSeededRandom } from "@/shared";

const definition = EQUIPMENT_ITEMS[0];
if (!definition) {
  throw new Error("Missing equipment definitions");
}

describe("item ops", () => {
  it("rolls stats within configured ranges", () => {
    const rng = createSeededRandom(42);
    const rarity = definition.defaultRarity;
    const stats = rollItemStats(definition, rarity, rng);

    const ranges = definition.statRanges[rarity];
    Object.entries(ranges).forEach(([stat, range]) => {
      if (!range) return;
      const value = stats[stat as keyof typeof stats];
      if (typeof value !== "number") return;
      expect(value).toBeGreaterThanOrEqual(range[0]);
      expect(value).toBeLessThanOrEqual(range[1]);
    });
  });

  it("creates a stable item instance", () => {
    const rng = createSeededRandom(7);
    const instance = createItemInstance(definition, { rng });

    expect(instance.definitionId).toBe(definition.id);
    expect(instance.instanceId.length).toBeGreaterThan(6);
    expect(instance.rarity).toBe(definition.defaultRarity);
    expect(instance.rolledStatSlots?.length).toBe(6);
  });
});


