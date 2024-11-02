/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { sidebarItems } from "./data";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { ChatsIcon } from "@/assets";
import ChatModal from "../ChatModal";

const Sidebar = ({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}) => {
  const userPermissions = useSelector(
    (state: RootState) => state.user.userInfo?.job.permissions
  );
  const [isChatOpen, setIsChatOpen] = useState(false);
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(
    () => localStorage.getItem("selectedTab") || "/home"
  );

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleTabClick = (path: string) => {
    setSelectedTab(path);
    localStorage.setItem("selectedTab", path);
    router.push(path);
  };

  // Filter items based on user permissions
  const visibleItems = userPermissions
    ? sidebarItems.filter((item) =>
        item.requiredPermissions.every((permission) =>
          userPermissions!.includes(permission)
        )
      )
    : [];

  return (
    <div
      className={`shadow-md p-5 mr-5 fixed top-0 bottom-0 transition-width duration-300 bg-[#1b1a40] ${
        isExpanded ? "w-[350px]" : "w-[92px]"
      }`}
    >
      <div
        className="relative w-[34px] h-[34px] p-1 cursor-pointer flex items-center text-xl font-bold gap-4 text-white text-nowrap"
        onClick={toggleSidebar}
      >
        <div className="font-bold text-white bg-[#413d99] rounded-md shadow-md p-2">
          CM
        </div>
        {isExpanded && " Company Manager"}
      </div>

      <div className="sidebar flex flex-col space-y-4 py-4">
        <div className="h-[1px] w-full bg-slate-200"></div>
        {visibleItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isExpanded={isExpanded}
            isSelected={selectedTab === item.path}
            onClick={() => handleTabClick(item.path)}
          />
        ))}

        <div className="h-[1px] w-full bg-slate-200"></div>
        <SidebarItem
          icon={ChatsIcon}
          label={`Department Chat`}
          isExpanded={isExpanded}
          isSelected={isChatOpen}
          onClick={() => setIsChatOpen((prev) => !prev)}
        />
        <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
};

// @ts-ignore
const SidebarItem = ({ icon, label, isExpanded, isSelected, onClick }) => {
  const iconWithColor = React.cloneElement(
    <Image src={icon} alt="home icon" width={20} height={20} />,
    { color: "white" }
  );

  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center text-white ${
        isExpanded ? "justify-start" : "justify-center"
      } relative p-2`}
    >
      {isSelected && (
        <div
          className="absolute inset-0 bg-[#413d99] rounded-md"
          style={{ padding: "6px" }}
        />
      )}
      <div className="relative z-10 flex items-center">
        {iconWithColor}
        {isExpanded && <p className="ml-2">{label}</p>}
      </div>
    </div>
  );
};

export default Sidebar;
