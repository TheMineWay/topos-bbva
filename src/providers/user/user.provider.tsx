import { useMemo, useState } from "react";
import { UserContext, type UserInfo } from "./user.context";

type Props = {
	children: React.ReactNode;
};

export const UserProvider: FC<Props> = ({ children }) => {
	const [user, setUser] = useState<UserInfo | null>(null);

	const context = useMemo(() => ({ user, setUser }), [user]);

	return (
		<UserContext.Provider value={context}>{children}</UserContext.Provider>
	);
};
