"use client";

import React, { useState } from "react";
import GridContainer from "@/components/common/GridContainer";
import Header from "@/components/common/Header";
import TeamHeader from "@/components/common/TeamHeader";
import TasksContent from "@/components/common/TasksContent";
import EmployeesContent from "@/components/common/EmployeesContent";
import DepartmentsContent from "@/components/common/DepartmentsContent";
import JobTitleContent from "@/components/common/JobTitleContent";
import ChatModal from "@/components/common/ChatModal";

const teamMembers = [
  { name: "John", color: "#FF5733" },
  { name: "Alice", color: "#33C1FF" },
  { name: "Maria", color: "#FF33F7" },
  { name: "Jake", color: "#33FF6B" },
];

const Home = () => {
  const [currentContent, setCurrentContent] = useState<
    "All Tasks" | "Departments" | "Employees" | "Job Titles"
  >("All Tasks");
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <GridContainer>
        <Header
          setIsModalOpen={setIsModalOpen}
          setCurrentContent={setCurrentContent}
        />
        <div className="col-span-12 ">
          <TeamHeader
            title="Admin Board"
            members={teamMembers}
            totalMembers={16}
            currentContent={currentContent}
            setCurrentContent={setCurrentContent}
          />
        </div>
        {currentContent == "All Tasks" ? (
          <TasksContent />
        ) : currentContent == "Employees" ? (
          <EmployeesContent />
        ) : currentContent == "Departments" ? (
          <DepartmentsContent />
        ) : (
          <JobTitleContent />
        )}
        <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </GridContainer>
    </div>
  );
};

export default Home;
