/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EmployeeFormInputs,
  HandleDeleteEmployeeClick,
  HandleSubmitOptions,
} from "@/types/EmployeeType.type";
import { apiClient } from "@/utils/axios";
import { UseFormSetValue } from "react-hook-form";

export const handleFormSubmit = ({
  data,
  addEmployee,
}: HandleSubmitOptions) => {
  addEmployee(data);
};

export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  index: number,
  fieldType: "legal_documents" | "certifications",
  setValue: UseFormSetValue<EmployeeFormInputs>
) => {
  const file = event.target.files?.[0] || null;
  if (file) {
    if (fieldType === "legal_documents") {
      setValue(`legal_documents.${index}.file`, file.name || "", {
        shouldValidate: true,
      });
    } else if (fieldType === "certifications") {
      setValue(`certifications.${index}.file`, file.name || "", {
        shouldValidate: true,
      });
    }
  }
};

export const handleDeleteClick = async ({
  id,
  refetch,
}: HandleDeleteEmployeeClick) => {
  try {
    await apiClient.delete(`/emp/delete/${id}`);
    refetch();
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};
