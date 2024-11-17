import ListRow from "@/components/common/atoms/ListRow";
import { ReceiveTaskType } from "@/types/Task.type";
import React from "react";

const useHierarchy = () => {
  const buildNestedTaskHierarchy = (
    tasks: ReceiveTaskType[] | undefined
  ): ReceiveTaskType[] => {
    const taskMap: Record<string, ReceiveTaskType> = {}; // Map for quick lookup
    const rootTasks: ReceiveTaskType[] = []; // Array for top-level tasks

    // Step 1: Populate the task map
    tasks!.forEach((task) => {
      // Clone the task and ensure subTasks is initialized
      taskMap[task.id] = { ...task, subTasks: [] };
    });

    // Step 2: Iterate over tasks and build the hierarchy
    tasks!.forEach((task) => {
      if (task.parent_task) {
        // If the task has a parent, add it as a subtask of the parent
        const parentTask = taskMap[task.parent_task];
        if (parentTask) {
          parentTask.subTasks.push(taskMap[task.id]);
        }
      } else {
        // If no parent, it's a top-level task
        rootTasks.push(taskMap[task.id]);
      }
    });

    return rootTasks; // Return the hierarchy
  };

  const renderedTasks = new Set<string>(); // Track rendered task IDs

  const renderTaskWithSubtasks = (task: ReceiveTaskType, level: number) => {
    if (renderedTasks.has(task.id)) return null;
    renderedTasks.add(task.id);

    return (
      <React.Fragment key={task.id}>
        <ListRow task={task} level={level} />

        {task.subTasks &&
          task.subTasks.map((subTask) =>
            renderTaskWithSubtasks(subTask, level + 1)
          )}
      </React.Fragment>
    );
  };
  return { buildNestedTaskHierarchy, renderTaskWithSubtasks };
};

export default useHierarchy;
