// components/Tabs.tsx
import { TabBoardIcon, TabListIcon } from "@/assets";
import useLanguage from "@/hooks/useLanguage";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const TasksTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<"list" | "board">>;
}) => {
  const { t } = useLanguage();
  return (
    <div className="flex gap-4 border-b  text-white border-gray-300  mb-5">
      <button
        onClick={() => setActiveTab("list")}
        className={`pb-2 flex items-center gap-2 ${
          activeTab === "list"
            ? "border-b-2 border-slate-300  font-semibold"
            : ""
        }`}
      >
        <Image src={TabListIcon} width={20} height={20} alt="tab list icon" />
        <span>{t("List")}</span>
      </button>

      <button
        onClick={() => setActiveTab("board")}
        className={`pb-2 flex items-center gap-2 ${
          activeTab === "board"
            ? "border-b-2 border-slate-300  font-semibold"
            : "text-white"
        }`}
      >
        <Image src={TabBoardIcon} width={20} height={20} alt="tab board icon" />
        <span>{t("Board")}</span>
      </button>
    </div>
  );
};

export default TasksTab;
