/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DepartmentFormInputs,
  HandleManualSubmitOptions,
} from "@/types/departmentType.type";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setSelectedFiles: Dispatch<SetStateAction<File[]>>
) => {
  const files = event.target.files;
  if (files) {
    const newFiles = Array.from(files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }
};

export const handleRemoveFile = (
  index: number,
  setSelectedFiles: Dispatch<SetStateAction<File[]>>
) => {
  setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
};

export const handleAddNumericOwner = (
  appendNumericOwner: (value: { category: string; count: number }) => void
) => {
  appendNumericOwner({ category: "", count: 1 });
};

export const handleAddCategory = (
  newCategory: string,
  setNewCategory: Dispatch<SetStateAction<string>>,
  setRequiredCategoryOptions: Dispatch<SetStateAction<string[]>>,
  setIsAddingCategory: Dispatch<SetStateAction<boolean>>,
  setValue: UseFormSetValue<DepartmentFormInputs>
) => {
  if (newCategory.trim() !== "") {
    setRequiredCategoryOptions((prevOptions) => [...prevOptions, newCategory]);
    setValue("category", newCategory);
    setIsAddingCategory(false);
    setNewCategory("");
  }
};

export const handleManualSubmit = ({
  getValues,
  selectedFiles,
  addDepartment,
}: HandleManualSubmitOptions) => {
  const data = getValues();
  data.supportingFiles = selectedFiles.map((file) => file.name);
  addDepartment(data);
};
