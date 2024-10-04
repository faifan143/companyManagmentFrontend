import CreateDepartment from "@/components/common/CreateDepartment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";
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

const DepartmentsContent = () => {
  const { data, isLoading } = useQuery<Department[]>({
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
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <CircularProgress size={100} />
      </div>
    );
  }
  if (!data || data.length == 0) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        No Departments
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#f0f4f9] rounded-xl shadow-md p-4 flex flex-col space-y-4 col-span-12 ">
        {data && data.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className=" text-blue-500 text-center py-3 px-4 uppercase font-semibold text-sm">
                    Name
                  </th>
                  <th className=" text-blue-500 text-center py-3 px-4 uppercase font-semibold text-sm">
                    Description
                  </th>
                  <th className=" text-blue-500 text-center py-3 px-4 uppercase font-semibold text-sm">
                    Parent Department
                  </th>
                  <th className=" text-blue-500 text-center py-3 px-4 uppercase font-semibold text-sm">
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
                    <td className="py-3 px-4 text-center">{department.name}</td>
                    <td className="py-3 px-4 text-center">
                      {department.description}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {getParentDepartmentName(department.parent_department_id)}
                    </td>
                    <td className="py-3 px-4 flex space-x-2 justify-center">
                      <div
                        onClick={() => handleEditClick(department)}
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
          <p className="text-center text-gray-600 mt-4">
            No departments found.
          </p>
        )}
      </div>
      <CreateDepartment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        departmentData={editData}
      />
    </>
  );
};

export default DepartmentsContent;
