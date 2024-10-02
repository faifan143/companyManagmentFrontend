/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import CreateTaskStatus from "../task-status/add-task-status/page";
import CreateTaskType from "../task-type/add-task-type/page";
import CustomizedSnackbars from "@/components/common/CustomizedSnackbars";

const baseUrl = process.env.BASE_URL || "";

const schema = yup.object().shape({
  name: yup.string().required("Task name is required"),
  description: yup.string().required("Description is required"),
  task_type: yup.string().required("Task type is required"),
  priority: yup
    .number()
    .required("Priority is required")
    .typeError("Priority must be a number"),
  emp: yup.string().nullable(),
  department_id: yup.string().nullable(),
  status: yup.string().required("Task status is required"),
  due_date: yup
    .date()
    .required("Due date is required")
    .typeError("Invalid date format"),
  files: yup.array().of(yup.string()),
});

// Define the form input types
export interface TaskFormInputs {
  id: string;
  name: string;
  description: string;
  task_type: string;
  priority: number;
  emp?: string;
  department_id?: string;
  status: string;
  due_date: string;
  files?: string[];
}

// Props for the CreateTask component
interface CreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
  taskData?: TaskFormInputs | null;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  isOpen,
  onClose,
  taskData,
}) => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TaskFormInputs>({
    resolver: yupResolver(schema) as any,
    defaultValues: taskData || {},
  });

  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Reset form data when taskData changes
  useEffect(() => {
    if (taskData) {
      reset(taskData);
    } else {
      reset();
    }
  }, [taskData, reset]);

  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });

  // Submit handler for form
  const onSubmit = async (data: TaskFormInputs) => {
    setFeedbackMessage(null);
    setLoading(true);

    try {
      const endpoint = taskData
        ? `http://${baseUrl}/tasks/update/${taskData.id}`
        : `http://${baseUrl}/tasks/create`;

      const response = await axios.post(
        endpoint,
        {
          ...data,
          due_date: new Date(data.due_date).toISOString(), // Ensure due_date is sent in the correct format
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSnackbarConfig({
          open: true,
          message: taskData
            ? "Task updated successfully!"
            : "Task created successfully!",
          severity: "success",
        });
        reset();
      }
    } catch (error: any) {
      console.error("Error creating/updating task:", error);
      setSnackbarConfig({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to process the request. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setInterval(onClose, 3000);
    }
  };

  // Fetch task types
  const { data: taskTypes } = useQuery({
    queryKey: ["taskTypes"],
    queryFn: async () => {
      const response = await axios.get(`http://${baseUrl}/task-type/find-all`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      return response.data.data;
    },
  });

  console.log(taskTypes);
  // Fetch task statuses
  const { data: taskStatuses } = useQuery({
    queryKey: ["taskStatuses"],
    queryFn: async () => {
      const response = await axios.get(
        `http://${baseUrl}/task-status/find-all`,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      return response.data.data;
    },
  });

  // Fetch departments
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await axios.get(
        `http://${baseUrl}/department/get-departments`,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      return response.data;
    },
  });

  // Fetch employees
  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await axios.get(`http://${baseUrl}/emp/get-all-emps`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      return response.data;
    },
  });

  const selectedEmployee = watch("emp");
  const selectedDepartment = watch("department_id");

  // Manage disabled state for employee and department fields
  const [isEmployeeDisabled, setIsEmployeeDisabled] = useState(false);
  const [isDepartmentDisabled, setIsDepartmentDisabled] = useState(false);

  useEffect(() => {
    // Disable department field when an employee is selected
    if (selectedEmployee) {
      setIsDepartmentDisabled(true);
    } else {
      setIsDepartmentDisabled(false);
    }

    // Disable employee field when a department is selected
    if (selectedDepartment) {
      setIsEmployeeDisabled(true);
    } else {
      setIsEmployeeDisabled(false);
    }
  }, [selectedEmployee, selectedDepartment]);

  const [isTaskStatusModalOpen, setIsTaskStatusModalOpen] = useState(false);
  const [isTaskTypeModalOpen, setIsTaskTypeModalOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Create/Update Task"
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
          {taskData ? "Update Task" : "Create Task"}
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Task Name Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Task Name
            </label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter task name"
            />

            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Description
            </label>
            <textarea
              {...register("description")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter task description"
            />
            {errors.description && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Task Type Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Task Type
            </label>
            <div className="flex gap-[8px]">
              <select
                {...register("task_type")}
                className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                  errors.task_type ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a task type</option>
                {taskTypes &&
                  taskTypes.map((type: any) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
              </select>
              <div
                onClick={() => setIsTaskTypeModalOpen(true)}
                className="border-gray-500 border-dashed border-2 text-center rounded-md w-[45px] h-[40px] mt-1 content-center text-lg font-bold cursor-pointer"
              >
                +{" "}
              </div>
            </div>
            {errors.task_type && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.task_type.message}
              </p>
            )}
          </div>

          {/* Priority Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Priority
            </label>
            <input
              type="number"
              {...register("priority")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.priority ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter priority"
            />
            {errors.priority && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.priority.message}
              </p>
            )}
          </div>

          {/* Employee Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Assigned Employee
            </label>
            <select
              {...register("emp")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.emp ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isEmployeeDisabled} // Disable based on selection
            >
              <option value="">Select an employee (optional)</option>
              {employees &&
                employees.map((emp: any) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
            </select>
            {errors.emp && (
              <p className="text-red-500 mt-1 text-sm">{errors.emp.message}</p>
            )}
          </div>

          {/* Department Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Department
            </label>
            <select
              {...register("department_id")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.department_id ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isDepartmentDisabled} // Disable based on selection
            >
              <option value="">Select a department (optional)</option>
              {departments &&
                departments.map((dept: any) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
            </select>
            {errors.department_id && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.department_id.message}
              </p>
            )}
          </div>

          {/* Task Status Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Task Status
            </label>
            <div className="flex items-center gap-2">
              <select
                {...register("status")}
                className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select task status</option>
                {taskStatuses &&
                  taskStatuses.map((status: any) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
              </select>
              <div
                onClick={() => setIsTaskStatusModalOpen(true)}
                className="mt-1 border-gray-500 border-dashed border-2 text-center rounded-md w-[45px] h-[40px] content-center text-lg font-bold cursor-pointer"
              >
                +{" "}
              </div>
            </div>
            {errors.status && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Due Date Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Due Date
            </label>
            <input
              type="date"
              {...register("due_date")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.due_date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.due_date && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.due_date.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading
              ? taskData
                ? "Updating..."
                : "Creating..."
              : taskData
              ? "Update Task"
              : "Create Task"}
          </button>

          {/* Feedback Message */}
          {feedbackMessage && (
            <p
              className={`mt-2 text-center ${
                feedbackMessage.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {feedbackMessage}
            </p>
          )}
        </form>
      </div>

      <CreateTaskStatus
        isOpen={isTaskStatusModalOpen}
        onClose={() => setIsTaskStatusModalOpen(false)}
      />
      <CreateTaskType
        isOpen={isTaskTypeModalOpen}
        onClose={() => setIsTaskTypeModalOpen(false)}
      />

      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </Modal>
  );
};

export default CreateTask;
