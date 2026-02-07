import type { StaticImageData } from "next/image";

import type { CurrencyType } from "@/shared/types/currency";

export type { CurrencyType };
export { CURRENCY_TYPES,CurrencyEnum } from "@/shared/types/currency";

export type CurrencyDefinition = {
  id: CurrencyType;
  label: string;
  description: string;
  icon: StaticImageData;
};

export type CurrencyBalance = Record<CurrencyType, number>;


