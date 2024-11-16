// src/app/layout.tsx
"use client";

import LayoutProviders from "@/components/Providers/LayoutProviders";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Company Management System</title>
        <link rel="icon" href="" />
      </head>
      <body className="bg-main">
        <LayoutProviders>{children}</LayoutProviders>
      </body>
    </html>
  );
}
