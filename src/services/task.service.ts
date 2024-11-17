import {
  HandleDeleteStatusClick,
  HandleEditStatusClickProps,
  HandleEditTypeClickProps,
  ReceiveTaskType,
} from "@/types/Task.type";
import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { DropResult } from "react-beautiful-dnd";

export const handleEditTypeClick = ({
  taskType,
  setEditData,
  setIsModalOpen,
}: HandleEditTypeClickProps) => {
  setEditData(taskType);
  setIsModalOpen(true);
};

export const handleEditStatusClick = ({
  setEditData,
  setIsModalOpen,
  taskStatus,
}: HandleEditStatusClickProps) => {
  setEditData(taskStatus);
  setIsModalOpen(true);
};

export const handleDeleteStatusClick = async ({
  id,
  refetch,
}: HandleDeleteStatusClick) => {
  try {
    await axios.delete(
      `http://${process.env.BASE_URL}/task-status/delete/${id}`,
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      }
    );
    refetch();
  } catch (error) {
    console.error("Error deleting task status:", error);
  }
};

export const categorizeTasks = (tasks: ReceiveTaskType[]) => {
  const result = tasks.reduce(
    (acc, task) => {
      if (task.section) {
        const sectionKey = task.section._id;
        if (!acc[sectionKey]) {
          acc[sectionKey] = [];
        }
        acc[sectionKey].push(task);
      }
      return acc;
    },
    {
      // "Recently Assigned": [],
      // "This Week": [],
      // "Next Week": [],
      // Later: [],
    } as { [key: string]: ReceiveTaskType[] }
  );

  return result;
};

export const updateTaskData = async (
  taskId: string,
  data: { [key: string]: string }
) => {
  try {
    await axios.post(
      `http://${process.env.BASE_URL}/tasks/update/${taskId}`,
      data,
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

export const onDragEnd = async ({
  result,
  setTasks,
  tasks,
  setMessage,
}: {
  result: DropResult;
  tasks: {
    [key: string]: ReceiveTaskType[];
  };
  setTasks: Dispatch<
    SetStateAction<{
      [key: string]: ReceiveTaskType[];
    }>
  >;
  setMessage: (msg: string) => void;
}) => {
  const { destination, source } = result;
  console.log("destination: ", destination);
  console.log("source: ", source);

  if (!destination) return;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const start = tasks[source.droppableId];
  const finish = tasks[destination.droppableId] ?? [];
  console.log("start  task: ", start);

  // Check if start and finish are defined to avoid undefined errors
  if (!start || !finish) {
    console.error(
      "Invalid source or destination droppableId  :  start = ",
      start,
      " finish = ",
      finish
    );
    return;
  }

  if (start === finish) {
    const newTaskIds = Array.from(start);
    const [movedTask] = newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: newTaskIds,
    });
  } else {
    const startTaskIds = Array.from(start);
    const [movedTask] = startTaskIds.splice(source.index, 1);

    if (movedTask.parent_task != null) {
      setMessage("Cannot move a SubTask");
      return;
    }

    const finishTaskIds = Array.from(finish);
    finishTaskIds.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: startTaskIds,
      [destination.droppableId]: finishTaskIds,
    });

    try {
      await updateTaskData(movedTask.id, {
        section_id: destination.droppableId,
      });
    } catch (error) {
      console.error("Error updating task section:", error);
      setMessage(error + "");
    }
  }
};

export const formatDate = (dateString: string, locale: "ar" | "en") => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale == "en" ? "en-US" : "ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const isDueSoon = (dueDate: string) => {
  const due = new Date(dueDate);
  const now = new Date();
  const timeDiff = due.getTime() - now.getTime();
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
  return daysDiff <= 3 && daysDiff >= 0;
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-500";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-500";
    case "LOW":
      return "bg-green-100 text-green-500";
    // default:
    //   return "bg-blue-100 text-blue-600";
  }
};
export const getPriorityBorderColor = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return "border-red-500";
    case "MEDIUM":
      return "border-yellow-500";
    case "LOW":
      return "border-green-500";
    // default:
    //   return "border-slate-600";
  }
};
