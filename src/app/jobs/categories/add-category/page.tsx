/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useCustomQuery from "@/hooks/useCustomQuery";
import useCustomTheme from "@/hooks/useCustomTheme";
import useQueryPageData from "@/hooks/useQueryPageData";
import useSnackbar from "@/hooks/useSnackbar";
import { addCategorySchema } from "@/schemas/job.schema";
import {
  addEducationService,
  addExperienceService,
} from "@/services/job.service";
import { JobCategoryFormInputs } from "@/types/jobCategory.type";
import getErrorMessages from "@/utils/handleErrorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const AddJobCategory: React.FC = () => {
  const [requiredEducationOptions, setRequiredEducationOptions] = useState<
    string[]
  >([]);
  const [requiredExperienceOptions, setRequiredExperienceOptions] = useState<
    string[]
  >([]);
  const { isLightMode } = useCustomTheme();
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [newEducation, setNewEducation] = useState("");
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [newExperience, setNewExperience] = useState("");
  const { snackbarConfig, setSnackbarConfig } = useSnackbar();
  const { t } = useTranslation();
  const router = useRouter();
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

  const jobCategoryData = useQueryPageData<JobCategoryFormInputs>(reset);

  const { data: education_experience } = useCustomQuery<any>({
    queryKey: ["education_experience"],
    url: `http://${process.env.BASE_URL}/job-categories/unique/education-experience`,
    setSnackbarConfig,
  });

  const {
    mutate: addJobCategory,
    isPending: isPendingJobCategory,
    isError: isErrorJobCategory,
    error: errorJobCategory,
  } = useCreateMutation({
    endpoint: jobCategoryData
      ? `/job-categories/update-job-category/${jobCategoryData.id}`
      : `/job-categories`,
    onSuccessMessage: t("Job Category added successfully!"),
    invalidateQueryKeys: ["jobCategories"],
    setSnackbarConfig,
    onSuccessFn: () => {
      reset({
        name: "",
        description: "",
        required_education: "",
        required_experience: "",
        required_skills: [],
      });

      setSnackbarConfig({
        open: true,
        message: jobCategoryData
          ? t("Job Category updated successfully!")
          : t("Job Category created successfully!"),
        severity: "success",
      });

      setTimeout(() => router.back(), 1000);
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
    if (Object.keys(errors).length > 0) {
      getErrorMessages({ errors, setSnackbarConfig });
    }
  }, [errors, setSnackbarConfig]);

  return (
    <GridContainer>
      <div className="bg-droppable-fade text-twhite p-8 rounded-xl shadow-lg col-span-12 w-full">
        <h1 className="text-center text-2xl  font-bold mb-6">
          {jobCategoryData
            ? t("Update Job Category")
            : t("Create Job Category")}
        </h1>
        <form
          className="space-y-4 "
          onSubmit={handleSubmit(async (data: JobCategoryFormInputs) => {
            addJobCategory(data);
          })}
        >
          {/* Name Field */}
          <div>
            <label className="  block text-sm font-medium">
              {t("Category Name")}
            </label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-4 py-2 mt-1   ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }
                   outline-none border-none   rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                     errors.name ? "border-high" : "border-border"
                   }`}
              placeholder={t("Enter category name")}
              defaultValue={jobCategoryData ? jobCategoryData.name : ""}
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="  block text-sm font-medium">
              {t("Description")}
            </label>
            <textarea
              {...register("description")}
              className={`w-full px-4 py-2 mt-1    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }
                   outline-none border-none  rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                     errors.description ? "border-high" : "border-border"
                   }`}
              placeholder={t("Enter category description")}
              rows={4}
              defaultValue={jobCategoryData ? jobCategoryData.description : ""}
            />
            {errors.description && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Required Education Field */}
          <div>
            <label className="  block text-sm font-medium">
              {t("Required Education")}
            </label>
            <div className="flex gap-2 items-center">
              <select
                {...register("required_education")}
                className={`w-full   ${
                  isLightMode
                    ? "bg-dark  placeholder:text-tdark "
                    : "bg-secondary"
                }
                   outline-none border-none   px-4 py-2 mt-1 rounded-lg border ${
                     errors.required_education ? "border-high" : "border-border"
                   }`}
                defaultValue={
                  jobCategoryData ? jobCategoryData.required_education : ""
                }
              >
                <option value="">{t("Select Required Education")}</option>
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
                  className={`w-full   ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }
                   outline-none border-none   px-4 py-2 rounded-lg border`}
                  placeholder={t("Enter new education")}
                  value={newEducation}
                  onChange={(e) => setNewEducation(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() =>
                    addEducationService({
                      newEducation,
                      setIsAddingEducation,
                      setNewEducation,
                      setRequiredEducationOptions,
                      setValue,
                    })
                  }
                  className="bg-dark hover:bg-main text-twhite rounded-md px-4 py-2"
                >
                  {t("Add")}
                </button>
              </div>
            )}
            {errors.required_education && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.required_education.message}
              </p>
            )}
          </div>

          {/* Required Experience Field */}
          <div>
            <label className="  block text-sm font-medium">
              {t("Required Experience")}
            </label>
            <div className="flex gap-2 items-center">
              <select
                {...register("required_experience")}
                className={`w-full px-4 py-2   ${
                  isLightMode
                    ? "bg-dark  placeholder:text-tdark "
                    : "bg-secondary"
                }
                   outline-none border-none   mt-1 rounded-lg border ${
                     errors.required_experience
                       ? "border-high"
                       : "border-border"
                   }`}
                defaultValue={
                  jobCategoryData ? jobCategoryData.required_experience : ""
                }
              >
                <option value="">{t("Select Required Experience")}</option>
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
                  className={`w-full px-4 py-2   ${
                    isLightMode
                      ? "bg-dark  placeholder:text-tdark "
                      : "bg-secondary"
                  }
                   outline-none border-none   rounded-lg border`}
                  placeholder={t("Enter new experience")}
                  value={newExperience}
                  onChange={(e) => setNewExperience(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() =>
                    addExperienceService({
                      newExperience,
                      setIsAddingExperience,
                      setNewExperience,
                      setRequiredExperienceOptions,
                      setValue,
                    })
                  }
                  className="bg-dark hover:bg-main text-twhite rounded-md px-4 py-2"
                >
                  {t("Add")}
                </button>
              </div>
            )}
            {errors.required_experience && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.required_experience.message}
              </p>
            )}
          </div>

          {/* Required Skills Field */}
          <div>
            <label className="  block text-sm font-medium">
              {t("Required Skills")}
            </label>
            <textarea
              className={`w-full px-4 py-2 mt-1    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }
                   outline-none border-none  rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                     errors.required_skills ? "border-high" : "border-border"
                   }`}
              placeholder={t("Enter required skills (comma-separated)")}
              rows={3}
              defaultValue={
                jobCategoryData ? jobCategoryData.required_skills.join(",") : ""
              }
              onChange={(event) => {
                const values = event.target.value
                  .split(",")
                  .map((skill) => skill.trim());
                setValue("required_skills", values);
              }}
            />
            {errors.required_skills && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.required_skills.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-slate-600 
            
                        ${isLightMode ? " text-tblackAF" : "text-twhite"}

            rounded-lg font-bold hover:bg-slate-700 transition duration-200 ${
              isPendingJobCategory ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPendingJobCategory}
          >
            {isPendingJobCategory
              ? jobCategoryData
                ? t("Updating...")
                : t("Creating...")
              : jobCategoryData
              ? t("Update Job Category")
              : t("Create Job Category")}
          </button>
          {isErrorJobCategory && (
            <p className="text-red-500 mt-2 text-center">
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
