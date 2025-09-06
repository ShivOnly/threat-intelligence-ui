"use client";

import React from "react";

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: (value: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(!darkMode)}
      className={`relative w-14 h-8 rounded-full transition-colors focus:outline-none ${
        darkMode ? "bg-gray-700" : "bg-blue-400"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full shadow-md transform transition-transform ${
          darkMode ? "translate-x-6" : "translate-x-0"
        }`}
      ></span>
    </button>
  );
};

export default ThemeToggle;
