/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import Modal from "react-modal";
import { useQuery } from "@tanstack/react-query";
import CustomizedSnackbars from "@/components/common/CustomizedSnackbars";
import { useCreateMutation } from "@/hooks/useCreateMutation";

const baseUrl = process.env.BASE_URL || "";

const schema = yup.object().shape({
  name: yup.string().required("Department name is required"),
  description: yup.string().required("Description is required"),
  parentDepartmentId: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .nullable()
    .default(undefined),
});

interface DepartmentFormInputs {
  id: string;
  name: string;
  description: string;
  parentDepartmentId?: string;
}

interface CreateDepartmentProps {
  isOpen: boolean;
  onClose: () => void;
  departmentData?: DepartmentFormInputs | null;
}

const CreateDepartment: React.FC<CreateDepartmentProps> = ({
  isOpen,
  onClose,
  departmentData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DepartmentFormInputs>({
    resolver: yupResolver(schema) as any,
    defaultValues: departmentData || {},
  });

  React.useEffect(() => {
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

  const onSubmit = async (data: DepartmentFormInputs) => {
    addDepartment({
      name: data.name,
      description: data.description,
      ...(data.parentDepartmentId && {
        parent_department_id: data.parentDepartmentId,
      }),
    });

    setInterval(onClose, 3000);
  };

  useEffect(() => {
    if (isSuccessDepartment) {
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
      });
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
        `https://${baseUrl}/department/get-departments`,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      return response.data;
    },
  });
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Create/Update Department"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2  hover:text-accent"
        >
          &times;
        </button>
        <h1 className="text-center text-2xl  font-bold mb-6">
          {departmentData ? "Update Department" : "Create Department"}
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block  text-sm font-medium">
              Department Name
            </label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-4 py-2 mt-1 rounded-lg   placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.name ? "border-high" : "border-border"
              }`}
              placeholder="Enter department name"
            />
            {errors.name && (
              <p className="text-high mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block  text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              className={`w-full px-4 py-2 mt-1 rounded-lg   placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.description ? "border-high" : "border-border"
              }`}
              placeholder="Enter department description"
              rows={4}
            />
            {errors.description && (
              <p className="text-high mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="block  text-sm font-medium">
              Parent Department (Optional)
            </label>
            <select
              {...register("parentDepartmentId")}
              className={`w-full px-4 py-2 mt-1 rounded-lg   placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.parentDepartmentId ? "border-high" : "border-border"
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
            {errors.parentDepartmentId && (
              <p className="text-high mt-1 text-sm">
                {errors.parentDepartmentId.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-accent text-white rounded-lg font-bold hover:bg-opacity-90 transition duration-200 ${
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
    </Modal>
  );
};

export default CreateDepartment;
