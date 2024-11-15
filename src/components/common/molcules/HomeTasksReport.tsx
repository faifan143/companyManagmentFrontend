import { ReceiveTaskType } from "@/types/Task.type";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import HomeListRow from "../atoms/HomeListRow";

const HomeTasksReport = ({
  tasksData,
}: {
  tasksData: ReceiveTaskType[] | undefined;
}) => {
  const [status, setStatus] = useState<"upcoming" | "overdue" | "completed">(
    "upcoming"
  );
  const { t } = useTranslation();

  const currently =
    tasksData &&
    tasksData
      .filter((task) => !task.is_over_due && task.status != "DONE")
      .map((task, index) => (
        <>
          <HomeListRow key={index} task={task} />
          <div className="w-full h-2 bg-transparent"></div>
        </>
      ));
  const overdue =
    tasksData &&
    tasksData
      .filter((task) => task.is_over_due)
      .map((task, index) => (
        <>
          <HomeListRow key={index} task={task} />
          <div className="w-full h-2 bg-transparent"></div>
        </>
      ));
  const completed =
    tasksData &&
    tasksData
      .filter((task) => task.status == "DONE")
      .map((task, index) => (
        <>
          <HomeListRow key={index} task={task} />
          <div className="w-full h-2 bg-transparent"></div>
        </>
      ));

  return (
    <>
      <div className="bg-main w-[70%] min-h-64 rounded-md shadow-md mx-auto mt-5 p-5 text-white border border-slate-700">
        <div className="text-lg font-bold">My Tasks</div>
        <div className="flex items-center gap-3 text-sm my-5 font-semibold border-b border-slate-700">
          <div
            onClick={() => setStatus("upcoming")}
            className={
              status == "upcoming"
                ? "border-b-[3px] border-slate-700 pb-[3px] "
                : "cursor-pointer text-slate-400 pb-[5px]"
            }
          >
            Currently {"(" + currently?.length + ")"}
          </div>
          <div
            onClick={() => setStatus("overdue")}
            className={
              status == "overdue"
                ? "border-b-[3px] border-slate-700 pb-[3px]"
                : "cursor-pointer text-slate-400 pb-[5px]"
            }
          >
            Overdue {"(" + overdue?.length + ")"}
          </div>
          <div
            onClick={() => setStatus("completed")}
            className={
              status == "completed"
                ? "border-b-[3px] border-slate-700 pb-[3px]"
                : "cursor-pointer text-slate-400 pb-[5px]"
            }
          >
            Completed {"(" + completed?.length + ")"}
          </div>
        </div>
        {status == "upcoming" && (
          <div className="w-full">
            {currently && currently.length > 0 ? (
              currently
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
              overdue
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
              completed
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
