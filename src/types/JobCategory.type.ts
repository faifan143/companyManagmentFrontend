import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

export interface JobCategoryFormInputs {
  id: string;
  name: string;
  description: string;
  required_education: string;
  required_experience: string;
  required_skills: string[];
}

export interface AddEducationHandlerParams {
  newEducation: string;
  setNewEducation: Dispatch<SetStateAction<string>>;
  setValue: UseFormSetValue<JobCategoryFormInputs>;
  setRequiredEducationOptions: Dispatch<SetStateAction<string[]>>;
  setIsAddingEducation: Dispatch<SetStateAction<boolean>>;
}
export interface AddExperienceHandlerParams {
  newExperience: string;
  setNewExperience: Dispatch<SetStateAction<string>>;
  setValue: UseFormSetValue<JobCategoryFormInputs>;
  setRequiredExperienceOptions: Dispatch<SetStateAction<string[]>>;
  setIsAddingExperience: Dispatch<SetStateAction<boolean>>;
}
