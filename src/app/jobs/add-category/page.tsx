/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomizedSnackbars from "@/components/common/CustomizedSnackbars";
import GridContainer from "@/components/common/GridContainer";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import { addCategorySchema } from "@/schemas/job.schema";
import { JobCategoryFormInputs } from "@/types/JobCategory.type";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddJobCategory: React.FC = () => {
  const [requiredEducationOptions, setRequiredEducationOptions] = useState<
    string[]
  >([]);
  const [requiredExperienceOptions, setRequiredExperienceOptions] = useState<
    string[]
  >([]);

  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [newEducation, setNewEducation] = useState("");

  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [newExperience, setNewExperience] = useState("");
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });

  const { data: education_experience } = useCustomQuery<any>({
    queryKey: ["education_experience"],
    url: `http://${process.env.BASE_URL}/job-categories/unique/education-experience`,
    setSnackbarConfig,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<JobCategoryFormInputs>({
    resolver: yupResolver(addCategorySchema) as any,
    defaultValues: {
      id: "",
      name: "",
      description: "",
      required_education: "",
      required_experience: "",
      required_skills: [],
    },
  });

  useEffect(() => {
    if (education_experience) {
      setRequiredEducationOptions(education_experience.requiredEducation || []);
      setRequiredExperienceOptions(
        education_experience.requiredExperience || []
      );
    }
  }, [education_experience]);

  useEffect(() => {
    reset();
  }, [reset]);

  const endpoint = `/job-categories`;

  const {
    mutate: addJobCategory,
    isPending: isPendingJobCategory,
    isSuccess: isSuccessJobCategory,
    isError: isErrorJobCategory,
    error: errorJobCategory,
  } = useCreateMutation({
    endpoint: endpoint,
    onSuccessMessage: "Job Category added successfully!",
    invalidateQueryKeys: ["jobCategories"],
  });

  const onSubmit = async (data: JobCategoryFormInputs) => {
    console.log("Form data before submission:", data);
    addJobCategory(data);
  };

  useEffect(() => {
    if (isSuccessJobCategory) {
      reset({
        name: "",
        description: "",
        required_education: "",
        required_experience: "",
        required_skills: [],
      });

      setSnackbarConfig({
        open: true,
        message: "Job Category created successfully!",
        severity: "success",
      });
    } else if (isErrorJobCategory) {
      console.error(
        "Failed to create/update the job category",
        errorJobCategory
      );
    }
  }, [errorJobCategory, isErrorJobCategory, isSuccessJobCategory, reset]);

  const handleAddEducation = () => {
    if (newEducation.trim() !== "") {
      // Add the new education to the dropdown options
      setRequiredEducationOptions((prevOptions) => [
        ...prevOptions,
        newEducation,
      ]);
      // Set the new value as selected
      setValue("required_education", newEducation);
      setIsAddingEducation(false);
      setNewEducation("");
    }
  };

  const handleAddExperience = () => {
    if (newExperience.trim() !== "") {
      // Add the new experience to the dropdown options
      setRequiredExperienceOptions((prevOptions) => [
        ...prevOptions,
        newExperience,
      ]);
      // Set the new value as selected
      setValue("required_experience", newExperience);
      setIsAddingExperience(false);
      setNewExperience("");
    }
  };

  return (
    <GridContainer>
      <div className="bg-white p-8 rounded-xl shadow-lg col-span-12 w-full relative">
        <h1 className="text-center text-2xl font-bold mb-6">
          {"Create Job Category"}
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium">Category Name</label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.name ? "border-high" : "border-border"
              }`}
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="text-high mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              className={`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.description ? "border-high" : "border-border"
              }`}
              placeholder="Enter category description"
              rows={4}
            />
            {errors.description && (
              <p className="text-high mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Required Education Field */}
          <div>
            <label className="block text-sm font-medium">
              Required Education
            </label>
            <div className="flex gap-2 items-center">
              <select
                {...register("required_education")}
                className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                  errors.required_education ? "border-high" : "border-border"
                }`}
              >
                <option value="">Select Required Education</option>
                {requiredEducationOptions.map((education, index) => (
                  <option key={index} value={education}>
                    {education}
                  </option>
                ))}
              </select>
              <div
                onClick={() => setIsAddingEducation(true)}
                className="mt-1 border-gray-500 border-dashed border-2 text-center rounded-md w-[45px] h-[40px] content-center text-lg font-bold cursor-pointer"
              >
                +
              </div>
            </div>
            {isAddingEducation && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border"
                  placeholder="Enter new education"
                  value={newEducation}
                  onChange={(e) => setNewEducation(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="bg-blue-500 text-white rounded-md px-4 py-2"
                >
                  Add
                </button>
              </div>
            )}
            {errors.required_education && (
              <p className="text-high mt-1 text-sm">
                {errors.required_education.message}
              </p>
            )}
          </div>

          {/* Required Experience Field */}
          <div>
            <label className="block text-sm font-medium">
              Required Experience
            </label>
            <div className="flex gap-2 items-center">
              <select
                {...register("required_experience")}
                className={`w-full px-4 py-2 mt-1 rounded-lg border ${
                  errors.required_experience ? "border-high" : "border-border"
                }`}
              >
                <option value="">Select Required Experience</option>
                {requiredExperienceOptions.map((experience, index) => (
                  <option key={index} value={experience}>
                    {experience}
                  </option>
                ))}
              </select>
              <div
                onClick={() => setIsAddingExperience(true)}
                className="mt-1 border-gray-500 border-dashed border-2 text-center rounded-md w-[45px] h-[40px] content-center text-lg font-bold cursor-pointer"
              >
                +
              </div>
            </div>
            {isAddingExperience && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border"
                  placeholder="Enter new experience"
                  value={newExperience}
                  onChange={(e) => setNewExperience(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="bg-blue-500 text-white rounded-md px-4 py-2"
                >
                  Add
                </button>
              </div>
            )}
            {errors.required_experience && (
              <p className="text-high mt-1 text-sm">
                {errors.required_experience.message}
              </p>
            )}
          </div>

          {/* Required Skills Field */}
          <div>
            <label className="block text-sm font-medium">Required Skills</label>
            <textarea
              className={`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.required_skills ? "border-high" : "border-border"
              }`}
              placeholder="Enter required skills (comma-separated)"
              rows={3}
              onChange={(event) => {
                const values = event.target.value
                  .split(",")
                  .map((skill) => skill.trim());
                setValue("required_skills", values);
              }}
            />
            {errors.required_skills && (
              <p className="text-high mt-1 text-sm">
                {errors.required_skills.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-[#413d99] text-white rounded-lg font-bold hover:bg-opacity-90 transition duration-200 ${
              isPendingJobCategory ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPendingJobCategory}
          >
            {isPendingJobCategory ? "Creating..." : "Create Job Category"}
          </button>
          {isErrorJobCategory && (
            <p className="text-high mt-2 text-center">
              {errorJobCategory + ""}
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
    </GridContainer>
  );
};

export default AddJobCategory;
