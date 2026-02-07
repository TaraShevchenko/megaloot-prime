import equipmentPartIcon from "../assets/equipment-part.png";
import crimsonGemIcon from "../assets/forge/add-char-1.png";
import rarityIngotIcon from "../assets/forge/rarity-update-to-rare.png";
import goldIcon from "../assets/gold.png";
import type { CurrencyDefinition, CurrencyType } from "./types";
import { CurrencyEnum } from "./types";

export const CURRENCIES: CurrencyDefinition[] = [
  {
    id: CurrencyEnum.GOLD,
    label: "Gold",
    description: "Universal trade currency and quick tweaks.",
    icon: goldIcon,
  },
  {
    id: CurrencyEnum.EQUIPMENT_PART,
    label: "Gear Fragment",
    description: "Polishes existing stats on an item.",
    icon: equipmentPartIcon,
  },
  {
    id: CurrencyEnum.CRIMSON_GEM,
    label: "Crimson Gem",
    description: "Adds a new stat or enhances a missing trait.",
    icon: crimsonGemIcon,
  },
  {
    id: CurrencyEnum.RARITY_INGOT,
    label: "Rarity Ingot",
    description: "Promotes item rarity by one tier.",
    icon: rarityIngotIcon,
  },
];

export const CURRENCY_BY_ID = Object.fromEntries(
  CURRENCIES.map((currency) => [currency.id, currency]),
) as Record<CurrencyType, CurrencyDefinition>;

export const CRAFT_CURRENCY_SLOTS: CurrencyType[] = [
  CurrencyEnum.CRIMSON_GEM,
  CurrencyEnum.EQUIPMENT_PART,
  CurrencyEnum.RARITY_INGOT,
  CurrencyEnum.GOLD,
];


