import { DepartmentType } from "./DepartmentType.type";

export interface JobTitleType {
  id: string;
  name: string;
  title: string;
  grade_level: string;
  description: string;
  responsibilities: string[];
  permissions: string[];
  accessibleDepartments: string[];
  accessibleEmps: string[];
  accessibleJobTitles: string[];
  is_manager: boolean;
  category: JobCategoryType;
  department: DepartmentType;
}

export interface EditJobTitleType {
  id: string;
  name: string;
  title: string;
  grade_level: string;
  description: string;
  responsibilities: string[];
  permissions: string[];
  accessibleDepartments: string[];
  accessibleEmps: string[];
  accessibleJobTitles: string[];
  is_manager: boolean;
  category: string;
  department_id: string;
}

export interface JobCategoryType {
  id: string;
  name: string;
  description: string;
  required_education: string;
  required_experience: string;
  required_skills: string[];
}

export interface JobTitleFormInputs {
  id?: string;
  name: string;
  title: string;
  grade_level: string;
  description: string;
  responsibilities: string[];
  permissions: string[];
  department_id: string;
  category: string;
  is_manager: boolean;
  accessibleDepartments?: string[] | null;
  accessibleEmps?: string[] | null;
  accessibleJobTitles?: string[] | null;
}