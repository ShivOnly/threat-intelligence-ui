"use client";

import { useState, useEffect } from "react";
import { useIocStore } from "../../store/useIocStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ConfigPage() {
  const { refreshInterval, setRefreshInterval } = useIocStore();
  const [interval, setInterval] = useState(refreshInterval);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setInterval(refreshInterval); // sync with store if changed elsewhere
  }, [refreshInterval]);

  const handleSave = () => {
    if (interval < 1) {
      alert("Refresh interval must be at least 1 minute.");
      return;
    }
    setRefreshInterval(interval);
    alert(`✅ Refresh interval set to ${interval} minute(s)`);
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-6`}>
      
      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="sr-only peer"
          />
          <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full border border-gray-400 dark:border-gray-500 relative transition-colors duration-300 peer-focus:ring-2 peer-focus:ring-blue-500">
            <div
              className={`absolute top-1 left-1 w-6 h-6 bg-blue-500 rounded-full border border-gray-300 dark:border-gray-600 shadow transform transition-transform duration-300
              ${darkMode ? "translate-x-8" : "translate-x-0"}`}
            ></div>
            <span className={`absolute left-2 top-1.5 text-yellow-400 text-sm ${darkMode ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
              ☀️
            </span>
            <span className={`absolute right-2 top-1.5 text-blue-500 text-sm ${darkMode ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
              🌙
            </span>
          </div>
        </label>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg"
      >
        <div className="flex justify-between items-center mb-6">
          {/* Back Button */}
          <button
            onClick={() => router.push("/")}
className={`px-4 py-2 rounded-lg font-semibold border shadow-sm transition-all duration-200
    ${darkMode ? "bg-white text-gray-900 hover:brightness-95" : "bg-gray-800 text-white hover:brightness-110"}
  `}          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold text-center text-blue-900 dark:text-white flex-1">
            ⚙️ Configuration
          </h1>

          <div className="w-20"></div> {/* placeholder for alignment */}
        </div>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            Refresh Interval (minutes)
          </span>
          <input
            type="number"
            min={1}
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </label>

        <button
          onClick={handleSave}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Save
        </button>
      </motion.div>
    </div>
  );
}
