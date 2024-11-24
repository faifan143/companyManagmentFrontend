import { DepartmentType } from "@/types/departmentType.type";
import {
  AddEducationHandlerParams,
  AddExperienceHandlerParams,
} from "@/types/jobCategory.type";
import { HandlePermissionsChangeParams } from "@/types/jobTitle.type";

export const addEducationService = ({
  newEducation,
  setNewEducation,
  setValue,
  setRequiredEducationOptions,
  setIsAddingEducation,
}: AddEducationHandlerParams) => {
  if (newEducation.trim() !== "") {
    setRequiredEducationOptions((prevOptions) => [
      ...prevOptions,
      newEducation,
    ]);
    setValue("required_education", newEducation);
    setIsAddingEducation(false);
    setNewEducation("");
  }
};

export const addExperienceService = ({
  newExperience,
  setIsAddingExperience,
  setNewExperience,
  setValue,
  setRequiredExperienceOptions,
}: AddExperienceHandlerParams) => {
  if (newExperience.trim() !== "") {
    setRequiredExperienceOptions((prevOptions) => [
      ...prevOptions,
      newExperience,
    ]);
    setValue("required_experience", newExperience);
    setIsAddingExperience(false);
    setNewExperience("");
  }
};

export const handlePermissionsChange = ({
  selectedOptions,
  setPermissionsSelected,
  setSpecificDept,
  setSpecificEmp,
  setSpecificJobTitle,
  specificDept,
  specificEmp,
  specificJobTitle,
}: HandlePermissionsChangeParams) => {
  const selectedValues = selectedOptions.map((option) => option.value);
  setPermissionsSelected(selectedValues);

  if (selectedValues.includes("department_view_specific")) {
    setSpecificDept(specificDept);
  } else {
    setSpecificDept([]);
  }

  if (selectedValues.includes("emp_view_specific")) {
    setSpecificEmp(specificEmp);
  } else {
    setSpecificEmp([]);
  }

  if (selectedValues.includes("job_title_view_specific")) {
    setSpecificJobTitle(specificJobTitle);
  } else {
    setSpecificJobTitle([]);
  }
};

export const getDepartmentOptions = (
  departments: DepartmentType[] | undefined
) =>
  departments
    ? departments.map((dept) => ({
        value: dept.id,
        label: dept.name,
      }))
    : [];
