import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "../molcules/TaskCard";
import { TaskColumnProps } from "@/types/components/TaskColumn.type";

const TaskColumn: React.FC<TaskColumnProps> = ({
  columnId,
  title,
  taskCount,
  tasks,
}) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          className="bg-droppable-fade rounded-xl  p-4 flex flex-col space-y-4 col-span-3"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-300">{title}</h2>
            <div className="bg-main text-white px-2 rounded-xl w-10 text-center shadow-md py-0.5 text-sm font-bold">
              {taskCount}
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            {tasks.map((task, index) => (
              <TaskCard
                task={task}
                key={task.id}
                taskId={task.id}
                index={index}
                title={task.name}
                commentsCount={16}
                attachmentsCount={24}
                priority={task.priority + ""}
              />
            ))}

            <div
              onClick={() => {}}
              className="rounded-xl shadow-md p-4 h-20 w-full border-dashed border-slate-600 border-2 text-center content-center text-xl font-bold text-slate-600 cursor-pointer"
            >
              Drop Here
            </div>

            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TaskColumn;
