"use client";

import { type DragEvent, useMemo, useState } from "react";

import { BACKPACK_CAPACITY, removeInventoryItemAt } from "@/entities/inventory";
import { EQUIPMENT_BY_ID } from "@/entities/item";
import { ItemCard, ItemStats } from "@/entities/item/client";
import { saveSession } from "@/features/persist-session";
import {
  INVENTORY_DRAG_TYPE,
  isInventoryDragData,
  moveInventoryItem,
  type InventoryLocation,
} from "@/features/inventory-move";
import { useGameStore, useSession } from "@/processes/game/client";
import { Button, cn, getDragData, Panel, setDragData } from "@/shared";

export function BackpackInventory() {
  const session = useSession();
  const setSession = useGameStore((state) => state.setSession);
  const setNotice = useGameStore((state) => state.setNotice);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  if (!session) return null;

  const items = session.inventory.equipment;
  const totalSlots = Math.max(BACKPACK_CAPACITY, items.length);
  const slots = useMemo(
    () =>
      Array.from({ length: totalSlots }, (_, index) => items[index] ?? null),
    [items, totalSlots],
  );

  const selectedItem = selectedIndex !== null ? slots[selectedIndex] : null;
  const selectedDefinition = selectedItem
    ? EQUIPMENT_BY_ID[selectedItem.definitionId]
    : null;

  const handleDrop =
    (target: InventoryLocation) =>
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setOverIndex(null);

      const data = getDragData(event.dataTransfer);
      if (!isInventoryDragData(data)) return;

      const result = moveInventoryItem(session, data.payload, target);
      if (result.error) {
        setNotice({ tone: "error", message: result.error });
        return;
      }
      setSession(result.session);
      saveSession(result.session);
    };

  const handleRemoveItem = (index: number) => {
    const updated = removeInventoryItemAt(items, index);
    const nextSession = {
      ...session,
      inventory: {
        equipment: updated.items,
      },
    };
    setSelectedIndex(null);
    setSession(nextSession);
    saveSession(nextSession);
  };

  return (
    <Panel className="p-3" title="Backpack" subtitle="Drag items to equip or craft">
      <div className="grid grid-cols-4 gap-2">
        {slots.map((item, index) => {
          const definition = item ? EQUIPMENT_BY_ID[item.definitionId] : null;
          const title =
            item && definition
              ? `${definition.name[item.rarity]} - ${definition.type}`
              : "Empty slot";
          const location: InventoryLocation = { area: "backpack", index };
          const isOver = overIndex === index;
          const isDragging = draggingIndex === index;

          return (
            <div
              key={`slot-${index}`}
              className={cn(
                "relative flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-muted/40 transition",
                !item && "border-dashed",
                isOver && "border-primary/60 ring-2 ring-primary/20",
              )}
              data-inventory-slot={index}
              data-instance-id={item?.instanceId}
              title={title}
              onClick={() => setSelectedIndex(item ? index : null)}
              onDragEnter={() => setOverIndex(index)}
              onDragLeave={(event) => {
                if (
                  event.currentTarget.contains(
                    event.relatedTarget as Node | null,
                  )
                ) {
                  return;
                }
                setOverIndex(null);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }}
              onDrop={handleDrop(location)}
            >
              {item && definition ? (
                <div
                  draggable
                  onDragStart={(event) => {
                    setDraggingIndex(index);
                    setDragData(event.dataTransfer, {
                      type: INVENTORY_DRAG_TYPE,
                      payload: location,
                    });
                  }}
                  onDragEnd={() => setDraggingIndex(null)}
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
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Empty
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        {selectedItem && selectedDefinition ? (
          <ItemStats
            definition={selectedDefinition}
            rarity={selectedItem.rarity}
            stats={selectedItem.stats}
            footer={
              <div className="flex flex-wrap gap-2">
                <Button
                  tone="ghost"
                  className="h-8 px-3 text-xs"
                  onClick={() => handleRemoveItem(selectedIndex ?? 0)}
                >
                  Sell
                </Button>
                <Button
                  tone="danger"
                  className="h-8 px-3 text-xs"
                  onClick={() => handleRemoveItem(selectedIndex ?? 0)}
                >
                  Disenchant
                </Button>
              </div>
            }
          />
        ) : (
          <p className="text-xs text-muted-foreground">
            Select an item to inspect.
          </p>
        )}
      </div>
    </Panel>
  );
}
