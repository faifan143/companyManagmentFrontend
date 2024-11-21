/* eslint-disable react/no-unescaped-entities */
"use client";

import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import HomeGlance from "@/components/common/atoms/HomeGlance";
import PageSpinner from "@/components/common/atoms/PageSpinner";
import HomeTasksReport from "@/components/common/molcules/HomeTasksReport";
import { useRolePermissions } from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useSnackbar from "@/hooks/useSnackbar";
import { ReceiveTaskType } from "@/types/Task.type";
import { useState } from "react";

const Home = () => {
  const [scope, setScope] = useState<"weekly" | "monthly">("weekly");
  const isAdmin = useRolePermissions("admin");
  const { snackbarConfig, setSnackbarConfig } = useSnackbar();

  const { data: tasksData, isLoading } = useCustomQuery<ReceiveTaskType[]>({
    queryKey: [
      "tasks",
      isAdmin
        ? "get-all-tasks"
        : scope == "weekly"
        ? "weekly-tasks"
        : "monthly-tasks",
    ],
    url: `http://${process.env.BASE_URL}/tasks/${
      isAdmin
        ? "get-all-tasks"
        : scope == "weekly"
        ? "weekly-tasks"
        : "monthly-tasks"
    }`,
    setSnackbarConfig,
    nestedData: true,
  });

  if (isLoading) return <PageSpinner />;

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <PageSpinner />
      </div>
    );
  }

  return (
    <GridContainer>
      <div className=" col-span-full">
        <HomeGlance
          scope={scope}
          setScope={setScope}
          completedTasks={
            tasksData?.filter((task) => task.status == "DONE").length || 0
          }
        />

        <HomeTasksReport tasksData={tasksData} />

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

export default Home;
