import Link from "next/link";

import { ROUTES } from "@/shared";
import { WelcomeActions } from "@/widgets/welcome-actions/client";

export default function WelcomePage() {
  return (
    <div className="page-shell flex flex-col gap-8">
      <header className="rise-in">
        <h1 className="page-title">Megaloot Prime</h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Forge relics, test monsters, and refine your loadout. This MVP
          captures the core loop: fight, loot, equip, craft.
        </p>
      </header>
      <section className="flex flex-col gap-4">
        <WelcomeActions />
        <p className="text-sm text-muted-foreground">
          Tip: Visit the{" "}
          <Link
            className="font-medium text-primary underline-offset-4 hover:underline"
            href={ROUTES.knowledgeBase}
          >
            Knowledge Base
          </Link>{" "}
          to explore real item and monster data.
        </p>
      </section>
    </div>
  );
}
