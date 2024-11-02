import { Dispatch, SetStateAction } from "react";
import ITask from "../Task.type";

export interface TaskColumnProps {
  columnId: string;
  title: string;
  taskCount: number;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  tasks: ITask[];
}
