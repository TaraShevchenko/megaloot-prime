"use client";

import Image from "next/image";
import { type DragEvent, useState } from "react";

import type { EquipmentSlotId } from "@/entities/equipment";
import { EQUIPMENT_SLOT_LABELS, SLOT_ICONS } from "@/entities/equipment";
import { EQUIPMENT_BY_ID } from "@/entities/item";
import { ItemCard } from "@/entities/item/client";
import { saveSession } from "@/features/persist-session";
import {
  INVENTORY_DRAG_TYPE,
  isInventoryDragData,
  moveInventoryItem,
  type InventoryLocation,
} from "@/features/inventory-move";
import { useSession } from "@/processes/game/client";
import { useGameStore } from "@/processes/game/client";
import { cn, getDragData, Panel, setDragData } from "@/shared";

const SLOT_ORDER: EquipmentSlotId[] = [
  "NECKLACE",
  "HELMET",
  "GLOVES",
  "RING_1",
  "ARMOR",
  "WEAPON",
  "RING_2",
  "TROUSERS",
  "BOOTS",
];

export function EquippedInventory() {
  const session = useSession();
  const setSession = useGameStore((state) => state.setSession);
  const setNotice = useGameStore((state) => state.setNotice);
  const [draggingSlot, setDraggingSlot] = useState<EquipmentSlotId | null>(
    null,
  );
  const [overSlot, setOverSlot] = useState<EquipmentSlotId | null>(null);

  if (!session) return null;

  return (
    <Panel className="p-3" title="Equipped" subtitle="Drag items to swap">
      <div className="grid grid-cols-3 gap-2">
        {SLOT_ORDER.map((slotId) => {
          const item = session.equipped[slotId];
          const label = EQUIPMENT_SLOT_LABELS[slotId];
          const definition = item ? EQUIPMENT_BY_ID[item.definitionId] : null;
          const title =
            item && definition
              ? `${definition.name[item.rarity]} - ${definition.type}`
              : label;
          const location: InventoryLocation = {
            area: "equipped",
            slotId,
          };
          const isOver = overSlot === slotId;
          const isDragging = draggingSlot === slotId;

          return (
            <div
              key={slotId}
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-muted/40 transition",
                !item && "border-dashed",
                isOver && "border-primary/60 ring-2 ring-primary/20",
              )}
              data-slot-id={slotId}
              {...(item ? { "data-instance-id": item.instanceId } : {})}
              title={title}
              onDragEnter={() => setOverSlot(slotId)}
              onDragLeave={(event) => {
                if (
                  event.currentTarget.contains(
                    event.relatedTarget as Node | null,
                  )
                ) {
                  return;
                }
                setOverSlot(null);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }}
              onDrop={(event: DragEvent<HTMLDivElement>) => {
                event.preventDefault();
                setOverSlot(null);
                const data = getDragData(event.dataTransfer);
                if (!isInventoryDragData(data)) return;
                const result = moveInventoryItem(session, data.payload, location);
                if (result.error) {
                  setNotice({ tone: "error", message: result.error });
                  return;
                }
                setSession(result.session);
                saveSession(result.session);
              }}
            >
              {item && definition ? (
                <div
                  draggable
                  onDragStart={(event) => {
                    setDraggingSlot(slotId);
                    setDragData(event.dataTransfer, {
                      type: INVENTORY_DRAG_TYPE,
                      payload: location,
                    });
                  }}
                  onDragEnd={() => setDraggingSlot(null)}
                  className={cn(
                    "flex h-full w-full items-center justify-center",
                    isDragging && "opacity-60",
                  )}
                >
                  <ItemCard
                    definition={definition}
                    rarity={item.rarity}
                    className="h-16 w-16 p-2"
                    imageClassName="h-14 w-14"
                  />
                </div>
              ) : (
                <Image
                  src={SLOT_ICONS[slotId]}
                  alt={label}
                  width={28}
                  height={28}
                  className="opacity-60"
                />
              )}
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
