import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { DEFAULT_HERO_STATS } from "@/entities/hero";
import { startNewGame } from "@/features/start-new-game";
import { useGameStore } from "@/processes/game/client";
import { HeroStats } from "@/widgets/hero-stats/client";

const setupSession = () => {
  const session = startNewGame({ rng: () => 0 });
  act(() => {
    useGameStore.setState({ session });
  });
};

describe("HeroStats widget", () => {
  it("renders hero base stats", () => {
    setupSession();
    render(<HeroStats />);
    expect(screen.getByText(String(DEFAULT_HERO_STATS.HP))).toBeInTheDocument();
  });
});
