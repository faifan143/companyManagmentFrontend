"use client";
import GridContainer from "@/components/common/atoms/GridContainer";
import RouteWrapper from "@/components/common/RouteWrapper";
import useCustomQuery from "@/hooks/useCustomQuery";
import useLanguage from "@/hooks/useLanguage";
import useSetPageData from "@/hooks/useSetPageData";
import { DepartmentType } from "@/types/DepartmentType.type";
import { templateType } from "@/types/new-template.type";
import { DeptTree } from "@/types/trees/Department.tree.type";
import React from "react";
import Image from "next/image";
import { ErrorLoading } from "@/assets";
export const getDeptNameById = (id: string, departments: DeptTree[]) => {
  return departments?.find((department) => department.id == id)?.name;
};

const TemplateCard: React.FC<{
  template: templateType;
}> = ({ template }) => {
  const { t, getDir } = useLanguage();
  const { NavigateButton } = useSetPageData("/transactions/add-transaction");
  const { data: departments } = useCustomQuery<{
    info: DepartmentType[];
    tree: DeptTree[];
  }>({
    queryKey: ["departments"],
    url: `/department/tree`,
  });

  return (
    <div className="group bg-secondary rounded-xl overflow-hidden transition-all duration-300 border border-gray-700/50">
      <div className="p-7 flex flex-col h-full relative">
        {/* Header Section */}
        <div className="flex justify-between items-start gap-4 mb-5">
          <h2 className="text-xl font-semibold text-twhite  transition-colors duration-200">
            {template.name}
          </h2>
          <span className="px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-full bg-main text-tmid border border-main">
            {t(template.type)}
          </span>
        </div>

        {/* Description */}
        <p className="text-tmid mb-6 line-clamp-2 leading-relaxed">
          {template.description}
        </p>

        {/* Info Section */}
        <div className="space-y-4 mb-6">
          <div
            className="flex items-center justify-between bg-main rounded-lg px-4 py-3"
            dir={getDir()}
          >
            <span className="text-sm font-medium text-twhite">
              {t("Duration")}
            </span>
            <span className="text-sm text-tmid">
              {template.duration.value} {t(template.duration.unit)}
            </span>
          </div>

          {template.departments_approval_track.length > 0 && (
            <div className="bg-main rounded-lg px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-twhite">
                  {t("Approval Track")}
                </span>
                <span className="text-xs text-tmid">
                  {template.departments_approval_track.length} {t("steps")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {template.departments_approval_track.map((dept, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1.5 bg-secondary rounded-md text-xs font-medium text-tmid"
                  >
                    {departments &&
                      departments.tree &&
                      getDeptNameById(dept, departments!.tree)}
                  </span>
                ))}
              </div>
            </div>
          )}
          {template.departments_execution_ids.length > 0 && (
            <div className="bg-main rounded-lg px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-twhite">
                  {t("Execution Departments")}
                </span>
                <span className="text-xs text-tmid">
                  {template.departments_execution_ids.length} {t("departments")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {template.departments_execution_ids.map((dept, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1.5 bg-secondary rounded-md text-xs font-medium text-tmid"
                  >
                    {departments &&
                      departments.tree &&
                      getDeptNameById(dept, departments!.tree)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Required Fields Section */}
        {template.transactionFields.length > 0 && (
          <div className="border-t border-gray-700/30 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-twhite">
                {t("Required Fields")}
              </h3>
              <span className="text-xs text-tmid">
                {template.transactionFields.length} {t("fields")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {template.transactionFields.map((field, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1.5 bg-main rounded-md text-xs font-medium text-tmid hover:text-twhite transition-colors duration-200"
                >
                  {field.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6">
          <NavigateButton
            data={template}
            className="w-full bg-tblack hover:bg-main text-twhite font-medium px-5 py-3 rounded-lg transition-all duration-200 text-center group-hover:shadow-lg flex items-center justify-center gap-2 rtl:flex-row-reverse"
          >
            {t("Make Transaction")}
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </NavigateButton>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="border border-slate-600 rounded-lg p-6 bg-dark animate-pulse">
    <div className="h-6 bg-secondary rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-secondary rounded w-full mb-2"></div>
    <div className="h-4 bg-secondary rounded w-5/6 mb-4"></div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-secondary rounded w-1/3"></div>
      <div className="h-4 bg-secondary rounded w-1/2"></div>
    </div>
    <div className="h-10 bg-secondary rounded w-full mt-4"></div>
  </div>
);

const EmptyState = ({ t }: { t: (key: string) => string }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
    <div className="bg-secondary rounded-full p-6 mb-4">
      <svg
        className="w-12 h-12 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    </div>
    <h3 className="text-xl font-medium text-twhite mb-2">
      {t("No Templates Found")}
    </h3>
    <p className="text-tmid mb-6">
      {t("Create your first template to get started")}
    </p>
    <RouteWrapper href="/transactions/templates/add-template">
      <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md transition-colors duration-200">
        {t("Create Template")}
      </button>
    </RouteWrapper>
  </div>
);

const Templates = () => {
  const { t, getDir } = useLanguage();
  const isRTL = getDir() === "rtl";
  const {
    data: templates,
    isLoading,
    error,
  } = useCustomQuery<templateType[]>({
    url: "/templates",
    queryKey: ["templates"],
  });

  return (
    <GridContainer>
      <div className="col-span-full flex flex-col md:flex-row justify-between items-center gap-5 mb-8">
        <h1 className="text-3xl font-bold text-twhite">
          {t("Transactions Templates")}
        </h1>
        <RouteWrapper href="/transactions/templates/add-template">
          <button className="bg-secondary hover:bg-opacity-90 text-twhite px-6 py-2.5 rounded-lg transition-colors duration-200">
            {t("Add New Template")}
          </button>
        </RouteWrapper>
      </div>

      <>
        {error && (
          <div className="col-span-full h-[calc(100vh-200px)] flex flex-col items-center justify-center py-8">
            <Image
              src={ErrorLoading}
              alt="error"
              width={500}
              height={500}
              quality={100}
              className="max-w-md w-full"
            />
            <p className="text-red-500 text-lg mt-2">
              {t("Error loading templates")}
            </p>
          </div>
        )}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        )}
        {!isLoading && templates?.length === 0 && <EmptyState t={t} />}
        {!isLoading && templates && templates.length > 0 && (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {templates.map((template, index) => (
              <TemplateCard key={index} template={template} />
            ))}
          </div>
        )}
      </>
    </GridContainer>
  );
};

export default Templates;
