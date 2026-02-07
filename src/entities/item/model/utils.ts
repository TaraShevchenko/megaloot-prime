import type { EquipmentType,ItemDefinition } from "./types";

export const formatEquipmentName = (rawId: string) =>
  rawId
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());

export const groupEquipmentByType = (
  items: ItemDefinition[],
): Record<EquipmentType, ItemDefinition[]> => {
  const base = Object.fromEntries(
    [
      "WEAPON",
      "ARMOR",
      "HELMET",
      "TROUSERS",
      "GLOVES",
      "RING",
      "NECKLACE",
      "BOOTS",
    ].map((type) => [type, [] as ItemDefinition[]]),
  ) as Record<EquipmentType, ItemDefinition[]>;

  return items.reduce<Record<EquipmentType, ItemDefinition[]>>((acc, item) => {
    acc[item.type]?.push(item);
    return acc;
  }, base);
};


