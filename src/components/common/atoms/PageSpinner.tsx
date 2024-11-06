"use client";

import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import React from "react";
import { useTranslation } from "react-i18next";

const PageSpinner = ({ title }: { title?: string }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[rgba(0,0,0,0.7)] backdrop-blur-[25px] rounded-lg shadow-lg p-8 flex flex-col justify-center items-center ">
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
        <div className="mt-4 font-bold text-[#ffffff]">
          {title ?? t("Loading ...")}
        </div>
      </div>
    </div>
  );
};

export default PageSpinner;
