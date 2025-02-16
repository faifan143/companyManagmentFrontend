"use client";

import { useRedux } from "@/hooks/useRedux";
import { RootState } from "@/state/store";
import React, { ReactNode } from "react";
import PageSpinner from "../common/atoms/ui/PageSpinner";

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const { selector } = useRedux((state: RootState) => state.wrapper);

  return (
    <>
      {selector.isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/5 z-50">
          <PageSpinner />
        </div>
      )}
      {children}
    </>
  );
};

export default LoadingProvider;
