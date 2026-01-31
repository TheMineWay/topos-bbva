import { useSessionRedirect } from "../../common/session/hooks/use-session-redirect";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Game } from "../../features/game/components/game";
import { GameLayout } from "../../layouts/game/game.layout";

export const Route = createLazyFileRoute("/game/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useSessionRedirect();

	if (!user) return null;

	return (
		<GameLayout>
			<div className="full-center">
				<Game />
			</div>
		</GameLayout>
	);
}
