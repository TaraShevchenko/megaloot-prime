"use client";

import Image from "next/image";

import { cn } from "@/shared/lib/cn";

import type { CurrencyDefinition } from "../model/types";

type CurrencyIconProps = {
  currency: CurrencyDefinition;
  size?: number;
  className?: string;
};

export function CurrencyIcon({
  currency,
  size = 24,
  className,
}: CurrencyIconProps) {
  return (
    <Image
      src={currency.icon}
      alt={currency.label}
      width={size}
      height={size}
      className={cn("object-contain", className)}
    />
  );
}


