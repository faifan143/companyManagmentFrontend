"use client";

import GridContainer from "@/components/common/GridContainer";
import JobTitleContent from "@/components/common/JobTitleContent";
import { usePermissions, useRolePermissions } from "@/utils/check_permissions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const JobTitlesView: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("get-job-titles");
  const router = useRouter();
  const isAdmin = useRolePermissions("admin");

  return (
    <GridContainer>
      <div className="col-span-full flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">Job Titles</h1>
        <div className="flex justify-center items-center gap-5">
          <select
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none transition duration-200"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {isAdmin && <option value="get-job-titles">All Job Titles</option>}
            {usePermissions(["job_title_view_specific"]) && (
              <option value="view">Accessible Job Titles</option>
            )}
          </select>
          {isAdmin && (
            <>
              <button
                className="bg-[#1b1a40] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
                onClick={() => {
                  router.push("/jobs/add-category");
                }}
              >
                Add Job Category
              </button>
              <button
                className="bg-[#1b1a40] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
                onClick={() => {
                  router.push("/jobs/add-title");
                }}
              >
                Add Job Title
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
