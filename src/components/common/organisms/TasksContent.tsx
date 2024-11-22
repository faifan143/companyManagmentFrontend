// TasksContent.tsx
"use client";

import TaskColumn from "@/components/common/organisms/TaskColumn";
import useSnackbar from "@/hooks/useSnackbar";
import { categorizeTasks, onDragEnd } from "@/services/task.service";
import { SectionType } from "@/types/Section.type";
import { ReceiveTaskType } from "@/types/Task.type";
import {
  QueryObserverResult,
  RefetchOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import CustomizedSnackbars from "../atoms/CustomizedSnackbars";
import PageSpinner from "../atoms/PageSpinner";

const TasksContent = ({
  tasksData,
  sections,
  refetching,
  selectedOption,
}: {
  sections: SectionType[] | undefined;
  tasksData: ReceiveTaskType[] | undefined;
  selectedOption: string;
  refetching: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ReceiveTaskType[], Error>>;
}) => {
  const { snackbarConfig, setSnackbarConfig } = useSnackbar();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<{
    [key: string]: ReceiveTaskType[];
  }>({});
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (tasksData) {
      const categorizedTasks = categorizeTasks(tasksData);
      setTasks(categorizedTasks);
    }
  }, [tasksData]);

  if (!tasksData || tasksData.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5 text-twhite">
        {t("No Tasks")}
      </div>
    );
  }
  return (
    <>
      <DragDropContext
        // onDragEnd={(result) => {
        //   onDragEnd({
        //     result,
        //     tasks,
        //     setTasks,
        //     setMessage(msg) {
        //       setSnackbarConfig({
        //         open: true,
        //         message: msg,
        //         severity: "error",
        //       });
        //     },
        //   });
        //   setIsUpdating(true);
        //   queryClient.invalidateQueries({ queryKey: ["tasks"] }).then(() => {
        //     setIsUpdating(true);
        //     refetching().then(() => {
        //       setIsUpdating(false);
        //     });
        //   });
        // }}
        onDragEnd={async (result) => {
          onDragEnd({
            result,
            tasks,
            setTasks,
            setMessage(msg) {
              setSnackbarConfig({
                open: true,
                message: msg,
                severity: "error",
              });
            },
          });

          setIsUpdating(true);
          try {
            await queryClient.invalidateQueries({
              queryKey: ["tasks", selectedOption],
            });
            await refetching();

            if (tasksData) {
              const categorizedTasks = categorizeTasks(tasksData);
              setTasks(categorizedTasks);
            }
          } catch (error) {
            console.error("Error refetching tasks:", error);
            setSnackbarConfig({
              open: true,
              message: t("Failed to update tasks."),
              severity: "error",
            });
          } finally {
            setIsUpdating(false);
          }
        }}
      >
        {sections &&
          sections.map((sec, index) => {
            console.log(
              `task data for sectoin  ${sec.name} - ${sec._id} are :  `,
              tasks ? tasks[sec._id] : "no task data found"
            );
            return (
              <TaskColumn
                key={index}
                columnId={sec._id}
                title={sec.name}
                taskCount={(tasks && tasks[sec._id]?.length) || 0}
                tasks={(tasks && tasks[sec._id]) || []}
              />
            );
          })}

        {isUpdating && <PageSpinner />}
      </DragDropContext>

      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default TasksContent;
