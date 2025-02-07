"use client"
// src/components/Login/LoginHeader.tsx
import { useTranslation } from "react-i18next";
import { Briefcase } from "lucide-react";
import useCustomTheme from "@/hooks/useCustomTheme";

const LoginHeader = () => {
  const { t } = useTranslation();
  const { isLightMode } = useCustomTheme();

  return (
    <div className="flex flex-col items-center mb-8">
      <div className={`p-4 rounded-full mb-6 
        ${isLightMode ? "bg-blue-100 text-blue-600" : "bg-blue-900/30 text-blue-400"}`}
      >
        <Briefcase className="w-8 h-8" />
      </div>
      <h1 className={`text-2xl font-bold mb-2 ${isLightMode ? "text-gray-800" : "text-white"}`}>
        {t("CompanyManagmentSystem")}
      </h1>
      <p className={`text-sm ${isLightMode ? "text-gray-600" : "text-gray-400"}`}>
        {t("welcome_back")}
      </p>
    </div>
  );
};

export default LoginHeader;
