import { useTranslation } from "react-i18next";

interface UseLanguage {
  currentLanguage: string;
  toggleLanguage: () => void;
  getDir: () => string;
}

const useLanguage = (): UseLanguage => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };
  const getDir = () => {
    return currentLanguage === "ar" ? "rtl" : "ltr";
  };

  return { currentLanguage, toggleLanguage, getDir };
};

export default useLanguage;
