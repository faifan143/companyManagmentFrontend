"use client";
import { ChatsIcon } from "@/assets";
import { useRolePermissions } from "@/hooks/useCheckPermissions";
import useCustomTheme from "@/hooks/useCustomTheme";
import { RootState } from "@/state/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ChatModal from "../../atoms/ChatModal";
import RouteWrapper from "../../RouteWrapper";
import Tooltip from "../../Tooltip";
import { sidebarItems } from "./data";
import { SidebarItem } from "./SidebarItem";

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
  const { isLightMode } = useCustomTheme();
  const [selectedTab, setSelectedTab] = useState(
    () => localStorage.getItem("selectedTab") || "/home"
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTabClick = (path: string) => {
    setSelectedTab(path);
    localStorage.setItem("selectedTab", path);
    if (isMobile) {
      setIsExpanded(false);
    }
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
    <>
      <div
        className={`
          ${
            isExpanded
              ? "fixed inset-0 bg-slate-600/10 backdrop-blur-sm z-10"
              : ""
          }
          ${isMobile ? "touch-none" : ""}
        `}
        onClick={() => setIsExpanded(false)}
      >
        <div
          className={`
            shadow-md p-5 fixed transition-all duration-300 ease-in-out
            border-r border-slate-600
            ${isLightMode ? "bg-darkest" : "bg-main"}
            ${
              isMobile
                ? `top-0 h-full ${isExpanded ? "left-0" : "-left-full"}`
                : `top-[50px] bottom-0 left-0`
            }
            ${
              !isMobile &&
              (isExpanded ? "w-[240px] mr-5" : "w-[92px] transform origin-left")
            }
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`sidebar flex flex-col space-y-4 ${
              isMobile && isExpanded ? "py-16" : "py-4"
            } transition-all duration-300 ${
              !isMobile && !isExpanded ? "opacity-90" : "opacity-100"
            }`}
          >
            {visibleItems.map((item, index) => (
              <RouteWrapper
                href={item.path}
                key={index}
                onClick={() => handleTabClick(item.path)}
              >
                {!isExpanded ? (
                  <Tooltip content={item.label} position="right">
                    <SidebarItem
                      icon={item.icon}
                      label={t(item.label)}
                      isExpanded={isExpanded}
                      isSelected={selectedTab === item.path}
                      onClick={() => {}}
                    />
                  </Tooltip>
                ) : (
                  <SidebarItem
                    icon={item.icon}
                    label={t(item.label)}
                    isExpanded={isExpanded}
                    isSelected={selectedTab === item.path}
                    onClick={() => {}}
                  />
                )}
              </RouteWrapper>
            ))}
            <div className="h-[1px] w-full bg-slate-200"></div>
            <div className="flex justify-start">
              <SidebarItem
                icon={ChatsIcon}
                label={t(`Department Chat`)}
                isExpanded={isExpanded}
                isSelected={isChatOpen}
                onClick={() => setIsChatOpen((prev) => !prev)}
              />
            </div>
            <ChatModal
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
