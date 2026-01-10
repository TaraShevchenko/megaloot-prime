"use client";

import type { CSSProperties } from "react";
import { type MonsterEntry } from "modules/monsters";
import { useMonsterAnimation } from "modules/monsters/client";
import { cn } from "shared/utils/cn";
import { ActionButton } from "./ActionButton";
import { StatsBlock } from "./StatsBlock";

type MonsterRowProps = {
  monster: MonsterEntry;
  index: number;
  level: number;
  onLevelChange: (nextLevel: number) => void;
};

const MONSTER_DISPLAY_SIZE = 220;

export function MonsterRow({
  monster,
  index,
  level,
  onLevelChange,
}: MonsterRowProps) {
  const { Monster, playAttack, playDeath, playGetHit } = useMonsterAnimation(
    monster.id,
  );
  const safeLevel = Number.isFinite(level) ? level : 1;
  const scale = (MONSTER_DISPLAY_SIZE / monster.frameSize).toFixed(3);
  const scaleStyle = { "--monster-scale": scale } as CSSProperties;

  return (
    <div
      className={cn(
        "group rounded-3xl border border-[rgba(148,163,184,0.25)] bg-[#101826] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-6",
        "animate-[fade-rise_0.6s_ease_both]",
      )}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-stretch">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400">
              Specimen
            </p>
            <h2 className="text-xl font-semibold text-slate-100">
              {monster.name}
            </h2>
            <p className="mt-1 text-sm text-slate-400">Level {safeLevel}</p>
          </div>
          <div className="flex w-full items-center justify-center self-center rounded-2xl bg-black/30 p-3">
            <div className="relative h-55 w-55">
              <div
                className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 scale-(--monster-scale)"
                style={scaleStyle}
              >
                <Monster
                  className="drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
                  title={monster.name}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ActionButton tone="attack" label="Attack" onClick={playAttack} />
            <ActionButton tone="hit" label="Get Hit" onClick={playGetHit} />
            <ActionButton tone="death" label="Death" onClick={playDeath} />
            <div className="flex items-center gap-2 sm:ml-auto">
              <button
                type="button"
                onClick={() => onLevelChange(safeLevel - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-500/60 text-xs font-semibold text-slate-200 transition hover:border-slate-300/80"
                aria-label="Decrease level"
              >
                -
              </button>
              <input
                type="text"
                min={1}
                step={1}
                value={safeLevel}
                onChange={(event) => {
                  const nextLevel = Number(event.currentTarget.value);
                  if (Number.isNaN(nextLevel)) {
                    return;
                  }
                  onLevelChange(nextLevel);
                }}
                className="h-8 w-16 rounded-full border border-slate-500/60 bg-transparent text-center text-sm font-semibold text-slate-100 outline-none transition focus:border-amber-200/80"
                aria-label="Monster level"
              />
              <button
                type="button"
                onClick={() => onLevelChange(safeLevel + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-500/60 text-xs font-semibold text-slate-200 transition hover:border-slate-300/80"
                aria-label="Increase level"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <StatsBlock
          level={safeLevel}
          characteristics={monster.characteristics}
        />
      </div>
    </div>
  );
}
