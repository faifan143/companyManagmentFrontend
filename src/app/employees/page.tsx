// EmployeesView.tsx
"use client";

import { TableIcon, TreeIcon } from "@/assets";
import HierarchyTree, { TreeDTO } from "@/components/common/HierarchyTree";
import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import PageSpinner from "@/components/common/atoms/PageSpinner";
import TasksTab from "@/components/common/atoms/TasksTab";
import CreateEmployee from "@/components/common/molcules/CreateEmployee";
import EmployeesContent from "@/components/common/molcules/EmployeesContent";
import {
  usePermissions,
  useRolePermissions,
} from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useNavigationWithLoading from "@/hooks/useNavigationWithLoading";
import useSnackbar from "@/hooks/useSnackbar";
import { EmployeeFormInputs } from "@/types/EmployeeType.type";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const EmployeesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("table");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<EmployeeFormInputs | null>(null);
  const { loading, navigateWithLoading } = useNavigationWithLoading();
  const isAdmin = useRolePermissions("admin");
  const isPrimary = useRolePermissions("primary_user");
  const empLink = isAdmin ? "get-all-emps" : "get-my-emps";
  const [selectedOption, setSelectedOption] = useState(empLink);
  const { t } = useTranslation();
  const canViewSpecific = usePermissions(["emp_view_specific"]);
  const showSelect = isAdmin || canViewSpecific || isPrimary;
  const { setSnackbarConfig, snackbarConfig } = useSnackbar();

  const { data: employeesTree } = useCustomQuery<TreeDTO[]>({
    queryKey: ["employeeTree"],
    url: `http://${process.env.BASE_URL}/emp/tree`,
    setSnackbarConfig,
  });

  return (
    <GridContainer>
      <div className="col-span-full flex justify-between items-center">
        {loading && <PageSpinner />}

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
            <button
              className="bg-secondary text-twhite px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
              onClick={() => {
                setEditData(null);
                navigateWithLoading("/employees/add-employee");
              }}
            >
              {t("Add Employee")}
            </button>
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
          <EmployeesContent selectedOption={selectedOption} />
        )}
        {activeTab == "tree" && employeesTree && (
          <HierarchyTree data={employeesTree} width="100%" />
        )}
      </div>

      <CreateEmployee
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employeeData={editData}
      />

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
