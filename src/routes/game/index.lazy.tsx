import { useSessionRedirect } from "@common/session/hooks/use-session-redirect";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/game/")({
	component: RouteComponent,
});

function RouteComponent() {
	useSessionRedirect();

	return <div>Hello "/game/"!</div>;
}
