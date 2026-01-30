import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LOCALE_TRANSLATIONS } from './locale-translations';
import { LANGUAGES } from './language.enum';

const env = import.meta.env;

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: LANGUAGES.EN,
    debug: env.DEV,
    interpolation: {
      escapeValue: false,
    },
    resources: LOCALE_TRANSLATIONS,
  });


export default i18n;