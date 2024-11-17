/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useCreateMutation } from "@/hooks/useCreateMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import useSnackbar from "@/hooks/useSnackbar";
import { addProjectSchema } from "@/schemas/project.shema";
import {
  getDepartmentOptions,
  getEmployeeOptions,
} from "@/services/project.service";
import { DepartmentType } from "@/types/DepartmentType.type";
import { EmployeeType } from "@/types/EmployeeType.type";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import CustomizedSnackbars from "./CustomizedSnackbars";
import { ProjectType } from "@/types/Project.type";
import { useRolePermissions } from "@/hooks/useCheckPermissions";
import { selectStyle } from "@/utils/SelectStyle";

const AddProjectModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  projectData?: ProjectType;
}> = ({ isOpen, onClose, projectData }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addProjectSchema),
  });
  const { setSnackbarConfig, snackbarConfig } = useSnackbar();
  const isAdmin = useRolePermissions("admin");
  const isPrimary = useRolePermissions("primary_user");

  const { data: employees, isError: isEmpError } = useCustomQuery<
    EmployeeType[]
  >({
    queryKey: ["employees"],
    url: `http://${process.env.BASE_URL}/emp/${
      isAdmin ? "get-all-emps" : isPrimary ? "get-my-emps" : "view"
    }`,
    setSnackbarConfig,
  });

  const { data: departments, isError: isDeptError } = useCustomQuery<
    DepartmentType[]
  >({
    queryKey: ["departments"],
    url: `http://${process.env.BASE_URL}/department/${
      isAdmin || isPrimary ? "get-departments" : "view"
    }`,
    setSnackbarConfig,
  });

  const { mutate: addOrUpdateProject, isPending } = useCreateMutation({
    endpoint: projectData ? `/projects/update/${projectData._id}` : "/projects",
    onSuccessMessage: projectData
      ? `Project updated successfully!`
      : `Project added successfully!`,
    invalidateQueryKeys: ["projects"],
    setSnackbarConfig,
    onSuccessFn() {
      reset();
      setSelectedDepartments([]);
      setSelectedMembers([]);
      setInterval(onClose, 500);
    },
  });

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  useEffect(() => {
    if (projectData) {
      reset({
        name: projectData.name,
        description: projectData.description,
        startDate: projectData.startDate
          ? projectData.startDate.slice(0, 10)
          : "",
        endDate: projectData.endDate ? projectData.endDate.slice(0, 10) : "",
      });

      setSelectedMembers(projectData.members.map((member) => member._id));
      setSelectedDepartments(projectData.departments.map((dept) => dept._id));
    }
  }, [projectData, reset]);

  useEffect(() => {
    console.log(
      "initial value of selected members  :",
      projectData?.members.map((member) => member)
    );
  }, [projectData?.members, selectedMembers]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-dark rounded-xl shadow-md w-[400px] text-white space-y-4 p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="text-white absolute top-4 right-4 text-xl"
          >
            &times;
          </button>
          <div>
            <form
              onSubmit={handleSubmit(async (data) => {
                addOrUpdateProject({
                  ...data,
                  members: selectedMembers,
                  departments: selectedDepartments,
                });
              })}
            >
              {/* Project Name Field */}
              <div>
                <label className="block text-slate-400 text-sm font-medium">
                  {t("Project Name")}
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full px-4 py-2 mt-1 bg-secondary outline-none rounded-lg ${
                    errors.name ? "border border-red-500" : "border-none"
                  }`}
                  placeholder={t("Enter project name")}
                />
                {errors.name && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-slate-300 text-sm font-medium">
                  {t("Description")}
                </label>
                <textarea
                  {...register("description")}
                  className={`w-full px-4 py-2 mt-1 bg-secondary outline-none rounded-lg ${
                    errors.description ? "border border-red-500" : "border-none"
                  }`}
                  placeholder={t("Enter project description")}
                />
                {errors.description && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Start Date Field */}
              <div>
                <label className="block text-slate-300 text-sm font-medium">
                  {t("Start Date")}
                </label>
                <input
                  type="date"
                  {...register("startDate")}
                  className={`w-full px-4 py-2 mt-1 bg-secondary outline-none rounded-lg ${
                    errors.startDate ? "border border-red-500" : "border-none"
                  }`}
                />
                {errors.startDate && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              {/* End Date Field */}
              <div>
                <label className="block text-slate-300 text-sm font-medium">
                  {t("End Date")}
                </label>
                <input
                  type="date"
                  {...register("endDate")}
                  className={`w-full px-4 py-2 mt-1 bg-secondary outline-none rounded-lg ${
                    errors.endDate ? "border border-red-500" : "border-none"
                  }`}
                />
                {errors.endDate && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.endDate.message}
                  </p>
                )}
              </div>

              {/* Members Field */}
              {employees && !isEmpError && (
                <div>
                  <label className="block text-sm font-medium">
                    {t("Members")}
                  </label>
                  <Select
                    isMulti
                    value={selectedMembers.map((id) => ({
                      value: id,
                      label:
                        employees?.find((emp) => emp.id === id)?.name || "",
                    }))}
                    options={getEmployeeOptions(employees)}
                    onChange={(selectedOptions) => {
                      setSelectedMembers(
                        selectedOptions.map((option) => option.value)
                      );
                    }}
                    className="mt-1 text-black"
                    placeholder={t("Select Members...")}
                    styles={selectStyle}
                  />
                </div>
              )}

              {/* Departments Field */}
              {departments && !isDeptError && (
                <div>
                  <label className="block text-sm font-medium">
                    {t("Departments")}
                  </label>
                  <Select
                    isMulti
                    value={selectedDepartments.map((id) => ({
                      value: id,
                      label:
                        departments?.find((dept) => dept.id === id)?.name || "",
                    }))}
                    options={getDepartmentOptions(departments)}
                    onChange={(selectedOptions) => {
                      setSelectedDepartments(
                        selectedOptions.map((option) => option.value)
                      );
                    }}
                    className="mt-1 text-black"
                    placeholder={t("Select Departments...")}
                    styles={selectStyle}
                  />
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-2 mt-4 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-700 transition duration-200 ${
                  isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isPending}
              >
                {isPending ? t("Processing...") : t("Submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default AddProjectModal;
