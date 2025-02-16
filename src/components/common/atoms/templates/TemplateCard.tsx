import useCustomQuery from "@/hooks/useCustomQuery";
import useLanguage from "@/hooks/useLanguage";
import useSetPageData from "@/hooks/useSetPageData";
import { DepartmentType } from "@/types/DepartmentType.type";
import { templateType } from "@/types/new-template.type";
import { DeptTree } from "@/types/trees/Department.tree.type";
import { getDeptNameById } from "@/utils/get_dept_name_by_id";

const TemplateCard: React.FC<{
  template: templateType;
}> = ({ template }) => {
  const { t, getDir } = useLanguage();
  const { NavigateButton } = useSetPageData("/transactions/add-transaction");
  const { data: departments } = useCustomQuery<{
    info: DepartmentType[];
    tree: DeptTree[];
  }>({
    queryKey: ["departments"],
    url: `/department/tree`,
  });

  return (
    <div className="group bg-secondary rounded-xl overflow-hidden transition-all duration-300 border border-gray-700/50">
      <div className="p-7 flex flex-col h-full ">
        {/* Header Section */}
        <div className="flex justify-between items-start gap-4 mb-5">
          <h2 className="text-xl font-semibold text-twhite  transition-colors duration-200">
            {template.name}
          </h2>
          <span className="px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-full bg-main text-tmid border border-main">
            {t(template.type)}
          </span>
        </div>

        {/* Description */}
        <p className="text-tmid mb-6 line-clamp-2 leading-relaxed">
          {template.description}
        </p>

        {/* Info Section */}
        <div className="space-y-4 mb-6">
          <div
            className="flex items-center justify-between bg-main rounded-lg px-4 py-3"
            dir={getDir()}
          >
            <span className="text-sm font-medium text-twhite">
              {t("Duration")}
            </span>
            <span className="text-sm text-tmid">
              {template.duration.value} {t(template.duration.unit)}
            </span>
          </div>

          {template.departments_approval_track.length > 0 && (
            <div className="bg-main rounded-lg px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-twhite">
                  {t("Approval Track")}
                </span>
                <span className="text-xs text-tmid">
                  {template.departments_approval_track.length} {t("steps")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {template.departments_approval_track.map((dept, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1.5 bg-secondary rounded-md text-xs font-medium text-tmid"
                  >
                    {departments &&
                      departments.tree &&
                      getDeptNameById(dept._id, departments!.tree)}
                  </span>
                ))}
              </div>
            </div>
          )}
          {template.departments_execution_ids.length > 0 && (
            <div className="bg-main rounded-lg px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-twhite">
                  {t("Execution Departments")}
                </span>
                <span className="text-xs text-tmid">
                  {template.departments_execution_ids.length} {t("departments")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {template.departments_execution_ids.map((dept, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1.5 bg-secondary rounded-md text-xs font-medium text-tmid"
                  >
                    {departments &&
                      departments.tree &&
                      getDeptNameById(dept._id, departments!.tree)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Required Fields Section */}
        {template.transactionFields.length > 0 && (
          <div className="border-t border-gray-700/30 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-twhite">
                {t("Required Fields")}
              </h3>
              <span className="text-xs text-tmid">
                {template.transactionFields.length} {t("fields")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {template.transactionFields.map((field, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1.5 bg-main rounded-md text-xs font-medium text-tmid hover:text-twhite transition-colors duration-200"
                >
                  {field.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6">
          <NavigateButton
            data={template}
            className="w-full bg-tblack hover:bg-main text-twhite font-medium px-5 py-3 rounded-lg transition-all duration-200 text-center group-hover:shadow-lg flex items-center justify-center gap-2 rtl:flex-row-reverse"
          >
            {t("Make Transaction")}
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </NavigateButton>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
