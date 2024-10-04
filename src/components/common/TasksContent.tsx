import React, { useState, useEffect } from "react";
import TaskColumn from "@/components/common/TaskColumn";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ITask from "@/types/Task.type";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import CreateTask from "@/components/common/CreateTask";
import { CircularProgress } from "@mui/material";

interface ITaskStatus {
  id: string;
  name: string;
  description: string;
}

interface TasksState {
  [key: string]: ITask[];
}

const fetchTaskStatuses = async (): Promise<ITaskStatus[]> => {
  const response = await axios.get(
    `https://${process.env.BASE_URL}/task-status/find-all`,
    {
      headers: {
        Authorization: "Bearer " + Cookies.get("access_token"),
      },
    }
  );
  return response.data.data;
};

const categorizeTasks = (tasks: ITask[], statuses: ITaskStatus[]) => {
  const categorizedTasks: TasksState = {};

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
      `https://${process.env.BASE_URL}/tasks/update/${taskId}`,
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

const fetchTasks = async (): Promise<ITask[]> => {
  const response = await axios.get(
    `https://${process.env.BASE_URL}/tasks/get-tasks`,
    {
      headers: {
        Authorization: "Bearer " + Cookies.get("access_token"),
      },
    }
  );
  return response.data.data;
};

const TasksContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: statuses, isLoading: isLoadingStatuses } = useQuery<
    ITaskStatus[]
  >({
    queryKey: ["taskStatuses"],
    queryFn: fetchTaskStatuses,
  });

  const { data: tasksData, isLoading: isLoadingTasks } = useQuery<ITask[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const [tasks, setTasks] = useState<TasksState>({});

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
        No Tasks
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {statuses &&
          statuses.map((status) => (
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
    </>
  );
};

export default TasksContent;
