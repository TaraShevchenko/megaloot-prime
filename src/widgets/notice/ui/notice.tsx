"use client";

import { useGameStore, useNotice } from "@/processes/game/client";
import { Button, cn } from "@/shared";

export function NoticeBanner() {
  const notice = useNotice();
  const setNotice = useGameStore((state) => state.setNotice);

  if (!notice) return null;

  return (
    <div
      className={cn(
        "fixed left-1/2 top-6 z-50 flex w-[min(520px,90vw)] -translate-x-1/2 items-center justify-between gap-3 rounded-lg border border-border bg-popover px-4 py-3 text-popover-foreground shadow-lg",
        notice.tone === "error" && "border-destructive/60 text-destructive",
      )}
    >
      <span className="text-sm">{notice.message}</span>
      <Button tone="ghost" onClick={() => setNotice(null)}>
        Close
      </Button>
    </div>
  );
}
