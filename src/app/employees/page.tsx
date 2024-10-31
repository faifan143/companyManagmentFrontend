// EmployeesView.tsx
"use client";

import EmployeesContent from "@/components/common/EmployeesContent";
import GridContainer from "@/components/common/GridContainer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreateEmployee, {
  EmployeeFormInputs,
} from "../../components/common/CreateEmployee";
import { usePermissions, useRolePermissions } from "@/utils/check_permissions";

const EmployeesView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<EmployeeFormInputs | null>(null);
  const [selectedOption, setSelectedOption] = useState("get-all-emps");
  const router = useRouter();
  const isAdmin = useRolePermissions("admin");

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  return (
    <GridContainer>
      <div className="col-span-full flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center ">
          Employees Management
        </h1>
        <div className="flex justify-center items-center gap-5">
          {/* Dropdown for employee filter */}
          <select
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none transition duration-200"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {isAdmin && <option value="get-all-emps">All Employees</option>}
            {usePermissions(["emp_view_specific"]) && (
              <option value="view">View Accessible Employees</option>
            )}
            {useRolePermissions("primary_user") && (
              <option value="get-my-emps">My Department Employees</option>
            )}
          </select>

          {isAdmin && (
            <button
              className="bg-[#1b1a40] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
              onClick={() => {
                setEditData(null);
                router.push("/employees/add-employee");
              }}
            >
              Add Employee
            </button>
          )}
        </div>
      </div>

      <EmployeesContent selectedOption={selectedOption} />

      <CreateEmployee
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employeeData={editData}
      />
    </GridContainer>
  );
};

export default EmployeesView;
