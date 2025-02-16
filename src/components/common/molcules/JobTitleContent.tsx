import { PencilIcon } from "@/assets";
import {
  usePermissions,
  useRolePermissions,
} from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useCustomTheme from "@/hooks/useCustomTheme";
import useLanguage from "@/hooks/useLanguage";
import useSetPageData from "@/hooks/useSetPageData";
import { JobTitleType } from "@/types/JobTitle.type";
import Image from "next/image";
import { useState } from "react";
import CustomModal from "../atoms/modals/CustomModal";
import PageSpinner from "../atoms/ui/PageSpinner";

const PermissionsList = ({
  permissions,
  onShowMore,
}: {
  permissions: string[];
  onShowMore: () => void;
}) => {
  const { t } = useLanguage();
  const { isLightMode } = useCustomTheme();

  const shouldShowMore = permissions.length > 2;
  const displayPermissions = permissions.slice(0, 2);

  return (
    <div className="flex flex-col gap-2">
      <ul>
        {displayPermissions.map((perm, index) => (
          <li
            key={index}
            className={`
               py-1 px-2 rounded-lg text-sm
            truncate text-twhite  
              ${isLightMode ? "bg-darker/5  " : "bg-dark/20   "}
            `}
          >
            {perm}
          </li>
        ))}
      </ul>

      {shouldShowMore && (
        <button
          onClick={onShowMore}
          className={`
            flex items-center justify-center gap-2 
            mt-1 py-1 px-2 rounded-lg
            text-xs font-medium transition-all duration-200
            ${
              isLightMode
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "bg-primary/20 text-primary hover:bg-primary/30"
            }
          `}
        >
          <span>{t("Show More")}</span>
          <span className="text-xs opacity-60">
            (+{permissions.length - 2})
          </span>
        </button>
      )}
    </div>
  );
};

const ResponsibilitiesList = ({
  responsibilities,
  onShowMore,
}: {
  responsibilities: string[];
  onShowMore: () => void;
}) => {
  const { t } = useLanguage();
  const { isLightMode } = useCustomTheme();

  const shouldShowMore = responsibilities.length > 2;
  const displayResponsibilities = responsibilities.slice(0, 2);

  return (
    <div className="flex flex-col gap-2">
      <ul className="list-disc ml-4">
        {displayResponsibilities.map((resp, index) => (
          <li key={index}>{resp}</li>
        ))}
      </ul>

      {shouldShowMore && (
        <button
          onClick={onShowMore}
          className={`
            flex items-center justify-center gap-2 
            mt-1 py-1 px-2 rounded-lg
            text-xs font-medium transition-all duration-200
            ${
              isLightMode
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "bg-primary/20 text-primary hover:bg-primary/30"
            }
          `}
        >
          <span>{t("Show More")}</span>
          <span className="text-xs opacity-60">
            (+{responsibilities.length - 2})
          </span>
        </button>
      )}
    </div>
  );
};

const JobTitleContent = ({ selectedOption }: { selectedOption: string }) => {
  const { t, currentLanguage } = useLanguage();
  const isAdmin = useRolePermissions("admin");
  const hasEditPermission = usePermissions(["job_title_update"]);

  const {
    data: jobs,
    isLoading,
    error,
  } = useCustomQuery<JobTitleType[]>({
    queryKey: ["jobTitles", selectedOption],
    url:
      selectedOption === "view"
        ? `/job-titles/view`
        : `/job-titles/get-job-titles`,
  });
  const { isLightMode } = useCustomTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string[]>([]);

  const handleShowMoreResponsibilities = (responsibilities: string[]) => {
    setModalContent(responsibilities);
    setIsModalOpen(true);
  };

  const handleShowMoreClick = (permissions: string[]) => {
    setModalContent(permissions);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent([]);
  };

  const { NavigateButton } = useSetPageData<JobTitleType>("/jobs/add-title");

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-5">
        <PageSpinner />
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
                <td className="py-3 px-4 text-center">{jobTitle.title}</td>
                <td className="py-3 px-4 text-center">
                  {jobTitle.description}
                </td>
                <td className="py-3 px-4 text-center">
                  {jobTitle.responsibilities.length > 0 ? (
                    <ResponsibilitiesList
                      responsibilities={jobTitle.responsibilities}
                      onShowMore={() =>
                        handleShowMoreResponsibilities(
                          jobTitle.responsibilities
                        )
                      }
                    />
                  ) : (
                    t("N/A")
                  )}
                </td>

                {/* Permissions Column with Show More */}
                <td className="py-3 px-4">
                  <PermissionsList
                    permissions={jobTitle.permissions}
                    onShowMore={() => handleShowMoreClick(jobTitle.permissions)}
                  />
                </td>

                <td className="py-3 px-4 text-center">
                  {jobTitle.department && jobTitle.department.name}
                </td>
                {(isAdmin || hasEditPermission) && (
                  <td className="py-3 px-4 flex gap-2">
                    {(isAdmin || hasEditPermission) && (
                      <NavigateButton
                        data={jobTitle}
                        className="cursor-pointer p-2 w-16 text-xs flex justify-center font-bold rounded-full bg-green-500/40 hover:bg-green-500 hover:text-green-100 border-2 border-green-500/30"
                      >
                        {/* {t("Edit")} */}
                        <Image
                          src={PencilIcon}
                          alt="edit icon"
                          height={20}
                          width={20}
                        />
                      </NavigateButton>
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
      {/* <Dialog
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
      </Dialog> */}

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t("Permissions")}
        content={modalContent}
        language={currentLanguage as "en" | "ar"}
        actionText={t("Close")}
      />
    </div>
  );
};

export default JobTitleContent;
