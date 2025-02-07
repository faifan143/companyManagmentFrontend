/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import GridContainer from "@/components/common/atoms/GridContainer";
import AddCategoryField from "@/components/common/atoms/departments/AddCategoryField";
import DeptAdditionalSection from "@/components/common/atoms/departments/DeptAdditionalSection";
import DeptFormInput from "@/components/common/atoms/departments/DeptFormInput";
import { useAddDeptLogic } from "@/hooks/departments/useAddDepartment";
import { useAddDeptForm } from "@/hooks/departments/useAddDeptForm";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useCustomTheme from "@/hooks/useCustomTheme";
import {
  handleAddCategory,
  handleAddNumericOwner,
  handleManualSubmit,
} from "@/services/department.service";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const AddDept = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isLightMode } = useCustomTheme();

  const {
    appendDevelopmentProgram,
    appendNumericOwner,
    appendRequiredReport,
    developmentProgramsFields,
    errors,
    getValues,
    handleSubmit,
    numericOwnersFields,
    register,
    removeDevelopmentProgram,
    removeNumericOwner,
    removeRequiredReport,
    requiredReportsFields,
    setValue,
    reset,
  } = useAddDeptForm();

  const {
    availableCategories,
    departmentData,
    departments,
    isAddingCategory,
    newCategory,
    requiredCategoryOptions,
    selectedFiles,
    setIsAddingCategory,
    setNewCategory,
    setRequiredCategoryOptions,
    setSelectedFiles,
    setSnackbarConfig,
  } = useAddDeptLogic(reset);

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
            <DeptFormInput
              label="Department Name"
              placeholder={t("Enter department name")}
              value={departmentData && departmentData.name}
              onChange={(e) => setValue("name", e.target.value)}
            />
            <DeptFormInput
              label="Goal"
              placeholder={t("Enter department goal")}
              value={departmentData && departmentData.goal}
              onChange={(e) => setValue("goal", e.target.value)}
            />

            {/* Category Field */}
            <div className="w-full">
              <DeptFormInput
                type="select"
                label={t("Category")}
                placeholder={t("Select Category")}
                selectOptions={requiredCategoryOptions}
                value={departmentData && departmentData.category}
                onChange={(e) => setValue("category", e.target.value)}
                showAddButton={true}
                onAddClick={() => setIsAddingCategory(true)}
              />
              {isAddingCategory && (
                <AddCategoryField
                  newCategory={newCategory}
                  setNewCategory={setNewCategory}
                  onClick={() =>
                    handleAddCategory(
                      newCategory,
                      setNewCategory,
                      setRequiredCategoryOptions,
                      setIsAddingCategory,
                      setValue
                    )
                  }
                />
              )}
              {errors.category && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <DeptFormInput
            isTextArea={true}
            label={t("Main Tasks")}
            placeholder={t("Enter main tasks")}
            value={departmentData && departmentData.mainTasks}
            onChange={(e) => setValue("mainTasks", e.target.value)}
            rows={2}
          />

          <DeptFormInput
            type="select"
            label={t("Parent Department")}
            value={departmentData && departmentData.parent_department}
            onChange={(e) => setValue("parent_department_id", e.target.value)}
            placeholder={t("Select a parent department")}
            selectOptions={
              departments &&
              departments.tree.map((dept) => {
                return { label: dept.name, value: dept.id };
              })
            }
          />

          <DeptAdditionalSection
            appendDevelopmentProgram={appendDevelopmentProgram}
            appendNumericOwner={appendNumericOwner}
            appendRequiredReport={appendRequiredReport}
            availableCategories={availableCategories}
            developmentProgramsFields={developmentProgramsFields}
            errors={errors}
            handleAddNumericOwner={handleAddNumericOwner}
            numericOwnersFields={numericOwnersFields}
            register={register}
            removeDevelopmentProgram={removeDevelopmentProgram}
            removeNumericOwner={removeNumericOwner}
            removeRequiredReport={removeRequiredReport}
            requiredReportsFields={requiredReportsFields}
            setValue={setValue}
          />

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
    </GridContainer>
  );
};

export default AddDept;
