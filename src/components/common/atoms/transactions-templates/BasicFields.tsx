import useCustomQuery from "@/hooks/useCustomQuery";
import useLanguage from "@/hooks/useLanguage";
import { DepartmentType } from "@/types/DepartmentType.type";
import { FormData, Option } from "@/types/new-template.type";
import { DeptTree } from "@/types/trees/Department.tree.type";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CustomInput } from "../CustomInput";
import { CustomSelect } from "../CustomSelect";
import { CustomTextarea } from "../CustomTextarea";
import useCustomTheme from "@/hooks/useCustomTheme";

const BasicFields = ({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}) => {
  const { t } = useLanguage();
  const { isLightMode } = useCustomTheme();
  const { data: departments } = useCustomQuery<{
    info: DepartmentType[];
    tree: DeptTree[];
  }>({
    queryKey: ["departments"],
    url: `/department/tree`,
  });

  const transactionTypes: Option[] = [
    { value: "internal", label: t("Internal") },
    { value: "external", label: t("External") },
  ];

  const durationTypes: Option[] = [
    { value: "days", label: t("Days") },
    { value: "hours", label: t("Hours") },
  ];

  const [minDate, setMinDate] = useState<string>("");
  const [minTime, setMinTime] = useState<string>("");

  // Set min date and time on component mount
  useEffect(() => {
    const now = new Date();

    // Format YYYY-MM-DD for date input
    const today = now.toISOString().split("T")[0];
    setMinDate(today);

    // Format HH:MM for time input (24-hour format)
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setMinTime(`${hours}:${minutes}`);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log("name: " + name, " , value: " + value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      duration: {
        ...prev.duration,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <div className="space-y-4">
        <CustomInput
          label={t("Transaction Name")}
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder={t("Enter transaction name")}
        />

        <CustomSelect
          label={t("Transaction Type")}
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          options={transactionTypes}
          required
          placeholder={t("Set Transaction Type")}
        />

        <CustomTextarea
          label={t("Description")}
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          placeholder={t("Enter transaction description")}
        />

        <div>
          <label htmlFor="" className="text-twhite">
            {t("Select a Department")}
          </label>
          <select
            name="departments"
            className={`w-full ${
              isLightMode ? "bg-dark   " : "bg-secondary"
            } text-twhite  outline-none border-none px-4 py-2 mt-1 rounded-lg border `}
            onChange={handleInputChange}
          >
            <option value="" disabled></option>
            {departments &&
              departments.tree &&
              departments.tree.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
          </select>
        </div>

        {/* Duration Fields */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-twhite">
            {t("Duration")}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CustomSelect
              label={t("Select Duration Type")}
              name="durationType"
              placeholder={t("Set Duration")}
              value={formData.durationType}
              onChange={handleInputChange}
              options={durationTypes}
            />
            {formData.durationType === "days" ? (
              <>
                <CustomInput
                  label={t("Start")}
                  type="date"
                  name="start"
                  value={formData.duration.start}
                  onChange={handleDurationChange}
                  min={minDate} // Restrict past dates
                />
                <CustomInput
                  label={t("End")}
                  type="date"
                  name="end"
                  value={formData.duration.end}
                  onChange={handleDurationChange}
                  min={formData.duration.start || minDate} // Ensure end date is not before start
                />
              </>
            ) : (
              <>
                <CustomInput
                  label={t("Start")}
                  type="time"
                  name="start"
                  value={formData.duration.start}
                  onChange={handleDurationChange}
                  min={minTime} // Restrict past hours
                />
                <CustomInput
                  label={t("End")}
                  type="time"
                  name="end"
                  value={formData.duration.end}
                  onChange={handleDurationChange}
                  min={formData.duration.start || minTime} // Ensure end time is after start
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicFields;
