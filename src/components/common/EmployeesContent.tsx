// EmployeesContent.tsx
"use client";

import { EmployeeType } from "@/types/EmployeeType.type";
import { useRolePermissions } from "@/utils/check_permissions";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface EmployeesContentProps {
  selectedOption: string;
}

const EmployeesContent: React.FC<EmployeesContentProps> = ({
  selectedOption,
}) => {
  const isAdmin = useRolePermissions("admin");

  const fetchEmployees = async (): Promise<EmployeeType[]> => {
    const endpoint = `http://${process.env.BASE_URL}/emp/${selectedOption}`;

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: "Bearer " + Cookies.get("access_token"),
      },
    });

    console.log("employees : ", response.data);

    return response.data;
  };

  const {
    data: employees,
    isLoading,
    refetch,
  } = useQuery<EmployeeType[]>({
    queryKey: ["employees", selectedOption],
    queryFn: fetchEmployees,
  });

  const router = useRouter();
  const handleEditClick = (editData: EmployeeType) => {
    sessionStorage.setItem("employeeData", JSON.stringify(editData));
    router.push("/employees/add-employee");
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
    <div className="bg-[#f0f4f9] rounded-xl shadow-md p-4 flex flex-col space-y-4 col-span-12 ">
      {employees && employees.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-[#1b1a40]  text-center py-3 px-4 uppercase font-semibold text-sm">
                  Name
                </th>
                <th className="text-[#1b1a40]  text-center py-3 px-4 uppercase font-semibold text-sm">
                  DOB
                </th>
                <th className="text-[#1b1a40]  text-center py-3 px-4 uppercase font-semibold text-sm">
                  Phone
                </th>
                <th className="text-[#1b1a40]  text-center py-3 px-4 uppercase font-semibold text-sm">
                  Email
                </th>
                <th className="text-[#1b1a40]  text-center py-3 px-4 uppercase font-semibold text-sm">
                  Address
                </th>
                <th className="text-[#1b1a40]  text-center py-3 px-4 uppercase font-semibold text-sm">
                  Department
                </th>
                <th className="text-[#1b1a40]  text-center py-3 px-4 uppercase font-semibold text-sm">
                  Job
                </th>
                {isAdmin && (
                  <th className="text-[#1b1a40]  text-center py-3 px-4 uppercase font-semibold text-sm">
                    Actions
                  </th>
                )}
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
                  <td className="text-center  py-3 px-4">{employee.address}</td>
                  <td className="text-center  py-3 px-4">
                    {employee.job.department}
                  </td>
                  <td className="text-center  py-3 px-4">
                    {employee.job.title}
                  </td>
                  {isAdmin && (
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
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No employees found.</p>
      )}
    </div>
  );
};

export default EmployeesContent;
