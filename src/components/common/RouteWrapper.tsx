"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import PageSpinner from "./atoms/PageSpinner";

interface RouteWrapperProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({
  href,
  children,
  onClick,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleRoute = (e: React.MouseEvent) => {
    e.preventDefault();
    if (href != pathname) setIsLoading(true);
    if (onClick) onClick();
    router.push(href);
  };

  useEffect(() => {
    if (pathname) {
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <>
      {isLoading && <PageSpinner />}
      <Link href={href} className={className} onClick={handleRoute}>
        {children}
      </Link>
    </>
  );
};

export default RouteWrapper;
