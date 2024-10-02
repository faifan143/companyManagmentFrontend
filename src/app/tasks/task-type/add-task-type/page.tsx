/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Modal from "react-modal";
import Cookies from "js-cookie";

const baseUrl = process.env.BASE_URL || "";

const schema = yup.object().shape({
  name: yup.string().required("Task type name is required"),
  description: yup.string().required("Description is required"),
});

interface TaskTypeFormInputs {
  id: string;
  name: string;
  description: string;
}

interface CreateTaskTypeProps {
  isOpen: boolean;
  onClose: () => void;
  taskTypeData?: TaskTypeFormInputs | null;
}

const CreateTaskType: React.FC<CreateTaskTypeProps> = ({
  isOpen,
  onClose,
  taskTypeData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskTypeFormInputs>({
    resolver: yupResolver(schema) as any,
    defaultValues: taskTypeData || {},
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (taskTypeData) {
      reset(taskTypeData);
    } else {
      reset();
    }
  }, [taskTypeData, reset]);

  const onSubmit = async (data: TaskTypeFormInputs) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const endpoint = taskTypeData
        ? `http://${baseUrl}/task-type/update/${taskTypeData.id}`
        : `http://${baseUrl}/task-type/create`;

      console.log(endpoint);
      const response = await axios.post(
        endpoint,
        {
          name: data.name,
          description: data.description,
        },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess(
          taskTypeData
            ? "Task Type updated successfully!"
            : "Task Type created successfully!"
        );
        reset({ id: "", name: "", description: "" });
      }
    } catch (err: any) {
      console.error("Failed to create/update the task type", err);
      setError(
        err.response?.data?.message ||
          "Failed to create/update the task type. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Create/Update Task Type"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-red-500"
        >
          &times;
        </button>
        <h1 className="text-center text-2xl font-bold mb-6">
          {taskTypeData ? "Update Task Type" : "Create Task Type"}
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Task Type Name
            </label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter task type name"
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Description
            </label>
            <textarea
              {...register("description")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border focus:outline-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter description"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading
              ? taskTypeData
                ? "Updating..."
                : "Creating..."
              : taskTypeData
              ? "Update Task Type"
              : "Create Task Type"}
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 mt-2 text-center">{success}</p>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default CreateTaskType;
