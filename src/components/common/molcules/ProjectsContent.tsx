import { PencilIcon } from "@/assets";
import { useRolePermissions } from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useCustomTheme from "@/hooks/useCustomTheme";
import useLanguage from "@/hooks/useLanguage";
import useNavigationWithLoading from "@/hooks/useNavigationWithLoading";
import useSnackbar from "@/hooks/useSnackbar";
import { formatDate, isDueSoon } from "@/services/task.service";
import { ProjectType } from "@/types/Project.type";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import AddProjectModal from "../atoms/AddProjectModal";
import CustomizedSnackbars from "../atoms/CustomizedSnackbars";
import PageSpinner from "../atoms/PageSpinner";

export const collabColors = [
  "border-2  border-blue-500 ",
  "border-2  border-yellow-500 ",
  "border-2  border-red-500 ",
];

const ProjectsContent = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<ProjectType | null>(
    null
  );
  const { t, currentLanguage } = useLanguage();
  const { snackbarConfig, setSnackbarConfig } = useSnackbar();
  const isAdmin = useRolePermissions("admin");
  const isPrimary = useRolePermissions("primary_user");
  const { isLightMode } = useCustomTheme();
  const { loading, navigateWithLoading } = useNavigationWithLoading();
  const { data: projects, isLoading } = useCustomQuery<ProjectType[]>({
    queryKey: ["projects"],
    url: `http://${process.env.BASE_URL}/projects/${
      isAdmin
        ? "get-all-projects"
        : isPrimary
        ? "get-manager-project"
        : "get-emp-project"
    }`,
    setSnackbarConfig,
  });

  const handleEditClick = (project: ProjectType) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <CircularProgress size={100} />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5 text-twhite">
        {t("No Projects")}
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-xl shadow-md p-4 flex flex-col space-y-4 col-span-12">
      {loading && <PageSpinner />}

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-main text-twhite rounded-lg shadow-md">
          <thead
            className={` ${
              isLightMode ? "bg-darkest text-tblackAF" : "bg-tblack text-twhite"
            }  `}
          >
            <tr>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                {t("Name")}
              </th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                {t("Description")}
              </th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                {t("Departments")}
              </th>

              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                {t("Start Date")}
              </th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                {t("End Date")}
              </th>
              {(isAdmin || isPrimary) && (
                <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                  {t("Actions")}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {projects &&
              projects.map((project) => (
                <tr
                  key={project._id}
                  className={` ${
                    isLightMode
                      ? "hover:bg-darker text-blackAF"
                      : "hover:bg-slate-700 text-twhite"
                  }  group transition-colors`}
                  onClick={() =>
                    navigateWithLoading("/projects/details/" + project._id)
                  }
                >
                  <td
                    className={`py-3 px-4 text-center ${
                      isLightMode ? "group-hover:text-tblackAF" : ""
                    }`}
                  >
                    {project.name}
                  </td>
                  <td
                    className={` py-3 px-4 text-center ${
                      isLightMode ? "group-hover:text-tblackAF" : ""
                    }`}
                  >
                    {project.description}
                  </td>
                  <td className="py-3 px-4 text-center ">
                    {project.departments.length === 1 ? (
                      <div className="border-2 border-blue-500/30 bg-dark  py-1 px-3 w-fit mx-auto rounded-lg text-sm font-bold">
                        {project.departments[0].name}
                      </div>
                    ) : (
                      <div className="flex justify-center -space-x-4" dir="ltr">
                        {project.departments.slice(0, 3).map((dept, index) => (
                          <div
                            key={dept.id}
                            className={`   ${
                              collabColors[index % collabColors.length]
                            } cursor-pointer  rounded-full bg-dark px-4 py-2 flex items-center justify-center text-sm font-bold`}
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
                            className="     cursor-pointer rounded-full bg-dark px-4 py-2 flex items-center justify-center text-sm font-semibold"
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
                  </td>
                  {/* <td className="py-3 px-4 text-center">
                    {project.members.length === 1 ? (
                      <div className="border-2 border-blue-500/30 bg-dark  py-1 px-3 w-fit mx-auto rounded-lg text-sm font-bold">
                        {project.members[0].name}
                      </div>
                    ) : (
                      <div className="flex justify-center -space-x-4" dir="ltr">
                        {project.members.slice(0, 3).map((member, index) => (
                          <div
                            key={member.id}
                            className={`relative ${
                              collabColors[index % collabColors.length]
                            } cursor-pointer  rounded-full bg-dark px-4 py-2 flex items-center justify-center text-sm font-bold shadow-lg`}
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
                            className="relative   cursor-pointer rounded-full bg-dark px-4 py-2 flex items-center justify-center text-sm font-semibold shadow-lg"
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
                  </td> */}

                  <td>
                    <div
                      className={`  border-2  border-purple-500/30  bg-dark  py-1 px-3 w-fit mx-auto rounded-lg text-sm font-bold`}
                    >
                      {formatDate(
                        project.startDate,
                        currentLanguage as "en" | "ar"
                      )}
                    </div>
                  </td>

                  <td>
                    <div
                      className={`border-2  border-yellow-500/30 bg-dark  py-1 px-3 w-fit mx-auto rounded-lg text-sm font-bold  ${
                        isDueSoon(project.endDate) ? "flash" : ""
                      }`}
                    >
                      {formatDate(
                        project.endDate,
                        currentLanguage as "en" | "ar"
                      )}
                    </div>
                  </td>
                  {(isAdmin || isPrimary) && (
                    <td className="py-3 px-4 flex gap-2 justify-center">
                      <div
                        onClick={() => handleEditClick(project)}
                        className="cursor-pointer p-2 w-16 text-xs flex justify-center font-bold rounded-full bg-green-500/40 hover:bg-green-500 hover:text-green-100 border-2 border-green-500/30"
                      >
                        {/* {t("Edit")} */}
                        <Image
                          src={PencilIcon}
                          alt="edit icon"
                          height={20}
                          width={20}
                        />
                      </div>
                      {
                        // <div className="cursor-pointer p-2 w-16 text-xs flex justify-center font-bold rounded-full bg-red-500/40 border-2 border-red-500/30 hover:text-red-100 hover:bg-red-500">
                        //           {/* {t("Delete")} */}
                        //           <Image
                        //             src={TrashIcon}
                        //             alt="delete icon"
                        //             height={20}
                        //             width={20}
                        //           />
                        //         </div>
                      }
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentProject && (
        <AddProjectModal
          projectData={currentProject}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentProject(null);
          }}
        />
      )}

      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default ProjectsContent;
