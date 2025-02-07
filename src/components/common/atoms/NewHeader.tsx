"use client";
import {
  DarkModeIcon,
  LangIcon,
  LightModeIcon,
  MoreIcon,
  SearchIcon,
} from "@/assets";
import useCustomTheme from "@/hooks/useCustomTheme";
import useLanguage from "@/hooks/useLanguage";
import { logout } from "@/state/slices/userSlice";
import { AppDispatch, RootState } from "@/state/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import RouteWrapper from "../RouteWrapper";
import { useMokkBar } from "@/components/Providers/Mokkbar";

const NewHeader = ({
  setIsExpanded,
}: {
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const userInitial = user ? user.name.charAt(0).toUpperCase() : "G";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLightMode, toggleThemes } = useCustomTheme();
  const { toggleLanguage, getDir } = useLanguage();
  const { setSnackbarConfig } = useMokkBar();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setIsExpanded((prev) => !prev);
  const toggleMobileSearch = () => setIsMobileSearchOpen(!isMobileSearchOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div
        className={`${
          isLightMode ? "bg-darkest" : "bg-main"
        } fixed top-0 right-0 left-0 py-2 px-[2%] flex justify-between items-center border-b border-slate-600 z-20`}
      >
        {/* Menu Button */}
        <div className="group relative">
          <Image
            src={MoreIcon}
            alt="more icon"
            width={30}
            height={30}
            onClick={toggleSidebar}
            className={`cursor-pointer transform transition-all duration-200 ease-out 
              ${isLightMode ? "hover:bg-darker" : "hover:bg-secondary"}
              p-1.5 rounded-lg active:scale-95 hover:shadow-lg`}
          />
        </div>

        {/* Search Bar - Hidden on Mobile */}
        <div
          className={`hidden md:flex items-center rounded-lg overflow-hidden transform transition-all duration-200 ease-out
            ${isLightMode ? "bg-darker" : "bg-tblack"}
            w-[30%] group hover:shadow-lg`}
          dir={getDir()}
        >
          <div className="pl-3 pr-2 transition-transform duration-200 group-hover:scale-105">
            <Image
              src={SearchIcon}
              width={20}
              height={20}
              alt="search icon"
              className="transition-opacity duration-200 group-hover:opacity-80"
            />
          </div>
          <input
            type="text"
            className="bg-transparent placeholder-white py-2 px-1 outline-none border-none text-twhite w-full transition-all duration-200"
            placeholder={t("Search")}
          />
        </div>

        {/* Actions Group */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Search Toggle */}
          <div className="md:hidden relative group" onClick={toggleMobileSearch}>
            <div
              className={`p-2 rounded-full cursor-pointer transform transition-all duration-200 
              ${isLightMode ? "hover:bg-darker" : "hover:bg-secondary"}
              active:scale-95`}
            >
              <Image
                src={SearchIcon}
                width={20}
                height={20}
                alt="search icon"
                className="transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Language Toggle */}
          <div className="relative group" onClick={toggleLanguage}>
            <div
              className="p-2 bg-blue-100 rounded-full cursor-pointer transform transition-all duration-200 
              hover:bg-blue-200 hover:shadow-lg active:scale-95"
            >
              <Image
                src={LangIcon}
                width={16}
                height={16}
                alt="language icon"
                className="transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="relative group" onClick={toggleThemes}>
            <div
              className="p-2 bg-blue-100 rounded-full cursor-pointer transform transition-all duration-200 
              hover:bg-blue-200 hover:shadow-lg active:scale-95"
            >
              <Image
                src={isLightMode ? DarkModeIcon : LightModeIcon}
                width={16}
                height={16}
                alt="theme icon"
                className="transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          </div>

          {/* User Avatar */}
          <div
            onClick={toggleDropdown}
            className={`relative group h-8 w-8 flex items-center justify-center rounded-full 
              bg-red-300 cursor-pointer transform transition-all duration-200 
              hover:shadow-lg active:scale-95 font-bold text-lg
              ${isLightMode ? "text-tblackAF" : "text-twhite"}`}
          >
            {userInitial}
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className={`
              absolute right-2 md:right-6 top-full mt-2
              min-w-[200px] bg-secondary 
              shadow-lg rounded-lg overflow-hidden
              animate-in fade-in slide-in-from-top-2 duration-200
            `}
          >
            <ul className="text-twhite divide-y divide-slate-600/30">
              <RouteWrapper
                href="/profile"
                onClick={() => setIsDropdownOpen(false)}
              >
                <li
                  className={`
                    px-4 py-3
                    cursor-pointer
                    transition-colors duration-200
                    ${
                      isLightMode
                        ? "hover:bg-darkest hover:text-tblackAF"
                        : "hover:bg-tblack"
                    }
                  `}
                >
                  {t("Profile")}
                </li>
              </RouteWrapper>

              <li
                onClick={() => {
                  dispatch(logout());
                  setSnackbarConfig({
                    open: true,
                    message: "Logout successful!",
                    severity: "success",
                  });
                  router.replace("/auth");
                }}
                className={`
                  px-4 py-3
                  cursor-pointer
                  transition-colors duration-200
                  ${
                    isLightMode
                      ? "hover:bg-darkest hover:text-tblackAF"
                      : "hover:bg-tblack"
                  }
                `}
              >
                {t("Logout")}
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div
          className={`md:hidden fixed top-[56px] left-0 right-0 p-2 z-10
            ${isLightMode ? "bg-darkest" : "bg-main"}
            border-b border-slate-600
            animate-in fade-in slide-in-from-top duration-200`}
        >
          <div
            className={`flex items-center rounded-lg overflow-hidden
              ${isLightMode ? "bg-darker" : "bg-tblack"}
              w-full`}
            dir={getDir()}
          >
            <div className="pl-3 pr-2">
              <Image
                src={SearchIcon}
                width={20}
                height={20}
                alt="search icon"
                className="opacity-80"
              />
            </div>
            <input
              type="text"
              className="bg-transparent placeholder-white py-2 px-1 outline-none border-none text-twhite w-full"
              placeholder={t("Search")}
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NewHeader;