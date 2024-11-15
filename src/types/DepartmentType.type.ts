import { UseFormGetValues } from "react-hook-form";

export interface DepartmentType {
  id: string;
  name: string;
  description: string;
  goal: string;
  category: string;
  mainTasks: string;
  parent_department?: DepartmentType;
  numericOwners: { category: string; count: number }[];
  supportingFiles: string[];
  requiredReports: { name: string; templateFile: string }[];
  developmentPrograms: {
    programName: string;
    objective: string;
    notes?: string;
    programFile: string;
  }[];
}

export interface DepartmentFormInputs {
  id: string;
  name: string;
  description: string;
  goal: string;
  category: string;
  mainTasks: string;
  parent_department_id?: string;
  numericOwners: { category: string; count: number }[];
  supportingFiles: string[];
  requiredReports: { name: string; templateFile: string }[];
  developmentPrograms: {
    programName: string;
    objective: string;
    notes?: string;
    programFile: string;
  }[];
}

export interface CreateDepartmentProps {
  isOpen: boolean;
  onClose: () => void;
  departmentData?: DepartmentFormInputs | null;
}

export interface SnackbarConfig {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}
export interface HandleManualSubmitOptions {
  getValues: UseFormGetValues<DepartmentFormInputs>;
  selectedFiles: File[];
  addDepartment: (data: DepartmentFormInputs) => void;
}
