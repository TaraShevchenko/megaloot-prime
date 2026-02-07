"use client";

import type { ButtonHTMLAttributes } from "react";

import { Button } from "@/shared";

export function StartNewGameButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <Button tone="accent" {...props}>
      Start New Game
    </Button>
  );
}
