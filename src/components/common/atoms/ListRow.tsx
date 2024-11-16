"use client";

import {
  formatDate,
  getPriorityBorderColor,
  isDueSoon,
} from "@/services/task.service";
import { ReceiveTaskType } from "@/types/Task.type";
import React, { useState } from "react";
import ListTaskDetails from "./ListTaskDetails";
import useLanguage from "@/hooks/useLanguage";

const ListRow: React.FC<{
  task: ReceiveTaskType;
}> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, currentLanguage } = useLanguage();
  return (
    <>
      <tr
        className={`hover:bg-slate-700 bg-dark cursor-pointer !rounded-md ${
          currentLanguage == "en" ? " border-l-2" : " border-r-2"
        } ${getPriorityBorderColor(task.priority)} `}
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        <td className="  px-6 py-4 text-white flex  items-center">
          {task.name}
        </td>
        <td
          className={`px-6 py-4     ${
            task.is_over_due ? "text-red-500" : "text-slate-400"
          } ${isDueSoon(task.due_date) ? "flash" : ""}`}
        >
          {formatDate(task.due_date, currentLanguage as "en" | "ar")}
        </td>
        <td className=" px-6 py-4 text-slate-400   ">{t(task.status)}</td>
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
