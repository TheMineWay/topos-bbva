import { useMemo, useState } from "react";
import { UserContext, type UserInfo } from "./user.context";
import {
	clearStoredUser,
	getStoredUser,
	setStoredUser,
} from "../../features/register/lib/stored-user";

type Props = {
	children: React.ReactNode;
};

export const UserProvider: FC<Props> = ({ children }) => {
	const [userState, setUserState] = useState<UserInfo | null>(getStoredUser());

	const context = useMemo(
		() => ({
			user: userState,
			setUser: (user: UserInfo | null) => {
				if (user) setStoredUser(user);
				else clearStoredUser();

				setUserState(user);
			},
		}),
		[userState],
	);

	return (
		<UserContext.Provider value={context}>{children}</UserContext.Provider>
	);
};
