import type { EquipmentType } from "./slots";
import { SLOT_TO_TYPE } from "./slots";
import type { EquipmentSlotId } from "./types";

export const isSlotCompatible = (
  slotId: EquipmentSlotId,
  itemType: EquipmentType,
): boolean => SLOT_TO_TYPE[slotId] === itemType;

export const getSlotsForType = (itemType: EquipmentType): EquipmentSlotId[] =>
  (Object.keys(SLOT_TO_TYPE) as EquipmentSlotId[]).filter(
    (slotId) => SLOT_TO_TYPE[slotId] === itemType,
  );


