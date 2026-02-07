import { render, screen } from "@testing-library/react";

import { EQUIPMENT_ITEMS } from "@/entities/item";
import { ItemCard } from "@/entities/item/client";

const definition = EQUIPMENT_ITEMS[0];
if (!definition) {
  throw new Error("Missing equipment definitions");
}

describe("ItemCard", () => {
  it("renders item image", () => {
    render(<ItemCard definition={definition} rarity={definition.defaultRarity} />);
    expect(screen.getByAltText(definition.name[definition.defaultRarity])).toBeInTheDocument();
  });
});


