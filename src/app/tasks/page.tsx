"use client";

import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import PageSpinner from "@/components/common/atoms/PageSpinner";
import TasksTab from "@/components/common/atoms/TasksTab";
import TaskList from "@/components/common/organisms/TaskList";
import TasksContent from "@/components/common/organisms/TasksContent";
import {
  usePermissions,
  useRolePermissions,
} from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useLanguage from "@/hooks/useLanguage";
import { useRedux } from "@/hooks/useRedux";
import useSnackbar from "@/hooks/useSnackbar";
import { RootState } from "@/state/store";
import { ProjectType } from "@/types/Project.type";
import { SectionType } from "@/types/Section.type";
import { ReceiveTaskType } from "@/types/Task.type";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TasksView: React.FC = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("get-emp-tasks");
  const [activeTab, setActiveTab] = useState<"list" | "board">("list");
  const [myProj, setMyProj] = useState(false);
  const { t } = useLanguage();
  const isPrimary = useRolePermissions("primary_user");
  const isAdmin = useRolePermissions("admin");
  const { setSnackbarConfig, snackbarConfig } = useSnackbar();

  const { data: tasksData, isLoading: isTasksLoading } = useCustomQuery<
    ReceiveTaskType[]
  >({
    queryKey: ["tasks", selectedOption],
    url: `http://${process.env.BASE_URL}/tasks/${
      isAdmin ? "get-all-tasks" : selectedOption
    }`,
    setSnackbarConfig,
    nestedData: true,
  });

  const { data: projects } = useCustomQuery<ProjectType[]>({
    queryKey: ["projects"],
    url: `http://${process.env.BASE_URL}/projects/${
      isAdmin ? "get-all-projects" : "get-emp-project"
    }`,
    setSnackbarConfig,
  });

  const { selector } = useRedux(
    (state: RootState) => state.user.userInfo?.department.id
  );

  const { data: sections, isLoading: isSectionsLoading } = useCustomQuery<
    SectionType[]
  >({
    queryKey: ["sections", selectedOption],
    url: `http://${process.env.BASE_URL}/sections/${
      myProj
        ? `project/${selectedOption.split("/").pop()}`
        : `department/${selector}`
    }`,
    setSnackbarConfig,
  });

  useEffect(() => {
    console.log("Selected tasksData: ", tasksData);
  }, [tasksData]);

  const canViewSpecific = usePermissions(["task_search_and_view"]);

  const showMainSelect = canViewSpecific || isPrimary || isAdmin;

  return (
    <GridContainer>
      <div className="col-span-full flex justify-between items-center">
        {isSectionsLoading ? (
          <PageSpinner title={t("sections Loading ...")} />
        ) : (
          isTasksLoading && <PageSpinner title={t("Tasks Loading ...")} />
        )}
        <h1 className="text-3xl font-bold text-white text-center">
          {t("Tasks")}
        </h1>
        <div className="flex justify-center items-center gap-5">
          {/* Main Dropdown */}

          {showMainSelect && (
            <select
              className="bg-secondary outline-none border-none text-white rounded-lg px-4 py-2 focus:outline-none transition duration-200"
              value={myProj ? "my-project-tasks" : selectedOption}
              onChange={(e) => {
                if (e.target.value === "my-project-tasks") {
                  setMyProj(true);
                } else {
                  setMyProj(false);
                  setSelectedOption(e.target.value);
                }
              }}
            >
              {canViewSpecific && (
                <option value="get-emp-tasks">{t("My Tasks")}</option>
              )}
              {canViewSpecific && isPrimary && (
                <option value="get-my-dept-tasks">
                  {t("My Department Tasks")}
                </option>
              )}
              {canViewSpecific && (
                <option value="my-project-tasks">{t("Project Tasks")}</option>
              )}
            </select>
          )}

          {/* Project-Specific Dropdown */}
          {myProj && projects && projects.length > 0 && (
            <select
              className="bg-secondary outline-none border-none text-white rounded-lg px-4 py-2 focus:outline-none transition duration-200"
              onChange={(e) =>
                setSelectedOption(`get-project-tasks/${e.target.value}`)
              }
            >
              <option value="">{t("Select a project")}</option>
              {projects?.map((proj) => (
                <option key={proj._id} value={proj._id}>
                  {proj.name}
                </option>
              ))}
            </select>
          )}

          {(isAdmin || isPrimary) && (
            <button
              type="button"
              className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
              onClick={() => router.push("/tasks/add-task")}
            >
              {t("Add Task")}
            </button>
          )}
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="col-span-full">
        <TasksTab activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "list" && (
          <TaskList tasksData={tasksData} sections={sections} />
        )}
        {activeTab === "board" && (
          <GridContainer>
            <TasksContent tasksData={tasksData} sections={sections} />
          </GridContainer>
        )}
      </div>

      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </GridContainer>
  );
};

export default TasksView;
