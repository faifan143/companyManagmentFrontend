import { CheckIcon } from "@/assets";
import { useCreateMutation } from "@/hooks/useCreateMutation";
import { useRedux } from "@/hooks/useRedux";
import useSnackbar from "@/hooks/useSnackbar";
import { RootState } from "@/state/store";
import { SectionType } from "@/types/Section.type";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import CustomizedSnackbars from "./CustomizedSnackbars";

const AddSectionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  sectionData?: SectionType;
}> = ({ isOpen, onClose, sectionData }) => {
  const { selector } = useRedux(
    (state: RootState) => state.user.userInfo?.department.id
  );
  const [section, setSection] = useState("");
  const { setSnackbarConfig, snackbarConfig } = useSnackbar();
  const { mutate: addSection, isPending: isPendingSection } = useCreateMutation(
    {
      endpoint: sectionData ? `/sections/${sectionData._id}` : "/sections",
      onSuccessMessage: `Section ${
        sectionData ? "updated" : "added"
      } successfully!`,
      invalidateQueryKeys: ["sections"],
      setSnackbarConfig,
      onSuccessFn() {
        setSection("");
        setInterval(onClose, 500);
      },
      requestType: sectionData ? "put" : "post",
    }
  );
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-dark rounded-xl shadow-md w-[400px] text-white space-y-4 p-6 relative">
          <button
            onClick={onClose}
            className="text-white absolute top-4 right-4 text-xl"
          >
            &times;
          </button>
          <div>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Section Name"
                className="bg-transparent outline-none border rounded-lg px-4 py-2"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setSection(event.target.value)
                }
                defaultValue={sectionData ? sectionData.name : ""}
              />
            </div>
            <div
              onClick={() =>
                addSection({
                  name: section,
                  department: selector,
                })
              }
              className="border border-slate-300 px-2 py-1 rounded-md w-fit text-xs flex items-center justify-center gap-1 cursor-pointer hover:bg-main mx-auto mt-4"
            >
              <Image src={CheckIcon} alt="check icon" height={20} width={20} />
              {isPendingSection
                ? sectionData
                  ? "Updating Section ..."
                  : "Adding Section ..."
                : sectionData
                ? "Update Section"
                : "Add Section"}
            </div>
          </div>
        </div>
      </div>
      <CustomizedSnackbars
        open={snackbarConfig.open}
        message={snackbarConfig.message}
        severity={snackbarConfig.severity}
        onClose={() => setSnackbarConfig((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default AddSectionModal;
