"use client";

import type { ButtonHTMLAttributes } from "react";

import { Button } from "@/shared";

export function ContinueGameButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <Button tone="accent" {...props}>
      Continue
    </Button>
  );
}
