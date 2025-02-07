// components/layouts/Content.tsx
import { useAuth } from "@/hooks/useAuth";
import useCustomTheme from "@/hooks/useCustomTheme";
import useLanguage from "@/hooks/useLanguage";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import NewHeader from "../common/atoms/NewHeader";
import PageSpinner from "../common/atoms/PageSpinner";
import Sidebar from "../common/molcules/Sidebar/Sidebar";

const Content = ({ children }: { children: ReactNode }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const { getDir, t } = useLanguage();
  const pathname = usePathname();
  useCustomTheme();

  if (loading) return <PageSpinner title={t("Loading")} />;
  return (
    <div className="min-h-[100dvh] w-full bg-main">
      <div className="flex h-full w-full">
        {isAuthenticated && pathname != "/auth" && (
          <>
            <NewHeader setIsExpanded={setIsSidebarExpanded} />
            <Sidebar
              isExpanded={isSidebarExpanded}
              setIsExpanded={setIsSidebarExpanded}
            />
          </>
        )}
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
