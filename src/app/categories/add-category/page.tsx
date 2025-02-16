/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormInput } from "@/components/common/atoms/ui/FormInput";
import GridContainer from "@/components/common/atoms/ui/GridContainer";
import PendingLogic from "@/components/common/atoms/ui/PendingLogic";
import { useMokkBar } from "@/components/Providers/Mokkbar";
import { useAddJobCategory } from "@/hooks/job-category/useAddJobCategory";
import { useEducationExperience } from "@/hooks/job-category/useEducationExperience";
import useCustomTheme from "@/hooks/useCustomTheme";
import useLanguage from "@/hooks/useLanguage";
import useQueryPageData from "@/hooks/useQueryPageData";
import { addCategorySchema } from "@/schemas/job.schema";
import {
  addEducationService,
  addExperienceService,
} from "@/services/job.service";
import { JobCategoryFormInputs } from "@/types/JobCategory.type";
import getErrorMessages from "@/utils/handleErrorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddJobCategory: React.FC = () => {
  const { isLightMode } = useCustomTheme();
  const { setSnackbarConfig } = useMokkBar();
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
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
  // @ts-ignore
  const jobCategoryData = useQueryPageData<JobCategoryFormInputs>(reset);
  const {
    requiredEducationOptions,
    requiredExperienceOptions,
    setRequiredEducationOptions,
    setRequiredExperienceOptions,
  } = useEducationExperience();
  const {
    addJobCategory,
    errorJobCategory,
    isErrorJobCategory,
    isPendingJobCategory,
  } = useAddJobCategory({
    setSnackbarConfig: setSnackbarConfig,
    jobCategoryData: jobCategoryData,
    reset: () =>
      reset({
        name: "",
        description: "",
        required_education: "",
        required_experience: "",
        required_skills: [],
      }),
  });

  useEffect(() => {
    const s = getValues("required_skills");
    console.log("required skills  :  ", s);
  }, [getValues, setValue]);

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
          <FormInput
            label="Category Name"
            placeholder="Category Name"
            name="name"
            register={register}
            errors={errors}
            isLightMode={isLightMode}
            t={t}
          />

          {/* Description Field */}
          <FormInput
            label="Description"
            name="description"
            placeholder="Description"
            type="textarea"
            register={register}
            errors={errors}
            isLightMode={isLightMode}
            t={t}
            rows={4}
            valueTransformer={(value) => value.trim()}
          />

          {/* Required Education Field */}
          <FormInput
            label="Required Education"
            name="required_education"
            type="select"
            register={register}
            errors={errors}
            setValue={setValue}
            isLightMode={isLightMode}
            t={t}
            placeholder="Select Required Education"
            defaultValue={
              jobCategoryData ? jobCategoryData.required_education : ""
            }
            options={requiredEducationOptions}
            onAddOption={(newEducation) =>
              addEducationService({
                newEducation,
                setValue,
                setRequiredEducationOptions,
              })
            }
          />

          {/* Required Experience Field */}
          <FormInput
            label="Required Experience"
            name="required_experience"
            type="select"
            register={register}
            errors={errors}
            isLightMode={isLightMode}
            t={t}
            placeholder={t("Select Required Experience")}
            options={requiredExperienceOptions}
            onAddOption={async (newExperience) => {
              await addExperienceService({
                newExperience,
                setRequiredExperienceOptions: setRequiredExperienceOptions,
                setValue,
              });
            }}
          />

          {/* Required Skills Field */}
          <FormInput
            label="Required Skills"
            name="required_skills"
            type="skills"
            register={register}
            errors={errors}
            isLightMode={isLightMode}
            t={t}
            setValue={setValue}
            placeholder={t("Enter skills (comma-separated)")}
          />

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
            {
              <PendingLogic
                isPending={isPendingJobCategory}
                pendingText={jobCategoryData ? "Updating..." : "Creating..."}
                normalText={
                  jobCategoryData
                    ? "Update Job Category"
                    : "Create Job Category"
                }
              />
            }
          </button>
          {isErrorJobCategory && (
            <p className="text-red-500 mt-2 text-center">
              {errorJobCategory + ""}
            </p>
          )}
        </form>
      </div>
    </GridContainer>
  );
};

export default AddJobCategory;
