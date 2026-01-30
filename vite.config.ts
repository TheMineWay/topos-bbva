import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
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
				"@providers": resolve(__dirname, "src/providers"),
				"@i18n": resolve(__dirname, "src/i18n"),
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
			VitePWA({
				registerType: "autoUpdate",
				devOptions: {
					enabled: true,
				},

				// Custom manifest data
				includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
				manifest: {
					name: "Topos BBVA",
					short_name: "Topos",
					description: "Juego Topos BBVA",
					theme_color: "#1212BA",
					icons: [
						{
							src: "icons/pwa-192x192.png",
							sizes: "192x192",
							type: "image/png",
						},
						{
							src: "icons/pwa-512x512.png",
							sizes: "512x512",
							type: "image/png",
						},

						// Maskable icons
						{
							src: "icons/pwa-512x512.png",
							sizes: "512x512",
							type: "image/png",
							purpose: "any",
						},
						{
							src: "icons/pwa-512x512.png",
							sizes: "512x512",
							type: "image/png",
							purpose: "maskable",
						},
					],
				},
			}),
		],
		server: {
			allowedHosts,
		},
	};
});
