// components/Tabs.tsx
import { TabBoardIcon, TabListIcon } from "@/assets";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const TasksTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<"list" | "board">>;
}) => {
  return (
    <div className="flex space-x-4 border-b  text-white border-gray-300  mb-5">
      <button
        onClick={() => setActiveTab("list")}
        className={`pb-2 flex items-center space-x-1 ${
          activeTab === "list"
            ? "border-b-2 border-slate-300  font-semibold"
            : ""
        }`}
      >
        <Image src={TabListIcon} width={20} height={20} alt="tab list icon" />
        <span>List</span>
      </button>

      <button
        onClick={() => setActiveTab("board")}
        className={`pb-2 flex items-center space-x-1 ${
          activeTab === "board"
            ? "border-b-2 border-slate-300  font-semibold"
            : "text-white"
        }`}
      >
        <Image src={TabBoardIcon} width={20} height={20} alt="tab board icon" />
        <span>Board</span>
      </button>
    </div>
  );
};

export default TasksTab;
