import { useRolePermissions } from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useLanguage from "@/hooks/useLanguage";
import useSnackbar from "@/hooks/useSnackbar";
import { formatDate, isDueSoon } from "@/services/task.service";
import { ProjectType } from "@/types/project.type";
import { collabColors } from "./ProjectsContent";
import useCustomTheme from "@/hooks/useCustomTheme";
import RouteWrapper from "../RouteWrapper";
const ProfileProjectsReport = ({
  isCentered = false,
}: {
  isCentered?: boolean;
}) => {
  const { t, currentLanguage } = useLanguage();

  const isAdmin = useRolePermissions("admin");
  const { setSnackbarConfig } = useSnackbar();
  const { isLightMode } = useCustomTheme();
  const { data: projects } = useCustomQuery<ProjectType[]>({
    queryKey: ["projects"],
    url: `http://${process.env.BASE_URL}/projects/${
      isAdmin ? "get-all-projects" : "get-manager-project"
    }`,
    setSnackbarConfig,
  });

  return (
    <>
      <div
        className={`bg-main 
        
        ${isCentered ? "mx-auto w-[70%]" : ""}
        min-h-64 rounded-md shadow-md mt-5 p-5 text-twhite border border-slate-700`}
      >
        <div className="text-lg font-bold">{t("My Projects")}</div>

        <div className="w-full">
          {projects &&
            projects.map((project, index) => (
              <RouteWrapper
                key={index}
                href={"/projects/details/" + project._id}
              >
                <div
                  key={index}
                  className="hover:bg-slate-700 transition-colors my-2  px-4 bg-dark rounded-md flex items-center justify-between group"
                >
                  <div
                    className={`py-3 px-4  w-[40%] group-hover:${
                      isLightMode ? "text-tblackAF" : "text-twhite"
                    }`}
                  >
                    {project.name}
                  </div>
                  <div className=" flex items-center justify-between w-[60%]">
                    <div className=" py-3 px-4 text-center">
                      {project.departments.length === 1 ? (
                        <div className="border-2 border-blue-500/30 bg-dark text-twhite py-1 px-3 w-fit mx-auto rounded-lg text-sm font-bold">
                          {project.departments[0].name}
                        </div>
                      ) : (
                        <div
                          className="flex justify-center -space-x-4"
                          dir="ltr"
                        >
                          {project.departments
                            .slice(0, 3)
                            .map((dept, index) => (
                              <div
                                key={index}
                                className={`relative ${
                                  collabColors[index % collabColors.length]
                                } cursor-pointer text-twhite rounded-full bg-dark px-4 py-2 flex items-center justify-center text-sm font-bold`}
                                title={dept.name}
                              >
                                {dept.name
                                  .split(" ")
                                  .map((word) => word[0])
                                  .join("")
                                  .toUpperCase()}
                              </div>
                            ))}
                          {project.departments.length > 3 && (
                            <div
                              className="relative text-twhite  cursor-pointer rounded-full bg-dark px-4 py-2 flex items-center justify-center text-sm font-semibold"
                              title={project.departments
                                .slice(3)
                                .map((dept) => dept.name)
                                .join(", ")}
                            >
                              +{project.departments.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className=" py-3 px-4 text-center">
                      {project.members.length === 1 ? (
                        <div className="border-2 border-blue-500/30 bg-dark text-twhite py-1 px-3 w-fit mx-auto rounded-lg text-sm font-bold">
                          {project.members[0].name}
                        </div>
                      ) : (
                        <div
                          className="flex justify-center -space-x-4"
                          dir="ltr"
                        >
                          {project.members.slice(0, 3).map((member, index) => (
                            <div
                              key={member.id}
                              className={`relative ${
                                collabColors[index % collabColors.length]
                              } cursor-pointer text-twhite rounded-full bg-dark px-4 py-2 flex items-center justify-center text-sm font-bold shadow-lg`}
                              title={member.name}
                            >
                              {member.name
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                          ))}
                          {project.members.length > 3 && (
                            <div
                              className="relative text-twhite  cursor-pointer rounded-full bg-dark px-4 py-2 flex items-center justify-center text-sm font-semibold shadow-lg"
                              title={project.members
                                .slice(3)
                                .map((member) => member.name)
                                .join(", ")}
                            >
                              +{project.members.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <div
                        className={`border-2  border-yellow-500/30 bg-dark text-twhite py-1 px-3 w-fit mx-auto rounded-lg text-sm font-bold  ${
                          isDueSoon(project.endDate) ? "flash" : ""
                        }`}
                      >
                        {formatDate(
                          project.endDate,
                          currentLanguage as "en" | "ar"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </RouteWrapper>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProfileProjectsReport;
