"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateEmployee, { EmployeeFormInputs } from "./add-emps/page";

interface IDepartment {
  id: string;
  name: string;
  description: string;
  parent_department_id: IDepartment | null;
}

interface IJob {
  id: string;
  title: string;
  grade_level: string;
  description: string;
  responsibilities: string[];
  permissions: string[];
  department: IDepartment;
}

export interface IEmployee {
  id: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  job: IJob;
}

const fetchEmployees = async (): Promise<IEmployee[]> => {
  const response = await axios.get(
    `https://${process.env.BASE_URL}/emp/get-all-emps`,
    {
      headers: {
        Authorization: "Bearer " + Cookies.get("access_token"),
      },
    }
  );
  return response.data;
};

const EmployeesView: React.FC = () => {
  const {
    data: employees,
    isLoading,
    error,
    refetch,
  } = useQuery<IEmployee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const handleEditClick = (employee: IEmployee) => {
    const transformedData: EmployeeFormInputs = {
      id: employee.id,
      name: employee.name,
      dob: employee.dob,
      phone: employee.phone,
      email: employee.email,
      password: "",
      address: employee.address,
      department_id: employee.job.department.id, // Extract ID
      job_id: employee.job.id, // Extract ID
    };

    setEditData(transformedData); // Pass transformed data
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    try {
      await axios.delete(`https://${process.env.BASE_URL}/emp/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      refetch(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  console.log(employees);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<EmployeeFormInputs | null>(null);

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
        <p className="text-xl text-red-500">Failed to load employees.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Employees</h1>
      {employees && employees.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Name
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  DOB
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Phone
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Email
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Address
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Department
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Job
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4">{employee.name}</td>
                  <td className="py-3 px-4">
                    {new Date(employee.dob).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{employee.phone}</td>
                  <td className="py-3 px-4">{employee.email}</td>
                  <td className="py-3 px-4">{employee.address}</td>
                  <td className="py-3 px-4">{employee.job.department.name}</td>
                  <td className="py-3 px-4">{employee.job.title}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <EditIcon
                      className="cursor-pointer text-blue-500"
                      onClick={() => handleEditClick(employee)}
                    />
                    <DeleteIcon
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDeleteClick(employee.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No employees found.</p>
      )}
      <div className="flex justify-center mt-6">
        <button
          className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          Add Employee
        </button>
      </div>

      <CreateEmployee
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employeeData={editData} // Pass editData correctly
      />
    </div>
  );
};

export default EmployeesView;
