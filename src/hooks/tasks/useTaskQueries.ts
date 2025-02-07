import { useMokkBar } from "@/components/Providers/Mokkbar";
import { DepartmentType } from "@/types/DepartmentType.type";
import { EmployeeType } from "@/types/EmployeeType.type";
import { ProjectType } from "@/types/Project.type";
import { DeptTree } from "@/types/trees/Department.tree.type";
import { EmpTree } from "@/types/trees/Emp.tree.type";
import useCustomQuery from "../useCustomQuery";

export const useTaskQueries = (
  selectedProject: string | undefined,
  isProjectDisabled: boolean
) => {
  const { setSnackbarConfig } = useMokkBar();

  const { data: projects } = useCustomQuery<ProjectType[]>({
    queryKey: ["projects"],
    url: "/projects/get-manager-project",
    setSnackbarConfig,
  });

  const { data: departments } = useCustomQuery<{
    info: DepartmentType[];
    tree: DeptTree[];
  }>({
    queryKey: ["departments", selectedProject ?? "two"],
    url: `/${
      !isProjectDisabled && selectedProject
        ? `projects/project-departments-tree/${selectedProject}`
        : "department/tree"
    }`,
    setSnackbarConfig,
  });

  const { data: employees } = useCustomQuery<{
    info: EmployeeType[];
    tree: EmpTree[];
  }>({
    queryKey: ["employees"],
    url: "/emp/tree",
    setSnackbarConfig,
  });

  return {
    projects,
    departments,
    employees,
  };
};
