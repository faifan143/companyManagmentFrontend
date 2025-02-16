/* eslint-disable @typescript-eslint/no-explicit-any */
import useCustomQuery from "@/hooks/useCustomQuery";
import useLanguage from "@/hooks/useLanguage";
import { DepartmentType } from "@/types/DepartmentType.type";
import { FormData, Option } from "@/types/new-template.type";
import { DeptTree } from "@/types/trees/Department.tree.type";
import React from "react";
import { MultiValue, SingleValue } from "react-select";
import { CustomInput } from "../ui/CustomInput";
import CustomReactSelect from "../ui/CustomReactSelect";
import { CustomTextarea } from "../ui/CustomTextarea";
import DynamicToggle from "../ui/DynamicToggle";

const BasicFields: React.FC<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}> = ({ formData, setFormData }) => {
  const { t } = useLanguage();

  const { data: departments } = useCustomQuery<{
    info: DepartmentType[];
    tree: DeptTree[];
  }>({
    queryKey: ["departments"],
    url: `/department/tree`,
  });

  const handleTypeChange = (newValue: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      type: newValue?.value || "",
    }));
  };

  const handleDurationTypeChange = (newValue: SingleValue<Option>) => {
    if (newValue) {
      setFormData((prev) => ({
        ...prev,
        duration: {
          ...prev.duration,
          unit: newValue.value as "days" | "hours" | "months",
        },
      }));
    }
  };

  const handleApprovalTrackChange = (newValue: MultiValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      departments_approval_track: newValue.map((opt) => opt.value),
    }));
  };

  const handleExecutionDeptChange = (newValue: MultiValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      departments_execution_ids: newValue.map((opt) => opt.value),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      duration: {
        ...prev.duration,
        value: parseInt(value) || 0,
      },
    }));
  };

  const transactionTypes: Option[] = [
    { value: "internal", label: t("Internal") },
    { value: "external", label: t("External") },
  ];

  const durationTypes: Option[] = [
    { value: "days", label: t("Days") },
    { value: "hours", label: t("Hours") },
    { value: "months", label: t("Months") },
  ];

  const departmentOptions: Option[] =
    departments?.tree?.map((dept) => ({
      value: dept.id,
      label: dept.name,
    })) || [];

  return (
    <div>
      <div className="space-y-4">
        <CustomInput
          label={t("Transaction Name")}
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={t("Set Transaction Name")}
          required
        />
        <CustomReactSelect
          label={t("Transaction Type")}
          options={transactionTypes}
          value={transactionTypes.find((type) => type.value === formData.type)}
          onChange={handleTypeChange}
          placeholder={t("Set Transaction Type")}
          isSearchable={false}
        />
        <CustomTextarea
          label={t("Description")}
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          placeholder={t("Enter transaction description")}
        />

        <CustomReactSelect
          label={t("Select Approval Track Departments")}
          isMulti
          options={departmentOptions}
          value={departmentOptions.filter((opt) =>
            formData.departments_approval_track.includes(opt.value)
          )}
          onChange={handleApprovalTrackChange}
          placeholder={t("Select departments in approval order")}
          noOptionsMessage={() => t("No more departments available")}
          isClearable={false}
        />
        <CustomReactSelect
          label={t("Select Execution Department")}
          isMulti
          options={departmentOptions}
          value={departmentOptions.filter((opt) =>
            formData.departments_execution_ids.includes(opt.value)
          )}
          onChange={handleExecutionDeptChange}
          placeholder={t("Select departments")}
        />
        <div>
          <label className="text-sm font-medium text-twhite">
            {t("Duration")}
          </label>
          <div className="flex items-end gap-4">
            <div className="flex flex-col gap-2 w-2/3">
              <CustomReactSelect
                options={durationTypes}
                onChange={handleDurationTypeChange}
                placeholder={t("Set Duration Type")}
                isSearchable={false}
              />
            </div>
            <div className="w-1/3">
              <CustomInput
                type="number"
                label=""
                value={formData.duration?.value || ""}
                onChange={handleDurationChange}
                min="1"
                placeholder={t("Enter duration value")}
              />
            </div>
          </div>
        </div>
        <DynamicToggle
          label="Need Admin Approval?"
          description="Enable this option if admin approval is required"
          value={formData.needAdminApproval}
          setValue={(value) =>
            setFormData({ ...formData, needAdminApproval: value })
          }
        />
      </div>
    </div>
  );
};

export default BasicFields;
