"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

type ButtonTone = "primary" | "ghost" | "danger" | "accent";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ButtonTone;
  label?: ReactNode;
};

const TONE_STYLES: Record<ButtonTone, string> = {
  primary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  accent: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  danger:
    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
};

export function Button({
  tone = "primary",
  label,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        TONE_STYLES[tone],
        className,
      )}
    >
      {children ?? label}
    </button>
  );
}
