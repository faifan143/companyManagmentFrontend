/* eslint-disable react/no-unescaped-entities */
"use client";

import CustomizedSnackbars from "@/components/common/atoms/CustomizedSnackbars";
import GridContainer from "@/components/common/atoms/GridContainer";
import HomeGlance from "@/components/common/atoms/HomeGlance";
import PageSpinner from "@/components/common/atoms/PageSpinner";
import HomeTasksReport from "@/components/common/molcules/HomeTasksReport";
import ProfileProjectsReport from "@/components/common/molcules/ProfileProjectsReport";
import { useRolePermissions } from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useSnackbar from "@/hooks/useSnackbar";
import { ReceiveTaskType } from "@/types/Task.type";
import { useState } from "react";

const Home = () => {
  const [scope, setScope] = useState<"weekly" | "monthly">("weekly");
  const { snackbarConfig, setSnackbarConfig } = useSnackbar();
  const isSecondary = useRolePermissions("secondary_user");
  const { data: tasksData, isLoading } = useCustomQuery<ReceiveTaskType[]>({
    queryKey: ["tasks", scope == "weekly" ? "weekly-tasks" : "monthly-tasks"],
    url: `https://${process.env.BASE_URL}/tasks/${
      scope == "weekly" ? "weekly-tasks" : "monthly-tasks"
    }`,
    setSnackbarConfig,
    nestedData: true,
  });

  if (isLoading) return <PageSpinner />;

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
        {!isSecondary && <ProfileProjectsReport isCentered={true} />}
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
