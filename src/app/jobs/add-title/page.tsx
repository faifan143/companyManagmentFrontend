/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useCustomQuery from "@/hooks/useCustomQuery";
import useQueryPageData from "@/hooks/useQueryPageData";
import { addTitleSchema } from "@/schemas/job.schema";
import {
  getDepartmentOptions,
  handlePermissionsChange,
} from "@/services/job.service";
import { DepartmentType } from "@/types/DepartmentType.type";
import { JobCategoryType, JobTitleFormInputs } from "@/types/JobTitle.type";
import { permissionsArray } from "@/utils/all_permissions";
import getErrorMessages from "@/utils/handleErrorMessages";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import useSnackbar from "@/hooks/useSnackbar";
import { selectStyle } from "@/utils/SelectStyle";
import useCustomTheme from "@/hooks/useCustomTheme";

const baseUrl = process.env.BASE_URL || "";

const permissionsOptions = permissionsArray.map((permission) => ({
  value: permission,
  label: permission.replace(/_/g, " ").toUpperCase(),
}));

const AddJobTitle: React.FC = () => {
  const [permissionsMode, setPermissionsMode] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [permissionsSelected, setPermissionsSelected] = useState<string[]>([]);
  const [specificDept, setSpecificDept] = useState<string[]>([]);
  const [specificEmp, setSpecificEmp] = useState<string[]>([]);
  const [specificJobTitle, setSpecificJobTitle] = useState<string[]>([]);
  const [isManager, setIsManager] = useState(false);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const { snackbarConfig, setSnackbarConfig } = useSnackbar();
  const { t } = useTranslation();
  const { isLightMode } = useCustomTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<JobTitleFormInputs>({
    resolver: yupResolver(addTitleSchema),
    defaultValues: {
      name: "",
      title: "",
      category: "",
      description: "",
      responsibilities: [],
      permissions: [],
      department_id: "",
      is_manager: false,
      accessibleDepartments: [],
      accessibleEmps: [],
      accessibleJobTitles: [],
    },
  });
  const jobTitleData = useQueryPageData<JobTitleFormInputs>(reset);

  const { data: departments } = useCustomQuery<DepartmentType[]>({
    queryKey: ["departments"],
    url: `http://${baseUrl}/department/get-departments`,
    setSnackbarConfig,
  });
  const { data: categories } = useCustomQuery<JobCategoryType[]>({
    queryKey: ["categories"],
    url: `http://${baseUrl}/job-categories`,
    setSnackbarConfig,
  });

  const {
    mutate: addJobTitle,
    isPending: isPendingJobTitle,
    isError: isErrorJobTitle,
    error: errorJobTitle,
  } = useCreateMutation({
    endpoint: jobTitleData
      ? `/job-titles/update/${jobTitleData.id}`
      : `/job-titles/create`,
    onSuccessMessage: t("Job Title added successfully!"),
    invalidateQueryKeys: ["jobTitles"],
    setSnackbarConfig,
    onSuccessFn() {
      reset({
        id: "",
        name: "",
        title: "",
        description: "",
        responsibilities: [],
        permissions: [],
        department_id: "",
        accessibleDepartments: [],
        accessibleEmps: [],
        accessibleJobTitles: [],
        category: "",
        is_manager: false,
      });

      setSnackbarConfig({
        open: true,
        message: jobTitleData
          ? "Job Title updated successfully!"
          : "Job Title created successfully!",
        severity: "success",
      });
    },
  });

  useEffect(() => {
    if (jobTitleData) {
      console.log("job title data : ", jobTitleData);

      reset(jobTitleData);
      setResponsibilities(jobTitleData.responsibilities);
      setValue("department_id", jobTitleData.department._id);
      setValue("category", jobTitleData.category.id);
      setSelectedCategory(jobTitleData.category.id);
      setSelectedDept(jobTitleData.department._id);
      setPermissionsSelected(jobTitleData.permissions || []);
      setSpecificDept(jobTitleData.accessibleDepartments || []);
      setSpecificEmp(jobTitleData.accessibleEmps || []);
      setSpecificJobTitle(jobTitleData.accessibleJobTitles || []);
      setIsManager(jobTitleData.is_manager);
      setPermissionsMode(
        jobTitleData.permissions.length > 0 ? "custom" : "default"
      );
    } else {
      reset();
    }
  }, [
    jobTitleData,
    reset,
    setValue,
    setPermissionsMode,
    setSelectedCategory,
    setSelectedDept,
  ]);

  useEffect(() => {
    console.log(responsibilities);
  }, [responsibilities]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      getErrorMessages({ errors, setSnackbarConfig });
    }
  }, [errors, setSnackbarConfig]);

  return (
    <GridContainer>
      <div className="bg-droppable-fade p-8 rounded-xl shadow-lg col-span-12 w-full text-twhite">
        <h1 className="text-center text-2xl  font-bold mb-6">
          {jobTitleData ? t("Update Job Title") : t("Create Job Title")}
        </h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(async (data) => {
            console.log({
              ...data,
              permissions: permissionsSelected,
              is_manager: isManager,
              accessibleDepartments: specificDept,
              accessibleEmps: specificEmp,
              accessibleJobTitles: specificJobTitle,
              responsibilities,
            });

            addJobTitle({
              ...data,
              permissions: permissionsSelected,
              is_manager: isManager,
              accessibleDepartments: specificDept,
              accessibleEmps: specificEmp,
              accessibleJobTitles: specificJobTitle,
              responsibilities,
            });
          })}
        >
          <div>
            <label className="block  text-sm font-medium">
              {t("Job Title Name")}
            </label>
            <input
              type="text"
              {...register("name")}
              className={` 
              
              ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }
              outline-none border-none  w-full px-4 py-2 mt-1 rounded-lg     focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.name ? "border-red-500" : "border-border"
              }`}
              placeholder={t("Enter job title name")}
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block  text-sm font-medium">{t("Title")}</label>
            <input
              type="text"
              {...register("title")}
              className={` 
              
              ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }
              outline-none border-none  w-full px-4 py-2 mt-1 rounded-lg     focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.title ? "border-red-500" : "border-border"
              }`}
              placeholder={t("Enter job title")}
            />
            {errors.title && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block  text-sm font-medium">
              {t("Description")}
            </label>
            <input
              type="text"
              {...register("description")}
              className={` 
              
              ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }
              outline-none border-none  w-full px-4 py-2 mt-1 rounded-lg     focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.description ? "border-red-500" : "border-border"
              }`}
              placeholder={t("Enter job description")}
            />
            {errors.description && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block  text-sm font-medium">
              {t("Responsibilities")}
            </label>

            <textarea
              className={`w-full 
              
              ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }
              outline-none border-none px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.responsibilities ? "border-red-500" : "border-border"
              }`}
              placeholder={t("Enter responsibilities (comma-separated)")}
              rows={3}
              // {...register("responsibilities")} // Ensure this binds to the form
              value={responsibilities.join(",")}
              onChange={(event) => {
                const values = event.target.value;
                setResponsibilities(values.split(","));
                setValue("responsibilities", values.split(","));
              }}
            ></textarea>

            {errors.responsibilities && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.responsibilities.message}
              </p>
            )}
          </div>

          {/* Permissions Toggle */}
          <div>
            <label className="block text-sm font-medium">
              {t("Permissions Mode")}
            </label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  value="default"
                  checked={permissionsMode === "default"}
                  onChange={() => {
                    setPermissionsMode("default");
                    setPermissionsSelected([]);
                    setSpecificDept([]);
                    setSpecificEmp([]);
                    setSpecificJobTitle([]);
                  }}
                />
                {t("Default")}
              </label>
              <label>
                <input
                  type="radio"
                  value="custom"
                  checked={permissionsMode === "custom"}
                  onChange={() => setPermissionsMode("custom")}
                />
                {t("Custom")}
              </label>
            </div>
          </div>

          {/* Custom Permissions Multi-select */}
          {permissionsMode === "custom" && (
            <div>
              <label className="block text-sm font-medium">
                {t("Select Permissions")}
              </label>
              <Select
                isMulti
                value={permissionsOptions.filter((option) =>
                  permissionsSelected.includes(option.value)
                )}
                options={permissionsOptions}
                onChange={(selectedOptions) =>
                  handlePermissionsChange({
                    selectedOptions: selectedOptions as {
                      value: string;
                      label: string;
                    }[],
                    setPermissionsSelected,
                    setSpecificDept,
                    setSpecificJobTitle,
                    setSpecificEmp,
                    specificDept,
                    specificEmp,
                    specificJobTitle,
                  })
                }
                className={`mt-1 text-tblackAF  
                
                ${
                  isLightMode
                    ? "bg-dark  placeholder:text-tdark "
                    : "bg-secondary"
                }
                outline-none border-none`}
                placeholder={t("Select Permissions...")}
                styles={selectStyle}
              />
            </div>
          )}

          {/* Conditional Dropdowns */}
          {permissionsSelected.includes("department_view_specific") && (
            <div>
              <label className="block text-sm font-medium">
                {t("Specific Department")}
              </label>

              <Select
                {...register("accessibleDepartments")}
                isMulti
                value={getDepartmentOptions(departments).filter(
                  (option: { value: string; label: string }) =>
                    specificDept.includes(option.value)
                )}
                options={getDepartmentOptions(departments)}
                onChange={(selectedOptions) =>
                  setSpecificDept(selectedOptions.map((option) => option.value))
                }
                className={`mt-1 text-tblackAF 
                
                ${
                  isLightMode
                    ? "bg-dark  placeholder:text-tdark "
                    : "bg-secondary"
                }
                outline-none border-none`}
                placeholder={t("Select Accessible Departments...")}
              />
            </div>
          )}

          {permissionsSelected.includes("emp_view_specific") && (
            <div>
              <label className="block text-sm font-medium">
                {t("Specific Employee")}
              </label>
              <Select
                {...register("accessibleEmps")}
                isMulti
                value={getDepartmentOptions(departments).filter(
                  (option: { value: string; label: string }) =>
                    specificEmp.includes(option.value)
                )}
                options={getDepartmentOptions(departments)}
                onChange={(selectedOptions) =>
                  setSpecificEmp(selectedOptions.map((option) => option.value))
                }
                className={`mt-1 text-tblackAF 
                
                ${
                  isLightMode
                    ? "bg-dark  placeholder:text-tdark "
                    : "bg-secondary"
                }
                outline-none border-none`}
                placeholder={t("Select Accessible Employees...")}
              />
            </div>
          )}

          {permissionsSelected.includes("job_title_view_specific") && (
            <div>
              <label className="block text-sm font-medium">
                {t("Specific Job Title")}
              </label>
              <Select
                {...register("accessibleJobTitles")}
                isMulti
                value={getDepartmentOptions(departments).filter(
                  (option: { value: string; label: string }) =>
                    specificJobTitle.includes(option.value)
                )}
                options={getDepartmentOptions(departments)}
                onChange={(selectedOptions) =>
                  setSpecificJobTitle(
                    selectedOptions.map((option) => option.value)
                  )
                }
                className={`mt-1 text-tblackAF 
                
                ${
                  isLightMode
                    ? "bg-dark  placeholder:text-tdark "
                    : "bg-secondary"
                }
                outline-none border-none`}
                placeholder={t("Select Accessible Job Titles...")}
              />
            </div>
          )}

          <div>
            <label className="block  text-sm font-medium">
              {t("Job Category")}
            </label>
            <select
              {...register("category")}
              className={`w-full px-4 py-2 mt-1 rounded-lg  
              
              ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }
              outline-none border-none   focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.category ? "border-red-500" : "border-border"
              }`}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
            >
              <option value="">{t("Select a Job Category")}</option>
              {categories &&
                categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    selected={selectedCategory == category.id}
                  >
                    {category.name}
                  </option>
                ))}
            </select>
            {errors.category && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.category.message}
              </p>
            )}
          </div>
          <div>
            <label className="block  text-sm font-medium">
              {t("Department")}
            </label>
            <select
              {...register("department_id")}
              className={`w-full px-4 py-2 mt-1 rounded-lg   
              
              ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }
              outline-none border-none  focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.department_id ? "border-red-500" : "border-border"
              }`}
              onChange={(e) => {
                setSelectedDept(e.target.value);
              }}
            >
              <option value="">{t("Select a department")}</option>
              {departments &&
                departments.map((dept) => (
                  <option
                    key={dept.id}
                    value={dept.id}
                    selected={selectedDept == dept.id}
                  >
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
          {/* Is Manager Checkbox */}
          <div className="flex items-center mt-2">
            <label className="text-sm font-medium mr-2">
              {t("Is Manager?")}
            </label>
            <input
              type="checkbox"
              checked={isManager}
              onChange={() => setIsManager(!isManager)}
              className={`form-checkbox cursor-pointer h-5 w-5 
              
              ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }
              outline-none border-none`}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-slate-600 
              ${isLightMode ? " text-tblackAF" : "text-twhite"}
            rounded-lg font-bold hover:bg-slate-700 transition duration-200 ${
              isPendingJobTitle ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPendingJobTitle}
          >
            {isPendingJobTitle
              ? jobTitleData
                ? t("Updating...")
                : t("Creating...")
              : jobTitleData
              ? t("Update Job Title")
              : t("Create Job Title")}
          </button>
          {isErrorJobTitle && (
            <p className="text-red-500 mt-2 text-center">
              {errorJobTitle + ""}
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

export default AddJobTitle;
