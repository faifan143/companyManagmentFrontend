// src/app/layout.tsx
"use client";

import Header from "@/components/common/molcules/Header";
import Sidebar from "@/components/common/molcules/Sidebar/Sidebar";
import LayoutProviders from "@/components/Providers/LayoutProviders";
import useLanguage from "@/hooks/useLanguage";
import Cookies from "js-cookie";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import "./globals.css";
import PageSpinner from "@/components/common/atoms/PageSpinner";

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
    if (!isAuthenticated && pathname !== "/") {
      redirect("/");
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
      <body className="h-[100dvh] w-full">
        <div className="flex h-full w-full">
          <LayoutProviders>
            {isAuthenticated && (
              <Sidebar
                isExpanded={isSidebarExpanded}
                setIsExpanded={setIsSidebarExpanded}
              />
            )}

            <div
              dir={getDir()}
              className={`transition-all duration-300 py-5 ${
                isSidebarExpanded ? "ml-[400px]" : "ml-[100px]"
              } w-full`}
            >
              {isAuthenticated && <Header />}
              <Suspense fallback={<PageSpinner />}>{children}</Suspense>
            </div>
          </LayoutProviders>
        </div>
      </body>
    </html>
  );
}
