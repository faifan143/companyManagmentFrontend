export interface DepartmentType {
  id: string;
  name: string;
  description: string;
  goal: string;
  category: string;
  mainTasks: string;
  parentDepartmentId?: string;
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
