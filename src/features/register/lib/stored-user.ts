import z from "zod";

const KEY = "user";

const STORED_USER_SCHEMA = z.object({
	username: z.string(),
});
type StoredUser = z.infer<typeof STORED_USER_SCHEMA>;

export const getStoredUser = (): StoredUser | null => {
	const raw = localStorage.getItem(KEY);
	if (!raw) return null;

	try {
		const rawJsonData = JSON.parse(raw);
		const parsed = STORED_USER_SCHEMA.safeParse(rawJsonData);

		if (parsed.success) return parsed.data;

		clearStoredUser();
		return null;
	} catch {
		clearStoredUser();
	}

	return null;
};

export const setStoredUser = (user: StoredUser) => {
	localStorage.setItem(KEY, JSON.stringify(user));
};

export const clearStoredUser = () => {
	localStorage.removeItem(KEY);
};
