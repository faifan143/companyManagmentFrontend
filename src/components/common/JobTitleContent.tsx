import { JobTitleType } from "@/types/JobTitle.type";
import { useRolePermissions } from "@/utils/check_permissions";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const fetchJobTitles = async (type: string): Promise<JobTitleType[]> => {
  const url =
    type === "view"
      ? `http://${process.env.BASE_URL}/job-titles/view`
      : `http://${process.env.BASE_URL}/job-titles/get-job-titles`;

  const response = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + Cookies.get("access_token"),
    },
  });

  return response.data;
};

const JobTitleContent = ({ selectedOption }: { selectedOption: string }) => {
  const isAdmin = useRolePermissions("admin");

  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery<JobTitleType[]>({
    queryKey: ["jobTitles", selectedOption],
    queryFn: () => fetchJobTitles(selectedOption),
  });

  const router = useRouter();
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

  const handleEditClick = (job: JobTitleType) => {
    sessionStorage.setItem(
      "jobData",
      JSON.stringify({ ...job, department_id: job.department.id })
    );
    router.push("/jobs/add-title");
  };

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
        No Job Titles Found
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">Failed to load job titles.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f0f4f9] rounded-xl shadow-md p-4 flex flex-col space-y-4 col-span-12">
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-center text-[#1b1a40] py-3 px-4 uppercase font-semibold text-sm">
                Name
              </th>
              <th className="text-center text-[#1b1a40] py-3 px-4 uppercase font-semibold text-sm">
                Title
              </th>
              <th className="text-center text-[#1b1a40] py-3 px-4 uppercase font-semibold text-sm">
                Grade Level
              </th>
              <th className="text-center text-[#1b1a40] py-3 px-4 uppercase font-semibold text-sm">
                Description
              </th>
              <th className="text-center text-[#1b1a40] py-3 px-4 uppercase font-semibold text-sm">
                Responsibilities
              </th>
              <th className="text-center text-[#1b1a40] py-3 px-4 uppercase font-semibold text-sm">
                Permissions
              </th>
              <th className="text-center text-[#1b1a40] py-3 px-4 uppercase font-semibold text-sm">
                Department ID
              </th>
              {isAdmin && (
                <th className="text-center text-[#1b1a40] py-3 px-4 uppercase font-semibold text-sm">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {jobs.map((jobTitle) => (
              <tr
                key={jobTitle.id}
                className="hover:bg-gray-100 transition-colors"
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
                    "N/A"
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
                        Show More
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
                  <td className="py-3 px-4 flex space-x-2">
                    <div
                      onClick={() => handleEditClick(jobTitle)}
                      className="cursor-pointer p-2 w-16 text-xs text-center font-bold rounded-full bg-green-100 hover:bg-green-500 hover:text-green-100 text-green-500"
                    >
                      Edit
                    </div>
                    <div className="cursor-pointer p-2 w-16 text-xs text-center font-bold rounded-full bg-red-100 text-red-500 hover:text-red-100 hover:bg-red-500">
                      Delete
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
        <DialogTitle>Permissions</DialogTitle>
        <DialogContent>
          <ul className="list-disc ml-4">
            {modalContent.map((perm, index) => (
              <li key={index}>{perm}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobTitleContent;
