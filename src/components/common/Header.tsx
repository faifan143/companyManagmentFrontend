"use client";

import { RootState } from "@/state/store";
import React, { Dispatch, useState } from "react";
import { FaHome, FaTh, FaBell, FaQuestionCircle, FaCog } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useRedux } from "@/hooks/useRedux";
import { logout } from "@/state/slices/userSlice";
import { PiChatTeardropTextBold } from "react-icons/pi";

const Header: React.FC<{
  setCurrentContent: React.Dispatch<
    React.SetStateAction<
      "All Tasks" | "Departments" | "Employees" | "Job Titles"
    >
  >;

  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
}> = ({
  setIsModalOpen,
  setCurrentContent,
}: {
  setCurrentContent: React.Dispatch<
    React.SetStateAction<
      "All Tasks" | "Departments" | "Employees" | "Job Titles"
    >
  >;

  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const { dispatch } = useRedux((state) => state.user);
  const userInitial = user ? user.name.charAt(0).toUpperCase() : "G";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfile = () => {
    console.log("Profile clicked");
    setIsDropdownOpen(false);
  };

  return (
    <header className="flex justify-between items-center flex-col gap-[15px] sm:flex-row col-span-4 sm:col-span-12  bg-white py-[24px] ">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        {/* Home Icon */}
        <div
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer"
          onClick={() => setCurrentContent("All Tasks")}
        >
          <FaHome className="text-blue-500" />
        </div>
        {/* Grid Icon */}
        <div className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer">
          <FaTh className="text-blue-500" />
        </div>
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-64">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none ml-2 text-gray-700 w-full"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        {/* Plus Icon */}

        {/* Bell Icon with Notification Dot */}
        <div
          className="relative p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer "
          onClick={() => setIsModalOpen(true)}
        >
          <PiChatTeardropTextBold className="text-blue-500" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>
        </div>
        <div className="relative p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer">
          <FaBell className="text-blue-500" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>
        </div>
        {/* Question Icon */}
        <div className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer">
          <FaQuestionCircle className="text-blue-500" />
        </div>
        {/* Settings Icon */}
        <div className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer">
          <FaCog className="text-blue-500" />
        </div>
        {/* User Profile Image */}
        <div
          className="h-10 w-10 flex items-center justify-center rounded-full bg-red-300 cursor-pointer text-white font-bold text-lg"
          onClick={toggleDropdown}
        >
          {userInitial}
        </div>
        {isDropdownOpen && (
          <div className="absolute top-[20px]  z-10 mt-12 w-32 bg-white shadow-md rounded-lg border border-gray-200">
            <ul className="flex flex-col text-gray-700">
              <li
                onClick={handleProfile}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Profile
              </li>
              <li
                onClick={() => {
                  dispatch(logout());
                  router.replace("/");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
