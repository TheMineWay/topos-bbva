import { useSessionRedirect } from "../../common/session/hooks/use-session-redirect";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Game } from "../../features/game/components/game";

export const Route = createLazyFileRoute("/game/")({
	component: RouteComponent,
});

function RouteComponent() {
	useSessionRedirect();

	return (
		<div className="full-center">
			<Game />
		</div>
	);
}
