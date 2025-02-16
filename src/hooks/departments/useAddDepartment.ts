import useCustomQuery from "@/hooks/useCustomQuery";
import useQueryPageData from "@/hooks/useQueryPageData";
import {
  DepartmentFormInputs,
  DepartmentType,
} from "@/types/DepartmentType.type";
import { JobCategoryType } from "@/types/JobTitle.type";
import { DeptTree } from "@/types/trees/Department.tree.type";
import { useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";

export const useAddDeptLogic = (reset: UseFormReset<DepartmentFormInputs>) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [requiredCategoryOptions, setRequiredCategoryOptions] = useState<
    string[]
  >(["primary-department", "secondary-department", "sub-department"]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const departmentData = useQueryPageData<DepartmentFormInputs>(reset);

  const { data: departments } = useCustomQuery<{
    info: DepartmentType[];
    tree: DeptTree[];
  }>({ queryKey: ["departments"], url: `/department/tree` });

  const { data: categories } = useCustomQuery<JobCategoryType[]>({
    queryKey: ["categories"],
    url: `/job-categories`,
  });

  useEffect(() => {
    if (categories) {
      setAvailableCategories(categories.map((category) => category.name));
    }
  }, [categories]);

  useEffect(() => {
    if (departmentData) {
      reset({
        ...departmentData,
        parent_department_id:
          departmentData.parent_department_id &&
          departmentData.parent_department_id,
      });
    } else {
      reset();
    }
  }, [departmentData, reset, categories]);

  return {
    selectedFiles,
    setSelectedFiles,
    isAddingCategory,
    setIsAddingCategory,
    newCategory,
    setNewCategory,
    requiredCategoryOptions,
    setRequiredCategoryOptions,
    availableCategories,
    departmentData,
    departments,
    categories,
  };
};
