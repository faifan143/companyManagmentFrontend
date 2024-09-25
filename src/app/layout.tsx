import type { Metadata } from "next";
import "./globals.css";
import I18nProvider from "@/components/Providers/I18nProvider";
import ReduxProvider from "@/components/Providers/ReduxProvider";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task Manger app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <I18nProvider>{children}</I18nProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
