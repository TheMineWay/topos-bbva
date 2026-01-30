import { useSessionRedirect } from "../common/session/hooks/use-session-redirect";
import { RegistrationManager } from "../features/register/components/registration-manager";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	useSessionRedirect();

	return (
		<div className="full-center">
			<RegistrationManager />
		</div>
	);
}
