"use client";

import {
  formatDate,
  getPriorityBorderColor,
  isDueSoon,
} from "@/services/task.service";
import { ReceiveTaskType } from "@/types/Task.type";
import React, { useState } from "react";
import ListTaskDetails from "./ListTaskDetails";

const ListRow: React.FC<{
  task: ReceiveTaskType;
}> = ({ task }) => {
  // const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <tr
        className={`hover:bg-slate-700 bg-dark cursor-pointer !rounded-md  border-l-2 ${getPriorityBorderColor(
          task.priority
        )} `}
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        <td className="  px-6 py-4 text-white flex  items-center     ">
          {task.name}
        </td>
        <td
          className={`px-6 py-4     ${
            task.is_over_due ? "text-red-500" : "text-slate-400"
          } ${isDueSoon(task.due_date) ? "flash" : ""}`}
        >
          {formatDate(task.due_date)}
        </td>
        <td className=" px-6 py-4 text-slate-400   ">{task.status}</td>
        {/* <td className="flex    ">
          <div
            className={`px-2 py-2  rounded-2xl border-none w-1/2  ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority === "HIGH"
              ? t("High")
              : task.priority === "MEDIUM"
              ? t("Medium")
              : t("Low")}
          </div>
        </td> */}
      </tr>
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <ListTaskDetails
            task={task}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default ListRow;
