import { describe, expect, it } from "vitest";

import { getSlotsForType, isSlotCompatible } from "@/entities/equipment";

describe("equipment ops", () => {
  it("matches slot compatibility", () => {
    expect(isSlotCompatible("WEAPON", "WEAPON")).toBe(true);
    expect(isSlotCompatible("HELMET", "WEAPON")).toBe(false);
  });

  it("returns ring slots for ring items", () => {
    const slots = getSlotsForType("RING");
    expect(slots).toContain("RING_1");
    expect(slots).toContain("RING_2");
  });
});


