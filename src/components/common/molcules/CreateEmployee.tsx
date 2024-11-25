/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import { DepartmentType } from "@/types/departmentType.type";
import { JobTitleType } from "@/types/JobTitle.type";
import { addEmpPopupSchema } from "@/schemas/employee.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import {
  CreateEmployeeProps,
  EmployeeFormInputs,
} from "@/types/employeeType.type";
import getErrorMessages from "@/utils/handleErrorMessages";
import useSnackbar from "@/hooks/useSnackbar";

const baseUrl = process.env.BASE_URL || "";

const CreateEmployee: React.FC<CreateEmployeeProps> = ({
  isOpen,
  onClose,
  employeeData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormInputs>({
    resolver: yupResolver(addEmpPopupSchema) as any,
    defaultValues: employeeData || {},
  });

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    if (employeeData) {
      reset(employeeData);
    } else {
      reset();
    }
  }, [employeeData, reset]);

  const { snackbarConfig, setSnackbarConfig } = useSnackbar();

  const endpoint = employeeData
    ? `/emp/update/${employeeData.id}`
    : `/emp/create`;

  const {
    mutate: addEmployee,
    isPending: isPendingEmployee,
    isSuccess: isSuccessEmployee,
    isError: isErrorEmployee,
    error: errorEmployee,
  } = useCreateMutation({
    endpoint: endpoint,
    onSuccessMessage: "Employee added successfully!",
    invalidateQueryKeys: ["employees"],
    setSnackbarConfig,
  });

  useEffect(() => {
    if (isSuccessEmployee) {
      setSnackbarConfig({
        open: true,
        message: employeeData
          ? "Employee updated successfully!"
          : "Employee created successfully!",
        severity: "success",
      });
      reset();
    } else if (isErrorEmployee) {
      console.error("Error creating/updating employee:", errorEmployee);
      setFeedbackMessage(
        errorEmployee + "" || "Failed to process the request. Please try again."
      );
    }
  }, [employeeData, errorEmployee, isErrorEmployee, isSuccessEmployee, reset]);

  const onSubmit = async (data: EmployeeFormInputs) => {
    setFeedbackMessage(null);
    addEmployee({
      name: data.name,
      dob: data.dob,
      phone: data.phone,
      email: data.email,
      address: data.address,
      department_id: data.department_id,
      job_id: data.job_id,
      password: !employeeData && data.password,
    });

    setInterval(onClose, 3000);
  };

  const { data: departments } = useCustomQuery<DepartmentType[]>({
    queryKey: ["departments"],
    url: `http://${baseUrl}/department/get-departments`,
    setSnackbarConfig,
  });
  const { data: jobs } = useCustomQuery<JobTitleType[]>({
    queryKey: ["jobTitles"],
    url: `http://${baseUrl}/job-titles/get-job-titles`,
    setSnackbarConfig,
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      getErrorMessages({ errors, setSnackbarConfig });
    }
  }, [errors, setSnackbarConfig]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Create/Update Employee"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-tblack hover:text-red-500"
        >
          &times;
        </button>
        <h1 className="text-center text-2xl font-bold mb-6">
          {employeeData ? "Update Employee" : "Create Employee"}
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div>
            <label className="block text-tdark text-sm font-medium">Name</label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter employee name"
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>
          {/* DOB Field */}
          <div>
            <label className="block text-tdark text-sm font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dob")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.dob ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter date of birth"
            />
            {errors.dob && (
              <p className="text-red-500 mt-1 text-sm">{errors.dob.message}</p>
            )}
          </div>
          {/* Phone Field */}
          <div>
            <label className="block text-tdark text-sm font-medium">
              Phone
            </label>
            <input
              type="text"
              {...register("phone")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>
          {/* Email Field */}
          <div>
            <label className="block text-tdark text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password Field */}
          {!employeeData && (
            <div>
              <label className="block text-tdark text-sm font-medium">
                Password
              </label>
              <input
                type="text"
                {...register("password")}
                className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}
          {/* Address Field */}
          <div>
            <label className="block text-tdark text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              {...register("address")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter address"
            />
            {errors.address && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.address.message}
              </p>
            )}
          </div>
          {/* Department Field */}

          <select
            {...register("department_id")}
            className={`w-full px-4 py-2 mt-1 rounded-lg border ${
              errors.department_id ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a department</option>
            {departments &&
              departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
          </select>
          {errors.department_id && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.department_id.message}
            </p>
          )}

          <select
            {...register("job_id")}
            className={`w-full px-4 py-2 mt-1 rounded-lg border ${
              errors.department_id ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a job title</option>
            {jobs &&
              jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
          </select>
          {errors.job_id && (
            <p className="text-red-500 mt-1 text-sm">{errors.job_id.message}</p>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-blue-600 text-twhite rounded-lg font-bold hover:bg-blue-700 transition duration-200 ${
              isPendingEmployee ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPendingEmployee}
          >
            {isPendingEmployee
              ? employeeData
                ? "Updating..."
                : "Creating..."
              : employeeData
              ? "Update Employee"
              : "Create Employee"}
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
    </Modal>
  );
};

export default CreateEmployee;
