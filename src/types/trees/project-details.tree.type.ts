import { ReceiveTaskType } from "../task.type";

export type DeptTree = {
  id: string;
  name: string;
  parentId: string | null;
  tasks: ReceiveTaskType[];
};
