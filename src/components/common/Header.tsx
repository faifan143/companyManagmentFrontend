"use client";

import { useRedux } from "@/hooks/useRedux";
import { logout } from "@/state/slices/userSlice";
import { RootState } from "@/state/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaBell, FaCog, FaHome, FaQuestionCircle, FaTh } from "react-icons/fa";
import { useSelector } from "react-redux";
import GridContainer from "./GridContainer";

const Header: React.FC = () => {
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
    <GridContainer>
      <header className="flex justify-between items-center flex-col gap-[15px] sm:flex-row col-span-4 sm:col-span-12  bg-white py-[24px] ">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {/* Home Icon */}
          <div
            className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer"
            onClick={() => router.push("/home")}
          >
            <FaHome className="text-[#1b1a40]" />
          </div>
          {/* Grid Icon */}
          <div className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer">
            <FaTh className="text-[#1b1a40]" />
          </div>
          {/* Search Bar */}
          <div className="bg-slate-100 rounded-md shadow-sm p-2 flex">
            <input
              type="search"
              name="search-text"
              placeholder="Search"
              className="border-none outline-none bg-transparent px-1"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Plus Icon */}

          {/* Bell Icon with Notification Dot */}
          <div className="relative p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer">
            <FaBell className="text-[#1b1a40]" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>
          </div>
          {/* Question Icon */}
          <div className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer">
            <FaQuestionCircle className="text-[#1b1a40]" />
          </div>
          {/* Settings Icon */}
          <div className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer">
            <FaCog className="text-[#1b1a40]" />
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
    </GridContainer>
  );
};

export default Header;
