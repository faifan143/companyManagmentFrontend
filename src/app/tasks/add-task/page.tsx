/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import { useRolePermissions } from "@/hooks/useCheckPermissions";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import useSnackbar from "@/hooks/useSnackbar";
import { addTaskSchema } from "@/schemas/task.schema";
import { DepartmentType } from "@/types/DepartmentType.type";
import { EmployeeType } from "@/types/EmployeeType.type";
import { ProjectType } from "@/types/Project.type";
import { TaskFormInputs } from "@/types/Task.type";
import getErrorMessages from "@/utils/handleErrorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
const baseUrl = process.env.BASE_URL || "";

const AddTask: React.FC = () => {
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const { snackbarConfig, setSnackbarConfig } = useSnackbar();
  const [isEmployeeDisabled, setIsEmployeeDisabled] = useState(false);
  const [isDepartmentDisabled, setIsDepartmentDisabled] = useState(false);
  const [isProjectDisabled, setIsProjectDisabled] = useState(false);
  const isAdmin = useRolePermissions("admin");
  const isPrimary = useRolePermissions("primary_user");
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm<TaskFormInputs>({
    resolver: yupResolver(addTaskSchema) as any,
    defaultValues: {},
  });

  const selectedEmployee = watch("emp");
  const selectedDepartment = watch("department_id");
  const selectedProject = watch("project_id");
  const isRecurring = watch("isRecurring");

  const { data: projects } = useCustomQuery<ProjectType[]>({
    queryKey: ["projects"],
    url: `http://${baseUrl}/projects/get-all-projects`,
    setSnackbarConfig,
  });

  const { data: departments } = useCustomQuery<DepartmentType[]>({
    queryKey: ["departments"],
    url: `http://${baseUrl}/department/${
      isAdmin || isPrimary ? "get-departments" : "view"
    }`,
    setSnackbarConfig,
  });
  const { data: employees } = useCustomQuery<EmployeeType[]>({
    queryKey: ["employees"],
    url: `http://${baseUrl}/emp/${
      isAdmin ? "get-all-emps" : isPrimary ? "get-my-emps" : "view"
    }`,
    setSnackbarConfig,
  });

  const { mutate: addTask, isPending } = useCreateMutation({
    endpoint: selectedEmployee
      ? `/tasks/create`
      : selectedDepartment
      ? `/tasks/create-task-department`
      : `/tasks/create-task-project`,
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
      setIsProjectDisabled(true);
    } else if (selectedDepartment) {
      setIsEmployeeDisabled(true);
      setIsProjectDisabled(true);
    } else if (selectedProject) {
      setIsEmployeeDisabled(true);
      setIsDepartmentDisabled(true);
    } else {
      setIsEmployeeDisabled(false);
      setIsDepartmentDisabled(false);
      setIsProjectDisabled(false);
    }
  }, [selectedEmployee, selectedDepartment, selectedProject]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      getErrorMessages({ errors, setSnackbarConfig });
    }
  }, [errors, setSnackbarConfig]);
  const target = selectedEmployee
    ? { emp: getValues("emp") }
    : selectedDepartment
    ? { department_id: getValues("department_id") }
    : { project_id: getValues("project_id") };

  return (
    <GridContainer>
      <div className="bg-droppable-fade p-8 rounded-xl shadow-lg  w-full  col-span-full">
        <h1 className="text-center text-2xl text-white font-bold mb-6">
          {t("Create Task")}
        </h1>
        <form
          className="space-y-4 text-white "
          onSubmit={handleSubmit(async (data: TaskFormInputs) => {
            setFeedbackMessage(null);
            console.log({
              name: getValues("name"),
              description: getValues("description"),
              priority: getValues("priority"),
              files: getValues("files") ?? [],
              due_date: new Date(data.due_date).toISOString(),
              ...target,
            });

            addTask({
              name: getValues("name"),
              description: getValues("description"),
              priority: getValues("priority"),
              files: getValues("files") ?? [],
              due_date: new Date(data.due_date).toISOString(),
              ...target,
            });
          })}
        >
          {/* Task Name Field */}
          <div>
            <label className="block text-slate-300   text-sm font-medium">
              {t("Task Name")}
            </label>
            <input
              type="text"
              {...register("name")}
              className={` bg-secondary border-none outline-none w-full px-4 py-2 mt-1 rounded-lg border ${
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
            <label className="block text-slate-300 text-sm font-medium">
              {t("Description")}
            </label>
            <textarea
              {...register("description")}
              className={` bg-secondary border-none outline-none w-full px-4 py-2 mt-1 rounded-lg border ${
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
          <div>
            <label className="block text-slate-300 text-sm font-medium">
              {t("Priority")}
            </label>
            <select
              {...register("priority")}
              className={` bg-secondary  border-none outline-none w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.priority ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option className="" value="">
                {t("Select a department (optional)")}
              </option>
              {["HIGH", "MEDIUM", "LOW"].map((priority, index) => (
                <option className="text-slate-300" key={index} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            {errors.priority && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.priority.message}
              </p>
            )}
          </div>

          {/* Due Date Field */}
          <div>
            <label className="block text-slate-300 text-sm font-medium">
              {t("Due Date")}
            </label>
            <input
              type="date"
              {...register("due_date")}
              className={` bg-secondary border-none outline-none w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.due_date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.due_date && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.due_date.message}
              </p>
            )}
          </div>
          {/* Project Field */}
          {!isProjectDisabled && (
            <div>
              <label className="block text-slate-300 text-sm font-medium">
                {t("Project")}
              </label>
              <select
                {...register("project_id")}
                className={` bg-secondary border-none outline-none w-full px-4 py-2 mt-1 rounded-lg border ${
                  errors.project_id ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isProjectDisabled}
              >
                <option className="" value="">
                  {t("Select a project (optional)")}
                </option>
                {projects &&
                  projects.map((project) => (
                    <option className="" key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
              </select>
              {errors.project_id && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.project_id.message}
                </p>
              )}
            </div>
          )}

          {/* Department Field */}
          {!isDepartmentDisabled && (
            <div>
              <label className="block text-slate-300 text-sm font-medium">
                {t("Department")}
              </label>
              <select
                {...register("department_id")}
                className={` bg-secondary border-none outline-none w-full px-4 py-2 disabled:hidden mt-1 rounded-lg border ${
                  errors.department_id ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isDepartmentDisabled}
              >
                <option value="" className="">
                  {t("Select a department (optional)")}
                </option>
                {departments &&
                  departments.map((dept: any) => (
                    <option className="" key={dept.id} value={dept.id}>
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
          )}

          {/* Employee Field */}
          {!isEmployeeDisabled && (
            <div>
              <label className="block text-slate-300 text-sm font-medium">
                {t("Assigned Employee")}
              </label>
              <select
                {...register("emp")}
                className={` bg-secondary border-none outline-none w-full disabled:hidden px-4 py-2 mt-1 rounded-lg border ${
                  errors.emp ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isEmployeeDisabled}
              >
                <option value="" className="">
                  {t("Select an employee (optional)")}
                </option>
                {employees &&
                  employees.map((emp: any) => (
                    <option className="" key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
              </select>
              {errors.emp && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.emp.message}
                </p>
              )}
            </div>
          )}

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
              className="ml-4 text-slate-300 text-sm font-medium cursor-pointer"
            >
              {t("Is Recurring Task?")}
            </label>
          </div>

          {/* Recurring Task Interval and End Date */}
          {isRecurring && (
            <>
              <div>
                <label className="block text-slate-300 text-sm font-medium">
                  {t("Recurring Task Interval (Days)")}
                </label>
                <input
                  type="number"
                  {...register("intervalInDays")}
                  className={` bg-secondary border-none outline-none w-full px-4 py-2 mt-1 rounded-lg border ${
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
                <label className="block text-slate-300 text-sm font-medium">
                  {t("Recurring Task End Date")}
                </label>
                <input
                  type="date"
                  {...register("end_date")}
                  className={` bg-secondary border-none outline-none w-full px-4 py-2 mt-1 rounded-lg border ${
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
            className={`w-full py-2 mt-4 bg-slate-600  rounded-lg font-bold hover:bg-slate-700 transition duration-200 ${
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
