"use client";

import useCustomQuery from "@/hooks/useCustomQuery";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import CreateTaskType from "../../../components/common/CreateTaskType";
import CustomizedSnackbars from "@/components/common/CustomizedSnackbars";
import { ITaskType } from "@/types/Task.type";

const TaskTypesView: React.FC = () => {
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });
  const {
    data: taskTypes,
    isLoading,
    error,
  } = useCustomQuery<ITaskType[]>({
    queryKey: ["taskTypes"],
    url: `http://${process.env.BASE_URL}/task-type/find-all`,
    setSnackbarConfig,
    nestedData: true,
  });

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
                      className="cursor-pointer text-[#1b1a40]"
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
          className="bg-[#413d99] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
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

      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default TaskTypesView;
