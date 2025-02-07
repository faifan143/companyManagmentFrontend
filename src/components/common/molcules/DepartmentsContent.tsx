import { PencilIcon } from "@/assets";
import {
  usePermissions,
  useRolePermissions,
} from "@/hooks/useCheckPermissions";
import useCustomTheme from "@/hooks/useCustomTheme";
import useSetPageData from "@/hooks/useSetPageData";
import { DepartmentType } from "@/types/DepartmentType.type";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const DepartmentsContent = ({
  departmentsData,
}: {
  departmentsData: DepartmentType[];
}) => {
  const { t } = useTranslation();
  const isAdmin = useRolePermissions("admin");

  const hasEditPermission = usePermissions(["department_updatesss"]);
  const { handleEditClick } = useSetPageData<DepartmentType>(
    "/departments/add-department"
  );
  const { isLightMode } = useCustomTheme();
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const InfoSection = ({
    label,
    content,
    className = "",
  }: {
    label: string;
    content: string | React.ReactNode;
    className?: string;
  }) => (
    <div className={className}>
      <label className="text-sm text-gray-400 mb-1 block">{t(label)}</label>
      <div
        className={`
        ${isLightMode ? "text-tdark" : "text-twhite"}
        ${typeof content === "string" ? "line-clamp-2" : ""}
      `}
      >
        {content || t("None")}
      </div>
    </div>
  );

  return (
    <div
      className={`
      ${isLightMode ? "bg-main" : "bg-main"}
      rounded-xl p-6 min-h-[600px]
    `}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {departmentsData.map((department) => (
          <div
            key={department.id}
            className={`
               rounded-xl overflow-hidden
              transition-all duration-300 group
              ${isLightMode ? "bg-secondary " : "bg-secondary "}
              ${department.id === selectedDept ? "ring-2 ring-blue-500/50" : ""}
              hover:shadow-lg
              ${
                isLightMode
                  ? "before:from-blue-500/2 before:via-purple-500/2 before:to-blue-500/2"
                  : "before:from-blue-400/2 before:via-purple-400/2 before:to-blue-400/2"
              }
            `}
          >
            {/* Card Header */}
            <div
              className={`
               p-5  
              ${
                isLightMode
                  ? "bg-gradient-to-r from-darkest via-darkest to-darkest"
                  : "bg-gradient-to-r from-tblack via-tblack to-tblack"
              }
              border-b border-gray-600/10
              group-hover:shadow-sm transition-all duration-300
            `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className={`font-semibold text-lg mb-1
                    ${"text-white"}
                  `}
                  >
                    {department.name}
                  </h3>
                  <div className="text-sm text-gray-200">
                    {department.parent_department
                      ? `${t("Parent")}: ${
                          departmentsData.find(
                            (dep) => dep.id === department.parent_department
                          )?.name
                        }`
                      : t("No parent")}
                  </div>
                </div>

                {(isAdmin || hasEditPermission) && (
                  <button
                    onClick={() => handleEditClick(department)}
                    className="p-2 rounded-lg transition-all duration-200
                      bg-green-500/60 hover:bg-green-500/70
                      hover:shadow-lg active:scale-95"
                  >
                    <Image
                      src={PencilIcon}
                      alt="edit"
                      height={18}
                      width={18}
                      className="opacity-80 hover:opacity-100"
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Card Content */}
            <div
              onClick={() =>
                setSelectedDept(
                  department.id === selectedDept ? null : department.id
                )
              }
              className="relative p-5 cursor-pointer space-y-4 "
            >
              {/* Extended Info */}
              <div
                className={`
                space-y-4  border-t border-gray-600/10
                transition-all duration-300
                ${
                  selectedDept === department.id
                    ? "opacity-100"
                    : "opacity-0 h-0 overflow-hidden pt-0 border-none"
                }
              `}
              >
                <InfoSection label="Category" content={department.category} />
                <InfoSection label="Goal" content={department.goal} />
                <InfoSection
                  label="Main Tasks"
                  content={department.mainTasks}
                />
                {/* Numeric Owners */}
                {department.numericOwners?.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      {t("Staff Distribution")}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {department.numericOwners.map((owner, idx) => (
                        <div
                          key={idx}
                          className={`
                            px-3 py-1.5 rounded-lg text-sm
                            ${
                              isLightMode
                                ? "bg-darker/70 hover:bg-darker"
                                : "bg-secondary/70 hover:bg-secondary"
                            }
                            transition-colors duration-200
                          `}
                        >
                          <span className="text-gray-400">
                            {owner.category}:
                          </span>
                          <span
                            className={`ml-1 font-medium ${
                              isLightMode ? "text-tdark" : "text-twhite"
                            }`}
                          >
                            {owner.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Required Reports */}
                {department.requiredReports?.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      {t("Required Reports")}
                    </label>
                    <div className="space-y-2">
                      {department.requiredReports.map((report, idx) => (
                        <div
                          key={idx}
                          className={`
                            p-3 rounded-lg text-sm
                            ${
                              isLightMode
                                ? "bg-darker/70 hover:bg-darker"
                                : "bg-secondary/70 hover:bg-secondary"
                            }
                            transition-colors duration-200
                          `}
                        >
                          <div
                            className={`font-medium ${
                              isLightMode ? "text-tdark" : "text-twhite"
                            }`}
                          >
                            {report.name}
                          </div>
                          <div className="text-gray-400 mt-1">
                            {t("Template")}: {report.templateFile}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Development Programs */}
                {department.developmentPrograms?.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      {t("Development Programs")}
                    </label>
                    <div className="space-y-2">
                      {department.developmentPrograms.map((program, idx) => (
                        <div
                          key={idx}
                          className={`
                            p-3 rounded-lg text-sm
                            ${
                              isLightMode
                                ? "bg-darker/70 hover:bg-darker"
                                : "bg-secondary/70 hover:bg-secondary"
                            }
                            transition-colors duration-200
                          `}
                        >
                          <div
                            className={`font-medium ${
                              isLightMode ? "text-tdark" : "text-twhite"
                            }`}
                          >
                            {program.programName}
                          </div>
                          <div className="text-gray-400 mt-1">
                            {program.objective}
                          </div>
                          {program.notes && (
                            <div className="text-gray-400 mt-1">
                              {t("Notes")}: {program.notes}
                            </div>
                          )}
                          <div className="text-sm text-gray-400 mt-1">
                            {t("File")}: {program.programFile}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Supporting Files */}
                {department.supportingFiles?.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      {t("Supporting Files")}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {department.supportingFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className={`
                            px-3 py-1.5 rounded-lg text-sm
                            ${
                              isLightMode
                                ? "bg-darker/70 hover:bg-darker"
                                : "bg-secondary/70 hover:bg-secondary"
                            }
                            ${isLightMode ? "text-tdark" : "text-twhite"}
                            transition-colors duration-200
                          `}
                        >
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Expansion Indicator */}
              <div className="text-center text-gray-400 text-sm mt-0">
                {selectedDept === department.id
                  ? t("Click to collapse")
                  : t("Click to expand")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentsContent;
