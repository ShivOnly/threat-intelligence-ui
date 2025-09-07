"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Alert = {
  message: string;
  severity: "Critical" | "High" | "Medium" | "Low";
};

interface AlertsProps {
  alerts: Alert[];
}

export default function Alerts({ alerts }: AlertsProps) {
  const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>(alerts);

  // Automatically remove alerts one by one every 1.5 seconds
  useEffect(() => {
    if (visibleAlerts.length === 0) return;

    const timer = setTimeout(() => {
      setVisibleAlerts((prev) => prev.slice(1));
    }, 1500);

    return () => clearTimeout(timer);
  }, [visibleAlerts]);

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {visibleAlerts.map((alert, idx) => {
          let bgColor = "bg-gray-300 text-gray-900";
          if (alert.severity === "Critical") bgColor = "bg-red-600 text-white";
          else if (alert.severity === "High") bgColor = "bg-orange-500 text-white";
          else if (alert.severity === "Medium") bgColor = "bg-yellow-400 text-black";
          else if (alert.severity === "Low") bgColor = "bg-green-500 text-white";

          return (
            <motion.div
              key={alert.message + idx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className={`px-4 py-2 rounded-lg shadow-md ${bgColor}`}
            >
              {alert.message}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
