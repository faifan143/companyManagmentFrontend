// TasksView.tsx
"use client";

import GridContainer from "@/components/common/GridContainer";
import TasksContent from "@/components/common/TasksContent";
import { usePermissions, useRolePermissions } from "@/utils/check_permissions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TasksView: React.FC = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("get-emp-tasks");
  const isPrimary = useRolePermissions("primary_user");
  const isAdmin = useRolePermissions("admin");

  return (
    <GridContainer>
      <div className="col-span-full flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center ">Tasks</h1>
        <div className="flex justify-center items-center gap-5">
          {/* Conditionally render the department dropdown if "Specific Dept" is selected */}
          <select
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none transition duration-200"
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          >
            {usePermissions(["task_search_and_view"]) && (
              <option value="get-emp-tasks">My Tasks</option>
            )}{" "}
            {usePermissions(["task_search_and_view"]) && isPrimary && (
              <option value="get-my-dept-tasks">My Department Tasks</option>
            )}
          </select>

          {(isAdmin || isPrimary) && (
            <button
              type="button"
              className="bg-[#1b1a40] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-200"
              onClick={() => {
                router.push("/tasks/add-task");
              }}
            >
              Add Task
            </button>
          )}
        </div>
      </div>

      <TasksContent selectedOption={selectedOption} />
    </GridContainer>
  );
};

export default TasksView;
