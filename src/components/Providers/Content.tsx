import useLanguage from "@/hooks/useLanguage";
import { useRedux } from "@/hooks/useRedux";
import { refreshAuthToken } from "@/state/slices/userSlice";
import { RootState } from "@/state/store";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
import PageSpinner from "../common/atoms/PageSpinner";
import Sidebar from "../common/molcules/Sidebar/Sidebar";
import NewHeader from "../common/NewHeader";
import Cookies from "js-cookie";
const Content = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const {
    selector: { isAuthenticated, loading },
    dispatch,
  } = useRedux((state: RootState) => state.user);
  const { getDir, t } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = Cookies.get("refresh_token");

      console.log("Checking refresh token : ", refreshToken);

      if (!refreshToken) {
        router.push("/auth");
        return;
      }
      try {
        await dispatch(refreshAuthToken()).unwrap();
      } catch (error) {
        console.log("Error refreshing token: " + error);
        Cookies.remove("refresh_token");
        Cookies.remove("access_token");
        router.push("/auth");
      }
    };

    checkAuth();
  }, [dispatch, router]);

  useEffect(() => {
    if (isAuthenticated) {
      const storedTab = localStorage.getItem("selectedTab");
      if (storedTab && storedTab !== pathname) {
        router.replace(storedTab);
      }
    }
  }, [isAuthenticated]);

  if (loading) return <PageSpinner title={t("Loading ...")} />;
  return (
    <div
      className={`min-h-[100dvh] w-full  ${
        pathname == "/home" ? "bg-radial-light" : "bg-main"
      }`}
    >
      <div className="flex h-full w-full">
        {isAuthenticated && <NewHeader setIsExpanded={setIsSidebarExpanded} />}
        {isAuthenticated && (
          <Sidebar
            isExpanded={isSidebarExpanded}
            setIsExpanded={setIsSidebarExpanded}
          />
        )}
        <div
          dir={getDir()}
          className={`transition-all mt-[49px] duration-300 py-5  w-full`}
        >
          <Suspense fallback={<PageSpinner />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default Content;
