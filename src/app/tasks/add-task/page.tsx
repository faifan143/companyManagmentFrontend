/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import CreateTaskStatus from "@/components/common/molcules/CreateTaskStatus";
import CreateTaskType from "@/components/common/molcules/CreateTaskType";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import { addTaskSchema } from "@/schemas/task.schema";
import { DepartmentType } from "@/types/DepartmentType.type";
import { EmployeeType } from "@/types/EmployeeType.type";
import { TaskFormInputs } from "@/types/Task.type";
import getErrorMessages from "@/utils/handleErrorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
const baseUrl = process.env.BASE_URL || "";

const AddTask: React.FC = () => {
  const [isTaskStatusModalOpen, setIsTaskStatusModalOpen] = useState(false);
  const [isTaskTypeModalOpen, setIsTaskTypeModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });
  const [isEmployeeDisabled, setIsEmployeeDisabled] = useState(false);
  const [isDepartmentDisabled, setIsDepartmentDisabled] = useState(false);
  const { t } = useTranslation();
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

  const selectedEmployee = watch("emp");
  const selectedDepartment = watch("department_id");
  const isRecurring = watch("isRecurring");

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

  const { mutate: addTask, isPending } = useCreateMutation({
    endpoint: selectedEmployee
      ? `/tasks/create`
      : `/tasks/create-task-department`,
    onSuccessMessage: t("Task added successfully!"),
    invalidateQueryKeys: ["tasks"],
    setSnackbarConfig,
    onSuccessFn() {
      setSnackbarConfig({
        open: true,
        message: t("Task created successfully!"),
        severity: "success",
      });
      reset();
    },
  });

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

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      getErrorMessages({ errors, setSnackbarConfig });
    }
  }, [errors, setSnackbarConfig]);

  return (
    <GridContainer>
      <div className="bg-white p-8 rounded-xl shadow-lg  w-full relative col-span-full">
        <h1 className="text-center text-2xl font-bold mb-6">
          {t("Create Task")}
        </h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(async (data: TaskFormInputs) => {
            setFeedbackMessage(null);
            addTask({
              ...data,
              due_date: new Date(data.due_date).toISOString(),
            });
          })}
        >
          {/* Task Name Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              {t("Task Name")}
            </label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter task name")}
            />

            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              {t("Description")}
            </label>
            <textarea
              {...register("description")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter task description")}
            />
            {errors.description && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Priority Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              {t("Priority")}
            </label>
            <input
              type="number"
              {...register("priority")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.priority ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter priority")}
            />
            {errors.priority && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.priority.message}
              </p>
            )}
          </div>

          {/* Due Date Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              {t("Due Date")}
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
              {t("Department")}
            </label>
            <select
              {...register("department_id")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.department_id ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isDepartmentDisabled}
            >
              <option value="">{t("Select a department (optional)")}</option>
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
              {t("Assigned Employee")}
            </label>
            <select
              {...register("emp")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.emp ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isEmployeeDisabled}
            >
              <option value="">{t("Select an employee (optional)")}</option>
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
              {t("Is Recurring Task?")}
            </label>
          </div>

          {/* Recurring Task Interval and End Date */}
          {isRecurring && (
            <>
              <div>
                <label className="block text-gray-600 text-sm font-medium">
                  {t("Recurring Task Interval (Days)")}
                </label>
                <input
                  type="number"
                  {...register("intervalInDays")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    errors.intervalInDays ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t("Enter interval in days")}
                />
                {errors.intervalInDays && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.intervalInDays.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium">
                  {t("Recurring Task End Date")}
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
            {isPending ? t("Creating...") : t("Create Task")}
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
