import { test, expect } from "@playwright/test";
import { E2E_CONSTANTS } from "../../e2e.constants";

test.describe("No session flow", () => {
	test.describe("Redirect to home", () => {
		test("when accessing to the game without session", async ({ page }) => {
			await page.goto(E2E_CONSTANTS.BASE_URL + "/game");
			await page.waitForURL(`${E2E_CONSTANTS.BASE_URL}/`);

			expect(page.url()).toBe(`${E2E_CONSTANTS.BASE_URL}/`);
		});
	});
});
