import { test, expect } from "@playwright/test";

test("attack monster until drop appears", async ({ page }) => {
  await page.goto("/welcome");
  await page.getByRole("button", { name: "Start New Game" }).click();
  await expect(page).toHaveURL(/\/game/);

  const attackButtons = page.getByRole("button", {
    name: "Attack",
    disabled: false,
  });
  await expect(attackButtons.first()).toBeEnabled();
  for (let i = 0; i < 12; i += 1) {
    await attackButtons.first().click();
  }

  await expect(page.getByText(/Drop secured/)).toBeVisible();
});
