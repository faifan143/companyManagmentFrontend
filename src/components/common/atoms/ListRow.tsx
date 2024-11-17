/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import {
  formatDate,
  getPriorityBorderColor,
  isDueSoon,
} from "@/services/task.service";
import { ReceiveTaskType } from "@/types/Task.type";
import React, { useEffect, useState } from "react";
import ListTaskDetails, { formatTime } from "./ListTaskDetails";
import useLanguage from "@/hooks/useLanguage";
import Image from "next/image";
import { CheckIcon, PauseIcon, PlayIcon } from "@/assets";
import useSnackbar from "@/hooks/useSnackbar";
import useTimeTicker from "@/hooks/useTimeTicker";
import CustomizedSnackbars from "./CustomizedSnackbars";

const ListRow: React.FC<{
  task: ReceiveTaskType;
}> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, currentLanguage } = useLanguage();
  const { setSnackbarConfig, snackbarConfig } = useSnackbar();
  const { pauseTaskTicker, startTaskTicker } = useTimeTicker({
    taskId: task.id,
  });
  const [isTaskRunning, setIsTaskRunning] = useState<boolean>(
    task!.timeLogs.length > 0 && !task!.timeLogs[task!.timeLogs.length - 1].end
  );
  const [displayedTime, setDisplayedTime] = useState(task?.totalTimeSpent || 0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTaskRunning && task.status !== "DONE") {
      timer = setInterval(() => {
        setDisplayedTime((prevTime) => {
          const newTime = prevTime + 1;
          localStorage.setItem(
            `task-timer-${task!.id}`,
            JSON.stringify({ startTime: Date.now(), elapsedTime: newTime })
          );
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTaskRunning, task]);

  useEffect(() => {
    const storedData = localStorage.getItem(`task-timer-${task!.id}`);
    if (storedData) {
      const { startTime, elapsedTime } = JSON.parse(storedData);
      if (startTime) {
        const currentTime = Date.now();
        const additionalTime = Math.floor((currentTime - startTime) / 1000);
        setDisplayedTime(elapsedTime + additionalTime);
        setIsTaskRunning(true);
      } else {
        setDisplayedTime(elapsedTime);
      }
    }
  }, [task]);

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

        <td className="w-30 flex items-center justify-center">
          <span className="bg-dark text-white px-2 py-1 rounded text-xs cursor-pointer">
            {task?.status == "DONE"
              ? formatTime(task?.totalTimeSpent || 0)
              : formatTime(displayedTime)}
          </span>
          {task?.status == "DONE" ? (
            <span className="bg-secondary text-white px-2 py-1 rounded text-xs cursor-not-allowed flex items-center gap-1">
              <Image src={CheckIcon} alt="start icon" width={15} height={15} />{" "}
              {t("Completed")}
            </span>
          ) : (
            <span className="bg-secondary text-white px-2 py-1 rounded text-xs cursor-pointer flex items-center gap-1">
              {!isTaskRunning ? (
                <div
                  className="flex items-center gap-1"
                  onClick={() => {
                    if (task?.status == "ONGOING") {
                      startTaskTicker();
                      const startTime = Date.now();
                      localStorage.setItem(
                        `task-timer-${task!.id}`,
                        JSON.stringify({
                          startTime,
                          elapsedTime: displayedTime,
                        })
                      );
                      setIsTaskRunning(true);
                    } else {
                      setSnackbarConfig({
                        message: t("Task Status must be ONGOING"),
                        open: true,
                        severity: "warning",
                      });
                    }
                  }}
                >
                  <Image
                    src={PlayIcon}
                    alt="start icon"
                    width={15}
                    height={15}
                  />{" "}
                  {t("Start")}
                </div>
              ) : (
                <div
                  className="flex items-center gap-1"
                  onClick={() => {
                    const storedData = JSON.parse(
                      localStorage.getItem(`task-timer-${task!.id}`) || "{}"
                    );
                    const startTime = storedData.startTime;
                    const elapsedTime = storedData.elapsedTime || displayedTime;

                    if (startTime) {
                      const additionalTime = Math.floor(
                        (Date.now() - startTime) / 1000
                      );
                      const newElapsedTime = elapsedTime + additionalTime;
                      setDisplayedTime(newElapsedTime);
                      localStorage.setItem(
                        `task-timer-${task!.id}`,
                        JSON.stringify({
                          startTime: null,
                          elapsedTime: newElapsedTime,
                        })
                      );
                    }
                    setIsTaskRunning(false);
                    pauseTaskTicker();
                  }}
                >
                  <Image
                    src={PauseIcon}
                    alt="pause icon"
                    width={15}
                    height={15}
                  />{" "}
                  {t("Pause")}
                </div>
              )}
            </span>
          )}
        </td>
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
      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default ListRow;
