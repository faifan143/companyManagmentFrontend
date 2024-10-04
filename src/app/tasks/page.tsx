"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateTask, { TaskFormInputs } from "./add-task/page"; // Adjust the import path as needed

interface ITask {
  id: string;
  name: string;
  description: string;
  task_type: {
    id: string;
    name: string;
  };
  priority: number;
  emp?: {
    id: string;
    name: string;
  };
  department?: {
    id: string;
    name: string;
  };
  status: {
    id: string;
    name: string;
  };
  due_date: string;
  files?: string[];
}

// Fetch tasks from API
const fetchTasks = async (): Promise<ITask[]> => {
  const response = await axios.get(
    `https://${process.env.BASE_URL}/tasks/get-tasks`,
    {
      headers: {
        Authorization: "Bearer " + Cookies.get("access_token"),
      },
    }
  );
  return response.data.data;
};

const TasksView: React.FC = () => {
  const {
    data: tasks,
    isLoading,
    error,
    refetch,
  } = useQuery<ITask[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  console.log(tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<TaskFormInputs | null>(null);

  // Handle Edit
  const handleEditClick = (task: ITask) => {
    const transformedData = {
      id: task.id,
      name: task.name,
      description: task.description,
      task_type: task.task_type.id,
      priority: task.priority,
      emp: task.emp ? task.emp.id : undefined,
      department_id: task.department ? task.department.id : undefined,
      status: task.status.id,
      due_date: new Date(task.due_date).toISOString().split("T")[0], // Convert to YYYY-MM-DD format
      files: task.files,
    };
    setEditData(transformedData);
    setIsModalOpen(true);
  };

  // Handle Delete
  const handleDeleteClick = async (id: string) => {
    try {
      await axios.delete(`https://${process.env.BASE_URL}/tasks/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      refetch(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

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
        <p className="text-xl text-red-500">Failed to load tasks.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Tasks</h1>
      {tasks && tasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Task Name
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Description
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Task Type
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Priority
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Employee
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Department
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Status
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Due Date
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4">{task.name}</td>
                  <td className="py-3 px-4">{task.description}</td>
                  <td className="py-3 px-4">{task.task_type.name}</td>
                  <td className="py-3 px-4">{task.priority}</td>
                  <td className="py-3 px-4">
                    {task.emp ? task.emp.name : "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {task.department ? task.department.name : "N/A"}
                  </td>
                  <td className="py-3 px-4">{task.status.name}</td>
                  <td className="py-3 px-4">
                    {new Date(task.due_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <EditIcon
                      className="cursor-pointer text-blue-500"
                      onClick={() => handleEditClick(task)}
                    />
                    <DeleteIcon
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDeleteClick(task.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No tasks found.</p>
      )}
      <div className="flex justify-center mt-6">
        <button
          className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          Add Task
        </button>
      </div>

      {/* Create/Edit Task Modal */}
      <CreateTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskData={editData}
      />
    </div>
  );
};

export default TasksView;
