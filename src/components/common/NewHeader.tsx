import { AppDispatch, RootState } from "@/state/store";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { LangIcon, MoreIcon, SearchIcon } from "@/assets";
import { useTranslation } from "react-i18next";
import { logout } from "@/state/slices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import useLanguage from "@/hooks/useLanguage";

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
  const router = useRouter();

  const { toggleLanguage, getDir } = useLanguage();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleProfile = () => {
    console.log("Profile clicked");
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-main fixed top-0 right-0 left-0  py-2 px-[2%] flex justify-between items-center border-b border-slate-600  z-20">
      <Image
        src={MoreIcon}
        alt="more icon"
        width={30}
        height={30}
        onClick={toggleSidebar}
        className="cursor-pointer hover:bg-secondary hover:shadow-md   p-1 rounded-md  "
      />

      <div
        className="flex items-center rounded-2xl p-1 bg-slate-600 w-[30%]"
        dir={getDir()}
      >
        <Image src={SearchIcon} width={25} height={25} alt="search icon" />

        <input
          type="text"
          className="bg-transparent placeholder-white mx-2 outline-none border-none text-white "
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
          className="h-8 w-8 flex items-center justify-center rounded-full bg-red-300 cursor-pointer text-white font-bold text-lg"
          onClick={toggleDropdown}
        >
          {userInitial}
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-0 right-2 z-10 mt-12 w-32 bg-white shadow-md rounded-lg border border-gray-200">
          <ul className="flex flex-col text-gray-700">
            <li
              onClick={handleProfile}
              className="px-4 py-2 hover:bg-gray-100 rounded-t-lg cursor-pointer"
            >
              {t("Profile")}
            </li>
            <li
              onClick={() => {
                dispatch(logout());
                router.replace("/auth");
              }}
              className="px-4 py-2 hover:bg-gray-100 rounded-b-lg cursor-pointer"
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
