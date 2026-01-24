import Image from "next/image";
import { RARITY_BACKGROUNDS } from "shared/types/rarity";
import type { InventoryItem } from "../inventory.types";

type InventoryItemCardProps = {
  item: InventoryItem;
  onDragStart: () => void;
  onDragEnd: () => void;
};

export function InventoryItemCard({
  item,
  onDragStart,
  onDragEnd,
}: InventoryItemCardProps) {
  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", item.instanceId);
        event.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragEnd={(event) => {
        event.preventDefault();
        onDragEnd();
      }}
      className="group relative flex h-full cursor-grab items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/5 p-2 transition hover:border-cyan-200/50 active:cursor-grabbing"
      style={{ backgroundImage: RARITY_BACKGROUNDS[item.rarity] }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40" />
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-black/35 shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
          <Image
            src={item.skin}
            alt={item.name}
            className="h-12 w-12 object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.45)]"
            style={{ imageRendering: "pixelated" }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20" />
        </div>
      </div>
    </div>
  );
}
