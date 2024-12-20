/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { XIcon } from "@/assets";
import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import useCustomTheme from "@/hooks/useCustomTheme";
import useQueryPageData from "@/hooks/useQueryPageData";
import useSnackbar from "@/hooks/useSnackbar";
import { addDeptSchema } from "@/schemas/department.schema";
import {
  handleAddCategory,
  handleAddNumericOwner,
  handleManualSubmit,
} from "@/services/department.service";
import {
  DepartmentFormInputs,
  DepartmentType,
} from "@/types/DepartmentType.type";
import { JobCategoryType } from "@/types/JobTitle.type";
import { DeptTree } from "@/types/trees/Department.tree.type";
import getErrorMessages from "@/utils/handleErrorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const baseUrl = process.env.BASE_URL || "";

const AddDept: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { snackbarConfig, setSnackbarConfig } = useSnackbar();
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [requiredCategoryOptions, setRequiredCategoryOptions] = useState<
    string[]
  >(["primary-department", "secondary-department", "sub-department"]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const {
    register,
    getValues,
    control,
    formState: { errors },
    setValue,
    reset,
    handleSubmit,
  } = useForm<DepartmentFormInputs>({
    resolver: yupResolver(addDeptSchema) as any,
    defaultValues: {},
  });
  const { t } = useTranslation();
  const router = useRouter();

  const departmentData = useQueryPageData<DepartmentFormInputs>(reset);
  console.log(departmentData);
  const { isLightMode } = useCustomTheme();
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

  const { data: departments } = useCustomQuery<{
    info: DepartmentType[];
    tree: DeptTree[];
  }>({
    queryKey: ["departments"],
    url: `https://${baseUrl}/department/tree`,
    setSnackbarConfig,
  });
  const { data: categories } = useCustomQuery<JobCategoryType[]>({
    queryKey: ["categories"],
    url: `https://${baseUrl}/job-categories`,
    setSnackbarConfig,
  });

  const {
    mutate: addDepartment,
    isPending: isPendingDepartment,
    isSuccess: isSuccessDepartment,
    isError: isErrorDepartment,
    error: errorDepartment,
  } = useCreateMutation({
    endpoint: departmentData
      ? `/department/updateDepartment/${departmentData.id}`
      : `/department/create-department`,
    onSuccessMessage: "Departments added successfully!",
    invalidateQueryKeys: ["departments"],
    setSnackbarConfig,
    onSuccessFn: () => {
      reset({
        id: "",
        parent_department_id: "",
        description: "",
        name: "",
        goal: "",
        category: "",
        mainTasks: "",
        numericOwners: [],
        supportingFiles: [],
        requiredReports: [],
        developmentPrograms: [],
      });
      setSelectedFiles([]);
      setTimeout(() => router.back(), 1000);
    },
  });

  useEffect(() => {
    if (categories) {
      setAvailableCategories(categories.map((category) => category.name));
    }
  }, [categories]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      getErrorMessages({ errors, setSnackbarConfig });
    }
  }, [errors, setSnackbarConfig]);
  useEffect(() => {
    if (departmentData) {
      reset({
        ...departmentData,
        parent_department_id:
          departmentData.parent_department &&
          departmentData.parent_department._id,
      });
    } else {
      reset();
    }
  }, [departmentData, reset, categories]);

  return (
    <GridContainer>
      <div
        className={`${
          isLightMode ? "bg-light-droppable-fade" : "bg-droppable-fade"
        }  p-8 rounded-xl shadow-lg  w-full  col-span-full  text-twhite`}
      >
        <h1 className=" text-2xl text-twhite font-bold mb-6">
          {departmentData ? t("Update Department") : t("Create Department")}
        </h1>
        <form
          className="space-y-4 text-twhite"
          onSubmit={handleSubmit(() =>
            handleManualSubmit({
              getValues,
              selectedFiles,
              addDepartment,
            })
          )}
        >
          <div className="flex gap-5 items-center justify-between">
            <div>
              <label className="text-tmid block  text-sm font-medium">
                {t("Department Name")}
              </label>
              <input
                type="text"
                {...register("name")}
                className={`    ${
                  isLightMode
                    ? "bg-dark  placeholder:text-tdark "
                    : "bg-secondary"
                }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
                placeholder={t("Enter department name")}
              />
              {errors.name && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-tmid block text-sm font-medium">
                {t("Goal")}
              </label>
              <input
                type="text"
                {...register("goal")}
                className={`    ${
                  isLightMode
                    ? "bg-dark  placeholder:text-tdark "
                    : "bg-secondary"
                }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
                placeholder={t("Enter department goal")}
              />
              {errors.goal && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.goal.message}
                </p>
              )}
            </div>
            {/* Category Field */}
            <div>
              <label className="text-tmid block text-sm font-medium">
                {t("Category")}
              </label>
              <div className="flex gap-2 items-center">
                <select
                  {...register("category")}
                  className={`
                   ${
                     isLightMode
                       ? "bg-dark  placeholder:text-tdark "
                       : "bg-secondary"
                   } w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border
               ${errors.category ? "border-high" : "border-border"}`}
                >
                  <option value="">{t("Select Category")}</option>
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
                    className={`    ${
                      isLightMode
                        ? "bg-dark  placeholder:text-tdark "
                        : "bg-secondary"
                    }  w-full  bg-secondary border-none outline-none  px-4 py-2 rounded-lg border `}
                    placeholder={t("Enter new Category")}
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleAddCategory(
                        newCategory,
                        setNewCategory,
                        setRequiredCategoryOptions,
                        setIsAddingCategory,
                        setValue
                      );
                    }}
                    className="bg-blue-500 text-twhite rounded-md px-4 py-2"
                  >
                    {t("Add")}
                  </button>
                </div>
              )}
              {errors.category && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            {/*  */}
          </div>
          <div>
            <label className="text-tmid block text-sm font-medium">
              {t("Main Tasks")}
            </label>
            <textarea
              {...register("mainTasks")}
              className={`    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
              placeholder={t("Enter main tasks")}
              rows={1}
            />
            {errors.mainTasks && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.mainTasks.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-tmid block text-sm font-medium">
              {t("Parent Department")}
            </label>
            <select
              {...register("parent_department_id")}
              className={`    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg shadow-md `}
            >
              <option value="">{t("Select a parent department")}</option>
              {departments &&
                departments.tree &&
                departments.tree.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
            </select>
            {errors.parent_department_id && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.parent_department_id.message}
              </p>
            )}
          </div>

          {/* Numeric Owners Section */}
          <div>
            <label className="text-tmid block text-sm font-medium">
              {t("Numeric Owners")}
            </label>
            {numericOwnersFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center">
                <select
                  {...register(`numericOwners.${index}.category` as const)}
                  className={`    ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  } w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                    errors.numericOwners?.[index]?.category
                      ? "border-high"
                      : "border-border"
                  }`}
                >
                  <option value="">{t("Select a Job Category")}</option>
                  {availableCategories.map((category, i) => (
                    <option
                      key={i}
                      value={category}
                      onClick={() => handleAddNumericOwner(appendNumericOwner)}
                    >
                      {category}
                    </option>
                  ))}
                </select>
                {errors.numericOwners?.[index]?.category && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.numericOwners?.[index]?.category?.message}
                  </p>
                )}
                <input
                  type="number"
                  {...register(`numericOwners.${index}.count` as const)}
                  placeholder={t("Count")}
                  className={`    ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
                />
                <Image
                  src={XIcon}
                  alt="icon"
                  width={30}
                  height={30}
                  className=" bg-main cursor-pointer p-1 shadow-md rounded-md text-red-500"
                  onClick={() => removeNumericOwner(index)} // Remove numeric owner
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendNumericOwner({ count: 1, category: "" })}
              className="text-sm text-tbright underline"
            >
              {t("Add Numeric Owner")}
            </button>
          </div>

          {/* Supporting Files Section */}
          <div>
            {/* <div className="block text-tmid text-sm font-medium">
              {t("Supporting Files")}
            </div>

            <input
              hidden
              id="file-id"
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, setSelectedFiles)} 
              className={`    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg `}
            /> */}
            {/* Display selected file names */}
            {/* {selectedFiles.map((file, index) => (
              <div key={index} className="flex gap-4 items-center">
                <span>{file.name}</span>
                <Image
                  src={XIcon}
                  alt="icon"
                  width={30}
                  height={30}
                  className=" bg-main cursor-pointer p-1 shadow-md rounded-md text-red-500"
                  onClick={() => handleRemoveFile(index, setSelectedFiles)} // Remove selected file
                />
              </div>
            ))}

            <label
              htmlFor="text-tmid file-id"
              className="text-sm text-tbright underline cursor-pointer"
            >
              {t("Attach Supporting File")}
            </label> */}
          </div>

          {/* Required Reports Section */}
          <div>
            <label className="text-tmid block text-sm font-medium">
              {t("Required Reports")}
            </label>
            {requiredReportsFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center">
                <input
                  type="text"
                  {...register(`requiredReports.${index}.name` as const)}
                  placeholder={t("Report Name")}
                  className={`    ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
                />
                <input
                  type="file"
                  placeholder={t("Template File")}
                  className={`    ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
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
                  width={30}
                  height={30}
                  className=" bg-main cursor-pointer p-1 shadow-md rounded-md text-red-500"
                  onClick={() => removeRequiredReport(index)} // Remove report
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                appendRequiredReport({ name: "", templateFile: "" })
              }
              className="text-sm text-tbright underline"
            >
              {t("Add Required Report")}
            </button>
          </div>

          {/* Development Programs Section */}
          <div>
            <label className="text-tmid block text-sm font-medium">
              {t("Development Programs")}
            </label>
            {developmentProgramsFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center">
                <input
                  type="text"
                  {...register(
                    `developmentPrograms.${index}.programName` as const
                  )}
                  placeholder={t("Program Name")}
                  className={`    ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
                />
                <input
                  type="text"
                  {...register(
                    `developmentPrograms.${index}.objective` as const
                  )}
                  placeholder={t("Objective")}
                  className={`    ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  } w-full bg-secondary border-none outline-none px-4 py-2 mt-1 rounded-lg border `}
                />

                <input
                  type="file"
                  placeholder={t("Program File")}
                  className={`    ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
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
                  placeholder={t("Notes")}
                  className={`    ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
                  rows={1}
                />
                <Image
                  src={XIcon}
                  alt="icon"
                  width={30}
                  height={30}
                  className=" bg-main cursor-pointer p-1 shadow-md rounded-md text-red-500"
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
              className="text-sm text-tbright underline"
            >
              {t("Add Development Program")}
            </button>
          </div>

          <button
            type="submit" // Change to "button" to avoid default form submission
            className={`w-full py-2 mt-4 bg-slate-600  rounded-lg font-bold hover:bg-slate-700 transition duration-300 ${
              isPendingDepartment ? "opacity-50 cursor-not-allowed" : ""
            }
            
            ${isLightMode ? " text-tblackAF" : "text-twhite"}

            `}
            disabled={isPendingDepartment}
          >
            {isPendingDepartment
              ? departmentData
                ? t("Updating...")
                : t("Creating...")
              : departmentData
              ? t("Update Department")
              : t("Create Department")}
          </button>
          {isErrorDepartment && (
            <p className="text-red-500 mt-2 text-center">
              {errorDepartment + ""}
            </p>
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
