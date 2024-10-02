"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateJobTitle from "./add-job-title/page";

export interface IGetDepartment {
  id: string;
  name: string;
  description: string;
  parent_department_id?: IGetDepartment | string | null;
}

export interface IGetPermission {
  _id: string;
  resource: string;
  action: string;
}

export interface IGetJobTitle {
  id: string;
  name: string;
  title: string;
  grade_level: string;
  description: string;
  responsibilities: string[];
  permissions: IGetPermission[];
  department: IGetDepartment;
}

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

const JobTitlesView: React.FC = () => {
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
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-700">Loading...</p>
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
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Job Titles</h1>
      {jobs && jobs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Name
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Title
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Grade Level
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Description
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Responsibilities
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Permissions
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Department ID
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
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
                  <td className="py-3 px-4">{jobTitle.name}</td>
                  <td className="py-3 px-4">{jobTitle.title}</td>
                  <td className="py-3 px-4">{jobTitle.grade_level}</td>
                  <td className="py-3 px-4">{jobTitle.description}</td>
                  <td className="py-3 px-4">
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
                    <EditIcon
                      className="cursor-pointer text-blue-500"
                      onClick={() => handleEditClick(jobTitle)}
                    />
                    <DeleteIcon className="cursor-pointer text-red-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No job titles found.</p>
      )}
      <div className="flex justify-center mt-6">
        <button
          className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          Add Job Title
        </button>
      </div>

      <CreateJobTitle
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitleData={editData}
      />
    </div>
  );
};

export default JobTitlesView;
