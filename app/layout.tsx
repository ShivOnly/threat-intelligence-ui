"use client";

import "./globals.css";
import { ReactNode, useEffect } from "react";
import { useIocStore } from "../store/useIocStore";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { darkMode, fetchIOCs } = useIocStore(); // use store darkMode

  // Fetch IOCs once after component mounts
  useEffect(() => {
    fetchIOCs?.();
  }, [fetchIOCs]);

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body
        className={`min-h-screen transition-colors ${
          darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-blue-900"
        }`}
      >
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
