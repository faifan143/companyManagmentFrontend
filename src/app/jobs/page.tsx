"use client";

import GridContainer from "@/components/common/atoms/GridContainer";
import JobTitleContent from "@/components/common/molcules/JobTitleContent";
import {
  usePermissions,
  useRolePermissions,
} from "@/hooks/useCheckPermissions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const JobTitlesView: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("get-job-titles");
  const router = useRouter();
  const isAdmin = useRolePermissions("admin");
  const { t } = useTranslation();
  return (
    <GridContainer>
      <div className="col-span-full flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white text-center">
          {t("Job Titles")}
        </h1>
        <div className="flex justify-center items-center gap-5">
          <select
            className="bg-secondary outline-none border-none text-white rounded-lg px-4 py-2 focus:outline-none transition duration-200"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {isAdmin && (
              <option value="get-job-titles">{t("All Job Titles")}</option>
            )}
            {usePermissions(["job_title_view_specific"]) && (
              <option value="view">{t("Accessible Job Titles")}</option>
            )}
          </select>
          {isAdmin && (
            <>
              <button
                className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
                onClick={() => {
                  router.push("/jobs/add-category");
                }}
              >
                {t("Add Job Category")}
              </button>
              <button
                className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
                onClick={() => {
                  router.push("/jobs/add-title");
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
