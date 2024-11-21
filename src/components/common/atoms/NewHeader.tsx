import {
  DarkModeIcon,
  LangIcon,
  LightModeIcon,
  MoreIcon,
  SearchIcon,
} from "@/assets";
import useCustomTheme from "@/hooks/useCustomTheme";
import useLanguage from "@/hooks/useLanguage";
import useNavigationWithLoading from "@/hooks/useNavigationWithLoading";
import { logout } from "@/state/slices/userSlice";
import { AppDispatch, RootState } from "@/state/store";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import PageSpinner from "./PageSpinner";

const NewHeader = ({
  setIsExpanded,
}: {
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const userInitial = user ? user.name.charAt(0).toUpperCase() : "G";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, navigateWithLoading, replaceWithLoading } =
    useNavigationWithLoading();
  const { isLightMode, toggleThemes } = useCustomTheme();
  const { toggleLanguage, getDir } = useLanguage();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleProfile = () => {
    console.log("Profile clicked");
    navigateWithLoading("/profile");
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`${
        isLightMode ? "bg-darkest" : "bg-main"
      } fixed top-0 right-0 left-0  py-2 px-[2%] flex justify-between items-center border-b border-slate-600  z-20`}
    >
      {loading && <PageSpinner />}
      <Image
        src={MoreIcon}
        alt="more icon"
        width={30}
        height={30}
        onClick={toggleSidebar}
        className={`cursor-pointer ${
          isLightMode ? "hover:bg-darker" : "hover:bg-secondary"
        }  hover:shadow-md   p-1 rounded-md  `}
      />

      <div
        className={`flex items-center rounded-2xl p-1 ${
          isLightMode ? "bg-darker" : "bg-tblack"
        }  w-[30%]`}
        dir={getDir()}
      >
        <Image src={SearchIcon} width={25} height={25} alt="search icon" />

        <input
          type="text"
          className="bg-transparent placeholder-white mx-2 outline-none border-none text-twhite "
          placeholder={t("Search")}
        />
      </div>

      <div className="flex gap-5">
        <div
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer"
          onClick={toggleLanguage}
        >
          <Image src={LangIcon} width={16} height={16} alt="language icon" />
        </div>
        <div
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer"
          onClick={toggleThemes}
        >
          <Image
            src={isLightMode ? DarkModeIcon : LightModeIcon}
            width={16}
            height={16}
            alt="theme icon"
          />
        </div>
        <div
          className={`h-8 w-8 flex items-center justify-center rounded-full bg-red-300 cursor-pointer  font-bold text-lg  ${
            isLightMode ? "text-tblackAF" : "text-twhite"
          }`}
          onClick={toggleDropdown}
        >
          {userInitial}
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute -top-1 right-9 z-10 mt-12 min-w-32 bg-secondary shadow-md rounded-lg ">
          <ul className="flex flex-col text-twhite">
            <li
              onClick={handleProfile}
              className={`px-4 py-2 ${
                isLightMode
                  ? "hover:bg-darkest hover:text-tblackAF"
                  : "hover:bg-tblack"
              }   rounded-t-lg cursor-pointer`}
            >
              {t("Profile")}
            </li>
            <li
              onClick={() => {
                dispatch(logout());
                replaceWithLoading("/auth");
              }}
              className={`px-4 py-2 ${
                isLightMode
                  ? "hover:bg-darkest hover:text-tblackAF"
                  : "hover:bg-tblack"
              }   rounded-b-lg cursor-pointer`}
            >
              {t("Logout")}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewHeader;
