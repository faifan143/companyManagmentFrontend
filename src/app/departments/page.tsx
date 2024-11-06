  "use client";

  import DepartmentsContent from "@/components/common/molcules/DepartmentsContent";
  import GridContainer from "@/components/common/atoms/GridContainer";
  import { useRouter } from "next/navigation";
  import React, { useState } from "react";
  import CreateDepartment from "../../components/common/molcules/CreateDepartment";
  import {
    usePermissions,
    useRolePermissions,
  } from "@/hooks/useCheckPermissions";
  import { DepartmentType } from "@/types/DepartmentType.type";
  import { useTranslation } from "react-i18next";

  const DepartmentsView: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<DepartmentType | null>(null);
    const [selectedOption, setSelectedOption] = useState("get-departments");
    const router = useRouter();
    const isAdmin = useRolePermissions("admin");
    const { t } = useTranslation();

    return (
      <GridContainer>
        <div className="col-span-full flex justify-between items-center">
          <h1 className="text-3xl font-bold text-center">{t("Departments")}</h1>
          <div className="flex items-center gap-5">
            <select
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none transition duration-200"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {isAdmin && (
                <option value="get-departments">{t("All Departments")}</option>
              )}
              {usePermissions(["department_view_specific"]) && (
                <option value="view">{t("Accessible Departments")}</option>
              )}
            </select>

            {isAdmin && (
              <button
                className="bg-[#1b1a40] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
                onClick={() => {
                  setEditData(null);
                  router.push("/departments/add-department");
                }}
              >
                {t("Add Department")}
              </button>
            )}
          </div>
        </div>

        <DepartmentsContent selectedOption={selectedOption} />

        <CreateDepartment
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          departmentData={editData}
        />
      </GridContainer>
    );
  };

  export default DepartmentsView;
