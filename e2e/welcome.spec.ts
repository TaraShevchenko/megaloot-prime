import { test, expect } from "@playwright/test";

test("welcome -> start new -> game", async ({ page }) => {
  await page.goto("/welcome");
  await page.getByRole("button", { name: "Start New Game" }).click();
  await expect(page).toHaveURL(/\/game/);
  await expect(page.getByText("Hunt Grounds")).toBeVisible();
});

test("welcome -> continue -> game", async ({ page }) => {
  await page.goto("/welcome");
  await page.getByRole("button", { name: "Start New Game" }).click();
  await expect(page).toHaveURL(/\/game/);

  await page.goto("/welcome");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/\/game/);
});
