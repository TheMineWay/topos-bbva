import { RegistrationManager } from "@features/register/components/registration-manager";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="full-center">
			<RegistrationManager />
		</div>
	);
}
