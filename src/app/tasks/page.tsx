// {/* Main Dropdown */}
// {showMainSelect && (
//   <select
//     className="bg-secondary outline-none border-none text-twhite rounded-lg px-4 py-2 focus:outline-none transition duration-200"
//     value={myProj ? "my-project-tasks" : selectedOption}
//     onChange={(e) => {
//       const value = e.target.value;
//       setMyProj(value === "my-project-tasks");
//       setMyDept(value === "get-my-dept-tasks");
//       if (
//         value !== "my-project-tasks" &&
//         value !== "get-my-dept-tasks"
//       )
//         setSelectedOption(value);
//     }}
//   >
//     {canViewTasks && <option value="">{t("My Tasks")}</option>}
//     {canViewTasks && (isPrimary || isAdmin) && (
//       <option value="get-my-dept-tasks">
//         {t("Department Tasks")}
//       </option>
//     )}
//     {canViewTasks && (
//       <option value="my-project-tasks">{t("Project Tasks")}</option>
//     )}
//   </select>
// )}

// {/* Project-Specific Dropdown */}
// {myProj && projects && projects?.length > 0 && (
//   <select
//     className="bg-secondary outline-none border-none text-twhite rounded-lg px-4 py-2 focus:outline-none transition duration-200"
//     onChange={(e) => setSelectedProj(e.target.value)}
//   >
//     <option value="">{t("Select a project")}</option>
//     {projects.map((proj) => (
//       <option key={proj._id} value={proj._id}>
//         {proj.name}
//       </option>
//     ))}
//   </select>
// )}

// {/* Departments Dropdown */}
// {(myDept || selectedProj) && deptTree && deptTree?.length > 0 && (
//   <select
//     className="bg-secondary outline-none border-none text-twhite rounded-lg px-4 py-2 focus:outline-none transition duration-200"
//     onChange={(e) => {
//       console.log(`Selected department: ${e.target.value}`);

//       const value = e.target.value;

//       if (myProj && selectedProj)
//         setSelectedOption(
//           "departmentId=" + value + "&projectId=" + selectedProj
//         );
//       setSelectedOption("departmentId=" + value);
//     }}
//   >
//     <option value="">{t("Select a department")}</option>
//     {deptTree.map((dTree) => (
//       <option key={dTree.id} value={dTree.id}>
//         {dTree.name}
//       </option>
//     ))}
//   </select>
// )}
"use client";

import { TabBoardIcon, TabListIcon, TreeIcon } from "@/assets";
import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import PageSpinner from "@/components/common/atoms/PageSpinner";
import TasksTab from "@/components/common/atoms/TasksTab";
import TaskList from "@/components/common/organisms/TaskList";
import TasksContent from "@/components/common/organisms/TasksContent";
import RouteWrapper from "@/components/common/RouteWrapper";
import TaskHierarchyTree from "@/components/common/TasksHierarchyTree";
import {
  usePermissions,
  useRolePermissions,
} from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useLanguage from "@/hooks/useLanguage";
import { useRedux } from "@/hooks/useRedux";
import useSnackbar from "@/hooks/useSnackbar";
import { RootState } from "@/state/store";
import { ProjectType } from "@/types/project.type";
import { SectionType } from "@/types/section.type";
import { ReceiveTaskType } from "@/types/task.type";
import { DeptTree } from "@/types/trees/department.tree.type";
import { TaskTree } from "@/types/trees/task.tree.type";
import React, { useEffect, useState } from "react";

const TasksView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("list");
  const [myProj, setMyProj] = useState(false);
  const [myDept, setMyDept] = useState(false);
  const [selectedProj, setSelectedProj] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const { t } = useLanguage();
  const isAdmin = useRolePermissions("admin");
  const isPrimary = useRolePermissions("primary_user");
  const [selectedOption, setSelectedOption] = useState(
    // isPrimary ? "get-my-dept-tasks" :
    ""
  );
  const { setSnackbarConfig, snackbarConfig } = useSnackbar();
  const { data: tasksData, isLoading: isTasksLoading } = useCustomQuery<{
    info: ReceiveTaskType[];
    tree: TaskTree[];
  }>({
    queryKey: ["tasks", selectedOption],
    url: `http://${process.env.BASE_URL}/tasks/tree?${selectedOption}`,
    setSnackbarConfig,
  });

  const { data: projects } = useCustomQuery<ProjectType[]>({
    queryKey: ["projects"],
    url: `http://${process.env.BASE_URL}/projects/${
      // isAdmin ? "get-all-projects" :
      "get-manager-project"
    }`,
    setSnackbarConfig,
  });

  const { data: deptTree } = useCustomQuery<{ tree: DeptTree[] }>({
    queryKey: ["deptTree", selectedProj ?? "three"],
    url: `http://${process.env.BASE_URL}/${
      selectedProj
        ? `projects/project-departments-tree/${selectedProj}`
        : "department/tree"
    }`,
    setSnackbarConfig,
  });

  const { selector } = useRedux(
    (state: RootState) => state.user.userInfo?.department.id
  );

  const { data: sections, isLoading: isSectionsLoading } = useCustomQuery<
    SectionType[]
  >({
    queryKey: ["sections", selectedOption, selectedDept ?? "one"],
    url: `http://${process.env.BASE_URL}/sections/${
      myProj && myDept
        ? `department/${selectedDept}`
        : myDept
        ? `department/${selectedDept}`
        : `department/${selector}`
    }`,
    setSnackbarConfig,
  });

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  const canViewTasks = usePermissions(["task_search_and_view"]);

  const showMainSelect = canViewTasks || isPrimary || isAdmin;

  return (
    <GridContainer>
      <div className="col-span-full flex justify-between items-center">
        {isSectionsLoading ? (
          <PageSpinner title={t("sections Loading ...")} />
        ) : (
          isTasksLoading && <PageSpinner title={t("Tasks Loading ...")} />
        )}
        <h1 className="text-3xl font-bold text-twhite text-center">
          {t("Tasks")}
        </h1>
        <div className="flex justify-center items-center gap-5">
          {/* Departments Dropdown */}
          {(myDept || myProj) && (
            <select
              className="bg-secondary outline-none border-none text-twhite rounded-lg px-4 py-2 focus:outline-none transition duration-200"
              onChange={(e) => {
                const value = e.target.value;

                setSelectedDept(value);
                const deptOption = `departmentId=${value}`;
                const projOption = selectedProj
                  ? `&projectId=${selectedProj}`
                  : "";
                setSelectedOption(deptOption + projOption);
              }}
            >
              <option value="">{t("Select a department")}</option>
              {deptTree &&
                deptTree.tree &&
                deptTree.tree.map((dTree) => (
                  <option key={dTree.id} value={dTree.id}>
                    {dTree.name}
                  </option>
                ))}
            </select>
          )}

          {/* Project-Specific Dropdown */}
          {myProj && (
            <select
              className="bg-secondary outline-none border-none text-twhite rounded-lg px-4 py-2 focus:outline-none transition duration-200"
              onChange={(e) => setSelectedProj(e.target.value)}
            >
              <option value="">{t("Select a project")}</option>
              {projects &&
                projects.map((proj) => (
                  <option key={proj._id} value={proj._id}>
                    {proj.name}
                  </option>
                ))}
            </select>
          )}

          {/* Main Dropdown */}
          {showMainSelect && (
            <select
              className="bg-secondary outline-none border-none text-twhite rounded-lg px-4 py-2 focus:outline-none transition duration-200"
              defaultValue={selectedOption}
              onChange={(e) => {
                const value = e.target.value;
                setMyProj(value === "my-project-tasks");
                setMyDept(value === "get-my-dept-tasks");
                if (
                  value !== "my-project-tasks" &&
                  value !== "get-my-dept-tasks"
                ) {
                  setSelectedOption(value);
                }
                setSelectedProj(null);
                setSelectedDept(null);
              }}
            >
              {canViewTasks && <option value="">{t("My Tasks")}</option>}
              {canViewTasks && (isPrimary || isAdmin) && (
                <option value="get-my-dept-tasks">
                  {t("Department Tasks")}
                </option>
              )}
              {canViewTasks && (
                <option value="my-project-tasks">{t("Project Tasks")}</option>
              )}
            </select>
          )}

          {/* Add Task Button */}
          {(isAdmin || isPrimary) && (
            <RouteWrapper href="/tasks/add-task">
              <div className="bg-secondary text-twhite px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200">
                {t("Add Task")}
              </div>
            </RouteWrapper>
          )}
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="col-span-full">
        <TasksTab
          tabs={[
            { id: "list", label: "List", icon: TabListIcon },
            { id: "board", label: "Board", icon: TabBoardIcon },
            { id: "tree", label: "Tree", icon: TreeIcon },
          ]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === "list" && (
          <TaskList tasksData={tasksData?.info} sections={sections} />
        )}
        {activeTab === "board" && (
          <GridContainer>
            <TasksContent tasksData={tasksData?.info} sections={sections} />
          </GridContainer>
        )}
        {activeTab === "tree" && tasksData && (
          <TaskHierarchyTree data={tasksData.tree} width="100%" />
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
