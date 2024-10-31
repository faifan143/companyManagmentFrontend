"use client";

import { useRedux } from "@/hooks/useRedux";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

interface TeamHeaderProps {
  title: string;
  members: { name: string; color?: string }[];
  totalMembers: number;
  currentContent: "All Tasks" | "Departments" | "Employees" | "Job Titles";
  setCurrentContent: Dispatch<
    SetStateAction<"All Tasks" | "Departments" | "Employees" | "Job Titles">
  >;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({
  title,
  members,
  totalMembers,
  currentContent,
  setCurrentContent,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { selector } = useRedux((state) => state.user);

  return (
    <div className="flex justify-between items-center py-4 bg-white  w-full">
      {/* Left Section: Title */}
      <h1 className="text-xl font-bold text-gray-800">
        {selector.userInfo?.department.name ?? title}
      </h1>

      {/* Right Section: Add Member, Avatars, and All Tasks */}
      {
        <div className="flex items-center space-x-4">
          {/* Add a Member Button */}
          {currentContent == "Departments" ? (
            <button className="flex items-center text-[#1b1a40] font-medium">
              <div className="flex items-center justify-center w-8 h-8 border-2 border-dashed border-blue-300 rounded-full">
                <FaPlus />
              </div>
              <span className="ml-2 text-black font-bold">
                Add a department
              </span>
            </button>
          ) : currentContent == "Job Titles" ? (
            <button className="flex items-center text-[#1b1a40] font-medium">
              <div className="flex items-center justify-center w-8 h-8 border-2 border-dashed border-blue-300 rounded-full">
                <FaPlus />
              </div>
              <span className="ml-2 text-black font-bold">Add a job title</span>
            </button>
          ) : currentContent == "Employees" ? (
            <button className="flex items-center text-[#1b1a40] font-medium">
              <div className="flex items-center justify-center w-8 h-8 border-2 border-dashed border-blue-300 rounded-full">
                <FaPlus />
              </div>
              <span className="ml-2 text-black font-bold">Add a member</span>
            </button>
          ) : (
            <button className="flex items-center text-[#1b1a40] font-medium">
              <div className="flex items-center justify-center w-8 h-8 border-2 border-dashed border-blue-300 rounded-full">
                <FaPlus />
              </div>
              <span className="ml-2 text-black font-bold">Add a Task</span>
            </button>
          )}

          {/* Avatars */}
          <div className="flex items-center -space-x-2">
            {members.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white"
                style={{
                  backgroundColor: member.color || "#7B1FA2",
                }}
                title={member.name}
              >
                {member.name.charAt(0).toUpperCase()}
              </div>
            ))}
            {totalMembers > members.length && (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-[10px] font-bold border-2 border-white">
                +{totalMembers - members.length}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="px-4 py-1 bg-[#1b1a40] text-white rounded-lg font-medium hover:bg-blue-600 transition flex items-center"
              onClick={toggleDropdown}
            >
              {currentContent} <FiChevronDown className="ml-1" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCurrentContent("All Tasks");
                      setIsDropdownOpen(false);
                    }}
                  >
                    All Tasks
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCurrentContent("Departments");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Departments
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCurrentContent("Job Titles");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Job Titles
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCurrentContent("Employees");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Employees
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default TeamHeader;
