"use client";

import { BattleSandbox } from "./battle-sandbox";
import { ItemCatalog } from "./item-catalog";
import { ItemSandbox } from "./item-sandbox";
import { MonsterCatalog } from "./monster-catalog";

export function KnowledgeBase() {
  return (
    <div className="page-shell flex flex-col gap-8">
      <header className="rise-in">
        <h1 className="page-title">Knowledge Base</h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          Explore real item and monster data, then run focused experiments in
          isolated sandboxes.
        </p>
      </header>
      <div className="grid gap-8">
        <ItemCatalog />
        <MonsterCatalog />
        <div className="grid gap-6 lg:grid-cols-2">
          <ItemSandbox />
          <BattleSandbox />
        </div>
      </div>
    </div>
  );
}
