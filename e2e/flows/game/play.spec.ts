import { test, expect } from "@playwright/test";
import { E2E_CONSTANTS } from "../../e2e.constants";
import { analyzeA11y, forEveryTheme } from "../../utils";

const GAME_URL = `${E2E_CONSTANTS.BASE_URL}/game`;

test.describe("Play flow", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(E2E_CONSTANTS.BASE_URL);
		await page.evaluate(() => {
			localStorage.setItem("user", JSON.stringify({ username: "Álvaro" }));
		});
	});

	test("Obtain points when playing", async ({ page }) => {
		await page.goto(GAME_URL);
		await expect(page).toHaveURL(GAME_URL);

		// Start game
		const startButton = page.getByTestId("play-button");
		expect(startButton).toBeVisible();
		await startButton.click();

		for (let i = 1; i < 5; i++) {
			await page.waitForTimeout(1000); // Wait for mole to appear

			// Hit moles
			const mole = page.getByTestId("mole");
			await expect(mole).toBeVisible();
			await mole.click();

			// Check score increased
			const scoreElement = page.getByTestId("score");
			await expect(scoreElement).toHaveText(`${i * 10} points`);
		}
	});

	test("Should be accessible", async ({ page }) => {
		await page.goto(GAME_URL);
		await page.waitForLoadState("networkidle");
		await expect(page).toHaveURL(GAME_URL);

		await forEveryTheme(page, analyzeA11y);
	});
});
