import { cn } from "../../lib/cn";

type ProgressBarProps = {
  value: number;
  max: number;
  label?: string;
  className?: string;
};

export function ProgressBar({ value, max, label, className }: ProgressBarProps) {
  const safeMax = max <= 0 ? 1 : max;
  const normalized = Math.max(0, Math.min(1, value / safeMax));
  const percent = Math.round(normalized * 100);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label ? (
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>{label}</span>
          <span>
            {Math.max(0, Math.round(value))}/{Math.round(safeMax)}
          </span>
        </div>
      ) : null}
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
