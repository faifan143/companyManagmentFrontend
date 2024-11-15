import { ArrowDownIcon, CheckSlateIcon } from "@/assets";
import { useRedux } from "@/hooks/useRedux";
import { getHomeDate } from "@/services/home.service";
import { RootState } from "@/state/store";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

const HomeGlance = ({
  scope,
  setScope,
  completedTasks,
}: {
  scope: "weekly" | "monthly";
  setScope: Dispatch<SetStateAction<"weekly" | "monthly">>;
  completedTasks: number;
}) => {
  const {
    selector: { userInfo },
  } = useRedux((state: RootState) => state.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleScopeChange = (newScope: "weekly" | "monthly") => {
    setScope(newScope);
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-fit mx-auto text-white flex flex-col items-center gap-2 mt-20">
      <div className="text-lg">{getHomeDate()}</div>
      <div className="text-2xl">
        Good Morning, {userInfo ? userInfo.name : "Guest"}
      </div>
      <div className="bg-dark text-slate-400 rounded-full flex justify-between min-w-[320px] items-center gap-2 p-5">
        {/* Scope Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            {scope === "weekly" ? "My Week" : "My Month"}
            <Image
              src={ArrowDownIcon}
              alt="arow down"
              height={20}
              width={20}
              className="ml-1"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 top-full mt-1 w-32 bg-dark border border-slate-600 rounded-md shadow-lg">
              <ul>
                <li
                  onClick={() => handleScopeChange("weekly")}
                  className={`px-4 py-2 cursor-pointer hover:bg-slate-700 ${
                    scope === "weekly" ? "text-white" : "text-slate-400"
                  }`}
                >
                  My Week
                </li>
                <li
                  onClick={() => handleScopeChange("monthly")}
                  className={`px-4 py-2 cursor-pointer hover:bg-slate-700 ${
                    scope === "monthly" ? "text-white" : "text-slate-400"
                  }`}
                >
                  My Month
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="w-[1px] h-5 bg-slate-400"></div>
        <div className="flex items-center gap-2">
          <Image src={CheckSlateIcon} alt="" height={20} width={20} />
          {completedTasks} Tasks Completed
        </div>
      </div>
    </header>
  );
};

export default HomeGlance;