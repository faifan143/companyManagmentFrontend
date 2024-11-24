import { DepartmentType } from "./departmentType.type";
import { EmployeeType } from "./employeeType.type";
import { SectionType } from "./section.type";
import { ReceiveTaskType } from "./task.type";
import { DeptTree } from "./trees/department.tree.type";

export type ProjectType = {
  _id: string;
  name: string;
  description: string;
  departments: DepartmentType[];
  sections: SectionType[];
  members: EmployeeType[];
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectDetailsType = {
  _id: string;
  name: string;
  description: string;
  departments: DeptTree[];
  members: EmployeeType[];
  startDate: string;
  endDate: string;
  is_over_due: boolean;
  projectTasks: ReceiveTaskType[];
  taskDone: number;
  taskOnGoing: number;
  taskOnTest: number;
  taskPending: number;
};
