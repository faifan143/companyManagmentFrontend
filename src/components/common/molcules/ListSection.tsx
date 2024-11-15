import { ArrowDownIcon, PencilIcon, ThreeDotsIcon, TrashIcon } from "@/assets";
import { SectionType } from "@/types/Section.type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddSectionModal from "../atoms/AddSectionModal";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import useSnackbar from "@/hooks/useSnackbar";
import CustomizedSnackbars from "../atoms/CustomizedSnackbars";
import PageSpinner from "../atoms/PageSpinner";
import { ReceiveTaskType } from "@/types/Task.type";
import ListRow from "../atoms/ListRow";

const ListSection: React.FC<{
  section: SectionType;
  tasks: ReceiveTaskType[] | undefined;
}> = ({ section, tasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const { setSnackbarConfig, snackbarConfig } = useSnackbar();
  useEffect(() => {
    if (isMenuOpen) {
      setInterval(() => setIsMenuOpen(false), 5000);
    }
  }, [isMenuOpen]);

  const { mutate: deleteSection, isPending } = useCreateMutation({
    endpoint: `/sections/${section._id}`,
    onSuccessMessage: "Section Deleted successfully!",
    invalidateQueryKeys: ["sections"],
    setSnackbarConfig,
    requestType: "delete",
  });

  return (
    <>
      {isPending && <PageSpinner title="Deleting ..." />}
      <tr>
        <td
          colSpan={4}
          className=" py-3 text-left text-sm font-semibold text-slate-400 cursor-pointer"
        >
          <div className="flex items-center gap-2 text-white font-bold text-lg group">
            <Image
              src={ArrowDownIcon}
              alt="arrow icon"
              width={20}
              height={20}
              className={`mr-2 z-0  transform  ${
                isOpen ? "rotate-0" : "-rotate-90"
              }`}
              onClick={() => setIsOpen((prev) => !prev)}
            />
            {section.name}

            <div className="relative">
              <Image
                src={ThreeDotsIcon}
                alt="more icon"
                height={24}
                width={24}
                className="opacity-0 group-hover:opacity-100  hover:bg-dark p-1 rounded-md "
                onClick={() => setIsMenuOpen((prev) => !prev)}
              />
              {isMenuOpen && (
                <div className="absolute top-8 left-0 w-32 bg-black/80 border border-slate-600 rounded-md shadow-lg z-10">
                  <ul>
                    <li
                      className="px-4 py-2 text-sm text-white hover:bg-slate-700 cursor-pointer  flex items-center gap-1 "
                      onClick={() => {
                        setIsRenameOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <Image src={PencilIcon} alt="" width={14} height={14} />
                      Rename
                    </li>
                    <li
                      className="px-4 py-2 text-sm text-white hover:bg-slate-700 cursor-pointer  flex items-center gap-1"
                      onClick={() => {
                        console.log("Delete clicked");
                        deleteSection({});
                        setIsMenuOpen(false);
                      }}
                    >
                      <Image src={TrashIcon} alt="" width={14} height={15} />
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>
      {isOpen &&
        tasks &&
        tasks.map((task) => (
          <>
            <ListRow key={task.id} task={task} />
            <div className="w-full h-2 bg-transparent"></div>
          </>
        ))}
      {/* {isOpen && (
        <tr>
          <td colSpan={4}>
            <div className="rounded-xl shadow-md py-2 px-4 hover:bg-slate-600 hover:text-white  border-dashed border-slate-600 border-2 text-center content-center  w-fit  text-slate-600 cursor-pointer">
              Add Task
            </div>
          </td>
        </tr>
      )} */}

      {isRenameOpen && (
        <>
          <div
            className="fixed inset-0  backdrop-blur-sm"
            onClick={() => setIsRenameOpen(false)}
          />
          <AddSectionModal
            sectionData={section}
            isOpen={isRenameOpen}
            onClose={() => setIsRenameOpen(false)}
          />
        </>
      )}

      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default ListSection;
