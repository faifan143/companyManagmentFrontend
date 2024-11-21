"use client";

import GridContainer from "@/components/common/atoms/GridContainer";
import PageSpinner from "@/components/common/atoms/PageSpinner";
import JobTitleContent from "@/components/common/molcules/JobTitleContent";
import {
  usePermissions,
  useRolePermissions,
} from "@/hooks/useCheckPermissions";
import useNavigationWithLoading from "@/hooks/useNavigationWithLoading";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const JobTitlesView: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("get-job-titles");
  const { loading, navigateWithLoading } = useNavigationWithLoading();
  const isAdmin = useRolePermissions("admin");
  const { t } = useTranslation();

  const canViewSpecific = usePermissions(["job_title_view_specific"]);

  const showSelect = isAdmin || canViewSpecific;

  return (
    <GridContainer>
      <div className="col-span-full flex justify-between items-center">
        {loading && <PageSpinner />}
        <h1 className="text-3xl font-bold text-twhite text-center">
          {t("Job Titles")}
        </h1>
        <div className="flex justify-center items-center gap-5">
          {showSelect && (
            <select
              className="bg-secondary outline-none border-none text-twhite rounded-lg px-4 py-2 focus:outline-none transition duration-200"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {isAdmin && (
                <option value="get-job-titles">{t("All Job Titles")}</option>
              )}
              {canViewSpecific && (
                <option value="view">{t("Accessible Job Titles")}</option>
              )}
            </select>
          )}
          {isAdmin && (
            <>
              <button
                className="bg-secondary text-twhite px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
                onClick={() => {
                  navigateWithLoading("/jobs/add-title");
                }}
              >
                {t("Add Job Title")}
              </button>
            </>
          )}
        </div>
      </div>

      <JobTitleContent selectedOption={selectedOption} />
    </GridContainer>
  );
};

export default JobTitlesView;
