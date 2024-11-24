import { ReceiveTaskType } from "../task.type";

export interface TaskColumnProps {
  columnId: string;
  title: string;
  taskCount: number;
  tasks: ReceiveTaskType[];
}
