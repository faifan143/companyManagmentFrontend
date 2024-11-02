/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomizedSnackbars from "@/components/common/CustomizedSnackbars";
import GridContainer from "@/components/common/GridContainer";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import { DepartmentType } from "@/types/DepartmentType.type";
import { JobTitleType } from "@/types/JobTitle.type";
import { addEmpSchema } from "@/schemas/employee.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { EmployeeFormInputs } from "@/types/EmployeeType.type";

const baseUrl = process.env.BASE_URL || "";

const AddEmp: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<EmployeeFormInputs>({
    resolver: yupResolver(addEmpSchema) as any,
    defaultValues: employeeData || {},
  });

  useEffect(() => {
    console.log("validation error : ", errors);
  }, [errors]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("employeeData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setEmployeeData(parsedData);
      reset(parsedData);
    }
  }, [reset]);

  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });
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

  const endpoint = employeeData
    ? `/emp/update/${employeeData.id}`
    : `/emp/create`;

  const { mutate: addEmployee, isPending: isPendingEmployee } =
    useCreateMutation({
      endpoint: endpoint,
      onSuccessMessage: "Employee added successfully!",
      invalidateQueryKeys: ["employees"],
    });

  const onSubmit = async (data: EmployeeFormInputs) => {
    console.log(" data  : ", data);

    // Submit the form
    addEmployee(data, {
      onSuccess: () => {
        sessionStorage.clear();

        // Show success snackbar
        setSnackbarConfig({
          open: true,
          message: employeeData
            ? "Employee updated successfully!"
            : "Employee created successfully!",
          severity: "success",
        });

        // Reset the form after successful submission
        reset();
      },
      onError: () => {
        // Show error snackbar
        setSnackbarConfig({
          open: true,
          message: "An error occurred. Please try again.",
          severity: "error",
        });
      },
    });
  };

  // Legal Documents Field Array
  const {
    fields: legalDocumentFields,
    append: appendLegalDocument,
    remove: removeLegalDocument,
  } = useFieldArray({
    control,
    name: "legal_documents",
  });

  // Certifications Field Array
  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  // Allowances Field Array
  const {
    fields: allowancesFields,
    append: appendAllowance,
    remove: removeAllowance,
  } = useFieldArray({
    control,
    name: "allowances",
  });

  // Incentives Field Array
  const {
    fields: incentivesFields,
    append: appendIncentive,
    remove: removeIncentive,
  } = useFieldArray({
    control,
    name: "incentives",
  });

  // Bank Accounts Field Array
  const {
    fields: bankAccountsFields,
    append: appendBankAccount,
    remove: removeBankAccount,
  } = useFieldArray({
    control,
    name: "bank_accounts",
  });

  const {
    fields: evaluationsFields,
    append: appendEvaluation,
    remove: removeEvaluation,
  } = useFieldArray({
    control,
    name: "evaluations",
  });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldType: "legal_documents" | "certifications"
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

  return (
    <GridContainer>
      <div className="bg-white p-8 rounded-xl shadow-lg col-span-12 w-full relative">
        <h1 className="text-center text-2xl font-bold mb-6">
          {employeeData ? "Update Employee" : "Create Employee"}
        </h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          {/* Name Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Name
            </label>
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
          {/* Email Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              {...register("email")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter Employee Email"
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Phone Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Phone
            </label>
            <input
              type="text"
              {...register("phone")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter Employee phone"
            />
            {errors.phone && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>
          {/* Passwword Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Password
            </label>
            <input
              type="text"
              {...register("password")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter Employee Password"
            />
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* National ID Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              National ID
            </label>
            <input
              type="text"
              {...register("national_id")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.national_id ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter national ID"
            />
            {errors.national_id && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.national_id.message}
              </p>
            )}
          </div>
          {/* Address Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              {...register("address")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter Address"
            />
            {errors.address && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.address.message}
              </p>
            )}
          </div>
          {/* emergency contact Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Contact Emergency
            </label>
            <input
              type="text"
              {...register("emergency_contact")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter Address"
            />
            {errors.address && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.address.message}
              </p>
            )}
          </div>
          {/* DOB Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Date Of Birth
            </label>
            <input
              type="date"
              {...register("dob")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.dob ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter employment date"
            />
            {errors.dob && (
              <p className="text-red-500 mt-1 text-sm">{errors.dob.message}</p>
            )}
          </div>

          {/* Gender Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Gender
            </label>
            <select
              {...register("gender")}
              className={`w-full px-4 py-2 mt-1 rounded-lg   placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.gender ? "border-high" : "border-border"
              }`}
            >
              <option value="">Select a gender</option>
              {["male", "female", "undefined"].map((gender, index: number) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Marital Status Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Marital Status
            </label>
            <select
              {...register("marital_status")}
              className={`w-full px-4 py-2 mt-1 rounded-lg   placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.marital_status ? "border-high" : "border-border"
              }`}
            >
              <option value="">Select a marital status</option>
              {["single", "married"].map((status, index: number) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.marital_status && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.marital_status.message}
              </p>
            )}
          </div>

          {/* Employment Date Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Employment Date
            </label>
            <input
              type="date"
              {...register("employment_date")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.employment_date ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter employment date"
            />
            {errors.employment_date && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.employment_date.message}
              </p>
            )}
          </div>

          {/* Base Salary Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Base Salary
            </label>
            <input
              type="number"
              {...register("base_salary")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.base_salary ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter base salary"
            />
            {errors.base_salary && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.base_salary.message}
              </p>
            )}
          </div>
          {/* Department Dropdown */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Department
            </label>
            <select
              {...register("department_id")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.department_id ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setValue("department_id", e.target.value)}
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
          </div>
          {/* Job Dropdown */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Job Title
            </label>
            <select
              {...register("job_id")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.job_id ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setValue("job_id", e.target.value)}
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
              <p className="text-red-500 mt-1 text-sm">
                {errors.job_id.message}
              </p>
            )}
          </div>

          {/* Job tasks  Field */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Job Tasks
            </label>
            <input
              type="text"
              {...register("job_tasks")}
              className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                errors.job_tasks ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter job tasks"
            />
            {errors.job_tasks && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.job_tasks.message}
              </p>
            )}
          </div>
          {/* Legal Documents */}
          {legalDocumentFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-gray-600 text-sm font-medium">
                  Legal Document {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`legal_documents.${index}.name` as const)}
                  placeholder="Document Name"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <input
                  type="date"
                  {...register(`legal_documents.${index}.validity` as const)}
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileChange(e, index, "legal_documents")
                  }
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  console.log("Removing document at index", index);
                  removeLegalDocument(index);
                  reset(getValues()); // Reset to update the form state
                }}
                className="text-white bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendLegalDocument({ name: "", validity: "", file: null })
            }
            className="text-blue-500 block text-sm"
          >
            Add Legal Document
          </button>
          {certificationFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-gray-600 text-sm font-medium">
                  Certification {index + 1}
                </label>
                <input
                  type="text"
                  {...register(
                    `certifications.${index}.certificate_name` as const
                  )}
                  placeholder="Certification Name"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <input
                  type="date"
                  {...register(`certifications.${index}.date` as const)}
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <input
                  type="text"
                  {...register(`certifications.${index}.grade` as const)}
                  placeholder="Certification Grade"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, index, "certifications")}
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  console.log("Removing document at index", index);
                  removeCertification(index);
                  reset(getValues());
                }}
                className="text-white bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendCertification({
                certificate_name: "",
                date: "",
                grade: "",
                file: null,
              })
            }
            className="text-blue-500 block text-sm"
          >
            Add Certification
          </button>
          {/* Allowances */}
          {allowancesFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-gray-600 text-sm font-medium">
                  Allowance {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`allowances.${index}.allowance_type` as const)}
                  placeholder="Allowance Type"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <input
                  type="number"
                  {...register(`allowances.${index}.amount` as const)}
                  placeholder="Amount"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  removeAllowance(index); // Remove the specific allowance
                  reset(getValues()); // Reset the form to update the state
                }}
                className="text-white bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendAllowance({ allowance_type: "", amount: 0 })}
            className="text-blue-500 block text-sm"
          >
            Add Allowance
          </button>

          {/* Incentives */}
          {incentivesFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-gray-600 text-sm font-medium">
                  Incentive {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`incentives.${index}.description` as const)}
                  placeholder="Description"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <input
                  type="number"
                  {...register(`incentives.${index}.amount` as const)}
                  placeholder="Amount"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  removeIncentive(index); // Remove the specific incentive
                  reset(getValues()); // Reset the form to update the state
                }}
                className="text-white bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendIncentive({ description: "", amount: 0 })}
            className="text-blue-500 block text-sm"
          >
            Add Incentive
          </button>

          {/* Bank Accounts */}
          {bankAccountsFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-gray-600 text-sm font-medium">
                  Bank Account {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`bank_accounts.${index}.bank_name` as const)}
                  placeholder="Bank Name"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <input
                  type="text"
                  {...register(
                    `bank_accounts.${index}.account_number` as const
                  )}
                  placeholder="Account Number"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  removeBankAccount(index); // Remove the specific bank account
                  reset(getValues()); // Reset the form to update the state
                }}
                className="text-white bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendBankAccount({ bank_name: "", account_number: "" })
            }
            className="text-blue-500 block text-sm"
          >
            Add Bank Account
          </button>

          {/* Evaluations */}
          {evaluationsFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-gray-600 text-sm font-medium">
                  Evaluation {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`evaluations.${index}.evaluation_type` as const)}
                  placeholder="Evaluation Type"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <textarea
                  {...register(`evaluations.${index}.description` as const)}
                  placeholder="Description"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
                <textarea
                  {...register(`evaluations.${index}.plan` as const)}
                  placeholder="Plan"
                  className="w-full px-4 py-2 mt-1 rounded-lg border"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  removeEvaluation(index); // Remove the specific evaluation
                  reset(getValues()); // Reset the form to update the state
                }}
                className="text-white bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendEvaluation({
                evaluation_type: "",
                description: "",
                plan: "",
              })
            }
            className="text-blue-500 block text-sm"
          >
            Add Evaluation
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition duration-200 ${
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

export default AddEmp;
