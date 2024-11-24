"use client";

import PageSpinner from "@/components/common/atoms/PageSpinner";
import TaskListView from "@/components/common/organisms/TaskListView";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useSnackbar from "@/hooks/useSnackbar";
import { useEffect } from "react";

const ProjectTasks = ({ params: { id } }: { params: { id: string } }) => {
  const { setSnackbarConfig } = useSnackbar();

  const {
    mutate: getProjectTask,
    data: projectTask,
    isPending,
  } = useCreateMutation({
    endpoint: "/tasks/get-project-tasks-by-dept",
    onSuccessMessage: "project task fetched successfully!",
    invalidateQueryKeys: ["projectTasks"],
    setSnackbarConfig,
    onSuccessFn: () => {},
    requestType: "post",
  });

  useEffect(() => {
    getProjectTask({
      project_id: id[0],
      department_id: id[1],
    });
  }, []);

  return (
    <div>
      {isPending ? <PageSpinner /> : <TaskListView tasksData={projectTask} />}
    </div>
  );
};

export default ProjectTasks;
