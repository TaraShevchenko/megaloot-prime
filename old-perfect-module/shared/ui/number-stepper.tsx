"use client";

type NumberStepperProps = {
  value: number;
  onChange: (nextValue: number) => void;
  min?: number;
  step?: number;
  decrementAriaLabel?: string;
  inputAriaLabel: string;
  incrementAriaLabel?: string;
};

export function NumberStepper({
  value,
  onChange,
  min = 0,
  step = 1,
  decrementAriaLabel = "Decrease",
  inputAriaLabel,
  incrementAriaLabel = "Increase",
}: NumberStepperProps) {
  const applyValue = (next: number) => {
    if (!Number.isFinite(next)) return;
    const normalized = Math.max(min, Math.round(next));
    onChange(normalized);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => applyValue(value - step)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-500/60 text-xs font-semibold text-slate-200 transition hover:border-slate-300/80"
        aria-label={decrementAriaLabel}
      >
        -
      </button>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          const nextValue = Number(event.currentTarget.value);
          applyValue(nextValue);
        }}
        className="h-8 w-16 rounded-full border border-slate-500/60 bg-transparent text-center text-sm font-semibold text-slate-100 outline-none transition focus:border-amber-200/80"
        aria-label={inputAriaLabel}
      />
      <button
        type="button"
        onClick={() => applyValue(value + step)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-500/60 text-xs font-semibold text-slate-200 transition hover:border-slate-300/80"
        aria-label={incrementAriaLabel}
      >
        +
      </button>
    </div>
  );
}

