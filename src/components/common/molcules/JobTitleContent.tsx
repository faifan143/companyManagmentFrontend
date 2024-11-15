import { useRolePermissions } from "@/hooks/useCheckPermissions";
import useCustomQuery from "@/hooks/useCustomQuery";
import useSetPageData from "@/hooks/useSetPageData";
import useSnackbar from "@/hooks/useSnackbar";
import { JobTitleType } from "@/types/JobTitle.type";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomizedSnackbars from "../atoms/CustomizedSnackbars";

const JobTitleContent = ({ selectedOption }: { selectedOption: string }) => {
  const { t } = useTranslation();
  const isAdmin = useRolePermissions("admin");
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
        <table className="min-w-full bg-main text-white rounded-lg shadow-md">
          <thead className="bg-slate-600">
            <tr>
              <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">
                {t("Name")}
              </th>
              <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">
                {t("Title")}
              </th>
              <th className="text-center  py-3 px-4 uppercase font-semibold text-sm">
                {t("Grade Level")}
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
              {isAdmin && (
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
                className="hover:bg-slate-700 transition-colors"
              >
                <td className="py-3 px-4 text-center">{jobTitle.name}</td>
                <td className="py-3 px-4 text-center">{jobTitle.title}</td>
                <td className="py-3 px-4 text-center">
                  {jobTitle.grade_level}
                </td>
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
                {isAdmin && (
                  <td className="py-3 px-4 flex gap-2">
                    <div
                      onClick={() => handleEditClick(jobTitle)}
                      className="cursor-pointer p-2 w-16 text-xs text-center font-bold rounded-full bg-green-100 hover:bg-green-500 hover:text-green-100 text-green-500"
                    >
                      {t("Edit")}
                    </div>
                    <div className="cursor-pointer p-2 w-16 text-xs text-center font-bold rounded-full bg-red-100 text-red-500 hover:text-red-100 hover:bg-red-500">
                      {t("Delete")}
                    </div>
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
        <DialogTitle>{t("Permissions")}</DialogTitle>
        <DialogContent>
          <ul className="list-disc ml-4">
            {modalContent.map((perm, index) => (
              <li key={index}>{perm}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            {t("Close")}
          </Button>
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
