import { EmployeeType } from "@/types/employeeType.type";


export const getEmployeeOptions = (employees: EmployeeType[] | undefined) =>
  employees
    ? employees.map((emp) => ({
        value: emp.id,
        label: emp.name,
      }))
    : [];
