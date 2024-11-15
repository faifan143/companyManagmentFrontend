import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "@/localization/locales/en.json";
import arTranslation from "@/localization/locales/ar.json";

const resources = {
  en: enTranslation,
  ar: arTranslation,
};

const savedLanguage =
  (localStorage && localStorage.getItem("language")) || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
