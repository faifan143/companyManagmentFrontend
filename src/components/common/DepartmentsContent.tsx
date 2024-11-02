import useCustomQuery from "@/hooks/useCustomQuery";
import { DepartmentType } from "@/types/DepartmentType.type";
import { useRolePermissions } from "@/utils/check_permissions";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomizedSnackbars from "./CustomizedSnackbars";

const getParentDepartmentName = (
  department: DepartmentType | null | undefined
): string => {
  if (!department) return "None";
  if (!department.parentDepartmentId) return department.name;
  return `${department.name}`;
};

const DepartmentsContent = ({ selectedOption }: { selectedOption: string }) => {
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });
  const { data, isLoading } = useCustomQuery<DepartmentType[]>({
    queryKey: ["departments", selectedOption],
    url:
      selectedOption === "view"
        ? `http://${process.env.BASE_URL}/department/view`
        : `http://${process.env.BASE_URL}/department/get-departments`,
    setSnackbarConfig,
  });

  const isAdmin = useRolePermissions("admin");

  const router = useRouter();

  const handleEditClick = (department: DepartmentType) => {
    sessionStorage.setItem("departmentData", JSON.stringify(department));
    router.push("/departments/add-department");
  };

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <CircularProgress size={100} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        No Departments
      </div>
    );
  }

  return (
    <div className="bg-[#f0f4f9] rounded-xl shadow-md p-4 flex flex-col space-y-4 col-span-12">
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                Name
              </th>
              <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                Goal
              </th>
              <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                Main Tasks
              </th>
              <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                Parent Department
              </th>
              {isAdmin && (
                <th className="text-[#1b1a40] text-center py-3 px-4 uppercase font-semibold text-sm">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((department) => (
              <tr
                key={department.id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-4 text-center">{department.name}</td>
                <td className="py-3 px-4 text-center">{department.goal}</td>
                <td className="py-3 px-4 text-center">
                  {department.mainTasks}
                </td>
                <td className="py-3 px-4 text-center">
                  {getParentDepartmentName(department)}
                </td>
                {isAdmin && (
                  <td className="py-3 px-4 flex space-x-2 justify-center">
                    <div
                      onClick={() => handleEditClick(department)}
                      className="cursor-pointer p-2 w-16 text-xs text-center font-bold rounded-full bg-green-100 hover:bg-green-500 hover:text-green-100 text-green-500"
                    >
                      Edit
                    </div>
                    <div className="cursor-pointer p-2 w-16 text-xs text-center font-bold rounded-full bg-red-100 text-red-500 hover:text-red-100 hover:bg-red-500">
                      Delete
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default DepartmentsContent;
