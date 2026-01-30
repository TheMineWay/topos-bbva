import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useUserContext } from "../../../providers/user/user.context";
import { useEffect } from "react";

/**
 * This hook ensures that users are redirected based on their session status
 */
export const useSessionRedirect = () => {
	const { user } = useUserContext();
	const navigate = useNavigate();
	const { location } = useRouterState();

	useEffect(() => {
		const target = user ? "/game" : "/";

		if (location.pathname !== target) {
			navigate({ to: target });
		}
	}, [user, navigate, location.pathname]);
};
