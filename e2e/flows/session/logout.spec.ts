import { test, expect } from "@playwright/test";
import { E2E_CONSTANTS } from "../../e2e.constants";

test.describe("Logout flow", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(E2E_CONSTANTS.BASE_URL);
		await page.evaluate(() => {
			localStorage.setItem("user", JSON.stringify({ username: "Joel" }));
		});
	});

	test("Logout user", async ({ page }) => {
		await page.reload();

		await expect(page).toHaveURL(`${E2E_CONSTANTS.BASE_URL}/game`);

		const logoutButton = page.getByTestId("logout-button");
		await expect(logoutButton).toBeVisible();

		await logoutButton.click();
		await page.waitForURL(`${E2E_CONSTANTS.BASE_URL}/`);
	});
});
