import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Welcome: "Welcome and react-i18next",
    },
  },
  ar: {
    translation: {
      Welcome: "هلا ",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
