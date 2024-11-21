import useCustomTheme from "@/hooks/useCustomTheme";
import useLanguage from "@/hooks/useLanguage";
import useNavigationWithLoading from "@/hooks/useNavigationWithLoading";
import { useRedux } from "@/hooks/useRedux";
import { refreshAuthToken } from "@/state/slices/userSlice";
import { RootState } from "@/state/store";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { ReactNode, Suspense, useEffect, useState } from "react";
import NewHeader from "../common/atoms/NewHeader";
import PageSpinner from "../common/atoms/PageSpinner";
import Sidebar from "../common/molcules/Sidebar/Sidebar";
const Content = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const {
    loading: navigating,
    replaceWithLoading,
    navigateWithLoading,
  } = useNavigationWithLoading();
  const pathname = usePathname();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const {
    selector: { isAuthenticated, loading },
    dispatch,
  } = useRedux((state: RootState) => state.user);
  const { getDir, t } = useLanguage();
  useCustomTheme();

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = Cookies.get("refresh_token");

      console.log("Checking refresh token : ", refreshToken);

      if (!refreshToken) {
        replaceWithLoading("/auth");
        return;
      }
      try {
        await dispatch(refreshAuthToken()).unwrap();
      } catch (error) {
        console.log("Error refreshing token: " + error);
        Cookies.remove("refresh_token");
        Cookies.remove("access_token");
        navigateWithLoading("/auth");
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const storedTab = localStorage.getItem("selectedTab");
      if (storedTab && storedTab !== pathname) {
        replaceWithLoading(storedTab);
      }
    }
  }, [isAuthenticated]);

  if (loading) return <PageSpinner title={t("Loading ...")} />;
  return (
    <div
      className={`min-h-[100dvh] w-full  ${
        // pathname == "/home"
        //   ? isLightMode
        //     ? "bg-light-droppable-fade"
        //     : "bg-radial-light"
        //   :
        "bg-main"
      }`}
    >
      {navigating && <PageSpinner />}

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
          className={`transition-all bg-main mt-[49px] duration-300 py-5  w-full`}
        >
          <Suspense fallback={<PageSpinner />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default Content;
