"use client";

import { XIcon } from "@/assets";
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomizedSnackbars from "@/components/common/CustomizedSnackbars";
import GridContainer from "@/components/common/GridContainer";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

const baseUrl = process.env.BASE_URL || "";

const schema = yup.object().shape({
  name: yup.string().required("Department name is required"),
  description: yup.string().optional(),
  goal: yup.string().required("Goal is required"),
  category: yup.string().required("Category is required"),
  mainTasks: yup.string().required("Main tasks are required"),
  parentDepartmentId: yup.string().nullable().default(undefined),
  numericOwners: yup.array().of(
    yup.object().shape({
      category: yup.string(),
      count: yup.number(),
    })
  ),
  supportingFiles: yup.array().of(yup.mixed()).notRequired(),
  requiredReports: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      templateFile: yup.string(),
    })
  ),
  developmentPrograms: yup.array().of(
    yup.object().shape({
      programName: yup.string(),
      objective: yup.string(),
      notes: yup.string(),
      programFile: yup.string(),
    })
  ),
});

interface DepartmentFormInputs {
  id: string;
  name: string;
  description: string;
  goal: string;
  category: string;
  mainTasks: string;
  parentDepartmentId?: string;
  numericOwners: { category: string; count: number }[];
  supportingFiles: string[]; // File type here
  requiredReports: { name: string; templateFile: string }[];
  developmentPrograms: {
    programName: string;
    objective: string;
    notes?: string;
    programFile: string;
  }[];
}

const AddDept: React.FC = () => {
  const [departmentData, setDepartmentData] = useState<any | null>(null);
  const {
    register,
    getValues,
    control,
    formState: { errors },
    setValue,
    reset,
    handleSubmit,
  } = useForm<DepartmentFormInputs>({
    resolver: yupResolver(schema) as any,
    defaultValues: {},
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    // Retrieve the data from session storage
    const storedData = sessionStorage.getItem("departmentData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setDepartmentData(parsedData);
      reset(parsedData);
    }
  }, [reset]);

  const {
    fields: numericOwnersFields,
    append: appendNumericOwner,
    remove: removeNumericOwner,
  } = useFieldArray({
    control,
    name: "numericOwners",
  });
  const {
    fields: requiredReportsFields,
    append: appendRequiredReport,
    remove: removeRequiredReport,
  } = useFieldArray({
    control,
    name: "requiredReports",
  });
  const {
    fields: developmentProgramsFields,
    append: appendDevelopmentProgram,
    remove: removeDevelopmentProgram,
  } = useFieldArray({
    control,
    name: "developmentPrograms",
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Handle multiple file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  // Remove a selected file
  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (departmentData) {
      reset(departmentData);
    } else {
      reset();
    }
  }, [departmentData, reset]);

  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });

  const endpoint = departmentData
    ? `/department/updateDepartment/${departmentData.id}`
    : `/department/create-department`;

  const {
    mutate: addDepartment,
    isPending: isPendingDepartment,
    isSuccess: isSuccessDepartment,
    isError: isErrorDepartment,
    error: errorDepartment,
  } = useCreateMutation({
    endpoint: endpoint,
    onSuccessMessage: "Departments added successfully!",
    invalidateQueryKeys: ["departments"],
  });

  const handleManualSubmit = async () => {
    const data = getValues(); // Manually get form values

    // Set file names in supportingFiles
    data.supportingFiles = selectedFiles.map((fil) => fil.name);

    console.log("Form data with files:", data);

    // Proceed with submission if valid
    addDepartment(data);
  };

  useEffect(() => {
    if (isSuccessDepartment) {
      sessionStorage.clear();

      setSnackbarConfig({
        open: true,
        message: departmentData
          ? "Department updated successfully!"
          : "Department created successfully!",
        severity: "success",
      });

      reset({
        id: "",
        parentDepartmentId: "",
        description: "",
        name: "",
        goal: "",
        category: "",
        mainTasks: "",
        numericOwners: [],
        supportingFiles: [], // Reset supporting files
        requiredReports: [],
        developmentPrograms: [],
      });
      setSelectedFiles([]); // Clear file selection
    } else if (isErrorDepartment) {
      console.error("Failed to create/update the department", errorDepartment);
    }
  }, [
    departmentData,
    errorDepartment,
    isErrorDepartment,
    isSuccessDepartment,
    reset,
  ]);

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

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [requiredCategoryOptions, setRequiredCategoryOptions] = useState<
    string[]
  >(["primary-department", "secondary-department", "sub-department"]);
  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      // Add the new Category to the dropdown options
      setRequiredCategoryOptions((prevOptions) => [
        ...prevOptions,
        newCategory,
      ]);
      // Set the new value as selected
      setValue("category", newCategory);
      setIsAddingCategory(false);
      setNewCategory("");
    }
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`http://${baseUrl}/job-categories`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      return response.data;
    },
  });

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    if (categories) {
      setAvailableCategories(categories.map((category: any) => category.name)); // Set available categories
    }
  }, [categories]);

  const handleAddNumericOwner = () => {
    appendNumericOwner({ category: "", count: 1 });
  };

  return (
    <GridContainer>
      <div className="bg-white p-8 rounded-xl shadow-lg  w-full relative col-span-full">
        <h1 className=" text-2xl  font-bold mb-6">
          {departmentData ? "Update Department" : "Create Department"}
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(handleManualSubmit)}>
          <div className="flex gap-5 items-center justify-between">
            <div>
              <label className="block  text-sm font-medium">
                Department Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-2 mt-1 rounded-lg border"
                placeholder="Enter department name"
              />
              {errors.name && (
                <p className="text-high mt-1 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Goal</label>
              <input
                type="text"
                {...register("goal")}
                className="w-full px-4 py-2 mt-1 rounded-lg border"
                placeholder="Enter department goal"
              />
              {errors.goal && (
                <p className="text-high mt-1 text-sm">{errors.goal.message}</p>
              )}
            </div>
            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium">Category</label>
              <div className="flex gap-2 items-center">
                <select
                  {...register("category")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    errors.category ? "border-high" : "border-border"
                  }`}
                >
                  <option value="">Select Category</option>
                  {requiredCategoryOptions.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div
                  onClick={() => setIsAddingCategory(true)}
                  className="mt-1 border-gray-500 border-dashed border-2 text-center rounded-md w-[45px] h-[40px] content-center text-lg font-bold cursor-pointer"
                >
                  +
                </div>
              </div>
              {isAddingCategory && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border"
                    placeholder="Enter new Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="bg-blue-500 text-white rounded-md px-4 py-2"
                  >
                    Add
                  </button>
                </div>
              )}
              {errors.category && (
                <p className="text-high mt-1 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            {/*  */}
            <div>
              <label className="block text-sm font-medium">Main Tasks</label>
              <textarea
                {...register("mainTasks")}
                className="w-full px-4 py-2 mt-1 rounded-lg border"
                placeholder="Enter main tasks"
                rows={1}
              />
              {errors.mainTasks && (
                <p className="text-high mt-1 text-sm">
                  {errors.mainTasks.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Parent Department (Optional)
            </label>
            <select
              {...register("parentDepartmentId")}
              className="w-full px-4 py-2 mt-1 rounded-lg shadow-md"
            >
              <option value="">Select a parent department</option>
              {departments &&
                departments.map((dept: any) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
            </select>
            {errors.parentDepartmentId && (
              <p className="text-high mt-1 text-sm">
                {errors.parentDepartmentId.message}
              </p>
            )}
          </div>

          {/* Numeric Owners Section */}
          <div>
            <label className="block text-sm font-medium">Numeric Owners</label>
            {numericOwnersFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center">
                <select
                  {...register(`numericOwners.${index}.category` as const)}
                  className={`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                    errors.numericOwners?.[index]?.category
                      ? "border-high"
                      : "border-border"
                  }`}
                >
                  <option value="">Select a Job Category</option>
                  {availableCategories.map((category, i) => (
                    <option
                      key={i}
                      value={category}
                      onClick={handleAddNumericOwner}
                    >
                      {category}
                    </option>
                  ))}
                </select>
                {errors.numericOwners?.[index]?.category && (
                  <p className="text-high mt-1 text-sm">
                    {errors.numericOwners?.[index]?.category?.message}
                  </p>
                )}
                <input
                  type="number"
                  {...register(`numericOwners.${index}.count` as const)}
                  placeholder="Count"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <Image
                  src={XIcon}
                  alt="icon"
                  width={20}
                  height={20}
                  className="cursor-pointer p-1 shadow-md rounded-md text-red-500"
                  onClick={() => removeNumericOwner(index)} // Remove numeric owner
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendNumericOwner({ count: 1, category: "" })}
              className="text-sm text-blue-500"
            >
              Add Numeric Owner
            </button>
          </div>

          {/* Supporting Files Section */}
          <div>
            <div className="block text-sm font-medium">Supporting Files</div>

            <input
              hidden
              id="file-id"
              type="file"
              multiple // Allow multiple files
              onChange={handleFileChange} // Handle file selection
              className="w-full px-4 py-2 mt-1 rounded-lg"
            />
            {/* Display selected file names */}
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex gap-4 items-center">
                <span>{file.name}</span>
                <Image
                  src={XIcon}
                  alt="icon"
                  width={20}
                  height={20}
                  className="cursor-pointer p-1 shadow-md rounded-md text-red-500"
                  onClick={() => handleRemoveFile(index)} // Remove selected file
                />
              </div>
            ))}

            <label
              htmlFor="file-id"
              className="text-sm text-blue-500 cursor-pointer"
            >
              Attach Supporting File
            </label>
          </div>

          {/* Required Reports Section */}
          <div>
            <label className="block text-sm font-medium">
              Required Reports
            </label>
            {requiredReportsFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center">
                <input
                  type="text"
                  {...register(`requiredReports.${index}.name` as const)}
                  placeholder="Report Name"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <input
                  type="file"
                  placeholder="Template File"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                  onChange={(e) => {
                    const file = e.target.files?.[0]; // Get the selected file
                    if (file) {
                      setValue(
                        `requiredReports.${index}.templateFile` as const,
                        file.name
                      );
                    }
                  }}
                />
                <Image
                  src={XIcon}
                  alt="icon"
                  width={20}
                  height={20}
                  className="cursor-pointer p-1 shadow-md rounded-md text-red-500"
                  onClick={() => removeRequiredReport(index)} // Remove report
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                appendRequiredReport({ name: "", templateFile: "" })
              }
              className="text-sm text-blue-500"
            >
              Add Required Report
            </button>
          </div>

          {/* Development Programs Section */}
          <div>
            <label className="block text-sm font-medium">
              Development Programs
            </label>
            {developmentProgramsFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center">
                <input
                  type="text"
                  {...register(
                    `developmentPrograms.${index}.programName` as const
                  )}
                  placeholder="Program Name"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <input
                  type="text"
                  {...register(
                    `developmentPrograms.${index}.objective` as const
                  )}
                  placeholder="Objective"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />

                <input
                  type="file"
                  placeholder="Program File"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                  onChange={(e) => {
                    const file = e.target.files?.[0]; // Get the selected file
                    if (file) {
                      setValue(
                        `developmentPrograms.${index}.programFile` as const,
                        file.name
                      ); // Use correct template literal
                    }
                  }}
                />

                <textarea
                  {...register(`developmentPrograms.${index}.notes` as const)}
                  placeholder="Notes"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                  rows={1}
                />
                <Image
                  src={XIcon}
                  alt="icon"
                  width={20}
                  height={20}
                  className="cursor-pointer p-1 shadow-md rounded-md text-red-500"
                  onClick={() => removeDevelopmentProgram(index)} // Remove program
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                appendDevelopmentProgram({
                  programName: "",
                  objective: "",
                  notes: "",
                  programFile: "",
                })
              }
              className="text-sm text-blue-500"
            >
              Add Development Program
            </button>
          </div>

          <button
            type="submit" // Change to "button" to avoid default form submission
            className={`w-full py-2 mt-4 bg-[#413d99] text-white rounded-lg font-bold hover:bg-opacity-90 transition duration-200 ${
              isPendingDepartment ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPendingDepartment}
          >
            {isPendingDepartment
              ? departmentData
                ? "Updating..."
                : "Creating..."
              : departmentData
              ? "Update Department"
              : "Create Department"}
          </button>
          {isErrorDepartment && (
            <p className="text-high mt-2 text-center">{errorDepartment + ""}</p>
          )}
          {isSuccessDepartment && (
            <p className="text-low mt-2 text-center">Successful</p>
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

export default AddDept;
