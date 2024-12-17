// hooks/useAuth.ts
import { useEffect } from "react";
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

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = Cookies.get("refresh_token");
      if (!refreshToken) {
        router.replace("/auth");
        return;
      }

      try {
        await dispatch(refreshAuthToken()).unwrap();
      } catch (error) {
        console.log(error);
        Cookies.remove("refresh_token");
        Cookies.remove("access_token");
        router.push("/auth");
      }
    };
    checkAuth();
  }, [dispatch, router]);

  return { isAuthenticated, loading };
};
