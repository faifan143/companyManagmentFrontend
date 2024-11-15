// src/app/layout.tsx
"use client";

import PageSpinner from "@/components/common/atoms/PageSpinner";
import Sidebar from "@/components/common/molcules/Sidebar/Sidebar";
import LayoutProviders from "@/components/Providers/LayoutProviders";
import useLanguage from "@/hooks/useLanguage";
import Cookies from "js-cookie";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import "./globals.css";
import NewHeader from "@/components/common/NewHeader";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { getDir } = useLanguage();
  useEffect(() => {
    const checkAuthState = () => {
      const token = Cookies.get("access_token");
      setIsAuthenticated(!!token);
    };

    checkAuthState();

    const handleCookieChange = () => {
      checkAuthState();
    };

    window.addEventListener("focus", handleCookieChange);

    return () => {
      window.removeEventListener("focus", handleCookieChange);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isAuthenticated && pathname != "/auth") {
      redirect("/auth");
    }
  }, [isAuthenticated, pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      const storedTab = localStorage.getItem("selectedTab");
      if (storedTab && storedTab !== pathname) {
        router.replace(storedTab);
      }
    }
  }, [isAuthenticated]);

  return (
    <html lang="en">
      <head>
        <title>Company Management System</title>
        <link rel="icon" href="" />
      </head>
      <body
        className={`min-h-[100dvh] w-full  ${
          pathname == "/home" ? "bg-radial-light" : "bg-main"
        }`}
      >
        <div className="flex h-full w-full">
          <LayoutProviders>
            {isAuthenticated && (
              <NewHeader setIsExpanded={setIsSidebarExpanded} />
            )}
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
          </LayoutProviders>
        </div>
      </body>
    </html>
  );
}
