"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateTaskStatus from "./add-task-status/page";

interface ITaskStatus {
  id: string;
  name: string;
  description: string;
}

const fetchTaskStatuses = async (): Promise<ITaskStatus[]> => {
  const response = await axios.get(
    `http://${process.env.BASE_URL}/task-status/find-all`,
    {
      headers: {
        Authorization: "Bearer " + Cookies.get("access_token"),
      },
    }
  );
  return response.data.data;
};

const TaskStatusesView: React.FC = () => {
  const {
    data: taskStatuses,
    isLoading,
    error,
    refetch,
  } = useQuery<ITaskStatus[]>({
    queryKey: ["taskStatuses"],
    queryFn: fetchTaskStatuses,
  });
  console.log(taskStatuses);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<ITaskStatus | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">Failed to load task statuses.</p>
      </div>
    );
  }

  const handleEditClick = (taskStatus: ITaskStatus) => {
    setEditData(taskStatus);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    try {
      await axios.delete(
        `http://${process.env.BASE_URL}/task-status/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      refetch(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting task status:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Task Statuses</h1>
      {taskStatuses && taskStatuses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Name
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Description
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {taskStatuses.map((taskStatus) => (
                <tr
                  key={taskStatus.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4">{taskStatus.name}</td>
                  <td className="py-3 px-4">{taskStatus.description}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <EditIcon
                      className="cursor-pointer text-blue-500"
                      onClick={() => handleEditClick(taskStatus)}
                    />
                    <DeleteIcon
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDeleteClick(taskStatus.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">
          No task statuses found.
        </p>
      )}
      <div className="flex justify-center mt-6">
        <button
          className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          Add Task Status
        </button>
      </div>

      <CreateTaskStatus
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskStatusData={editData}
      />
    </div>
  );
};

export default TaskStatusesView;
