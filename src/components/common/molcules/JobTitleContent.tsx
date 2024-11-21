import { PencilIcon } from "@/assets";
import {
  usePermissions,
  useRolePermissions,
} from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useCustomTheme from "@/hooks/useCustomTheme";
import useLanguage from "@/hooks/useLanguage";
import useSetPageData from "@/hooks/useSetPageData";
import useSnackbar from "@/hooks/useSnackbar";
import { JobTitleType } from "@/types/JobTitle.type";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import CustomizedSnackbars from "../atoms/CustomizedSnackbars";
const JobTitleContent = ({ selectedOption }: { selectedOption: string }) => {
  const { t, currentLanguage } = useLanguage();
  const isAdmin = useRolePermissions("admin");
  const hasEditPermission = usePermissions(["job_title_update"]);

  const { snackbarConfig, setSnackbarConfig } = useSnackbar();
  const {
    data: jobs,
    isLoading,
    error,
  } = useCustomQuery<JobTitleType[]>({
    queryKey: ["jobTitles", selectedOption],
    url:
      selectedOption === "view"
        ? `http://${process.env.BASE_URL}/job-titles/view`
        : `http://${process.env.BASE_URL}/job-titles/get-job-titles`,
    setSnackbarConfig,
  });
  const { isLightMode } = useCustomTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string[]>([]);

  const handleShowMoreClick = (permissions: string[]) => {
    setModalContent(permissions);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent([]);
  };

  const { handleEditClick } = useSetPageData<JobTitleType>("/jobs/add-title");

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <CircularProgress size={100} />
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        {t("No Job Titles Found")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">
          {t("Failed to load job titles.")}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-xl shadow-md p-4 flex flex-col space-y-4 col-span-12">
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full bg-main text-twhite rounded-lg shadow-md">
          <thead
            className={` ${
              isLightMode ? "bg-darkest text-tblackAF" : "bg-tblack text-twhite"
            }  `}
          >
            <tr>
              <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">
                {t("Name")}
              </th>
              <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">
                {t("Title")}
              </th>

              <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">
                {t("Description")}
              </th>
              <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">
                {t("Responsibilities")}
              </th>
              <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">
                {t("Permissions")}
              </th>
              <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">
                {t("Department ID")}
              </th>
              {(isAdmin || hasEditPermission) && (
                <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">
                  {t("Actions")}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {jobs.map((jobTitle) => (
              <tr
                key={jobTitle.id}
                className={` ${
                  isLightMode
                    ? "hover:bg-darker text-blackAF hover:text-tblackAF"
                    : "hover:bg-slate-700 text-twhite"
                }  group transition-colors`}
              >
                <td className="py-3 px-4 text-center">{jobTitle.name}</td>
                <td className="py-3 px-4 text-center">{jobTitle.title}</td>
                <td className="py-3 px-4 text-center">
                  {jobTitle.description}
                </td>
                <td className="py-3 px-4 text-center">
                  {jobTitle.responsibilities.length > 0 ? (
                    <ul className="list-disc ml-4">
                      {jobTitle.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    t("N/A")
                  )}
                </td>

                {/* Permissions Column with Show More */}
                <td className="py-3 px-4 text-center">
                  {jobTitle.permissions && jobTitle.permissions.length > 3 ? (
                    <>
                      <ul className="list-disc ml-4">
                        {jobTitle.permissions.slice(0, 3).map((perm, index) => (
                          <li key={index}>{perm}</li>
                        ))}
                      </ul>
                      <button
                        className="text-blue-500 underline"
                        onClick={() =>
                          handleShowMoreClick(jobTitle.permissions)
                        }
                      >
                        {t("Show More")}
                      </button>
                    </>
                  ) : (
                    <ul className="list-disc ml-4">
                      {jobTitle.permissions.map((perm, index) => (
                        <li key={index}>{perm}</li>
                      ))}
                    </ul>
                  )}
                </td>

                <td className="py-3 px-4 text-center">
                  {jobTitle.department && jobTitle.department.name}
                </td>
                {(isAdmin || hasEditPermission) && (
                  <td className="py-3 px-4 flex gap-2">
                    {(isAdmin || hasEditPermission) && (
                      <div
                        onClick={() => handleEditClick(jobTitle)}
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
                    )}
                    {
                      // (isAdmin || hasDeletePermission) && (
                      //   <div className="cursor-pointer p-2 w-16 text-xs flex justify-center font-bold rounded-full bg-red-500/40 border-2 border-red-500/30 hover:text-red-100 hover:bg-red-500">
                      //     {/* {t("Delete")} */}
                      //     <Image
                      //       src={TrashIcon}
                      //       alt="delete icon"
                      //       height={20}
                      //       width={20}
                      //     />
                      //   </div>
                      // )
                    }
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Permissions */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          className={` text-twhite bg-secondary  ${
            currentLanguage == "en" ? "text-left" : "text-right"
          }`}
        >
          {t("Permissions")}
        </DialogTitle>
        <DialogContent className=" text-twhite bg-secondary">
          <ul className=" text-twhite list-disc ml-4 ">
            {modalContent.map((perm, index) => (
              <li key={index}>{perm}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions className=" text-twhite bg-secondary">
          <div
            onClick={handleCloseModal}
            className="bg-dark py-2 px-4 hover:bg-opacity-70 text-twhite cursor-pointer rounded-md"
          >
            {t("Close")}
          </div>
        </DialogActions>
      </Dialog>

      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default JobTitleContent;
