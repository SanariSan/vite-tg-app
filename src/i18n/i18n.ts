import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { en, ru } from './locales';

export const initI18n = () => {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources: {
        ru,
        en,
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};
