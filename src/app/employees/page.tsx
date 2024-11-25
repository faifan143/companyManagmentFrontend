// EmployeesView.tsx
"use client";

import { TableIcon, TreeIcon } from "@/assets";
import EmployeeHierarchyTree from "@/components/common/EmployeesHierarchyTree";
import RouteWrapper from "@/components/common/RouteWrapper";
import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import TasksTab from "@/components/common/atoms/TasksTab";
import EmployeesContent from "@/components/common/molcules/EmployeesContent";
import {
  usePermissions,
  useRolePermissions,
} from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useSnackbar from "@/hooks/useSnackbar";
import { EmployeeType } from "@/types/EmployeeType.type";
import { EmpTree } from "@/types/trees/aEmp.tree.type";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const EmployeesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("table");

  const isAdmin = useRolePermissions("admin");
  const isPrimary = useRolePermissions("primary_user");
  const empLink = isAdmin ? "get-all-emps" : "get-my-emps";
  const [selectedOption, setSelectedOption] = useState(empLink);
  const { t } = useTranslation();
  const canViewSpecific = usePermissions(["emp_view_specific"]);
  const showSelect = isAdmin || canViewSpecific || isPrimary;
  const { setSnackbarConfig, snackbarConfig } = useSnackbar();

  const { data: employees, isLoading } = useCustomQuery<{
    info: EmployeeType[];
    tree: EmpTree[];
  }>({
    queryKey: ["employees"],
    url: `http://${process.env.BASE_URL}/emp/tree`,
    setSnackbarConfig,
  });
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <CircularProgress size={100} />
      </div>
    );
  }

  if (!employees || employees.info.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        {t("No Employees")}
      </div>
    );
  }

  return (
    <GridContainer>
      <div className="col-span-full flex justify-between items-center">
        <h1 className="text-3xl font-bold text-twhite text-center ">
          {t("Employees Management")}
        </h1>

        <div className="flex justify-center items-center gap-5">
          {showSelect && (
            <select
              className="bg-secondary outline-none border-none text-twhite rounded-lg px-4 py-2 focus:outline-none transition duration-200"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {isAdmin && (
                <option value="get-all-emps">{t("All Employees")}</option>
              )}
              {canViewSpecific && (
                <option value="view">{t("View Accessible Employees")}</option>
              )}
              {isPrimary && (
                <option value="get-my-emps">
                  {t("My Department Employees")}
                </option>
              )}
            </select>
          )}

          {isAdmin && (
            <RouteWrapper href="/employees/add-employee">
              <div className="bg-secondary text-twhite px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200">
                {t("Add Employee")}
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
          <EmployeesContent employeesData={employees.info} />
        )}
        {activeTab == "tree" && employees && (
          <EmployeeHierarchyTree data={employees.tree} width="100%" />
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

export default EmployeesView;
