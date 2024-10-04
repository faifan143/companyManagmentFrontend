"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import CreateDepartment from "./add-dept/page";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Department {
  id: string;
  name: string;
  description: string;
  parent_department_id?: Department | null;
}

const getParentDepartmentName = (
  department: Department | null | undefined
): string => {
  if (!department) return "None";
  if (!department.parent_department_id) return department.name;
  return `${department.name}`;
};

const fetchDepartments = async (): Promise<Department[]> => {
  const response = await axios.get(
    `https://${process.env.BASE_URL}/department/get-departments`,
    {
      headers: {
        Authorization: "Bearer " + Cookies.get("access_token"),
      },
    }
  );
  return response.data;
};

const DepartmentsView: React.FC = () => {
  const { data, isLoading, error } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Department | null>(null);
  const handleEditClick = (department: Department) => {
    setEditData(department);
    setIsModalOpen(true);
  };

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
        <p className="text-xl text-red-500">Failed to load departments.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Departments</h1>
      {data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Name
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Description
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Parent Department
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((department) => (
                <tr
                  key={department.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4">{department.name}</td>
                  <td className="py-3 px-4">{department.description}</td>
                  <td className="py-3 px-4">
                    {getParentDepartmentName(department.parent_department_id)}
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <EditIcon
                      className="cursor-pointer text-blue-500"
                      onClick={() => handleEditClick(department)}
                    />
                    <DeleteIcon className="cursor-pointer text-red-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No departments found.</p>
      )}
      <div className="flex justify-center mt-6">
        <button
          className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          Add Department
        </button>
      </div>

      <CreateDepartment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        departmentData={editData}
      />
    </div>
  );
};

export default DepartmentsView;
