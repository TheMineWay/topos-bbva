import { LANGUAGES } from "./language.enum";
import { TRANSLATIONS } from "./translation.enum";

// [ LOCALES ]
// EN
import common_en from "./locales/en/common.json";
import register_en from "./locales/en/register.json";
import game_en from "./locales/en/game.json";

export const LOCALE_TRANSLATIONS = {
	[LANGUAGES.EN]: {
		[TRANSLATIONS.COMMON]: common_en,
		[TRANSLATIONS.REGISTER]: register_en,
		[TRANSLATIONS.GAME]: game_en,
	},
};
