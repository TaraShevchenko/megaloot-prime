import type { GameSession } from "@/entities/game-session";
import type { HeroStats } from "@/entities/hero";
import { calculateHeroStats } from "@/entities/hero";

export const recalculateHeroStats = (session: GameSession): HeroStats => {
  const modifiers = Object.values(session.equipped)
    .filter(Boolean)
    .map((item) => item?.stats ?? {});

  return calculateHeroStats(session.hero.baseStats, modifiers);
};
