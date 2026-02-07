export const EQUIPMENT_SLOT_IDS = [
  "NECKLACE",
  "HELMET",
  "GLOVES",
  "RING_1",
  "ARMOR",
  "WEAPON",
  "RING_2",
  "TROUSERS",
  "BOOTS",
] as const;

export type EquipmentSlotId = (typeof EQUIPMENT_SLOT_IDS)[number];


