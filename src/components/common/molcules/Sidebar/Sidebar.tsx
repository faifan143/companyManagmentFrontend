/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { ChatsIcon } from "@/assets";
import { useRolePermissions } from "@/hooks/useCheckPermissions";
import useCustomTheme from "@/hooks/useCustomTheme";
import useNavigationWithLoading from "@/hooks/useNavigationWithLoading";
import { RootState } from "@/state/store";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ChatModal from "../../atoms/ChatModal";
import { sidebarItems } from "./data";
import PageSpinner from "../../atoms/PageSpinner";

const Sidebar = ({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const isAdmin = useRolePermissions("admin");
  const userPermissions = useSelector(
    (state: RootState) => state.user.userInfo?.job.permissions
  );
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { loading, navigateWithLoading } = useNavigationWithLoading();
  const [selectedTab, setSelectedTab] = useState(
    () => localStorage.getItem("selectedTab") || "/home"
  );

  const { isLightMode } = useCustomTheme();
  const handleTabClick = (path: string) => {
    setSelectedTab(path);
    localStorage.setItem("selectedTab", path);
    navigateWithLoading(path);
  };

  const visibleItems = userPermissions
    ? sidebarItems.filter(
        (item) =>
          isAdmin ||
          item.requiredPermissions.length == 0 ||
          item.requiredPermissions.some((permission) =>
            userPermissions!.includes(permission)
          )
      )
    : [];

  return (
    <div
      className={
        isExpanded ? "fixed inset-0 bg-slate-600/10 backdrop-blur-sm z-10 " : ""
      }
      onClick={() => setIsExpanded(false)}
    >
      {loading && <PageSpinner />}

      <div
        className={`shadow-md p-5 mr-5 fixed top-[50px] bottom-0 transition-width duration-500  border-r border-slate-600 ${
          isLightMode ? "bg-darkest" : "bg-main"
        }   ${isExpanded ? "w-[350px] backdrop-blur" : "w-[92px]"}`}
      >
        <div className="sidebar flex flex-col space-y-4 py-4">
          {visibleItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={t(item.label)}
              isExpanded={isExpanded}
              isSelected={selectedTab === item.path}
              onClick={() => handleTabClick(item.path)}
            />
          ))}
          <div className="h-[1px] w-full bg-slate-200"></div>
          <SidebarItem
            icon={ChatsIcon}
            label={t(`Department Chat`)}
            isExpanded={isExpanded}
            isSelected={isChatOpen}
            onClick={() => setIsChatOpen((prev) => !prev)}
          />
          <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
      </div>
    </div>
  );
};

// @ts-ignore
const SidebarItem = ({ icon, label, isExpanded, isSelected, onClick }) => {
  const iconWithColor = React.cloneElement(
    <div className="svg-container">
      <Image src={icon} alt="home icon" width={20} height={20} />
    </div>
  );
  const { isLightMode } = useCustomTheme();

  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center 
      ${isLightMode ? "text-tblackAF" : "text-twhite"}
      ${isExpanded ? "justify-start" : "justify-center"} relative p-2`}
    >
      {isSelected && (
        <div
          className={`absolute inset-0 ${
            isLightMode ? "bg-darker" : "bg-secondary"
          } rounded-md`}
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
