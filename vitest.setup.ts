import { vi } from "vitest";

vi.mock("react-i18next", (actual) => ({
	...actual,
	useTranslation: (k: string) => k,
}));
