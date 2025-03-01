/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import GridContainer from "@/components/common/atoms/ui/GridContainer";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import useCustomTheme from "@/hooks/useCustomTheme";
import useQueryPageData from "@/hooks/useQueryPageData";
import { addEmpSchema } from "@/schemas/employee.schema";
import {
  handleFileChange,
  handleFormSubmit,
} from "@/services/employee.service";
import { DepartmentType } from "@/types/DepartmentType.type";
import { EmployeeFormInputs } from "@/types/EmployeeType.type";
import { JobTitleType } from "@/types/JobTitle.type";
import { DeptTree } from "@/types/trees/Department.tree.type";
import getErrorMessages from "@/utils/handleErrorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMokkBar } from "@/components/Providers/Mokkbar";
import PendingLogic from "@/components/common/atoms/ui/PendingLogic";

const AddEmp: React.FC = () => {
  const { setSnackbarConfig } = useMokkBar();
  const router = useRouter();
  const [legalFileNames, setLegalFileNames] = useState({});
  const [certificationFileNames, setCertificationFileNames] = useState({});

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
    defaultValues: {},
  });
  const employeeData = useQueryPageData<EmployeeFormInputs>(reset);
  const { isLightMode } = useCustomTheme();
  const { t } = useTranslation();
  const [selectedDept, setSelectedDept] = useState<string>("");
  const {
    fields: legalDocumentFields,
    append: appendLegalDocument,
    remove: removeLegalDocument,
  } = useFieldArray({
    control,
    name: "legal_documents",
  });
  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  });
  const {
    fields: allowancesFields,
    append: appendAllowance,
    remove: removeAllowance,
  } = useFieldArray({
    control,
    name: "allowances",
  });
  const {
    fields: incentivesFields,
    append: appendIncentive,
    remove: removeIncentive,
  } = useFieldArray({
    control,
    name: "incentives",
  });
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

  const endpoint = employeeData
    ? `/emp/update/${employeeData.id}`
    : `/emp/create`;

  const { data: departments } = useCustomQuery<{
    info: DepartmentType[];
    tree: DeptTree[];
  }>({
    queryKey: ["departments"],
    url: `/department/tree`,
  });
  const { data: jobs } = useCustomQuery<JobTitleType[]>({
    queryKey: ["jobTitles"],
    url: `/job-titles/get-job-titles`,
  });

  const { mutate: addEmployee, isPending: isPendingEmployee } =
    useCreateMutation({
      endpoint: endpoint,
      onSuccessMessage: t("Employee added successfully!"),
      invalidateQueryKeys: ["employees", "employeeTree"],
      onSuccessFn: () => {
        setSnackbarConfig({
          open: true,
          message: employeeData
            ? t("Employee updated successfully!")
            : t("Employee created successfully!"),
          severity: "success",
        });
        reset();

        setTimeout(() => router.back(), 1000);
      },
    });

  const onSubmit = async (data: EmployeeFormInputs) => {
    handleFormSubmit({
      data,
      addEmployee,
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      getErrorMessages({ errors, setSnackbarConfig });
    }
  }, [errors, setSnackbarConfig]);
  // useEffect(() => {
  //   if (employeeData) {
  //     reset(employeeData);
  //     setValue("name", employeeData.name);
  //     setValue("email", employeeData.email);
  //     setValue("phone", employeeData.phone);
  //     setValue("national_id", employeeData.national_id);
  //     setValue("address", employeeData.address);
  //     setValue("emergency_contact", employeeData.emergency_contact);
  //     setValue("dob", employeeData.dob ? employeeData.dob.split("T")[0] : "");
  //     setValue("gender", employeeData.gender);
  //     setValue("marital_status", employeeData.marital_status);
  //     setValue(
  //       "employment_date",
  //       employeeData.employment_date
  //         ? employeeData.employment_date.split("T")[0]
  //         : ""
  //     );
  //     setValue("job_tasks", employeeData.job_tasks);
  //     setValue("base_salary", employeeData.base_salary);
  //     setValue("department_id", employeeData.department.id);
  //     setSelectedDept(employeeData.department.id);
  //     setValue("job_id", employeeData.job.id);

  //     if (employeeData.legal_documents) {
  //       const legalFiles = {};
  //       employeeData.legal_documents.forEach((doc, index) => {
  //         if (doc.file) legalFiles[index] = doc.file;
  //       });
  //       console.log("legalFiles  :  ", legalFiles);

  //       setLegalFileNames({ legal_documents: legalFiles });
  //     }

  //     if (employeeData.certifications) {
  //       const certFiles = {};
  //       employeeData.certifications.forEach((cert, index) => {
  //         if (cert.file) certFiles[index] = cert.file;
  //       });
  //       setCertificationFileNames({ certifications: certFiles });
  //     }
  //   } else {
  //     reset();
  //     setLegalFileNames({});
  //     setCertificationFileNames({});
  //   }
  // }, [employeeData, reset, setValue]);

  useEffect(() => {
    if (employeeData) {
      reset(employeeData); // Keep this as base reset

      // Basic Information
      setValue("name", employeeData.name);
      setValue("email", employeeData.email);
      setValue("phone", employeeData.phone);
      setValue("national_id", employeeData.national_id);
      setValue("address", employeeData.address);
      setValue("emergency_contact", employeeData.emergency_contact);

      // Dates - Split from ISO string
      setValue("dob", employeeData.dob ? employeeData.dob.split("T")[0] : "");
      setValue(
        "employment_date",
        employeeData.employment_date
          ? employeeData.employment_date.split("T")[0]
          : ""
      );

      // Important: Set these values explicitly
      setValue("gender", employeeData.gender); // Fix for gender
      setValue("marital_status", employeeData.marital_status); // Fix for marital status

      // Department and Job
      setValue("department_id", employeeData.department.id);
      setSelectedDept(employeeData.department.id); // Important for job filtering
      setValue("job_id", employeeData.job.id);

      // Financial Information
      setValue("job_tasks", employeeData.job_tasks);
      setValue("base_salary", employeeData.base_salary);

      // Handle Files
      if (employeeData.legal_documents) {
        const legalFiles = {};
        employeeData.legal_documents.forEach((doc, index) => {
          if (doc.file) legalFiles[index] = doc.file;
        });
        setLegalFileNames({ legal_documents: legalFiles });
      }

      if (employeeData.certifications) {
        const certFiles = {};
        employeeData.certifications.forEach((cert, index) => {
          if (cert.file) certFiles[index] = cert.file;
        });
        setCertificationFileNames({ certifications: certFiles });
      }
    } else {
      reset();
      setLegalFileNames({});
      setCertificationFileNames({});
    }
  }, [employeeData, reset, setValue]);

  return (
    <GridContainer>
      <div
        className={`${
          isLightMode ? "bg-light-droppable-fade" : "bg-droppable-fade"
        }  p-8 rounded-xl shadow-lg  w-full  col-span-full  text-twhite`}
      >
        <h1 className="text-center text-2xl font-bold mb-6">
          {employeeData ? t("Update Employee") : t("Create Employee")}
        </h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div>
            <label className="block  text-sm font-medium">{t("Name")}</label>
            <input
              type="text"
              {...register("name")}
              className={`w-full  ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none   px-4 py-2 mt-1 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter employee name")}
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>
          {/* Email Field */}
          <div>
            <label className="block  text-sm font-medium">{t("Email")}</label>
            <input
              type="text"
              {...register("email")}
              className={`w-full  ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none   px-4 py-2 mt-1 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter Employee Email")}
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block  text-sm font-medium">{t("Phone")}</label>
            <input
              type="text"
              {...register("phone")}
              className={`w-full  ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none   px-4 py-2 mt-1 rounded-lg border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter Employee phone")}
            />
            {errors.phone && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Passwword Field */}
          <div>
            <label className="block  text-sm font-medium">
              {t("Password")}
            </label>
            <input
              disabled={!!employeeData}
              type="text"
              {...register("password")}
              className={`w-full  ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none   px-4 py-2 mt-1 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={
                employeeData
                  ? t("Can't Update Employee Password")
                  : t("Enter Employee Password")
              }
            />
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* National ID Field */}
          <div>
            <label className="block  text-sm font-medium">
              {t("National ID")}
            </label>
            <input
              type="text"
              {...register("national_id")}
              className={`w-full  ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none   px-4 py-2 mt-1 rounded-lg border ${
                errors.national_id ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter national ID")}
            />
            {errors.national_id && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.national_id.message}
              </p>
            )}
          </div>
          {/* Address Field */}
          <div>
            <label className="block  text-sm font-medium">{t("Address")}</label>
            <input
              type="text"
              {...register("address")}
              className={`w-full  ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none   px-4 py-2 mt-1 rounded-lg border ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter Address")}
            />
            {errors.address && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.address.message}
              </p>
            )}
          </div>
          {/* emergency contact Field */}
          <div>
            <label className="block  text-sm font-medium">
              {t("Contact Emergency")}
            </label>
            <input
              type="text"
              {...register("emergency_contact")}
              className={`w-full  ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none   px-4 py-2 mt-1 rounded-lg border ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter Address")}
            />
            {errors.address && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.address.message}
              </p>
            )}
          </div>
          {/* DOB Field */}
          <div>
            <label className="block  text-sm font-medium">
              {t("Date Of Birth")}
            </label>
            <input
              type="date"
              {...register("dob")}
              className={`w-full ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none px-4 py-2 mt-1 rounded-lg border ${
                errors.dob ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter employment date")}
            />
            {errors.dob && (
              <p className="text-red-500 mt-1 text-sm">{errors.dob.message}</p>
            )}
          </div>

          {/* Gender Field */}
          <div>
            <label className="block  text-sm font-medium">{t("Gender")}</label>
            <select
              {...register("gender")}
              defaultValue={employeeData && employeeData.gender}
              className={`w-full ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none px-4 py-2 mt-1 rounded-lg   placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.gender ? "border-high" : "border-border"
              }`}
            >
              <option value="">{t("Select a gender")}</option>
              {["male", "female", "undefined"].map((gender, index: number) => (
                <option key={index} value={gender}>
                  {t(gender)}
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
            <label className="block  text-sm font-medium">
              {t("Marital Status")}
            </label>
            <select
              {...register("marital_status")}
              value={getValues("marital_status") || ""} // Changed from defaultValue to value
              className={`w-full ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none px-4 py-2 mt-1 rounded-lg   placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.marital_status ? "border-high" : "border-border"
              }`}
            >
              <option value="">{t("Select a marital status")}</option>
              {[t("single"), t("married")].map((status, index: number) => (
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
            <label className="block  text-sm font-medium">
              {t("Employment Date")}
            </label>
            <input
              type="date"
              {...register("employment_date")}
              className={`w-full ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none px-4 py-2 mt-1 rounded-lg border ${
                errors.employment_date ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter employment date")}
            />
            {errors.employment_date && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.employment_date.message}
              </p>
            )}
          </div>

          {/* Base Salary Field */}
          <div>
            <label className="block  text-sm font-medium">
              {t("Base Salary")}
            </label>
            <input
              type="number"
              {...register("base_salary")}
              className={`w-full ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none px-4 py-2 mt-1 rounded-lg border ${
                errors.base_salary ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter base salary")}
            />
            {errors.base_salary && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.base_salary.message}
              </p>
            )}
          </div>
          {/* Department Dropdown */}
          <div>
            <label className="block  text-sm font-medium">
              {t("Department")}
            </label>
            <select
              disabled={!!employeeData}
              {...register("department_id")}
              className={`w-full ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none px-4 py-2 mt-1 rounded-lg border ${
                errors.department_id ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => {
                setValue("department_id", e.target.value);
                setSelectedDept(e.target.value);
              }}
            >
              <option value="">{t("Select a department")}</option>
              {departments &&
                departments.tree &&
                departments.tree.map((dept) => (
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
            <label className="block  text-sm font-medium">
              {t("Job Title")}
            </label>
            <select
              disabled={!!employeeData}
              {...register("job_id")}
              className={`w-full ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none px-4 py-2 mt-1 rounded-lg border ${
                errors.job_id ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setValue("job_id", e.target.value)}
            >
              <option value="">{t("Select a job title")}</option>
              {jobs &&
                jobs
                  .filter(
                    (job) =>
                      job.department && job.department._id == selectedDept
                  )
                  .map((job) => (
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
            <label className="block  text-sm font-medium">
              {t("Job Tasks")}
            </label>
            <input
              type="text"
              {...register("job_tasks")}
              className={`w-full  ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  outline-none border-none   px-4 py-2 mt-1 rounded-lg border ${
                errors.job_tasks ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={t("Enter job tasks")}
            />
            {errors.job_tasks && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.job_tasks.message}
              </p>
            )}
          </div>

          {/* Legal Documents */}
          <button
            type="button"
            onClick={() =>
              appendLegalDocument({ name: "", validity: "", file: null })
            }
            className="text-tbright block text-sm"
          >
            {t("Add Legal Document")}
          </button>
          {legalDocumentFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block  text-sm font-medium">
                  {t("Legal Document")} {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`legal_documents.${index}.name` as const)}
                  placeholder={t("Document Name")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border  ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />
                <input
                  type="date"
                  {...register(`legal_documents.${index}.validity` as const)}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border  ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />

                {/* <div
                  className={`w-full px-4 py-2 mt-1 rounded-lg border-2 border-dashed border-tmid text-center text-tmid cursor-pointer ${
                    isLightMode
                      ? "bg-dark placeholder:text-tdark"
                      : "bg-secondary"
                  } outline-none`}
                  onClick={() =>
                    document.getElementById(`fileInput${index}`).click()
                  }
                >
                  {fileNames[index] || "Add File"}{" "}
                </div>
                <input
                  id={`fileInput${index}`}
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileSelect(e, index)} // Handle file selection
                /> */}

                <FileUpload
                  index={index}
                  fieldName="legal_documents"
                  fileNames={legalFileNames}
                  setFileNames={setLegalFileNames}
                  handleFileChange={(e) =>
                    handleFileChange(e, index, "legal_documents", setValue)
                  }
                  isLightMode={isLightMode}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  console.log("Removing document at index", index);
                  removeLegalDocument(index);
                  reset(getValues()); // Reset to update the form state
                }}
                className="text-twhite bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md"
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
            className="text-tbright block text-sm"
          >
            {t("Add Certification")}
          </button>
          {certificationFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block  text-sm font-medium">
                  {t("Certification")} {index + 1}
                </label>
                <input
                  type="text"
                  {...register(
                    `certifications.${index}.certificate_name` as const
                  )}
                  placeholder={t("Certification Name")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />
                <input
                  type="date"
                  {...register(`certifications.${index}.date` as const)}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />
                <input
                  type="text"
                  {...register(`certifications.${index}.grade` as const)}
                  placeholder={t("Certification Grade")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />

                <FileUpload
                  index={index}
                  fieldName="certifications"
                  fileNames={certificationFileNames}
                  setFileNames={setCertificationFileNames}
                  handleFileChange={(e) =>
                    handleFileChange(e, index, "certifications", setValue)
                  }
                  isLightMode={isLightMode}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  console.log("Removing document at index", index);
                  removeCertification(index);
                  reset(getValues());
                }}
                className="text-twhite bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md"
              >
                X
              </button>
            </div>
          ))}

          {/* Allowances */}
          <button
            type="button"
            onClick={() => appendAllowance({ allowance_type: "", amount: 0 })}
            className="text-tbright block text-sm"
          >
            {t("Add Allowance")}
          </button>
          {allowancesFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block  text-sm font-medium">
                  {t("Allowance")} {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`allowances.${index}.allowance_type` as const)}
                  placeholder={t("Allowance Type")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />
                <input
                  type="number"
                  {...register(`allowances.${index}.amount` as const)}
                  placeholder={t("Amount")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  removeAllowance(index); // Remove the specific allowance
                  reset(getValues()); // Reset the form to update the state
                }}
                className="text-twhite bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md"
              >
                X
              </button>
            </div>
          ))}

          {/* Incentives */}
          <button
            type="button"
            onClick={() => appendIncentive({ description: "", amount: 0 })}
            className="text-tbright block text-sm"
          >
            {t("Add Incentive")}
          </button>
          {incentivesFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block  text-sm font-medium">
                  {t("Incentive")} {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`incentives.${index}.description` as const)}
                  placeholder={t("Description")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />
                <input
                  type="number"
                  {...register(`incentives.${index}.amount` as const)}
                  placeholder={t("Amount")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  removeIncentive(index); // Remove the specific incentive
                  reset(getValues()); // Reset the form to update the state
                }}
                className="text-twhite bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md"
              >
                X
              </button>
            </div>
          ))}

          {/* Bank Accounts */}
          <button
            type="button"
            onClick={() =>
              appendBankAccount({ bank_name: "", account_number: "" })
            }
            className="text-tbright block text-sm"
          >
            {t("Add Bank Account")}
          </button>
          {bankAccountsFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block  text-sm font-medium">
                  {t("Bank Account")} {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`bank_accounts.${index}.bank_name` as const)}
                  placeholder={t("Bank Name")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />
                <input
                  type="text"
                  {...register(
                    `bank_accounts.${index}.account_number` as const
                  )}
                  placeholder={t("Account Number")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  removeBankAccount(index); // Remove the specific bank account
                  reset(getValues()); // Reset the form to update the state
                }}
                className="text-twhite bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md"
              >
                X
              </button>
            </div>
          ))}

          {/* Evaluations */}
          <button
            type="button"
            onClick={() =>
              appendEvaluation({
                evaluation_type: "",
                description: "",
                plan: "",
              })
            }
            className="text-tbright block text-sm"
          >
            {t("Add Evaluation")}
          </button>
          {evaluationsFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block  text-sm font-medium">
                  {t("Evaluation")} {index + 1}
                </label>
                <input
                  type="text"
                  {...register(`evaluations.${index}.evaluation_type` as const)}
                  placeholder={t("Evaluation Type")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />
                <textarea
                  {...register(`evaluations.${index}.description` as const)}
                  placeholder={t("Description")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />
                <textarea
                  {...register(`evaluations.${index}.plan` as const)}
                  placeholder={t("Plan")}
                  className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }  outline-none border-none`}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  removeEvaluation(index); // Remove the specific evaluation
                  reset(getValues()); // Reset the form to update the state
                }}
                className="text-twhite bg-red-500 font-bold  px-4 py-2 shadow-md rounded-md"
              >
                X
              </button>
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-slate-600  rounded-lg font-bold hover:bg-slate-700 transition duration-200
            
            
            ${isLightMode ? " text-tblackAF" : "text-twhite"}
            
            ${isPendingEmployee ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isPendingEmployee}
          >
            {
              <PendingLogic
                isPending={isPendingEmployee}
                normalText={
                  employeeData ? "Update Employee" : "Create Employee"
                }
                pendingText={employeeData ? "Updating..." : "Creating..."}
              />
            }
          </button>
        </form>
      </div>
    </GridContainer>
  );
};

export default AddEmp;

const FileUpload = ({
  index,
  fileNames,
  setFileNames,
  handleFileChange,
  isLightMode,
  fieldName,
}) => {
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange(index, file);
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: {
          ...(prev[fieldName] || {}),
          [index]: file.name,
        },
      }));
    }
    handleFileChange(e);
  };

  return (
    <div>
      {/* Display File Upload Div */}
      <div
        className={`w-full px-4 py-2 mt-1 rounded-lg border-2 border-dashed border-tmid text-center text-tmid cursor-pointer ${
          isLightMode ? "bg-dark placeholder:text-tdark" : "bg-secondary"
        } outline-none`}
        onClick={() =>
          document.getElementById(`fileInput-${fieldName}-${index}`).click()
        }
      >
        {fileNames[fieldName]?.[index] || "Add File"}{" "}
        {/* Show file name or placeholder */}
      </div>

      {/* Hidden File Input */}
      <input
        id={`fileInput-${fieldName}-${index}`}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
    </div>
  );
};
