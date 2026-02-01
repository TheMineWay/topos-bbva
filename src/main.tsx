import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/reset.css";
import "@mantine/core/styles.css";
import "./i18n/i18n";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { UserProvider } from "./providers/user/user.provider";
import { ThemeProvider } from "./providers/theme/theme.provider";
import { NotFound } from "./common/not-found/components/not-found";
import { GameConfigProvider } from "./providers/game/game-config.provider";

// Create a new router instance
const router = createRouter({
	routeTree,
	defaultNotFoundComponent: () => <NotFound />,
	basepath: import.meta.env.GITHUB_PAGES === "true" ? "/topos-bbva" : undefined,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<UserProvider>
			<ThemeProvider>
				<GameConfigProvider>
					<RouterProvider router={router} />
				</GameConfigProvider>
			</ThemeProvider>
		</UserProvider>
	</StrictMode>,
);
