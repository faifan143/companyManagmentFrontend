import useHierarchy from "@/hooks/useHierarchy";
import { ReceiveTaskType } from "@/types/task.type";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const HomeTasksReport = ({
  tasksData,
  isCentered = true,
}: {
  tasksData: ReceiveTaskType[] | undefined;
  isCentered?: boolean;
}) => {
  const [status, setStatus] = useState<"upcoming" | "overdue" | "completed">(
    "upcoming"
  );
  const { t } = useTranslation();
  const { renderHomeTaskWithSubtasks, organizeTasksByHierarchy } =
    useHierarchy();

  const currently =
    tasksData &&
    tasksData.filter((task) => !task.is_over_due && task.status != "DONE");
  const overdue = tasksData && tasksData.filter((task) => task.is_over_due);
  const completed =
    tasksData && tasksData.filter((task) => task.status == "DONE");

  useEffect(() => {
    console.log("overdue: ", overdue);
  }, [overdue]);

  return (
    <>
      <div
        className={`bg-main  min-h-64 rounded-md shadow-md ${
          isCentered ? "mx-auto w-[70%]" : ""
        }  mt-5 p-5 text-twhite border border-slate-700`}
      >
        <div className="text-lg font-bold">{t("Tasks")}</div>
        <div className="flex items-center gap-3 text-sm my-5 font-semibold border-b border-slate-700">
          <div
            onClick={() => setStatus("upcoming")}
            className={
              status == "upcoming"
                ? "border-b-[3px] border-slate-700 pb-[3px] "
                : "cursor-pointer text-tdark pb-[5px]"
            }
          >
            {t("Currently")} {"(" + currently?.length + ")"}
          </div>
          <div
            onClick={() => setStatus("overdue")}
            className={
              status == "overdue"
                ? "border-b-[3px] border-slate-700 pb-[3px]"
                : "cursor-pointer text-tdark pb-[5px]"
            }
          >
            {t("Overdue")} {"(" + overdue?.length + ")"}
          </div>
          <div
            onClick={() => setStatus("completed")}
            className={
              status == "completed"
                ? "border-b-[3px] border-slate-700 pb-[3px]"
                : "cursor-pointer text-tdark pb-[5px]"
            }
          >
            {t("Completed")} {"(" + completed?.length + ")"}
          </div>
        </div>
        {status == "upcoming" && (
          <div className="w-full">
            {currently && currently.length > 0 ? (
              organizeTasksByHierarchy(currently).map((task) =>
                renderHomeTaskWithSubtasks(task, 0)
              )
            ) : (
              <div className="relative top-1/2 left-1/2 -translate-x-1/2  flex flex-col items-center justify-center gap-5">
                {t("No Tasks")}
              </div>
            )}
          </div>
        )}
        {status == "overdue" && (
          <div className=" h-full">
            {overdue && overdue.length > 0 ? (
              organizeTasksByHierarchy(overdue).map((task) =>
                renderHomeTaskWithSubtasks(task, 0)
              )
            ) : (
              <div className="relative top-1/2 left-1/2 -translate-x-1/2  flex flex-col items-center justify-center gap-5">
                {t("No Tasks")}
              </div>
            )}
          </div>
        )}
        {status == "completed" && (
          <div className=" h-full">
            {completed && completed.length > 0 ? (
              organizeTasksByHierarchy(completed).map((task) =>
                renderHomeTaskWithSubtasks(task, 0)
              )
            ) : (
              <div className="relative top-1/2 left-1/2 -translate-x-1/2  flex flex-col items-center justify-center gap-5">
                {t("No Tasks")}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeTasksReport;
