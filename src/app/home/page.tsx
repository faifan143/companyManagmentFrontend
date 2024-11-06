"use client";

import GridContainer from "@/components/common/atoms/GridContainer";
import TasksContent from "@/components/common/organisms/TasksContent";

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
