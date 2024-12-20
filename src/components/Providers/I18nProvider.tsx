"use client";

import i18n from "@/localization/i18n";
import React from "react";
import { I18nextProvider } from "react-i18next";

const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
