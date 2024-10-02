import CreateJobTitle from "@/app/job-title/add-job-title/page";
import { IGetJobTitle } from "@/app/job-title/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";

const fetchJobTitles = async (): Promise<IGetJobTitle[]> => {
  const response = await axios.get(
    `http://${process.env.BASE_URL}/job-titles/get-job-titles`,
    {
      headers: {
        Authorization: "Bearer " + Cookies.get("access_token"),
      },
    }
  );

  return response.data as IGetJobTitle[];
};

const JobTitleContent = () => {
  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery<IGetJobTitle[]>({
    queryKey: ["jobTitles"],
    queryFn: fetchJobTitles,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<IGetJobTitle | null>(null);

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <CircularProgress size={100} />
      </div>
    );
  }

  if (!jobs || jobs.length == 0) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        No Jobs
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">Failed to load job titles.</p>
      </div>
    );
  }

  const handleEditClick = (jobTitle: IGetJobTitle) => {
    setEditData(jobTitle);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-[#f0f4f9] rounded-xl shadow-md p-4 flex flex-col space-y-4 col-span-12 ">
        {jobs && jobs.length > 0 ? (
          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-center text-blue-500 py-3 px-4 uppercase font-semibold text-sm">
                    Name
                  </th>
                  <th className="text-center text-blue-500 py-3 px-4 uppercase font-semibold text-sm">
                    Title
                  </th>
                  <th className="text-center text-blue-500 py-3 px-4 uppercase font-semibold text-sm">
                    Grade Level
                  </th>
                  <th className="text-center text-blue-500 py-3 px-4 uppercase font-semibold text-sm">
                    Description
                  </th>
                  <th className="text-center text-blue-500 py-3 px-4 uppercase font-semibold text-sm">
                    Responsibilities
                  </th>
                  <th className="text-center text-blue-500 py-3 px-4 uppercase font-semibold text-sm">
                    Permissions
                  </th>
                  <th className="text-center text-blue-500 py-3 px-4 uppercase font-semibold text-sm">
                    Department ID
                  </th>
                  <th className="text-center text-blue-500 py-3 px-4 uppercase font-semibold text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((jobTitle) => (
                  <tr
                    key={jobTitle.id}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-3 px-4 text-center">{jobTitle.name}</td>
                    <td className="py-3 px-4 text-center">{jobTitle.title}</td>
                    <td className="py-3 px-4 text-center">
                      {jobTitle.grade_level}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {jobTitle.description}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {jobTitle.responsibilities.length > 0 ? (
                        <ul className="list-disc ml-4">
                          {jobTitle.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {jobTitle.permissions.length > 0 ? (
                        <ul className="list-disc ml-4">
                          {jobTitle.permissions.map((item, index) => (
                            <li key={index}>
                              {item.action + " " + item.resource}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="py-3 px-4">{jobTitle.department.name}</td>
                    <td className="py-3 px-4 flex space-x-2">
                      <div
                        onClick={() => handleEditClick(jobTitle)}
                        className={`cursor-pointer  p-2 w-16 text-xs text-center font-bold rounded-full bg-green-100 hover:bg-green-500 hover:text-green-100 text-green-500`}
                      >
                        edit
                      </div>
                      <div
                        className={`cursor-pointer  p-2 w-16 text-xs text-center font-bold rounded-full bg-red-100 text-red-500 hover:text-red-100 hover:bg-red-500`}
                      >
                        delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">No job titles found.</p>
        )}
      </div>
      <CreateJobTitle
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitleData={editData}
      />
    </>
  );
};

export default JobTitleContent;
