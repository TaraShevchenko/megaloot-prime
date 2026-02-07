"use client";

import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { ProgressBar } from "@/shared/ui/progress-bar";

import type { MonsterDefinition, MonsterState } from "../model/types";
import { MonsterSprite } from "./monster-sprite";

type MonsterCardProps = {
  definition: MonsterDefinition;
  state: Pick<
    MonsterState,
    "id" | "level" | "maxHp" | "currentHp" | "alive"
  >;
  actions?: ReactNode;
  className?: string;
};

export function MonsterCard({
  definition,
  state,
  actions,
  className,
}: MonsterCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-sm font-semibold">{definition.name}</div>
          <div className="text-xs text-muted-foreground">
            Level {state.level}
          </div>
        </div>
        {actions ? <div>{actions}</div> : null}
      </div>
      <MonsterSprite definition={definition} state={state} />
      <ProgressBar
        value={state.currentHp}
        max={state.maxHp}
        label="HP"
      />
    </div>
  );
}


