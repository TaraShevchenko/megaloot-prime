import { render, screen } from "@testing-library/react";

import { createMonsterState,MONSTERS } from "@/entities/monster";
import { MonsterCard } from "@/entities/monster/client";

const definition = MONSTERS[0];
if (!definition) {
  throw new Error("Missing monster definitions");
}
const state = createMonsterState(definition);

describe("MonsterCard", () => {
  it("renders monster name", () => {
    render(<MonsterCard definition={definition} state={state} />);
    expect(screen.getByText(definition.name)).toBeInTheDocument();
  });
});


