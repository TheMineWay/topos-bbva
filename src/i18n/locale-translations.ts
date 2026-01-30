import { LANGUAGES } from "./language.enum";
import { TRANSLATIONS } from "./translation.enum";

// [ LOCALES ]
// EN
import common_en from "./locales/en/common.json";
import register_en from "./locales/en/register.json";
import game_en from "./locales/en/game.json";

// ES
import common_es from "./locales/es/common.json";
import register_es from "./locales/es/register.json";
import game_es from "./locales/es/game.json";

export const LOCALE_TRANSLATIONS = {
	[LANGUAGES.EN]: {
		[TRANSLATIONS.COMMON]: common_en,
		[TRANSLATIONS.REGISTER]: register_en,
		[TRANSLATIONS.GAME]: game_en,
	},
	[LANGUAGES.ES]: {
		[TRANSLATIONS.COMMON]: common_es,
		[TRANSLATIONS.REGISTER]: register_es,
		[TRANSLATIONS.GAME]: game_es,
	},
};
