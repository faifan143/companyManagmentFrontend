"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateTaskType from "./add-task-type/page";

interface ITaskType {
  id: string;
  name: string;
  description: string;
}

const fetchTaskTypes = async (): Promise<ITaskType[]> => {
  const response = await axios.get(
    `https://${process.env.BASE_URL}/task-type/find-all`,
    {
      headers: {
        Authorization: "Bearer " + Cookies.get("access_token"),
      },
    }
  );
  return response.data.data;
};

const TaskTypesView: React.FC = () => {
  const {
    data: taskTypes,
    isLoading,
    error,
  } = useQuery<ITaskType[]>({
    queryKey: ["taskTypes"],
    queryFn: fetchTaskTypes,
  });
  console.log(taskTypes);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<ITaskType | null>(null);

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
        <p className="text-xl text-red-500">Failed to load task types.</p>
      </div>
    );
  }

  const handleEditClick = (taskType: ITaskType) => {
    setEditData(taskType);
    setIsModalOpen(true);
  };

  //   const handleDeleteClick = async (id: string) => {
  //     try {
  //       await axios.delete(`https://${process.env.BASE_URL}/tasks/delete/${id}`, {
  //         headers: {
  //           Authorization: "Bearer " + Cookies.get("access_token"),
  //         },
  //       });
  //       alert("Task type deleted successfully!");
  //       refetch(); // Refresh the data after deletion
  //     } catch (error) {
  //       console.error("Error deleting task type:", error);
  //       alert("Failed to delete task type.");
  //     }
  //   };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Task Types</h1>
      {taskTypes && taskTypes.length > 0 ? (
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
              {taskTypes.map((taskType) => (
                <tr
                  key={taskType.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4">{taskType.name}</td>
                  <td className="py-3 px-4">{taskType.description}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <EditIcon
                      className="cursor-pointer text-blue-500"
                      onClick={() => handleEditClick(taskType)}
                    />
                    <DeleteIcon className="cursor-pointer text-red-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No task types found.</p>
      )}
      <div className="flex justify-center mt-6">
        <button
          className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          Add Task Type
        </button>
      </div>

      <CreateTaskType
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskTypeData={editData}
      />
    </div>
  );
};

export default TaskTypesView;
