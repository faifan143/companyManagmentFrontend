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
import ModernCheckbox from "@/components/common/ModernCheckbox";
import { IGetJobTitle } from "../page";
const baseUrl = process.env.BASE_URL || "";
const schema = yup.object().shape({
  name: yup.string().required("Job title name is required"),
  title: yup.string().required("Title is required"),
  grade_level: yup.string().required("Grade level is required"),
  description: yup.string().required("Description is required"),
  responsibilities: yup.string().required("Responsibilities are required"),
  permissions: yup
    .array(
      yup.object().shape({
        _id: yup.string().required(),
        resource: yup.string().required(),
        action: yup.string().required(),
      })
    )
    .required("Permissions are required"),
  department_id: yup.string().required("Department ID is required"),
});

interface JobTitleFormInputs {
  id?: string;
  name: string;
  title: string;
  grade_level: string;
  description: string;
  responsibilities: string[];
  permissions: string[];
  department_id: string;
}

interface CreateJobTitleProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitleData?: IGetJobTitle | null;
}

const CreateJobTitle: React.FC<CreateJobTitleProps> = ({
  isOpen,
  onClose,
  jobTitleData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<JobTitleFormInputs>({
    resolver: yupResolver(schema) as any,
    defaultValues: jobTitleData
      ? {
          ...jobTitleData,
          permissions: jobTitleData.permissions.map((perm) => perm._id),
        }
      : {
          name: "",
          title: "",
          grade_level: "",
          description: "",
          responsibilities: [],
          permissions: [],
          department_id: "",
        },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  React.useEffect(() => {
    if (jobTitleData) {
      reset({
        ...jobTitleData,
        responsibilities: jobTitleData?.responsibilities || [],
        permissions: jobTitleData?.permissions.map((perm) => perm._id),
      });
    } else {
      reset();
    }
  }, [jobTitleData, reset]);

  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });

  // const onSubmit = async (data: JobTitleFormInputs) => {
  //   console.log(data);

  //   setError(null);
  //   setSuccess(null);
  //   setLoading(true);

  //   try {
  //     const endpoint = jobTitleData
  //       ? `http://${baseUrl}/job-titles/update/${jobTitleData.id}`
  //       : `http://${baseUrl}/job-titles/create`;

  //     const response = await axios.post(
  //       endpoint,
  //       {
  //         ...data,
  //         responsibilities: data.responsibilities.toString().split(","),
  //         permissions: permissionsSelected, // Send permissions as an array of IDs
  //       },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + Cookies.get("access_token"),
  //         },
  //       }
  //     );

  //     if (response.status === 200 || response.status === 201) {
  //       reset({
  //         id: "",
  //         name: "",
  //         title: "",
  //         grade_level: "",
  //         description: "",
  //         responsibilities: [],
  //         permissions: [],
  //         department_id: "",
  //       });

  //       setSnackbarConfig({
  //         open: true,
  //         message: jobTitleData
  //           ? "Job Title updated successfully!"
  //           : "Job Title created successfully!",
  //         severity: "success",
  //       });
  //     }
  //   } catch (err: any) {
  //     console.error("Failed to create/update the job title", err);
  //     setError(
  //       err.response?.data?.message ||
  //         "Failed to create/update the job title. Please try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //     setInterval(onClose, 3000);
  //   }
  // };

  const onSubmit = async (data: JobTitleFormInputs) => {
    console.log("Form data before submission:", data); // Debugging line

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const endpoint = jobTitleData
        ? `http://${baseUrl}/job-titles/update/${jobTitleData.id}`
        : `http://${baseUrl}/job-titles/create`;

      const response = await axios.post(
        endpoint,
        {
          ...data,
          responsibilities: data.responsibilities.toString().split(","),
          permissions: permissionsSelected,
        },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        reset({
          id: "",
          name: "",
          title: "",
          grade_level: "",
          description: "",
          responsibilities: [],
          permissions: [],
          department_id: "",
        });

        setSnackbarConfig({
          open: true,
          message: jobTitleData
            ? "Job Title updated successfully!"
            : "Job Title created successfully!",
          severity: "success",
        });
      }
    } catch (err: any) {
      console.error("Failed to create/update the job title", err);
      setError(
        err.response?.data?.message ||
          "Failed to create/update the job title. Please try again."
      );
    } finally {
      setLoading(false);
      setInterval(onClose, 3000);
    }
  };

  const [permissionsOptions, setPermissionsOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [permissionsSelected, setPermissionsSelected] = useState<string[]>([]);

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
  const { data: permissions } = useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const response = await axios.get(
        `http://${baseUrl}/permissions/all-permissions`
      );
      return response.data;
    },
  });

  console.log("permissions : ", permissions);

  useEffect(() => {
    // Fetch permissions options from an API
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(
          `http://${baseUrl}/permissions/all-permissions`
        );

        const options = response.data.map((permission: any) => ({
          label: `${permission.action.toUpperCase()} ${permission.resource.toUpperCase()} `,
          value: permission._id,
        }));

        setPermissionsOptions(options);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchPermissions();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Create/Update Job Title"
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
            {/* <textarea
              {...register("responsibilities")}
              className={`w-full px-4 py-2 mt-1 rounded-lg     focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.responsibilities ? "border-high" : "border-border"
              }`}
              placeholder="Enter responsibilities (comma-separated)"
              rows={3}
            /> */}

            <textarea
              {...register("responsibilities")}
              className={`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.responsibilities ? "border-high" : "border-border"
              }`}
              placeholder="Enter responsibilities (comma-separated)"
              rows={3}
              onChange={(e) => {
                const values = e.target.value
                  .split(",")
                  .map((item) => item.trim());
                setValue("responsibilities", values); // use setValue to ensure form value updates
              }}
            />

            {errors.responsibilities && (
              <p className="text-high mt-1 text-sm">
                {errors.responsibilities.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Permissions</label>
            <ModernCheckbox
              options={permissionsOptions}
              defaultSelected={permissionsOptions.filter((option) =>
                jobTitleData?.permissions.some(
                  (perm) => perm._id === option.value
                )
              )}
              placeholder="Select permissions..."
              onChange={(selectedOptions) => {
                // Ensure the permissions array is correctly mapped to IDs
                const selectedPermissions = selectedOptions.map(
                  (opt) => opt.value
                );
                console.log("Selected Permissions IDs:", selectedPermissions); // Debugging line
                // Ensure form value is updated
                setPermissionsSelected(selectedPermissions);
              }}
            />

            {errors.permissions && (
              <p className="text-high mt-1 text-sm">
                {errors.permissions.message}
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

          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-accent text-white rounded-lg font-bold hover:bg-opacity-90 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading
              ? jobTitleData
                ? "Updating..."
                : "Creating..."
              : jobTitleData
              ? "Update Job Title"
              : "Create Job Title"}
          </button>
          {error && <p className="text-high mt-2 text-center">{error}</p>}
          {success && <p className="text-low mt-2 text-center">{success}</p>}
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

export default CreateJobTitle;
