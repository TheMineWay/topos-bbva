/// <reference types="vitest/config" />

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { VitePWA } from "vite-plugin-pwa";

const icons = [
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
];

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// Load env
	const ENV = loadEnv(mode, process.cwd(), "");

	// Allowed hosts (for dev server)
	const allowedHosts = ENV.VITE_ALLOWED_HOSTS?.split(",");

	return {
		base: ENV.VITE_GITHUB_PAGES === "true" ? "/topos-bbva/" : "",
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
				includeAssets: [
					"favicon.ico",
					"robots.txt",
					"apple-touch-icon.png",
					...icons.map((icon) => icon.src),
				],
				manifest: {
					name: "Topos BBVA",
					short_name: "Topos",
					description: "Juego Topos BBVA",
					theme_color: "#1212BA",
					icons,
				},
			}),
		],
		server: {
			allowedHosts,
			port: 3000,
		},
	};
});
