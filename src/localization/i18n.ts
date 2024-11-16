import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "@/localization/locales/en.json";
import arTranslation from "@/localization/locales/ar.json";

const resources = {
  en: enTranslation,
  ar: arTranslation,
};

// Define a fallback language
const defaultLanguage = "en";

// Safely access localStorage only on the client side
const savedLanguage =
  typeof window !== "undefined" && localStorage.getItem("language")
    ? localStorage.getItem("language")
    : defaultLanguage;

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
