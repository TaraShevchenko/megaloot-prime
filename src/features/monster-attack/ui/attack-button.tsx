"use client";

import type { ButtonHTMLAttributes } from "react";

import { Button } from "@/shared";

export function AttackButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button tone="primary" {...props}>
      Attack
    </Button>
  );
}
