"use client";

import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  duration?: number; // seconds
}

export default function LoadingSkeleton({ duration = 1.5 }: LoadingSkeletonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: duration, repeat: Infinity }}
      />
    </div>
  );
}
