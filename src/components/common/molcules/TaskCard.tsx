import {
  formatDate,
  getPriorityBorderColor,
  isDueSoon,
} from "@/services/task.service";
import { TaskCardProps } from "@/types/components/TaskCard.type";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import ListTaskDetails from "../atoms/ListTaskDetails";

const TaskCard: React.FC<TaskCardProps> = ({ taskId, index, title, task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("isModalOpen : ", task.priority);
  }, [task]);

  return (
    <>
      <Draggable draggableId={taskId} index={index}>
        {(provided) => (
          <div
            className={`bg-dark border-l-2 ${getPriorityBorderColor(
              task.priority
            )} rounded-lg shadow-md p-4`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setIsModalOpen(true)}
          >
            <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
            <div className="flex justify-between items-center">
              <div
                className={`flex space-x-4 ${
                  task.is_over_due ? "text-red-500" : "text-slate-400"
                } ${isDueSoon(task.due_date) ? "flash" : ""}`}
              >
                {formatDate(task.due_date)}
              </div>
            </div>
          </div>
        )}
      </Draggable>
      <ListTaskDetails
        task={task}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TaskCard;