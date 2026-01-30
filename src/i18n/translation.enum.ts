// Not really an enum, I just discovered React compiler cannot use enums D:

export const TRANSLATIONS = {
	REGISTER: "register",
	GAME: "game",
};

export type Translation = keyof typeof TRANSLATIONS;
