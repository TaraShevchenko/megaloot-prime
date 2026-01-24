import Image from "next/image";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { EquipmentEntry } from "modules/equipment";
import { RARITY_BACKGROUNDS, type RarityEnum } from "shared/types/rarity";
import { cn } from "shared/utils/cn";

type EquipmentCardProps = ComponentPropsWithoutRef<"div"> & {
  equipment: EquipmentEntry;
  rarity: RarityEnum;
};

export const EquipmentCard = forwardRef<HTMLDivElement, EquipmentCardProps>(
  ({ equipment, rarity, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-20 w-20 items-center justify-center rounded-2xl p-4",
          className,
        )}
        style={{ backgroundImage: RARITY_BACKGROUNDS[rarity], ...style }}
        {...props}
      >
        <Image
          src={equipment.skins[rarity]}
          alt={equipment.name}
          className="pointer-events-none h-24 w-24 object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.45)]"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
    );
  },
);

EquipmentCard.displayName = "EquipmentCard";
