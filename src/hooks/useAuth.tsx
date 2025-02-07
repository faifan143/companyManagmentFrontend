import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useRedux } from "@/hooks/useRedux";
import { refreshAuthToken } from "@/state/slices/userSlice";
import Cookies from "js-cookie";
import { RootState } from "@/state/store";

export const useAuth = () => {
  const router = useRouter();
  const {
    selector: { isAuthenticated, loading },
    dispatch,
  } = useRedux((state: RootState) => state.user);

  const checkAuth = useCallback(async () => {
    const refreshToken = Cookies.get("refresh_token");

    if (!refreshToken) {
      return router.replace("/auth");
    }

    try {
      await dispatch(refreshAuthToken()).unwrap();
    } catch (error) {
      console.error("Authentication error:", error);
      Cookies.remove("refresh_token");
      Cookies.remove("access_token");
      router.push("/auth");
    }
  }, [dispatch, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isAuthenticated, loading };
};
