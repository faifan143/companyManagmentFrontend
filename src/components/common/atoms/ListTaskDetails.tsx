/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import {
  CalendarIcon,
  CalendarRedIcon,
  CheckIcon,
  PaperClipIcon,
  PaperPlaneIcon,
  PauseIcon,
  PlayIcon,
} from "@/assets";
import useTimeTicker from "@/hooks/useTimeTicker";
import {
  formatDate,
  getPriorityColor,
  isDueSoon,
  updateTaskData,
} from "@/services/task.service";
import { ReceiveTaskType } from "@/types/Task.type";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AddSubTaskModal from "./AddSubTaskModal";
import useCustomQuery from "@/hooks/useCustomQuery";
import useSnackbar from "@/hooks/useSnackbar";
import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import useLanguage from "@/hooks/useLanguage";
import useComments from "@/hooks/useComments";

export const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const ListTaskDetails: React.FC<{
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLDivElement>) => void;
  task?: ReceiveTaskType;
}> = ({ onClose, task, isOpen }) => {
  const priorityOptions: ("LOW" | "MEDIUM" | "HIGH" | undefined)[] = [
    "LOW",
    "MEDIUM",
    "HIGH",
  ];
  const statusOptions: (string | undefined)[] = [
    "PENDING",
    "ONGOING",
    "ON_TEST",
    "DONE",
  ];

  const calRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [calendar, setCalendar] = useState<string | undefined>(task?.due_date);
  const [isPriorityMenuOpen, setPriorityMenuOpen] = useState(false);
  const [isStatusMenuOpen, setStatusMenuOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<
    "LOW" | "MEDIUM" | "HIGH" | undefined
  >(task?.priority);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    task?.status
  );
  const [isTaskRunning, setIsTaskRunning] = useState<boolean>(
    task!.timeLogs.length > 0 && !task!.timeLogs[task!.timeLogs.length - 1].end
  );
  const [displayedTime, setDisplayedTime] = useState(task?.totalTimeSpent || 0);

  const { startTaskTicker, pauseTaskTicker } = useTimeTicker({
    taskId: task!.id,
  });

  const { t, currentLanguage, getDir } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTaskRunning && selectedStatus !== "DONE") {
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
  }, [isTaskRunning, selectedStatus, task]);

  const handleBackdropClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose(e);
    try {
      await updateTaskData(task!.id, {
        status: selectedStatus!,
        priority: selectedPriority!,
        description: descriptionRef.current!.value,
        due_date: calendar!,
      }).then(() => {
        queryClient
          .invalidateQueries({
            queryKey: ["tasks"],
          })
          .then(() => {
            console.log("done invalidating queries");
          });
        console.log("done updating  ");
      });
    } catch (error) {
      console.log("Error updating task card data :  ", error);
    }
  };

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

  const { setSnackbarConfig, snackbarConfig } = useSnackbar();

  const { data: allTasks } = useCustomQuery<ReceiveTaskType[]>({
    queryKey: ["tasks"],
    url: `http://${process.env.BASE_URL}/tasks/get-all-tasks`,
    setSnackbarConfig,
    nestedData: true,
  });

  const {
    comments,
    comment,
    attachedFile,
    setComment,
    handleFileChange,
    handleSendComment,
    fileInputRef,
  } = useComments(task?.id, true);

  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 backdrop-blur-sm cursor-auto "
        onClick={handleBackdropClick}
      />

      <div className="bg-dark rounded-xl shadow-md w-[400px] text-white space-y-4 fixed top-[50px] right-[10px] bottom-[10px] z-50 p-6 cursor-default overflow-auto ">
        <div
          onClick={handleBackdropClick}
          className="text-white absolute top-4 right-4 text-xl cursor-pointer"
        >
          &times;
        </div>
        {/* Task Title */}
        <h1 className="text-lg font-semibold">{task?.name}</h1>
        {/* Assignee and Due Date */}
        <div className="flex gap-4 items-center">
          <div className="text-white text-sm">{t("Assignee")}</div>
          <div className="flex items-center space-x-2" dir="ltr">
            <span className="bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center text-white font-semibold">
              {task?.assignee.name.charAt(0).toUpperCase()}
            </span>
            <p>{task?.assignee.name}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-white text-sm">{t("Due Date")}</div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => calRef.current?.showPicker()}
            dir="ltr"
          >
            <div
              className={`border ${
                task?.is_over_due ? "border-red-500" : "border-green-500"
              } rounded-full p-2`}
            >
              <Image
                src={task?.is_over_due ? CalendarRedIcon : CalendarIcon}
                alt="calendar icon"
                height={15}
                width={15}
              />
            </div>
            <input
              type="date"
              ref={calRef}
              onChange={(e) => setCalendar(e.target.value)}
              className="pointer-events-none absolute opacity-0 bg-main"
            />
            <p
              className={`flex space-x-4 ${
                task?.is_over_due ? "text-red-500" : "text-green-600"
              } ${isDueSoon(calendar!) ? "flash" : ""}`}
            >
              {formatDate(calendar!, currentLanguage as "ar" | "en")}
            </p>
          </div>
        </div>
        {/* Parent task */}
        <div className="relative flex items-center justify-between  gap-5 w-fit bg-slate-600 rounded px-3 py-2">
          <span>{t("Parent Task")}</span>
          <span
            className={` text-dark px-2 py-1 rounded text-xs cursor-pointer bg-yellow-500`}
          >
            {task?.parent_task
              ? allTasks &&
                allTasks.find(
                  (singleTask) => singleTask.id == task?.parent_task
                )?.name
              : t("No Parent Task")}
          </span>
        </div>
        {/* Assigned Emp  */}
        {task && task.emp && (
          <div className="relative flex items-center justify-between  gap-5 w-fit bg-slate-600 rounded px-3 py-2">
            <span>{t("Assigned Emp")}</span>
            <div className="border-2 border-red-500 bg-droppable-fade text-white py-2 px-3 w-fit mx-auto rounded-md  text-sm font-bold">
              {task.emp.name}
            </div>
          </div>
        )}
        {/* Priority Dropdown */}
        <div
          ref={priorityRef}
          className="relative flex items-center justify-between w-1/2 bg-slate-600 rounded px-3 py-2"
        >
          <span>{t("Priority")}</span>
          <span
            className={`${getPriorityColor(
              selectedPriority!
            )} text-black px-2 py-1 rounded text-xs cursor-pointer`}
            onClick={() => setPriorityMenuOpen(!isPriorityMenuOpen)}
          >
            {t(selectedPriority)}
          </span>
          {isPriorityMenuOpen && (
            <div
              className={`absolute top-10 ${
                currentLanguage == "en" ? "-right-20" : "right-20"
              }  bg-dark border border-slate-500 text-white rounded-md shadow-lg p-2 z-10 backdrop-blur-sm`}
            >
              {priorityOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSelectedPriority(option);
                    setPriorityMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-md hover:bg-gray-500 cursor-pointer"
                >
                  {t(option)}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Status Dropdown */}
        <div
          ref={statusRef}
          className="relative flex items-center justify-between w-1/2 bg-slate-600 rounded px-3 py-2"
        >
          <span>{t("Status")}</span>
          <span
            className="bg-dark text-white px-2 py-1 rounded text-xs cursor-pointer"
            onClick={() => setStatusMenuOpen(!isStatusMenuOpen)}
          >
            {t(selectedStatus)}
          </span>
          {isStatusMenuOpen && (
            <div
              className={`absolute top-10 ${
                currentLanguage == "en" ? "-right-20" : "right-20"
              }  bg-dark border border-slate-500 text-white w-40 rounded-md shadow-lg p-2 z-10 backdrop-blur-sm`}
            >
              {statusOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSelectedStatus(option);
                    setStatusMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-md hover:bg-gray-500 cursor-pointer"
                >
                  {t(option)}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* time tracking */}
        <div
          ref={statusRef}
          className="relative flex items-center justify-between gap-2 w-fit bg-slate-600 rounded px-3 py-2"
        >
          <span>{t("Total Time")}</span>
          <span className="bg-dark text-white px-2 py-1 rounded text-xs cursor-pointer">
            {task?.status == "DONE"
              ? formatTime(task?.totalTimeSpent || 0)
              : formatTime(displayedTime)}
          </span>
        </div>
        <div
          ref={statusRef}
          className="relative flex items-center justify-between gap-2 w-fit bg-slate-600 rounded px-3 py-2"
        >
          <span>{t("Time Actions")}</span>

          {task?.status == "DONE" ? (
            <span className="bg-dark text-white px-2 py-1 rounded text-xs cursor-not-allowed flex items-center gap-1">
              <Image src={CheckIcon} alt="start icon" width={15} height={15} />{" "}
              {t("Completed")}
            </span>
          ) : (
            <span className="bg-dark text-white px-2 py-1 rounded text-xs cursor-pointer flex items-center gap-1">
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
          <CustomizedSnackbars
            open={snackbarConfig.open}
            message={snackbarConfig.message}
            severity={snackbarConfig.severity}
            onClose={() =>
              setSnackbarConfig((prev) => ({ ...prev, open: false }))
            }
          />
        </div>
        {/* Description */}
        <div>
          <p className="text-gray-400 text-sm">{t("Description")}</p>
          <textarea
            ref={descriptionRef}
            defaultValue={task?.description}
            className="text-gray-300 mt-2 p-4 rounded-md w-full outline-none border-none bg-main"
            placeholder="What is this task about?"
          ></textarea>
        </div>

        {/* Subtask Button */}
        <label className="font-bold my-2 block">{t("SubTasks")}</label>

        <div className="bg-droppable-fade border-2 border-red-500/30 shadow-md p-4 rounded-lg text-slate-300 space-y-2  ">
          {task && task.subTasks.length > 0 ? (
            task.subTasks.map((sub, index) => (
              <div className="flex items-center gap-2" key={index}>
                <Image
                  src={CheckIcon}
                  alt="check icon"
                  width={15}
                  height={15}
                  className="text-gray-300"
                />
                <p className="text-gray-400">{sub.name}</p>
              </div>
            ))
          ) : (
            <p>{t("No Subtasks yet.")}</p>
          )}
        </div>

        <button
          className="bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
          onClick={() => setIsModalOpen(true)}
        >
          <span>{t("Add subtask")}</span>
        </button>

        <div className="mb-4">
          <label className="font-bold my-2 block">{t("Comments")}</label>

          <div className="my-4 p-2 bg-main  rounded-md shadow-sm">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full mt-2 p-2 border-none outline-none focus:outline-none bg-main "
              placeholder={t("Add a comment...")}
              rows={2}
            />

            <div className="flex items-center justify-between mt-2">
              <div className=" bg-secondary rounded-md p-1 hover:bg-dark ">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  id="attach-file"
                />
                <label
                  htmlFor="attach-file"
                  className="cursor-pointer flex gap-1"
                >
                  <Image
                    src={PaperClipIcon}
                    alt="paperclip icon"
                    width={16}
                    height={16}
                  />
                  {t("Attach File")}
                </label>
                {attachedFile && (
                  <span className="ml-2 text-sm text-slate-300">
                    {attachedFile.name}
                  </span>
                )}
              </div>

              <button
                onClick={handleSendComment}
                className="bg-dark text-white px-3 py-1 rounded-md hover:bg-secondary gap-1 flex items-center"
              >
                {/* <FaPaperPlane className="mr-1" />  */}
                <Image
                  src={PaperPlaneIcon}
                  alt="paper plane icon"
                  width={16}
                  height={16}
                />
                {t("Send")}
              </button>
            </div>
          </div>

          <div className="bg-droppable-fade border-2 border-yellow-500/30 shadow-md p-4 rounded-lg text-slate-300 space-y-2  ">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="flex gap-2 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-300 font-bold rounded-full flex items-center justify-center mr-4">
                    {comment.author.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {comment.author.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatDate(
                        comment.createdAt,
                        currentLanguage as "ar" | "en"
                      )}
                    </p>
                    {comment.content && (
                      <div
                        className="bg-secondary  text-white rounded-md p-2 mt-2 text-sm"
                        dir={getDir()}
                      >
                        {comment.content}
                      </div>
                    )}
                    {comment.files && (
                      <div className="mt-2">
                        {comment.files.map((file, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-200 text-slate-300 p-1 px-2 rounded-md inline-block mr-2 mb-1"
                          >
                            {file}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>{t("No comments yet.")}</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setIsModalOpen(false)}
          />
          <AddSubTaskModal
            parentTask={task}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default ListTaskDetails;
