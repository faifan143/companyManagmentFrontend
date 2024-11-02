/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomizedSnackbars from "@/components/common/CustomizedSnackbars";
import GridContainer from "@/components/common/GridContainer";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useCustomQuery from "@/hooks/useCustomQuery";
import { DepartmentType } from "@/types/DepartmentType.type";
import {
  EditJobTitleType,
  JobCategoryType,
  JobTitleFormInputs,
  JobTitleType,
} from "@/types/JobTitle.type";
import { permissionsArray } from "@/utils/all_permissions";
import Select from "react-select"; // Importing React Select
import { addTitleSchema } from "@/schemas/job.schema";

const baseUrl = process.env.BASE_URL || "";

const permissionsOptions = permissionsArray.map((permission) => ({
  value: permission,
  label: permission.replace(/_/g, " ").toUpperCase(),
}));

const AddJobTitle: React.FC = () => {
  const [permissionsMode, setPermissionsMode] = useState("default");
  const [permissionsSelected, setPermissionsSelected] = useState<string[]>([]);
  const [specificDept, setSpecificDept] = useState<string[]>([]);
  const [specificEmp, setSpecificEmp] = useState<string[]>([]);
  const [specificJobTitle, setSpecificJobTitle] = useState<string[]>([]);

  const [jobTitleData, setJobTitleData] = useState<EditJobTitleType | null>(
    null
  );
  const [isManager, setIsManager] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<JobTitleFormInputs>({
    resolver: yupResolver(addTitleSchema) as any,
    defaultValues: jobTitleData || {
      name: "",
      title: "",
      grade_level: "",
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
  useEffect(() => {
    console.log("Validation errors:", errors);
  }, [errors]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("jobData");
    if (storedData) {
      const parsedData: JobTitleType = JSON.parse(storedData);

      const formData: EditJobTitleType = {
        ...parsedData,
        department_id: parsedData.department.id,
        category: parsedData.category.id,
      };

      setJobTitleData(formData);
      reset(formData);

      // Initialize multi-select values and other specific fields
      setPermissionsSelected(parsedData.permissions || []);
      setIsManager(parsedData.is_manager);
    }
  }, [reset]);

  // ///////////////////////////////////

  React.useEffect(() => {
    if (jobTitleData) {
      reset(jobTitleData);
    } else {
      reset();
    }
  }, [jobTitleData, reset]);

  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });

  const endpoint = jobTitleData
    ? `/job-titles/update/${jobTitleData.id}`
    : `/job-titles/create`;
  const {
    mutate: addJobTitle,
    isPending: isPendingJobTitle,
    isSuccess: isSuccessJobTitle,
    isError: isErrorJobTitle,
    error: errorJobTitle,
  } = useCreateMutation({
    endpoint: endpoint,
    onSuccessMessage: "Job Title added successfully!",
    invalidateQueryKeys: ["jobTitles"],
  });

  const onSubmit = async (data: any) => {
    console.log("Form data before submission:", {
      ...data,
      permissions: permissionsSelected,
      is_manager: isManager,
      accessibleDepartments: specificDept,
      accessibleEmps: specificEmp,
      accessibleJobTitles: specificJobTitle,
    });

    addJobTitle({
      ...data,
      permissions: permissionsSelected,
      is_manager: isManager,
      accessibleDepartments: specificDept,
      accessibleEmps: specificEmp,
      accessibleJobTitles: specificJobTitle,
    });
  };

  useEffect(() => {
    if (isSuccessJobTitle) {
      sessionStorage.clear();

      reset({
        id: "",
        name: "",
        title: "",
        grade_level: "",
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
    } else if (isErrorJobTitle) {
      console.error("Failed to create/update the job title", errorJobTitle);
    }
  }, [errorJobTitle, isErrorJobTitle, isSuccessJobTitle, jobTitleData, reset]);

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

  useEffect(() => {
    console.log(specificDept);
  }, [specificDept]);
  useEffect(() => {
    console.log(specificEmp);
  }, [specificEmp]);
  useEffect(() => {
    console.log(specificJobTitle);
  }, [specificJobTitle]);

  const departmentOptions = departments
    ? departments.map((dept: any) => ({
        value: dept.id,
        label: dept.name,
      }))
    : [];

  const handlePermissionsChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setPermissionsSelected(selectedValues);

    // Update dropdowns only if relevant permissions are selected
    if (selectedValues.includes("department_view_specific")) {
      setSpecificDept(specificDept);
    } else {
      setSpecificDept([]);
    }

    if (selectedValues.includes("emp_view_specific")) {
      setSpecificEmp(specificEmp);
    } else {
      setSpecificEmp([]);
    }

    if (selectedValues.includes("job_title_view_specific")) {
      setSpecificJobTitle(specificJobTitle);
    } else {
      setSpecificJobTitle([]);
    }
  };

  useEffect(() => {
    const handleUnload = () => {
      reset(); // Reset the form
      sessionStorage.removeItem("jobData"); // Clear session storage if needed
    };

    // Listen for backward/forward navigation (popstate) and page unload (beforeunload)
    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("popstate", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("popstate", handleUnload);
    };
  }, [reset]);

  return (
    <GridContainer>
      <div className="bg-white p-8 rounded-xl shadow-lg col-span-12 w-full relative">
        <h1 className="text-center text-2xl  font-bold mb-6">
          {jobTitleData ? "Update Job Title" : "Create Job Title"}
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block  text-sm font-medium">Job Title Name</label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-4 py-2 mt-1 rounded-lg     focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.name ? "border-high" : "border-border"
              }`}
              placeholder="Enter job title name"
            />
            {errors.name && (
              <p className="text-high mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block  text-sm font-medium">Title</label>
            <input
              type="text"
              {...register("title")}
              className={`w-full px-4 py-2 mt-1 rounded-lg     focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.title ? "border-high" : "border-border"
              }`}
              placeholder="Enter job title"
            />
            {errors.title && (
              <p className="text-high mt-1 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block  text-sm font-medium">Description</label>
            <input
              type="text"
              {...register("description")}
              className={`w-full px-4 py-2 mt-1 rounded-lg     focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.description ? "border-high" : "border-border"
              }`}
              placeholder="Enter job description"
            />
            {errors.description && (
              <p className="text-high mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="block  text-sm font-medium">Grade Level</label>
            <input
              type="text"
              {...register("grade_level")}
              className={`w-full px-4 py-2 mt-1 rounded-lg     focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.grade_level ? "border-high" : "border-border"
              }`}
              placeholder="Enter grade level"
            />
            {errors.grade_level && (
              <p className="text-high mt-1 text-sm">
                {errors.grade_level.message}
              </p>
            )}
          </div>
          <div>
            <label className="block  text-sm font-medium">
              Responsibilities
            </label>

            <textarea
              className={`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.responsibilities ? "border-high" : "border-border"
              }`}
              placeholder="Enter responsibilities (comma-separated)"
              rows={3}
              onChange={(event) => {
                const values = event.target.value.split(",");
                console.log(values);
                setValue("responsibilities", values);
              }}
            />

            {errors.responsibilities && (
              <p className="text-high mt-1 text-sm">
                {errors.responsibilities.message}
              </p>
            )}
          </div>

          {/* Permissions Toggle */}
          <div>
            <label className="block text-sm font-medium">
              Permissions Mode
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
                Default
              </label>
              <label>
                <input
                  type="radio"
                  value="custom"
                  checked={permissionsMode === "custom"}
                  onChange={() => setPermissionsMode("custom")}
                />
                Custom
              </label>
            </div>
          </div>

          {/* Custom Permissions Multi-select */}
          {permissionsMode === "custom" && (
            <div>
              <label className="block text-sm font-medium">
                Select Permissions
              </label>
              <Select
                isMulti
                value={permissionsOptions.filter((option) =>
                  permissionsSelected.includes(option.value)
                )}
                options={permissionsOptions}
                onChange={handlePermissionsChange}
                className="mt-1"
                placeholder="Select Permissions..."
              />
            </div>
          )}

          {/* Conditional Dropdowns */}
          {permissionsSelected.includes("department_view_specific") && (
            <div>
              <label className="block text-sm font-medium">
                Specific Department
              </label>

              <Select
                {...register("accessibleDepartments")}
                isMulti
                value={departmentOptions.filter(
                  (option: { value: string; label: string }) =>
                    specificDept.includes(option.value)
                )}
                options={departmentOptions}
                onChange={(selectedOptions) =>
                  setSpecificDept(
                    selectedOptions.map((option: any) => option.value)
                  )
                }
                className="mt-1"
                placeholder="Select Accessible Departments..."
              />
            </div>
          )}

          {permissionsSelected.includes("emp_view_specific") && (
            <div>
              <label className="block text-sm font-medium">
                Specific Employee
              </label>
              <Select
                {...register("accessibleEmps")}
                isMulti
                value={departmentOptions.filter(
                  (option: { value: string; label: string }) =>
                    specificEmp.includes(option.value)
                )}
                options={departmentOptions}
                onChange={(selectedOptions) =>
                  setSpecificEmp(
                    selectedOptions.map((option: any) => option.value)
                  )
                }
                className="mt-1"
                placeholder="Select Accessible Employees..."
              />
            </div>
          )}

          {permissionsSelected.includes("job_title_view_specific") && (
            <div>
              <label className="block text-sm font-medium">
                Specific Job Title
              </label>
              <Select
                {...register("accessibleJobTitles")}
                isMulti
                value={departmentOptions.filter(
                  (option: { value: string; label: string }) =>
                    specificJobTitle.includes(option.value)
                )}
                options={departmentOptions}
                onChange={(selectedOptions) =>
                  setSpecificJobTitle(
                    selectedOptions.map((option: any) => option.value)
                  )
                }
                className="mt-1"
                placeholder="Select Accessible Job Titles..."
              />
            </div>
          )}

          <div>
            <label className="block  text-sm font-medium">Job Category</label>
            <select
              {...register("category")}
              className={`w-full px-4 py-2 mt-1 rounded-lg     focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.category ? "border-high" : "border-border"
              }`}
            >
              <option value="">Select a Job Category</option>
              {categories &&
                categories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
            {errors.category && (
              <p className="text-high mt-1 text-sm">
                {errors.category.message}
              </p>
            )}
          </div>
          <div>
            <label className="block  text-sm font-medium">
              Parent Department (Optional)
            </label>
            <select
              {...register("department_id")}
              className={`w-full px-4 py-2 mt-1 rounded-lg     focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.department_id ? "border-high" : "border-border"
              }`}
            >
              <option value="">Select a parent department</option>
              {departments &&
                departments.map((dept: any) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
            </select>
            {errors.department_id && (
              <p className="text-high mt-1 text-sm">
                {errors.department_id.message}
              </p>
            )}
          </div>
          {/* Is Manager Checkbox */}
          <div className="flex items-center mt-2">
            <label className="text-sm font-medium mr-2">Is Manager?</label>
            <input
              type="checkbox"
              checked={isManager}
              onChange={() => setIsManager(!isManager)}
              className="form-checkbox text-blue-600 h-5 w-5"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-[#413d99] text-white rounded-lg font-bold hover:bg-opacity-90 transition duration-200 ${
              isPendingJobTitle ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPendingJobTitle}
          >
            {isPendingJobTitle
              ? jobTitleData
                ? "Updating..."
                : "Creating..."
              : jobTitleData
              ? "Update Job Title"
              : "Create Job Title"}
          </button>
          {isErrorJobTitle && (
            <p className="text-high mt-2 text-center">{errorJobTitle + ""}</p>
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
