"use client";

import { TableIcon, TreeIcon } from "@/assets";
import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import TasksTab from "@/components/common/atoms/TasksTab";
import DepartmentHierarchyTree from "@/components/common/DepartmentsHierarchyTree";
import DepartmentsContent from "@/components/common/molcules/DepartmentsContent";
import RouteWrapper from "@/components/common/RouteWrapper";
import {
  usePermissions,
  useRolePermissions,
} from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useSnackbar from "@/hooks/useSnackbar";
import { DepartmentType } from "@/types/DepartmentType.type";
import { DeptTree } from "@/types/trees/Department.tree.type";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const DepartmentsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("table");
  const { setSnackbarConfig, snackbarConfig } = useSnackbar();
  const [selectedOption, setSelectedOption] = useState("get-departments");
  const isAdmin = useRolePermissions("admin");
  const isPrimary = useRolePermissions("primary_user");
  const { t } = useTranslation();
  const canViewSpecificDepartments = usePermissions([
    "department_view_specific",
  ]);
  const { data: departments, isLoading } = useCustomQuery<{
    info: DepartmentType[];
    tree: DeptTree[];
  }>({
    queryKey: ["departments"],
    url: `/department/tree`,
    setSnackbarConfig,
  });

  const showSelect = isAdmin || (canViewSpecificDepartments && isPrimary);

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <CircularProgress size={100} />
      </div>
    );
  }

  if (
    !departments ||
    !departments.info ||
    !departments.tree ||
    departments.info.length == 0 ||
    departments.tree.length == 0
  ) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        {t("No Departments")}
      </div>
    );
  }
  return (
    <GridContainer>
      <div className="col-span-full flex justify-between items-center">
        <h1 className="text-3xl font-bold text-twhite text-center">
          {t("Departments")}
        </h1>
        <div className="flex items-center gap-5">
          {showSelect && (
            <select
              className=" border bg-secondary outline-none border-none text-twhite border-gray-300 rounded-lg px-4 py-2 focus:outline-none transition duration-200"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {isAdmin && (
                <option value="get-departments">{t("All Departments")}</option>
              )}
              {canViewSpecificDepartments && isPrimary && (
                <option value="view">{t("Accessible Departments")}</option>
              )}
            </select>
          )}

          {isAdmin && (
            <RouteWrapper href="/departments/add-department">
              <div className="bg-secondary text-twhite px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200">
                {t("Add Department")}
              </div>
            </RouteWrapper>
          )}
        </div>
      </div>
      <div className="col-span-full">
        <TasksTab
          tabs={[
            { id: "table", label: "Table", icon: TableIcon },
            { id: "tree", label: "Tree", icon: TreeIcon },
          ]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab == "table" && (
          <DepartmentsContent departmentsData={departments.info} />
        )}
        {activeTab == "tree" && (
          <>
            {departments.tree && (
              <DepartmentHierarchyTree data={departments.tree} width="100%" />
            )}
          </>
        )}
      </div>

      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </GridContainer>
  );
};

export default DepartmentsView;
