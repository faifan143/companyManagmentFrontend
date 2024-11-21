import { PencilIcon } from "@/assets";
import {
  usePermissions,
  useRolePermissions,
} from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useCustomTheme from "@/hooks/useCustomTheme";
import useSetPageData from "@/hooks/useSetPageData";
import useSnackbar from "@/hooks/useSnackbar";
import { DepartmentType } from "@/types/DepartmentType.type";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import CustomizedSnackbars from "../atoms/CustomizedSnackbars";

const DepartmentsContent = ({ selectedOption }: { selectedOption: string }) => {
  const { t } = useTranslation();
  const { snackbarConfig, setSnackbarConfig } = useSnackbar();
  const isAdmin = useRolePermissions("admin");
  const hasEditPermission = usePermissions(["department_updatesss"]);
  const { handleEditClick } = useSetPageData<DepartmentType>(
    "/departments/add-department"
  );
  const { isLightMode } = useCustomTheme();
  const { data, isLoading } = useCustomQuery<DepartmentType[]>({
    queryKey: ["departments", selectedOption],
    url:
      selectedOption === "view"
        ? `http://${process.env.BASE_URL}/department/view`
        : `http://${process.env.BASE_URL}/department/get-departments`,
    setSnackbarConfig,
  });

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
        {t("No Departments")}
      </div>
    );
  }
  return (
    <div className="bg-secondary rounded-xl shadow-md p-4 flex flex-col space-y-4 col-span-12">
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-main text-twhite rounded-lg shadow-md">
          <thead
            className={` ${
              isLightMode ? "bg-darkest text-tblackAF" : "bg-tblack text-twhite"
            }  `}
          >
            <tr>
              <th className=" text-center py-3 px-4 uppercase font-semibold text-sm">
                {t("Name")}
              </th>
              <th className=" text-center py-3 px-4 uppercase font-semibold text-sm">
                {t("Goal")}
              </th>
              <th className=" text-center py-3 px-4 uppercase font-semibold text-sm">
                {t("Main Tasks")}
              </th>
              <th className=" text-center py-3 px-4 uppercase font-semibold text-sm">
                {t("Parent Department")}
              </th>
              {(isAdmin || hasEditPermission) && (
                <th className=" text-center py-3 px-4 uppercase font-semibold text-sm">
                  {t("Actions")}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((department) => (
              <tr
                key={department.id}
                className={` ${
                  isLightMode
                    ? "hover:bg-darker text-blackAF hover:text-tblackAF"
                    : "hover:bg-slate-700 text-twhite"
                }  group transition-colors`}
              >
                <td className="py-3 px-4 text-center">{department.name}</td>
                <td className="py-3 px-4 text-center">{department.goal}</td>
                <td className="py-3 px-4 text-center">
                  {department.mainTasks}
                </td>
                <td className="py-3 px-4 text-center">
                  {department.parent_department
                    ? department.parent_department.name
                    : "None"}
                </td>
                {(isAdmin || hasEditPermission) && (
                  <td className="py-3 px-4 flex gap-2 justify-center">
                    {(isAdmin || hasEditPermission) && (
                      <div
                        onClick={() => handleEditClick(department)}
                        className="cursor-pointer p-2 w-16 text-xs flex justify-center font-bold rounded-full bg-green-500/40 hover:bg-green-500 hover:text-green-100 border-2 border-green-500/30"
                      >
                        {/* {t("Edit")} */}
                        <Image
                          src={PencilIcon}
                          alt="edit icon"
                          height={20}
                          width={20}
                        />
                      </div>
                    )}
                    {
                      // (isAdmin || hasDeletePermission) && (
                      //   <div className="cursor-pointer p-2 w-16 text-xs flex justify-center font-bold rounded-full bg-red-500/40 border-2 border-red-500/30 hover:text-red-100 hover:bg-red-500">
                      //     {/* {t("Delete")} */}
                      //     <Image
                      //       src={TrashIcon}
                      //       alt="delete icon"
                      //       height={20}
                      //       width={20}
                      //     />
                      //   </div>
                      // )
                    }
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
