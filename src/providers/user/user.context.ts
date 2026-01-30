import { createContext, useContext } from "react";

export type UserInfo = {
	username: string;
};

type ContextInfo = {
	user: UserInfo | null;
	setUser: (user: UserInfo | null) => void;
};

export const UserContext = createContext<ContextInfo | null>(null);

export const useUserContext = () => {
	const context = useContext(UserContext);

	if (!context) throw new Error("No UserProvider");

	return context;
};
