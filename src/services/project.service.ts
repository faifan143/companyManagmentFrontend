import { DepartmentType } from "@/types/DepartmentType.type";
import { EmployeeType } from "@/types/EmployeeType.type";

export const getDepartmentOptions = (
  departments: DepartmentType[] | undefined
) =>
  departments
    ? departments.map((dept) => ({
        value: dept.id,
        label: dept.name,
      }))
    : [];
export const getEmployeeOptions = (employees: EmployeeType[] | undefined) =>
  employees
    ? employees.map((emp) => ({
        value: emp.id,
        label: emp.name,
      }))
    : [];
