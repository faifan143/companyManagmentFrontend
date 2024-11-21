"use client";

import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import PageSpinner from "@/components/common/atoms/PageSpinner";
import HierarchyTree from "@/components/common/HierarchyTree";
import InfoCard from "@/components/common/InfoCard";
import HomeTasksReport from "@/components/common/molcules/HomeTasksReport";
import TaskStatusPieChart from "@/components/common/TaskStatusPieChart";
import useCustomQuery from "@/hooks/useCustomQuery";
import useCustomTheme from "@/hooks/useCustomTheme";
import useLanguage from "@/hooks/useLanguage";
import useNavigationWithLoading from "@/hooks/useNavigationWithLoading";
import useSnackbar from "@/hooks/useSnackbar";
import { formatDate } from "@/services/task.service";
import { ProjectDetailsType } from "@/types/Project.type";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

const ProjectDetails = ({ params: { id } }: { params: { id: string } }) => {
  const { setSnackbarConfig, snackbarConfig } = useSnackbar();
  const { t, currentLanguage } = useLanguage();
  const { isLightMode } = useCustomTheme();
  // const [deptTasks, setDeptTasks] = useState<ReceiveTaskType[]>([]);

  const { data: project, isLoading } = useCustomQuery<ProjectDetailsType>({
    queryKey: ["project-details"],
    url: `http://${process.env.BASE_URL}/projects/project-details/${id}`,
    setSnackbarConfig,
  });

  const { loading, navigateWithLoading } = useNavigationWithLoading();

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <CircularProgress size={100} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5 text-twhite">
        {t("No Project")}
      </div>
    );
  }

  return (
    <GridContainer>
      <div className="col-span-full ">
        {loading && <PageSpinner />}

        <h1
          className={`text-3xl font-bold ${
            isLightMode ? "text-twhite " : "text-twhite"
          }   `}
        >
          {t("Project Details")}
        </h1>
        {project && (
          <>
            <InfoCard
              firstTitle=""
              firstDetails={[
                { label: "Name", value: project.name },
                { label: "Description", value: project.description },
                {
                  label: "Start Date",
                  value: formatDate(
                    project.startDate,
                    currentLanguage as "ar" | "en"
                  ),
                },
                {
                  label: "End Date",
                  value: formatDate(
                    project.endDate,
                    currentLanguage as "ar" | "en"
                  ),
                },
                { label: "Is Overdue", value: project.is_over_due.toString() },
              ]}
              customStyle="bg-secondary"
              fieldCustomStyle="bg-dark text-twhite "
            />
            <div className="flex items-center justify-between">
              <div className="w-[65%]">
                <HomeTasksReport
                  tasksData={project.projectTasks}
                  isCentered={false}
                />
              </div>
              <div className="w-64 h-5w-64">
                <TaskStatusPieChart
                  taskDone={project.taskDone}
                  taskOnGoing={project.taskOnGoing}
                  taskOnTest={project.taskOnTest}
                  taskPending={project.taskPending}
                />
              </div>
            </div>

            {project && (
              <div className="my-7 w-2/3 mx-auto">
                <HierarchyTree
                  data={project.departments}
                  width="100%"
                  onPress={(deptId) => {
                    console.log(`Node clicked: ${deptId}`);
                    navigateWithLoading(
                      `/projects/details/project-tasks/${project._id}/${deptId}`
                    );
                  }}
                />
              </div>
            )}
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
    </GridContainer>
  );
};

export default ProjectDetails;
