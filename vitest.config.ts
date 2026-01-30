import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";

export default defineConfig((configEnv) =>
	mergeConfig(viteConfig(configEnv), {
		plugins: [react()],
		test: {
			reporters: process.env.GITHUB_ACTIONS
				? ["dot", "github-actions"]
				: ["dot"],
			projects: [
				// Unit tests
				{
					test: {
						include: ["**/*.spec.ts"],
						name: "unit",
						environment: "node",
					},
				},
				// DOM tests
				// {
				// 	test: {
				// 		include: ["**/*.spec.dom.{ts,tsx}"],
				// 		name: "browser",
				// 		browser: {
				// 			enabled: true,
				// 			provider: playwright(),
				// 			instances: [{ browser: "chromium" }],
				// 		},
				// 	},
				// },
			],
		},
	}),
);
