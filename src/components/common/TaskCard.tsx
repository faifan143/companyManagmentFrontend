import React, { useState } from "react";
import { FaRegCommentDots, FaPaperclip } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";
import TaskDetailsModal from "./TaskDetailsModal";
import ITask from "@/types/Task.type";

interface TaskCardProps {
  taskId: string;
  index: number;
  title: string;
  commentsCount: number;
  attachmentsCount: number;
  priority: string;
  task: ITask;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "1":
      return "bg-red-100 text-red-500";
    case "2":
      return "bg-yellow-100 text-yellow-500";
    case "3":
      return "bg-green-100 text-green-500";
    default:
      return "bg-blue-100 text-blue-600";
  }
};

const getPriorityName = (priority: string) => {
  switch (priority) {
    case "1":
      return "High";
    case "2":
      return "Medium";
    case "3":
      return "Low";
    default:
      return "Normal";
  }
};

const TaskCard: React.FC<TaskCardProps> = ({
  taskId,
  index,
  title,
  commentsCount,
  attachmentsCount,
  priority,
  task,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <div
          className="bg-white rounded-lg shadow-md p-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => setIsModalOpen(true)}
        >
          {/* Task Title */}
          <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>

          {/* Task Info Section */}
          <div className="flex justify-between items-center">
            {/* Comments and Attachments */}
            <div className="flex space-x-4 text-gray-500">
              <div className="flex items-center space-x-1">
                <FaRegCommentDots className="w-4 h-4" />
                <span className="text-sm">{commentsCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaPaperclip className="w-4 h-4" />
                <span className="text-sm">{attachmentsCount}</span>
              </div>
            </div>

            {/* Priority Badge */}
            <div
              className={`p-2 w-16 text-xs text-center font-bold rounded-full ${getPriorityColor(
                priority
              )}`}
            >
              {getPriorityName(priority)}
            </div>
          </div>
          <TaskDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            taskData={task}
          />
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
