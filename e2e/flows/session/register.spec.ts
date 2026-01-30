import { test, expect } from "@playwright/test";
import { E2E_CONSTANTS } from "../../e2e.constants";
import { analyzeA11y, forEveryTheme } from "../../utils";

test.describe("Session flow", () => {
	test("Register new user", async ({ page }) => {
		const DEMO_USERNAME = "Yoshi";

		await page.goto(E2E_CONSTANTS.BASE_URL);
		expect(page.url()).toBe(E2E_CONSTANTS.BASE_URL + "/");

		const usernameField = page.getByTestId("register-username");
		const registerButton = page.getByTestId("register-submit");

		await usernameField.fill(DEMO_USERNAME);
		await registerButton.click();

		await page.waitForURL(`${E2E_CONSTANTS.BASE_URL}/game`);

		const lsData = await page.evaluate(() => {
			return localStorage.getItem("user");
		});

		expect(lsData).toBe(JSON.stringify({ username: DEMO_USERNAME }));
		expect(page.url()).toBe(`${E2E_CONSTANTS.BASE_URL}/game`);

		// Go back to home to check session persistence
		await page.goto(E2E_CONSTANTS.BASE_URL);
		await page.waitForURL(`${E2E_CONSTANTS.BASE_URL}/game`);
	});

	test("Should be accessible", async ({ page }) => {
		await page.goto(E2E_CONSTANTS.BASE_URL);
		await page.waitForLoadState("networkidle");
		expect(page.url()).toBe(E2E_CONSTANTS.BASE_URL + "/");

		await forEveryTheme(page, analyzeA11y);
	});
});
