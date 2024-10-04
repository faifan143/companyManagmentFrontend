import CreateEmployee, {
  EmployeeFormInputs,
} from "@/components/common/CreateEmployee";
import { IEmployee } from "@/app/emps/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";

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

const EmployeesContent = () => {
  const {
    data: employees,
    refetch,
    isLoading,
  } = useQuery<IEmployee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<EmployeeFormInputs | null>(null);

  const handleEditClick = (employee: IEmployee) => {
    const transformedData: EmployeeFormInputs = {
      id: employee.id,
      name: employee.name,
      dob: employee.dob,
      phone: employee.phone,
      email: employee.email,
      address: employee.address,
      password: "",
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
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <CircularProgress size={100} />
      </div>
    );
  }
  if (!employees || employees.length == 0) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        No Employees
      </div>
    );
  }
  return (
    <>
      <div className="bg-[#f0f4f9] rounded-xl shadow-md p-4 flex flex-col space-y-4 col-span-12 ">
        {employees && employees.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-blue-500  text-center py-3 px-4 uppercase font-semibold text-sm">
                    Name
                  </th>
                  <th className="text-blue-500  text-center py-3 px-4 uppercase font-semibold text-sm">
                    DOB
                  </th>
                  <th className="text-blue-500  text-center py-3 px-4 uppercase font-semibold text-sm">
                    Phone
                  </th>
                  <th className="text-blue-500  text-center py-3 px-4 uppercase font-semibold text-sm">
                    Email
                  </th>
                  <th className="text-blue-500  text-center py-3 px-4 uppercase font-semibold text-sm">
                    Address
                  </th>
                  <th className="text-blue-500  text-center py-3 px-4 uppercase font-semibold text-sm">
                    Department
                  </th>
                  <th className="text-blue-500  text-center py-3 px-4 uppercase font-semibold text-sm">
                    Job
                  </th>
                  <th className="text-blue-500  text-center py-3 px-4 uppercase font-semibold text-sm">
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
                    <td className="text-center  py-3 px-4">{employee.name}</td>
                    <td className="text-center  py-3 px-4">
                      {new Date(employee.dob).toLocaleDateString()}
                    </td>
                    <td className="text-center  py-3 px-4">{employee.phone}</td>
                    <td className="text-center  py-3 px-4">{employee.email}</td>
                    <td className="text-center  py-3 px-4">
                      {employee.address}
                    </td>
                    <td className="text-center  py-3 px-4">
                      {employee.job.department.name}
                    </td>
                    <td className="text-center  py-3 px-4">
                      {employee.job.title}
                    </td>
                    <td className="text-center  py-3 px-4 flex space-x-2">
                      <div
                        onClick={() => handleEditClick(employee)}
                        className={`cursor-pointer  p-2 w-16 text-xs text-center font-bold rounded-full bg-green-100 hover:bg-green-500 hover:text-green-100 text-green-500`}
                      >
                        edit
                      </div>
                      <div
                        className={`cursor-pointer  p-2 w-16 text-xs text-center font-bold rounded-full bg-red-100 text-red-500 hover:text-red-100 hover:bg-red-500`}
                        onClick={() => handleDeleteClick(employee.id)}
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
          <p className="text-center text-gray-600 mt-4">No employees found.</p>
        )}
      </div>

      <CreateEmployee
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employeeData={editData} // Pass editData correctly
      />
    </>
  );
};

export default EmployeesContent;
