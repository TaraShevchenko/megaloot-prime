"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { continueGame } from "@/features/continue-game";
import { hasSession, saveSession } from "@/features/persist-session";
import { startNewGame } from "@/features/start-new-game";
import { useGameStore } from "@/processes/game/client";
import { Button,ROUTES } from "@/shared";

export function WelcomeActions() {
  const router = useRouter();
  const [available, setAvailable] = useState<boolean | null>(null);
  const setSession = useGameStore((state) => state.setSession);
  const setNotice = useGameStore((state) => state.setNotice);
  const rng = useGameStore((state) => state.rng);

  useEffect(() => {
    setAvailable(hasSession());
  }, []);

  const handleStart = () => {
    const session = startNewGame({ rng });
    saveSession(session);
    setSession(session);
    router.push(ROUTES.game);
  };

  const handleContinue = () => {
    const session = continueGame();
    if (!session) {
      setAvailable(false);
      setNotice({
        tone: "error",
        message: "Save not found or corrupted. Start a new run.",
      });
      return;
    }
    setSession(session);
    router.push(ROUTES.game);
  };

  if (available === null) {
    return (
      <div className="flex items-center gap-3">
        <Button tone="ghost" disabled>
          Checking save...
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {available ? (
        <Button tone="accent" onClick={handleContinue}>
          Continue
        </Button>
      ) : (
        <Button tone="accent" onClick={handleStart}>
          Start New Game
        </Button>
      )}
    </div>
  );
}
