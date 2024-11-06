// TasksContent.tsx
"use client";

import CreateTask from "@/components/common/organisms/CreateTask";
import TaskColumn from "@/components/common/organisms/TaskColumn";
import useCustomQuery from "@/hooks/useCustomQuery";
import ITask, { ITaskStatus } from "@/types/Task.type";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CustomizedSnackbars from "../atoms/CustomizedSnackbars";
import { useTranslation } from "react-i18next";

const categorizeTasks = (tasks: ITask[], statuses: ITaskStatus[]) => {
  const categorizedTasks: {
    [key: string]: ITask[];
  } = {};

  statuses.forEach((status) => {
    categorizedTasks[status.id] = [];
  });

  tasks.forEach((task) => {
    const statusKey = task.status.id;
    if (categorizedTasks[statusKey]) {
      categorizedTasks[statusKey].push(task);
    } else {
      categorizedTasks["backlog"].push(task);
    }
  });

  return categorizedTasks;
};

const updateTaskStatus = async (taskId: string, newStatus: string) => {
  try {
    await axios.post(
      `http://${process.env.BASE_URL}/tasks/update/${taskId}`,
      { status: newStatus },
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      }
    );
  } catch (error) {
    console.error("Failed to update task status", error);
  }
};

const TasksContent = ({ selectedOption }: { selectedOption: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });

  const { t } = useTranslation();

  const { data: statuses, isLoading: isLoadingStatuses } = useCustomQuery<
    ITaskStatus[]
  >({
    queryKey: ["taskStatuses"],
    url: `http://${process.env.BASE_URL}/task-status/find-all`,
    setSnackbarConfig,
    nestedData: true,
  });

  const { data: tasksData, isLoading: isLoadingTasks } = useCustomQuery<
    ITask[]
  >({
    queryKey: ["tasks", selectedOption],
    url: `http://${process.env.BASE_URL}/tasks/${selectedOption}`,
    setSnackbarConfig,
    nestedData: true,
  });

  const [tasks, setTasks] = useState<{
    [key: string]: ITask[];
  }>({});

  useEffect(() => {
    if (tasksData && statuses) {
      const categorizedTasks = categorizeTasks(tasksData, statuses);
      setTasks(categorizedTasks);
    }
  }, [tasksData, statuses]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = tasks[source.droppableId];
    const finish = tasks[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start);
      const [movedTask] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: newTaskIds,
      });
    } else {
      const startTaskIds = Array.from(start || []);
      const [movedTask] = startTaskIds.splice(source.index, 1);

      const finishTaskIds = Array.from(finish || []);
      finishTaskIds.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: startTaskIds,
        [destination.droppableId]: finishTaskIds,
      });

      const newStatus = destination.droppableId;
      try {
        await updateTaskStatus(movedTask.id, newStatus);
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  if (isLoadingTasks || isLoadingStatuses) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <CircularProgress size={100} />
      </div>
    );
  }
  if (!tasksData) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        {t("No Tasks")}
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {statuses?.map((status) => (
          <TaskColumn
            key={status.id}
            columnId={status.id}
            title={status.name}
            taskCount={tasks[status.id]?.length || 0}
            tasks={tasks[status.id] || []}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </DragDropContext>
      <CreateTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskData={null}
      />

      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default TasksContent;
