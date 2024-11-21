import { TreeDTO } from "@/components/common/HierarchyTree";
import { DepartmentType } from "./DepartmentType.type";
import { EmployeeType } from "./EmployeeType.type";
import { SectionType } from "./Section.type";
import { ReceiveTaskType } from "./Task.type";

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
  departments: TreeDTO[];
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
