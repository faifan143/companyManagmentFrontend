"use client";

import GridContainer from "@/components/common/atoms/GridContainer";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const selectedTab = localStorage.getItem("selectedTab");
    if (selectedTab) router.replace(selectedTab);
  }, []);
  return (
    <div className="bg-main">
      <GridContainer>
        <div></div>
      </GridContainer>
    </div>
  );
};

export default Login;
