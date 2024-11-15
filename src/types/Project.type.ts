import { DepartmentType } from "./DepartmentType.type";
import { EmployeeType } from "./EmployeeType.type";
import { SectionType } from "./Section.type";

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
