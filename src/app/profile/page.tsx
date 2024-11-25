"use client";

import GridContainer from "@/components/common/atoms/GridContainer";
import InfoCard from "@/components/common/InfoCard";
import HomeTasksReport from "@/components/common/molcules/HomeTasksReport";
import ProfileProjectsReport from "@/components/common/molcules/ProfileProjectsReport";
import { useRolePermissions } from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useCustomTheme from "@/hooks/useCustomTheme";
import useLanguage from "@/hooks/useLanguage";
import { useRedux } from "@/hooks/useRedux";
import useSnackbar from "@/hooks/useSnackbar";
import { formatDate } from "@/services/task.service";
import { RootState } from "@/state/store";
import { ReceiveTaskType } from "@/types/Task.type";

const Profile = () => {
  const { selector: info } = useRedux(
    (state: RootState) => state.user.userInfo
  );
  const { isLightMode } = useCustomTheme();
  const isAdmin = useRolePermissions("admin");
  const isPrimary = useRolePermissions("primary_user");
  const { setSnackbarConfig } = useSnackbar();
  const { currentLanguage } = useLanguage();
  const { data: tasksData } = useCustomQuery<ReceiveTaskType[]>({
    queryKey: ["tasks"],
    url: `http://${process.env.BASE_URL}/tasks/${
      isAdmin
        ? "get-all-tasks"
        : isPrimary
        ? "get-my-dept-tasks"
        : "get-emp-tasks"
    }`,
    setSnackbarConfig,
    nestedData: true,
  });

  return (
    <GridContainer>
      <div className="col-span-full flex flex-col  ">
        <div className="flex items-center gap-4" dir="ltr">
          <span
            className={`bg-red-300 rounded-full h-20 w-20 flex items-center justify-center text-3xl ${
              isLightMode ? "text-tblackAF" : "text-twhite"
            }  font-semibold`}
          >
            {info?.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="text-twhite mb-2">{info?.name}</p>
            {/* <div className="bg-dark rounded-md shadow-md cursor-pointer hover:bg-opacity-80  px-2 py-1 text-twhite text-sm text-center">
              {t("Edit Profile")}
            </div> */}
          </div>
        </div>
        <div className="flex  justify-between">
          <div className="w-[67%]">
            <HomeTasksReport tasksData={tasksData} isCentered={false} />
            <ProfileProjectsReport />
          </div>
          <InfoCard
            firstTitle="Personal Details"
            firstDetails={[
              { label: "Phone", value: info?.phone },
              { label: "Email", value: info?.email },
              { label: "Address", value: info?.address },
              {
                label: "Date Of Birth",
                value: formatDate(info!.dob, currentLanguage as "ar" | "en"),
              },
            ]}
            secondTitle="Work Details"
            secondDetails={[
              { label: "Department", value: info?.department.name },
              { label: "Job Title", value: info?.job.title },
              {
                label: "Employment Date",
                value: formatDate(
                  info!.employment_date,
                  currentLanguage as "ar" | "en"
                ),
              },
              { label: "Base Salary", value: info?.base_salary },
            ]}
          />
        </div>
      </div>
    </GridContainer>
  );
};

export default Profile;
