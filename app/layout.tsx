"use client"; // Must be at the top

import "./globals.css";
import { ReactNode, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { FiMenu } from "react-icons/fi";
import { useIocStore } from "../store/useIocStore";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [darkMode, setDarkMode] = useState(false);
  const { fetchIOCs } = useIocStore(); // Access fetch function here

  return (
    <html lang="en">
      <body
        className={`min-h-screen transition-colors ${
          darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-blue-900"
        }`}
      >


        {/* Main Content */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
