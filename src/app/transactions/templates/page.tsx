"use client";
import GridContainer from "@/components/common/atoms/GridContainer";
import RouteWrapper from "@/components/common/RouteWrapper";
import useLanguage from "@/hooks/useLanguage";
import useSetPageData from "@/hooks/useSetPageData";
import React from "react";
import { templates } from "./data";

const Templates = () => {
  const { t, getDir } = useLanguage();
  const isRTL = getDir() === "rtl";
  const { NavigateButton } = useSetPageData("/transactions/add-transaction");

  return (
    <GridContainer>
      {/* Header Section */}
      <div
        className={`col-span-full flex flex-col md:flex-row justify-between items-center gap-5 mb-5`}
      >
        <h1 className="text-3xl font-bold text-twhite text-center pb-4">
          {t("Transactions Templates")}
        </h1>
        <div className="flex justify-center flex-wrap items-center gap-5">
          <RouteWrapper href="/transactions/templates/add-template">
            <div className="bg-secondary text-twhite px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200">
              {t("Add New Template")}
            </div>
          </RouteWrapper>
        </div>
      </div>

      {/* Templates Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {templates.map((template, index) => (
          <div
            key={index}
            className="border border-gray-600 rounded-lg p-5 bg-secondary shadow-md"
          >
            <h2 className="text-xl font-semibold text-twhite mb-2">
              {template.name}
            </h2>
            <p className="text-tmid mb-2">{template.description}</p>
            <p className="text-sm text-tmid">
              <strong>{t("Type")}:</strong> {template.type}
            </p>
            <p className="text-sm text-tmid">
              <strong>{t("Duration")}:</strong> {template.duration.start} -{" "}
              {template.duration.end}
            </p>
            <div className="mt-3">
              <strong className="text-twhite">{t("Fields")}</strong>
              <ul className="list-disc list-inside text-gray-400 mt-2">
                {template.transactionFields.map((field, i) => (
                  <li key={i}>
                    {field.name} ({field.type})
                  </li>
                ))}
              </ul>
            </div>
            <NavigateButton
              data={template}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              {t("Make Transaction")}
            </NavigateButton>
          </div>
        ))}
      </div>
    </GridContainer>
  );
};

export default Templates;
