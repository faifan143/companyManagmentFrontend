/* eslint-disable @typescript-eslint/no-explicit-any */
import { XIcon } from "@/assets";
import useCustomTheme from "@/hooks/useCustomTheme";
import useLanguage from "@/hooks/useLanguage";
import { DepartmentFormInputs } from "@/types/DepartmentType.type";
import Image from "next/image";
import { UseFormRegister } from "react-hook-form";

interface DeptAdditionalSectionProps {
  register: UseFormRegister<DepartmentFormInputs>; 
  errors: Record<string, any>;
  numericOwnersFields: { id: string; category: string; count: number }[];
  availableCategories: string[];
  handleAddNumericOwner: (callback: (value: any) => void) => void;
  appendNumericOwner: (value: any) => void;
  removeNumericOwner: (index: number) => void;
  requiredReportsFields: { id: string; name: string; templateFile: string }[];
  appendRequiredReport: (value: any) => void;
  removeRequiredReport: (index: number) => void;
  developmentProgramsFields: { id: string; name: string }[];
  appendDevelopmentProgram: (value: any) => void;
  removeDevelopmentProgram: (index: number) => void;
  setValue: (name: string, value: any) => void;
}

const DeptAdditionalSection = ({
  register,
  errors,
  numericOwnersFields,
  availableCategories,
  handleAddNumericOwner,
  appendNumericOwner,
  removeNumericOwner,
  requiredReportsFields,
  appendRequiredReport,
  removeRequiredReport,
  developmentProgramsFields,
  appendDevelopmentProgram,
  removeDevelopmentProgram,
  setValue,
}: DeptAdditionalSectionProps) => {
  const { t } = useLanguage();
  const { isLightMode } = useCustomTheme();

  return (
    <>
      <div>
        <label className="text-tmid block text-sm font-medium">
          {t("Numeric Owners")}
        </label>
        {numericOwnersFields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-center">
            <select
              {...register(`numericOwners.${index}.category` as const)}
              className={`    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              } w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent border ${
                errors.numericOwners?.[index]?.category
                  ? "border-high"
                  : "border-border"
              }`}
            >
              <option value="">{t("Select a Job Category")}</option>
              {availableCategories.map((category, i) => (
                <option
                  key={i}
                  value={category}
                  onClick={() => handleAddNumericOwner(appendNumericOwner)}
                >
                  {category}
                </option>
              ))}
            </select>
            {errors.numericOwners?.[index]?.category && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.numericOwners?.[index]?.category?.message}
              </p>
            )}
            <input
              type="number"
              {...register(`numericOwners.${index}.count` as const)}
              placeholder={t("Count")}
              className={`    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
            />
            <Image
              src={XIcon}
              alt="icon"
              width={30}
              height={30}
              className=" bg-main cursor-pointer p-1 shadow-md rounded-md text-red-500"
              onClick={() => removeNumericOwner(index)} // Remove numeric owner
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendNumericOwner({ count: 1, category: "" })}
          className="text-sm text-tbright underline"
        >
          {t("Add Numeric Owner")}
        </button>
      </div>

      {/* Supporting Files Section */}
      <div>
        {/* <div className="block text-tmid text-sm font-medium">
              {t("Supporting Files")}
            </div>

            <input
              hidden
              id="file-id"
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, setSelectedFiles)} 
              className={`    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg `}
            /> */}
        {/* Display selected file names */}
        {/* {selectedFiles.map((file, index) => (
              <div key={index} className="flex gap-4 items-center">
                <span>{file.name}</span>
                <Image
                  src={XIcon}
                  alt="icon"
                  width={30}
                  height={30}
                  className=" bg-main cursor-pointer p-1 shadow-md rounded-md text-red-500"
                  onClick={() => handleRemoveFile(index, setSelectedFiles)} // Remove selected file
                />
              </div>
            ))}

            <label
              htmlFor="text-tmid file-id"
              className="text-sm text-tbright underline cursor-pointer"
            >
              {t("Attach Supporting File")}
            </label> */}
      </div>

      {/* Required Reports Section */}
      <div>
        <label className="text-tmid block text-sm font-medium">
          {t("Required Reports")}
        </label>
        {requiredReportsFields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-center">
            <input
              type="text"
              {...register(`requiredReports.${index}.name` as const)}
              placeholder={t("Report Name")}
              className={`    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
            />
            <input
              type="file"
              placeholder={t("Template File")}
              className={`    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
              onChange={(e) => {
                const file = e.target.files?.[0]; // Get the selected file
                if (file) {
                  setValue(
                    `requiredReports.${index}.templateFile` as const,
                    file.name
                  );
                }
              }}
            />
            <Image
              src={XIcon}
              alt="icon"
              width={30}
              height={30}
              className=" bg-main cursor-pointer p-1 shadow-md rounded-md text-red-500"
              onClick={() => removeRequiredReport(index)} // Remove report
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendRequiredReport({ name: "", templateFile: "" })}
          className="text-sm text-tbright underline"
        >
          {t("Add Required Report")}
        </button>
      </div>

      {/* Development Programs Section */}
      <div>
        <label className="text-tmid block text-sm font-medium">
          {t("Development Programs")}
        </label>
        {developmentProgramsFields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-center">
            <input
              type="text"
              {...register(`developmentPrograms.${index}.programName` as const)}
              placeholder={t("Program Name")}
              className={`    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
            />
            <input
              type="text"
              {...register(`developmentPrograms.${index}.objective` as const)}
              placeholder={t("Objective")}
              className={`    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              } w-full bg-secondary border-none outline-none px-4 py-2 mt-1 rounded-lg border `}
            />

            <input
              type="file"
              placeholder={t("Program File")}
              className={`    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
              onChange={(e) => {
                const file = e.target.files?.[0]; // Get the selected file
                if (file) {
                  setValue(
                    `developmentPrograms.${index}.programFile` as const,
                    file.name
                  ); // Use correct template literal
                }
              }}
            />

            <textarea
              {...register(`developmentPrograms.${index}.notes` as const)}
              placeholder={t("Notes")}
              className={`    ${
                isLightMode
                  ? "bg-dark  placeholder:text-tdark "
                  : "bg-secondary"
              }  w-full  bg-secondary border-none outline-none  px-4 py-2 mt-1 rounded-lg border `}
              rows={1}
            />
            <Image
              src={XIcon}
              alt="icon"
              width={30}
              height={30}
              className=" bg-main cursor-pointer p-1 shadow-md rounded-md text-red-500"
              onClick={() => removeDevelopmentProgram(index)} // Remove program
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendDevelopmentProgram({
              programName: "",
              objective: "",
              notes: "",
              programFile: "",
            })
          }
          className="text-sm text-tbright underline"
        >
          {t("Add Development Program")}
        </button>
      </div>
    </>
  );
};

export default DeptAdditionalSection;
