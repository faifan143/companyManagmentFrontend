"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const useNavigationWithLoading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const navigateWithLoading = async (path: string) => {
    setLoading(true);
    try {
      await router.push(path);
    } finally {
      setLoading(false);
    }
  };
  const replaceWithLoading = async (path: string) => {
    setLoading(true);
    try {
      await router.replace(path);
    } finally {
      setLoading(false);
    }
  };

  return { loading, navigateWithLoading, replaceWithLoading };
};

export default useNavigationWithLoading;
