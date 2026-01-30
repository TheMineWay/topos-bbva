import { useUserContext } from "./user.context";

/**
 * This hook provides user info.
 * This can only be used in app zones where session must exist.
 */
export const useUser = () => {
	const context = useUserContext();

	const user = context.user;

	if (!user) throw new Error("No user session");

	return { user, setUser: context.setUser };
};
