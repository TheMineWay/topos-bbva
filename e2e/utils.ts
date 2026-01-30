import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

export const analyzeA11y = async (page: Page) => {
	const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
	expect(accessibilityScanResults.violations).toEqual([]);
};

export const forEveryTheme = async (
	page: Page,
	cb: (page: Page) => Promise<void>,
) => {
	await cb(page);

	// Test in dark mode
	const themeSwitch = page.getByTestId("theme-mode-switch");
	await themeSwitch.click();
	await page.waitForSelector('html[data-mantine-color-scheme="dark"]');

	await cb(page);
};
