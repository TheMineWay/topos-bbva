import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@assets": resolve(__dirname, "src/assets"),
			"@common": resolve(__dirname, "src/common"),
			"@features": resolve(__dirname, "src/features"),
			"@layouts": resolve(__dirname, "src/layouts"),
		},
	},
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
	],
});
