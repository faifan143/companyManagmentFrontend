import {
  DepartmentsIcon,
  EmployeesIcon,
  HomeIcon,
  JobsIcon,
  TasksIcon,
} from "@/assets";

export const sidebarItems = [
  {
    label: "Home",
    icon: HomeIcon,
    path: "/home",
    requiredPermissions: [],
  },
  {
    label: "Tasks Management",
    icon: TasksIcon,
    path: "/tasks",
    requiredPermissions: ["task_search_and_view"],
  },
  {
    label: "Employees Management",
    icon: EmployeesIcon,
    path: "/employees",
    requiredPermissions: ["emp_search_and_view"],
  },
  {
    label: "Departments Management",
    icon: DepartmentsIcon,
    path: "/departments",
    requiredPermissions: ["department_search_and_view"],
  },
  {
    label: "Job Titles Management",
    icon: JobsIcon,
    path: "/jobs",
    requiredPermissions: ["job_title_search_and_view"],
  },
];
