import {
  TaskDetailsModalProps,
  Comment,
} from "@/types/components/TaskDetailsModal.type";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPaperclip, FaPaperPlane, FaTimes } from "react-icons/fa";
import Modal from "react-modal";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isOpen,
  onClose,
  taskData,
}) => {
  const [comment, setComment] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://${process.env.BASE_URL}/comment/${taskData!.id}`,
          {
            headers: {
              Authorization: "Bearer " + Cookies.get("access_token"),
            },
          }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, taskData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleSendComment = async () => {
    if (comment.trim() || attachedFile) {
      try {
        // // Create a FormData object to handle file upload
        // const formData = new FormData();
        // formData.append("content", comment);
        // formData.append("taskId", taskData?.id || "");

        // // Check if there is an attached file and append it to the formData
        // if (attachedFile) {
        //   formData.append("files", attachedFile);
        // }

        const response = await axios.post(
          `http://${process.env.BASE_URL}/comment`,
          {
            content: comment,
            taskId: taskData?.id,
          },
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + Cookies.get("access_token"),
            },
          }
        );

        setComments((prevComments) => [...prevComments, response.data]);
        setComment("");
        setAttachedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    } else {
      alert("Please write a comment or attach a file before sending.");
    }
  };

  if (!taskData) return null;
  const priorityColor =
    taskData.priority == 1
      ? "bg-red-100  text-red-600"
      : taskData.priority == 2
      ? "bg-yellow-100  text-yellow-600"
      : "bg-green-100  text-green-600";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Task Details"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <div className="flex justify-between items-center my-5">
          <div className="flex items-center space-x-2">
            <span className="text-[#1b1a40] text-lg font-bold">
              {t("Task Details")}
            </span>
          </div>
          <div className="flex space-x-2">
            <div className="bg-gray-100 px-4 py-2 rounded-2xl border-none text-gray-800 font-medium">
              {taskData.status.name}
            </div>
            <div
              className={
                "px-4 py-2 rounded-2xl border-none font-medium " + priorityColor
              }
            >
              {taskData.priority == 1
                ? t("High")
                : taskData.priority == 2
                ? t("Medium")
                : t("Low")}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">{taskData.name}</h2>

        <div className="mb-6">
          <label className="font-bold mb-2 block">{t("Members")}</label>
          <div className="flex items-center space-x-2 mt-2">
            {taskData.emp ? (
              <div className="w-8 h-8 rounded-full bg-[#1b1a40] text-white flex items-center justify-center text-sm font-bold">
                {taskData.emp.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <span className="text-gray-500">{t("No assigned employee")}</span>
            )}
            <div className="w-8 h-8 rounded-full bg-red-300 text-white flex items-center justify-center text-sm font-bold">
              AA
            </div>
            <div className="w-8 h-8 rounded-full bg-green-300 text-white flex items-center justify-center text-sm font-bold">
              MK
            </div>
            <button className="w-8 h-8 rounded-full bg-blue-100 text-[#1b1a40] flex items-center justify-center text-sm font-bold">
              +
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="font-bold mb-2 block">{t("Description")}</label>
          <div className="bg-gray-100 p-4 rounded-md text-gray-700">
            {taskData.description}
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div>
            <label className="font-bold">{t("Task Type:")}</label>
            <p className="mt-1 text-gray-600">{taskData.task_type.name}</p>
          </div>
          <div>
            <label className="font-bold">{t("Department:")}</label>
            <p className="mt-1 text-gray-600">
              {taskData.emp?.department
                ? taskData.emp?.department?.name
                : t("No department assigned")}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="font-bold">{t("Due Date:")}</label>
          <p className="mt-2 text-gray-600">
            {new Date(taskData.due_date).toLocaleDateString()}
          </p>
        </div>
        <div className="mb-4">
          <label className="font-bold mb-2 block">{t("Comments")}</label>
          <div
            className="bg-white border shadow-md p-4 rounded-lg text-gray-700 space-y-2 h-40 overflow-y-auto "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                // <div key={comment.id} className="bg-white p-2 rounded-md mb-2">
                //   <p className="text-sm text-gray-700">
                //     <strong>{comment.author.name}:</strong> {comment.content}
                //   </p>
                //   {comment.files && comment.files.length > 0 && (
                //     <div className="mt-2">
                //       {comment.files.map((file, index) => (
                //         <div
                //           key={index}
                //           className="bg-gray-200 text-gray-700 p-1 px-2 rounded-md inline-block mr-2 mb-1"
                //         >
                //           <a
                //             href={file}
                //             target="_blank"
                //             rel="noopener noreferrer"
                //             className="text-[#1b1a40] underline"
                //           >
                //             View attachment
                //           </a>
                //         </div>
                //       ))}
                //     </div>
                //   )}
                // </div>
                <div key={index} className="flex mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#1b1a40] text-white rounded-full flex items-center justify-center mr-4">
                    {comment.author.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">
                      {comment.author.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </p>
                    {comment.content && (
                      <div className="bg-gray-100   rounded-md p-2 mt-2 text-sm">
                        {comment.content}
                      </div>
                    )}
                    {comment.files && (
                      <div className="mt-2">
                        {comment.files.map((file, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-200 text-gray-700 p-1 px-2 rounded-md inline-block mr-2 mb-1"
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

          <div className="mt-4 p-2 bg-white border rounded-md shadow-sm">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full mt-2 p-2 border-none outline-none focus:outline-none"
              placeholder={t("Add a comment...")}
              rows={2}
            />

            <div className="flex items-center justify-between mt-2">
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  id="attach-file"
                />
                <label
                  htmlFor="attach-file"
                  className="cursor-pointer text-gray-600 hover:text-gray-900"
                >
                  <FaPaperclip className="inline mr-1" /> {t("Attach File")}
                </label>
                {attachedFile && (
                  <span className="ml-2 text-sm text-gray-600">
                    {attachedFile.name}
                  </span>
                )}
              </div>

              <button
                onClick={handleSendComment}
                className="bg-[#1b1a40] text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center"
              >
                <FaPaperPlane className="mr-1" /> {t("Send")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailsModal;
