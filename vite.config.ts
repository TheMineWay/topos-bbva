import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({mode}) => {
	// Load env
	const ENV = loadEnv(mode, process.cwd(), "");

	// Allowed hosts (for dev server)
	const allowedHosts = ENV.VITE_ALLOWED_HOSTS?.split(",");

	return {
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
		server: {
			allowedHosts,
		}
	};
});
