"use client";

import { useRolePermissions } from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useSetPageData from "@/hooks/useSetPageData";
import { handleDeleteClick } from "@/services/employee.service";
import { EmployeeType } from "@/types/EmployeeType.type";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useState } from "react";
import CustomizedSnackbars from "../atoms/CustomizedSnackbars";
import { useTranslation } from "react-i18next";

const EmployeesContent: React.FC<{
  selectedOption: string;
}> = ({ selectedOption }) => {
  const { t } = useTranslation();
  const isAdmin = useRolePermissions("admin");
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });

  const { handleEditClick } = useSetPageData<EmployeeType>(
    "/employees/add-employee"
  );

  const {
    data: employees,
    isLoading,
    refetch,
  } = useCustomQuery<EmployeeType[]>({
    queryKey: ["employees", selectedOption],
    url: `http://${process.env.BASE_URL}/emp/${selectedOption}`,
    setSnackbarConfig,
  });

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <CircularProgress size={100} />
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        {t("No Employees")}
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
                <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                  {t("Name")}
                </th>
                <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                  {t("DOB")}
                </th>
                <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                  {t("Phone")}
                </th>
                <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                  {t("Email")}
                </th>
                <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                  {t("Address")}
                </th>
                <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                  {t("Department")}
                </th>
                <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                  {t("Job")}
                </th>
                {isAdmin && (
                  <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                    {t("Actions")}
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
                  <td className="text-center py-3 px-4">{employee.name}</td>
                  <td className="text-center py-3 px-4">
                    {new Date(employee.dob).toLocaleDateString()}
                  </td>
                  <td className="text-center py-3 px-4">{employee.phone}</td>
                  <td className="text-center py-3 px-4">{employee.email}</td>
                  <td className="text-center py-3 px-4">{employee.address}</td>
                  <td className="text-center py-3 px-4">
                    {employee.job.department}
                  </td>
                  <td className="text-center py-3 px-4">
                    {employee.job.title}
                  </td>
                  {isAdmin && (
                    <td className="text-center py-3 px-4 flex space-x-2">
                      <div
                        onClick={() => handleEditClick(employee)}
                        className="cursor-pointer p-2 w-16 text-xs text-center font-bold rounded-full bg-green-100 hover:bg-green-500 hover:text-green-100 text-green-500"
                      >
                        {t("Edit")}
                      </div>
                      <div
                        className="cursor-pointer p-2 w-16 text-xs text-center font-bold rounded-full bg-red-100 text-red-500 hover:text-red-100 hover:bg-red-500"
                        onClick={() =>
                          handleDeleteClick({ id: employee.id, refetch })
                        }
                      >
                        {t("Delete")}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">
          {t("No employees found.")}
        </p>
      )}

      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default EmployeesContent;
