// Not really an enum, I just discovered React compiler cannot use enums D:

export const LANGUAGES = {
	EN: "en",
	ES: "es",
};

export type Language = keyof typeof LANGUAGES;
