import { Dispatch, SetStateAction } from "react";

export interface TeamHeaderProps {
  title: string;
  members: { name: string; color?: string }[];
  totalMembers: number;
  currentContent: "All Tasks" | "Departments" | "Employees" | "Job Titles";
  setCurrentContent: Dispatch<
    SetStateAction<"All Tasks" | "Departments" | "Employees" | "Job Titles">
  >;
}
