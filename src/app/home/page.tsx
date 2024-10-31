"use client";

import GridContainer from "@/components/common/GridContainer";
import TasksContent from "@/components/common/TasksContent";

const Home = () => {
  return (
    <div>
      <GridContainer>
        <TasksContent selectedOption="get-emp-tasks" />
      </GridContainer>
    </div>
  );
};

export default Home;
