import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './locales/en.json';
import translationHu from './locales/hu.json';

const resources = {
  en: {
    translation: translationEn,
  },
  hu: {
    translation: translationHu,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('selectedLanguage') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
