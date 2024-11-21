import useHierarchy from "@/hooks/useHierarchy";
import useLanguage from "@/hooks/useLanguage";
import useSnackbar from "@/hooks/useSnackbar";
import { ReceiveTaskType } from "@/types/Task.type";
import CustomizedSnackbars from "../atoms/CustomizedSnackbars";
import GridContainer from "../atoms/GridContainer";

const ListTasks = ({
  tasksData,
}: {
  tasksData: ReceiveTaskType[] | undefined;
}) => {
  const { snackbarConfig, setSnackbarConfig } = useSnackbar();
  const { t, currentLanguage } = useLanguage();
  const { renderTaskWithSubtasks } = useHierarchy();

  return (
    <>
      <div className="bg-main  rounded-lg p-4 w-full h-full">
        <GridContainer>
          <div className="col-span-full min-w-full bg-main rounded-md">
            <div className="flex items-center justify-between mb-7">
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
                className={`w-[100%] text-center px-6 py-3 border-y border-slate-500 ${
                  currentLanguage == "en" ? "text-left" : "text-right"
                } text-md font-bold text-tmid  `}
              >
                {t("Status")}
              </div>
            </div>
            <div>
              {tasksData && tasksData.length > 0 ? (
                tasksData.map((task) => renderTaskWithSubtasks(task, 0))
              ) : (
                <div className="text-center mx-auto text-twhite">
                  {t("No Tasks")}
                </div>
              )}
            </div>
          </div>
        </GridContainer>

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