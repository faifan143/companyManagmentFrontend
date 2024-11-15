import useSnackbar from "@/hooks/useSnackbar";
import { SectionType } from "@/types/Section.type";
import { ReceiveTaskType } from "@/types/Task.type";
import { useState } from "react";
import AddSectionModal from "../atoms/AddSectionModal";
import CustomizedSnackbars from "../atoms/CustomizedSnackbars";
import ListSection from "../molcules/ListSection";

const ListTasks = ({
  tasksData,
  sections,
}: {
  tasksData: ReceiveTaskType[] | undefined;
  sections: SectionType[] | undefined;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { snackbarConfig, setSnackbarConfig } = useSnackbar();

  return (
    <>
      <div className="bg-main  rounded-lg p-4 w-full h-full">
        <table className="min-w-full bg-main rounded-md">
          <thead>
            <tr>
              <th className="px-6 py-3 border-y border-slate-500 text-left text-md font-bold text-slate-300">
                Task Name
              </th>
              <th className="px-6 py-3 border border-slate-500 text-left text-md font-bold text-slate-300">
                Due Date
              </th>
              <th className="px-6 py-3 border-y border-slate-500 text-left text-md font-bold text-slate-300">
                Status
              </th>
              {/* <th className="px-6 py-3 border-y border-slate-500 text-left text-md font-bold text-slate-300">
                Priority
              </th> */}
            </tr>
          </thead>
          <tbody>
            {sections &&
              sections.map((section) => (
                <ListSection
                  key={section._id}
                  section={section}
                  tasks={tasksData?.filter(
                    (task) => task.section && task.section.name == section.name
                  )}
                />
              ))}
          </tbody>
        </table>
        <div
          className="px-6 py-4 text-slate-300 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="rounded-xl shadow-md py-2 px-4 hover:bg-slate-500  hover:text-white  border-dashed border-slate-500 hover:shadow-xl border-2 text-center content-center  w-fit  text-slate-500  cursor-pointer">
            Add section
          </div>
        </div>
        {isModalOpen && (
          <>
            <div
              className="fixed inset-0  backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <AddSectionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
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
    </>
  );
};

export default ListTasks;
