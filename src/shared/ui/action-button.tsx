"use client";

import type { ReactNode } from "react";
import { cn } from "shared/utils/cn";

type ActionTone = "ember" | "emerald" | "sky" | "rose";

const ACTION_STYLES: Record<ActionTone, string> = {
  ember:
    "border-amber-300/40 text-amber-100 bg-gradient-to-br from-amber-300/20 via-amber-400/10 to-transparent hover:border-amber-200/70",
  emerald:
    "border-emerald-300/40 text-emerald-100 bg-gradient-to-br from-emerald-300/20 via-emerald-400/10 to-transparent hover:border-emerald-200/70",
  sky: "border-sky-300/40 text-sky-100 bg-gradient-to-br from-sky-300/20 via-sky-400/10 to-transparent hover:border-sky-200/70",
  rose: "border-rose-300/40 text-rose-100 bg-gradient-to-br from-rose-300/20 via-rose-400/10 to-transparent hover:border-rose-200/70",
};

type ActionButtonProps = {
  tone: ActionTone;
  label?: string;
  children?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ActionButton({
  tone,
  label,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "cursor-pointer inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition",
        "shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]",
        ACTION_STYLES[tone],
        props.className,
      )}
    >
      {children ?? label}
    </button>
  );
}
