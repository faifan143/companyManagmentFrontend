import { useState, useEffect } from 'react';
import useCustomQuery from '../useCustomQuery';
import { EducationExperienceData } from '@/types/JobCategory.type';
import { MokkBarContextType } from '@/types/MokkBar.type';

export const useEducationExperience = (setSnackbarConfig: MokkBarContextType['setSnackbarConfig']) => {
  const [requiredEducationOptions, setRequiredEducationOptions] = useState<string[]>([]);
  const [requiredExperienceOptions, setRequiredExperienceOptions] = useState<string[]>([]);

  const { data: education_experience } = useCustomQuery<EducationExperienceData>({
    queryKey: ["education_experience"],
    url: `/job-categories/unique/education-experience`,
    setSnackbarConfig,
  });

  useEffect(() => {
    if (education_experience) {
      setRequiredEducationOptions(education_experience.requiredEducation || []);
      setRequiredExperienceOptions(education_experience.requiredExperience || []);
    }
  }, [education_experience]);

  return {
    requiredEducationOptions,
    requiredExperienceOptions,
    setRequiredEducationOptions,
    setRequiredExperienceOptions
  };
};