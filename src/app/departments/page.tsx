"use client";

import DepartmentsContent from "@/components/common/DepartmentsContent";
import GridContainer from "@/components/common/GridContainer";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CreateDepartment from "../../components/common/CreateDepartment";
import { usePermissions, useRolePermissions } from "@/utils/check_permissions";

interface Department {
  id: string;
  name: string;
  description: string;
  parent_department_id?: Department | null;
}

const DepartmentsView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Department | null>(null);
  const [selectedOption, setSelectedOption] = useState("get-departments");
  const router = useRouter();
  const isAdmin = useRolePermissions("admin");

  return (
    <GridContainer>
      <div className="col-span-full flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">Departments</h1>
        <div className="flex items-center gap-5">
          <select
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none transition duration-200"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {isAdmin && (
              <option value="get-departments">All Departments</option>
            )}
            {usePermissions(["department_view_specific"]) && (
              <option value="view">Accessible Departments</option>
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
              Add Department
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
