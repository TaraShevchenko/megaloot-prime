"use client";

import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/lib/cn";
import type { RarityEnum } from "@/shared/types/rarity";
import { RARITY_BACKGROUNDS } from "@/shared/types/rarity";

import type { ItemDefinition } from "../model/types";

type ItemCardProps = ComponentPropsWithoutRef<"div"> & {
  definition: ItemDefinition;
  rarity: RarityEnum;
  imageClassName?: string;
};

export function ItemCard({
  definition,
  rarity,
  imageClassName,
  className,
  style,
  ...props
}: ItemCardProps) {
  return (
    <div
      className={cn(
        "flex h-20 w-20 items-center justify-center rounded-lg border border-border bg-card p-3",
        className,
      )}
      style={{ backgroundImage: RARITY_BACKGROUNDS[rarity], ...style }}
      {...props}
    >
      <Image
        src={definition.skins[rarity]}
        alt={definition.name[rarity]}
        className={cn(
          "pointer-events-none h-24 w-24 object-contain drop-shadow-sm",
          imageClassName,
        )}
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}


