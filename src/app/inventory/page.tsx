import { cn } from "shared/utils/cn";
import { InventoryPanel } from "./components/inventory-panel";

export default function InventoryPage() {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-[#05080f] text-slate-50",
        "bg-[radial-gradient(900px_600px_at_20%_0%,rgba(59,130,246,0.15),transparent_55%),radial-gradient(1000px_700px_at_80%_-10%,rgba(16,185,129,0.18),transparent_55%)]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(148,163,184,0.08),transparent_30%,rgba(96,165,250,0.12))]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,#1f2937,1px,transparent_0)] [background-size:32px_32px]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <header className="flex flex-col gap-3 animate-[fade-rise_0.6s_ease_both]">
          <p className="text-[10px] uppercase tracking-[0.5em] text-emerald-200/80">
            Inventory Lab
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Drag & Drop Storage
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Drag items between slots, spawn random loot, expand capacity, and
            equip matching gear on the right.
          </p>
        </header>

        <InventoryPanel />
      </div>
    </div>
  );
}
