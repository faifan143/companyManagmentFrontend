/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CreateTaskStatus from "@/components/common/CreateTaskStatus";
import CreateTaskType from "@/components/common/CreateTaskType";
import CustomizedSnackbars from "@/components/common/CustomizedSnackbars";
import GridContainer from "@/components/common/GridContainer";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import { DepartmentType } from "@/types/DepartmentType.type";
import { EmployeeType } from "@/types/EmployeeType.type";
import { addTaskSchema } from "@/schemas/task.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TaskFormInputs } from "@/types/Task.type";
const baseUrl = process.env.BASE_URL || "";

const AddTask: React.FC = () => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TaskFormInputs>({
    resolver: yupResolver(addTaskSchema) as any,
    defaultValues: {},
  });

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Reset form data when taskData changes
  useEffect(() => {
    reset();
  }, [reset]);

  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });
  const selectedEmployee = watch("emp");
  const selectedDepartment = watch("department_id");

  const endpoint = selectedEmployee
    ? `/tasks/create`
    : `/tasks/create-task-department`;
  const {
    mutate: addTask,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateMutation({
    endpoint: endpoint,
    onSuccessMessage: "Task added successfully!",
    invalidateQueryKeys: ["tasks"],
  });
  const isRecurring = watch("isRecurring");

  const onSubmit = async (data: TaskFormInputs) => {
    console.log("data are  :", data);

    setFeedbackMessage(null);
    addTask({
      ...data,
      due_date: new Date(data.due_date).toISOString(),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setSnackbarConfig({
        open: true,
        message: "Task created successfully!",
        severity: "success",
      });
      reset();
    } else if (isError) {
      console.error("Error creating/updating task:", error);
      setSnackbarConfig({
        open: true,
        message:
          error + "" || "Failed to process the request. Please try again.",
        severity: "error",
      });
    }
  }, [error, isError, isSuccess, reset]);

  const { data: taskTypes } = useCustomQuery<any[]>({
    queryKey: ["taskTypes"],
    url: `http://${baseUrl}/task-type/find-all`,
    setSnackbarConfig,
    nestedData: true,
  });

  const { data: taskStatuses } = useCustomQuery<any[]>({
    queryKey: ["taskStatuses"],
    url: `http://${baseUrl}/task-status/find-all`,
    setSnackbarConfig,
    nestedData: true,
  });

  const { data: departments } = useCustomQuery<DepartmentType[]>({
    queryKey: ["departments"],
    url: `http://${baseUrl}/department/get-departments`,
    setSnackbarConfig,
  });
  const { data: employees } = useCustomQuery<EmployeeType[]>({
    queryKey: ["employees"],
    url: `http://${baseUrl}/emp/get-all-emps`,
    setSnackbarConfig,
  });

  const [isEmployeeDisabled, setIsEmployeeDisabled] = useState(false);
  const [isDepartmentDisabled, setIsDepartmentDisabled] = useState(false);

  useEffect(() => {
    if (selectedEmployee) {
      setIsDepartmentDisabled(true);
    } else {
      setIsDepartmentDisabled(false);
    }

    if (selectedDepartment) {
      setIsEmployeeDisabled(true);
    } else {
      setIsEmployeeDisabled(false);
    }
  }, [selectedEmployee, selectedDepartment]);

  const [isTaskStatusModalOpen, setIsTaskStatusModalOpen] = useState(false);
  const [isTaskTypeModalOpen, setIsTaskTypeModalOpen] = useState(false);

  return (
    <GridContainer>
      <div className="bg-white p-8 rounded-xl shadow-lg  w-full relative col-span-full">
        <h1 className="text-center text-2xl font-bold mb-6">{"Create Task"}</h1>
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

          {/* Is Recurring Checkbox */}
          <div>
            <input
              type="checkbox"
              {...register("isRecurring")}
              className=" cursor-pointer"
              id="check-id"
            />
            <label
              htmlFor="check-id"
              className="ml-4 text-gray-600 text-sm font-medium cursor-pointer"
            >
              Is Recurring Task?
            </label>
          </div>

          {/* Recurring Task Interval and End Date */}
          {isRecurring && (
            <>
              <div>
                <label className="block text-gray-600 text-sm font-medium">
                  Recurring Task Interval (Days)
                </label>
                <input
                  type="number"
                  {...register("intervalInDays")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    errors.intervalInDays ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter interval in days"
                />
                {errors.intervalInDays && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.intervalInDays.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium">
                  Recurring Task End Date
                </label>
                <input
                  type="date"
                  {...register("end_date")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    errors.end_date ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.end_date && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.end_date.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition duration-200 ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Task"}
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
    </GridContainer>
  );
};

export default AddTask;
