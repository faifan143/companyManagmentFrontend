import useLanguage from "@/hooks/useLanguage";
import useSnackbar from "@/hooks/useSnackbar";
import { categorizeTasks } from "@/services/task.service";
import { SectionType } from "@/types/section.type";
import { ReceiveTaskType } from "@/types/task.type";
import { useEffect, useState } from "react";
import AddSectionModal from "../atoms/AddSectionModal";
import CustomizedSnackbars from "../atoms/CustomizedSnackbars";
import ListSection from "../molcules/ListSection";
import useCustomTheme from "@/hooks/useCustomTheme";

const ListTasks = ({
  tasksData,
  sections,
}: {
  tasksData: ReceiveTaskType[] | undefined;
  sections: SectionType[] | undefined;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<{
    [key: string]: ReceiveTaskType[];
  }>({});
  const { isLightMode } = useCustomTheme();
  const { snackbarConfig, setSnackbarConfig } = useSnackbar();
  const { t, currentLanguage } = useLanguage();
  useEffect(() => {
    if (tasksData) {
      const categorizedTasks = categorizeTasks(tasksData);
      setTasks(categorizedTasks);
    }
  }, [tasksData]);

  return (
    <>
      <div className="bg-main  rounded-lg p-4 w-full h-full">
        <div className="min-w-full bg-main rounded-md">
          <div className="flex items-center justify-between">
            <div
              className={`w-[100%] px-6 py-3 border-y border-slate-500 ${
                currentLanguage == "en" ? "text-left" : "text-right"
              } text-md font-bold text-tmid  `}
            >
              {t("Task Name")}
            </div>
            <div
              className={`w-[100%] text-center px-6 py-3 border border-slate-500 ${
                currentLanguage == "en" ? "text-left" : "text-right"
              } text-md font-bold text-tmid  `}
            >
              {t("Due Date")}
            </div>
            <div
              className={`w-[100%] text-center px-6 py-3 border border-slate-500 ${
                currentLanguage == "en" ? "text-left" : "text-right"
              } text-md font-bold text-tmid  `}
            >
              {t("Status")}
            </div>
            <div
              className={`w-[100%] text-center px-6 py-3 border-y border-slate-500 ${
                currentLanguage == "en" ? "text-left" : "text-right"
              } text-md font-bold text-tmid  `}
            >
              {t("Actions")}
            </div>
          </div>
          <div>
            {sections &&
              sections.map((section) => (
                <ListSection
                  key={section._id}
                  section={section}
                  tasks={tasks && tasks[section._id]}
                />
              ))}
          </div>
        </div>
        <div
          onClick={() => setIsModalOpen(true)}
          className={`rounded-xl shadow-md py-2 px-4      border-dashed  hover:shadow-xl border-2 text-center content-center  w-fit ${
            isLightMode
              ? "text-darkest hover:bg-darkest border-darkest  hover:text-tblackAF"
              : "border-slate-500 hover:bg-slate-500 text-tblack hover:text-twhite"
          }  cursor-pointer`}
        >
          {t("Add section")}
        </div>
        {isModalOpen && (
          <>
            <div
              className="fixed inset-0  backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <AddSectionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </>
        )}
        <CustomizedSnackbars
          open={snackbarConfig.open}
          message={snackbarConfig.message}
          severity={snackbarConfig.severity}
          onClose={() =>
            setSnackbarConfig((prev) => ({ ...prev, open: false }))
          }
        />
      </div>
    </>
  );
};

export default ListTasks;
