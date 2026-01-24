"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { type MonsterEntry } from "modules/monsters";
import { useMonsterAnimation } from "modules/monsters/client";
import { createMonsterLifecycleStore } from "modules/monsters/shared/monster-lifecycle.store";
import {
  CharacteristicsEnum,
  getScaledCharacteristics,
} from "shared/types/characteristics";
import { cn } from "shared/utils/cn";
import { useStore } from "zustand";
import { ActionButton } from "shared/ui/action-button";
import { StatsBlock } from "./stats-block";

type MonsterRowProps = {
  monster: MonsterEntry;
  index: number;
};

const MONSTER_DISPLAY_SIZE = 220;

export function MonsterRow({ monster, index }: MonsterRowProps) {
  const { Monster, playAttack, playDeath, playGetHit } = useMonsterAnimation(
    monster.id,
  );
  const [level, setLevel] = useState(1);
  const scale = (MONSTER_DISPLAY_SIZE / monster.frameSize).toFixed(3);
  const scaleStyle = { "--monster-scale": scale } as CSSProperties;

  const getMaxHpForLevel = (nextLevel: number) => {
    const scaled = getScaledCharacteristics(monster.characteristics, nextLevel);
    const maxHpValue = scaled[CharacteristicsEnum.HP];
    return Array.isArray(maxHpValue) ? Math.max(...maxHpValue) : maxHpValue;
  };

  type LifecycleStore = ReturnType<typeof createMonsterLifecycleStore> & {
    clearDeathTimeout: () => void;
  };

  const buildLifecycleStore = (levelValue: number): LifecycleStore => {
    let deathTimeoutId: number | null = null;
    const clearDeathTimeout = () => {
      if (deathTimeoutId !== null) {
        window.clearTimeout(deathTimeoutId);
        deathTimeoutId = null;
      }
    };

    const store = createMonsterLifecycleStore({
      level: levelValue,
      monsterId: monster.id,
      maxHp: getMaxHpForLevel(levelValue),
      onDeath: (context) => {
        playDeath();
        clearDeathTimeout();
        deathTimeoutId = window.setTimeout(() => {
          // revive with full health after death timeout
          store.setState((state) => ({
            ...state,
            hp: context.maxHp,
            isDead: false,
          }));
          deathTimeoutId = null;
        }, monster.deathDurationMs);
      },
    });

    return Object.assign(store, { clearDeathTimeout });
  };

  const [lifecycle] = useState<LifecycleStore>(() =>
    buildLifecycleStore(level),
  );

  const hp = useStore(lifecycle, (state) => state.hp);
  const currentMaxHp = useStore(lifecycle, (state) => state.maxHp);
  const isDead = useStore(lifecycle, (state) => state.isDead);
  const takeDamage = useStore(lifecycle, (state) => state.takeDamage);

  const handleHit = () => {
    if (isDead) {
      return;
    }
    playGetHit();
    takeDamage(Math.max(1, Math.round(currentMaxHp / 2)));
  };

  const applyLevel = (nextLevel: number) => {
    if (!Number.isFinite(nextLevel)) {
      return;
    }
    const normalized = Math.max(1, Math.round(nextLevel));
    lifecycle.clearDeathTimeout();
    setLevel(normalized);
    const nextMaxHp = getMaxHpForLevel(normalized);
    lifecycle.setState({
      ...lifecycle.getState(),
      level: normalized,
      maxHp: nextMaxHp,
      hp: nextMaxHp,
      isDead: false,
    });
  };

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
            <div className="flex justify-beetwen">
              <p className="mt-1 text-sm text-slate-400">Level {level}</p>
              <div className="flex items-center gap-2 sm:ml-auto">
                <button
                  type="button"
                  onClick={() => applyLevel(level - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-500/60 text-xs font-semibold text-slate-200 transition hover:border-slate-300/80"
                  aria-label="Decrease level"
                >
                  -
                </button>
                <input
                  type="text"
                  min={1}
                  step={1}
                  value={level}
                  onChange={(event) => {
                    const nextLevel = Number(event.currentTarget.value);
                    applyLevel(nextLevel);
                  }}
                  className="h-8 w-16 rounded-full border border-slate-500/60 bg-transparent text-center text-sm font-semibold text-slate-100 outline-none transition focus:border-amber-200/80"
                  aria-label="Monster level"
                />
                <button
                  type="button"
                  onClick={() => applyLevel(level + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-500/60 text-xs font-semibold text-slate-200 transition hover:border-slate-300/80"
                  aria-label="Increase level"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center justify-between text-xs text-slate-200">
                  <span>
                    {Math.round(hp)} / {Math.round(currentMaxHp)}
                  </span>
                  {isDead && <span className="text-rose-200">Reviving...</span>}
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-300 transition-[width] duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, (hp / Math.max(1, currentMaxHp)) * 100),
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
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
            <ActionButton tone="sky" label="Hit monster" onClick={handleHit} />
            <ActionButton tone="ember" label="Attack" onClick={playAttack} />
            <ActionButton tone="sky" label="Get Hit" onClick={playGetHit} />
            <ActionButton tone="rose" label="Death" onClick={playDeath} />
          </div>
        </div>
        <StatsBlock level={level} characteristics={monster.characteristics} />
      </div>
    </div>
  );
}
