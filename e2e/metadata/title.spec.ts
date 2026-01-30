import { test, expect } from "@playwright/test";
import { E2E_CONSTANTS } from "../e2e.constants";

test("Has correct title", async ({ page }) => {
	await page.goto(E2E_CONSTANTS.BASE_URL);

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle("Topos BBVA");
});
