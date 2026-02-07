import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
};

export function Panel({
  title,
  subtitle,
  actions,
  className,
  children,
  ...props
}: PanelProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    >
      {title ? (
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">{title}</h2>
            {subtitle ? (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          {actions ? <div>{actions}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
