// components/layouts/Content.tsx
import useCustomTheme from "@/hooks/useCustomTheme";
import useLanguage from "@/hooks/useLanguage";
import { useRedux } from "@/hooks/useRedux";
import { RootState } from "@/state/store";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import NewHeader from "../common/atoms/NewHeader";
import PageSpinner from "../common/atoms/ui/PageSpinner";
import Sidebar from "../common/molcules/Sidebar/Sidebar";
import PullToRefreshWrapper from "../common/molcules/ui/PullToRefreshWrapper";

const Content = ({ children }: { children: ReactNode }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  // const { loading, isAuthenticated } = useAuth(); // not used temporarily for testing the refreshtoken validation
  const {
    selector: { loading },
  } = useRedux((state: RootState) => state.user);

  const { getDir, t } = useLanguage();
  const pathname = usePathname();
  useCustomTheme();

  if (loading) return <PageSpinner title={t("Loading")} />;
  return (
    <div className="min-h-[100dvh] w-full bg-main">
      <div className="flex h-full w-full">
        {
          // isAuthenticated &&
          pathname != "/auth" && (
            <>
              <PullToRefreshWrapper>
                <NewHeader setIsExpanded={setIsSidebarExpanded} />
              </PullToRefreshWrapper>
              <Sidebar
                isExpanded={isSidebarExpanded}
                setIsExpanded={setIsSidebarExpanded}
              />
            </>
          )
        }
        <div
          dir={getDir()}
          className="transition-all bg-main mt-[49px] duration-300 py-5 w-full"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Content;
