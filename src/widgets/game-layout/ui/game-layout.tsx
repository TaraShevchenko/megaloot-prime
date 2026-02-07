"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { loadSession } from "@/features/persist-session";
import { useGameStore, useSession } from "@/processes/game/client";
import { ROUTES } from "@/shared";
import { BackpackInventory } from "@/widgets/backpack-inventory/client";
import { CraftCurrencies } from "@/widgets/craft-currencies/client";
import { EquippedInventory } from "@/widgets/equipped-inventory/client";
import { HeroStats } from "@/widgets/hero-stats/client";
import { MonstersRow } from "@/widgets/monsters-row/client";
import { NoticeBanner } from "@/widgets/notice/client";
import { StoreOverlay } from "@/widgets/store-overlay/client";

export function GameLayout() {
  const router = useRouter();
  const session = useSession();
  const setSession = useGameStore((state) => state.setSession);

  useEffect(() => {
    if (session) return;
    const loaded = loadSession();
    if (loaded) {
      setSession(loaded);
    } else {
      router.replace(ROUTES.welcome);
    }
  }, [router, session, setSession]);

  if (!session) {
    return (
      <div className="page-shell game-shell flex items-center">
        <p className="text-sm text-muted-foreground">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="page-shell game-shell relative flex flex-col h-auto overflow-auto lg:h-screen lg:overflow-hidden">
      <NoticeBanner />
      <div className="grid flex-1 min-h-0 gap-6 lg:grid-cols-[1.4fr_1fr] lg:grid-rows-[auto_auto]">
        <div className="relative lg:col-start-1 lg:row-start-1">
          <MonstersRow />
          <StoreOverlay />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:col-span-2 lg:row-start-2">
          <BackpackInventory />
          <CraftCurrencies />
        </div>
        <div className="grid content-start gap-6 lg:grid-cols-2 lg:col-start-2 lg:row-start-1">
          <EquippedInventory />
          <HeroStats />
        </div>
      </div>
    </div>
  );
}
