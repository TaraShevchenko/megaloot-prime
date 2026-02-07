import type { StaticImageData } from "next/image";

import armorIcon from "../assets/slots/armor.png";
import bootsIcon from "../assets/slots/boots.png";
import glovesIcon from "../assets/slots/gloves.png";
import helmetIcon from "../assets/slots/helmet.png";
import necklaceIcon from "../assets/slots/necklace.png";
import ringIcon from "../assets/slots/ring.png";
import trousersIcon from "../assets/slots/trousers.png";
import weaponIcon from "../assets/slots/weapon.png";
import type { EquipmentSlotId } from "./types";

export const SLOT_ICONS: Record<EquipmentSlotId, StaticImageData> = {
  NECKLACE: necklaceIcon,
  HELMET: helmetIcon,
  GLOVES: glovesIcon,
  RING_1: ringIcon,
  ARMOR: armorIcon,
  WEAPON: weaponIcon,
  RING_2: ringIcon,
  TROUSERS: trousersIcon,
  BOOTS: bootsIcon,
};


