"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

interface ChartProps {
  darkMode?: boolean;
}

const Charts: React.FC<ChartProps> = ({ darkMode }) => {
  // Each category has 3 bars for the sources
  const data = [
    { name: "IPs", blocklist: 12, spamhaus: 9, digitalside: 1 },
    { name: "Subnets", blocklist: 8, spamhaus: 7, digitalside: 5 },
    { name: "URLs", blocklist: 15, spamhaus: 11, digitalside: 9 },
  ];

  const colors = {
    blocklist: "#ef4444", // Red
    spamhaus: "#fbbf24", // Yellow
    digitalside: "#22c55e", // Green
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        {/* ✅ No background grid lines */}
        <CartesianGrid vertical={false} horizontal={false} />

        {/* X Axis */}
        <XAxis
          dataKey="name"
          stroke={darkMode ? "#fff" : "#1e3a8a"}
          axisLine={{ stroke: darkMode ? "#fff" : "#1e3a8a", strokeWidth: 1.5 }}
          tickLine={{ stroke: darkMode ? "#fff" : "#1e3a8a" }}
          tick={{ fontSize: 14, fontWeight: 600 }}
        />

        {/* Y Axis */}
        <YAxis
          stroke={darkMode ? "#fff" : "#1e3a8a"}
          axisLine={{ stroke: darkMode ? "#fff" : "#1e3a8a", strokeWidth: 1.5 }}
          tickLine={{ stroke: darkMode ? "#fff" : "#1e3a8a" }}
          tick={{ fontSize: 14, fontWeight: 600 }}
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#fff",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            color: darkMode ? "#fff" : "#000",
          }}
        />

        <Legend />

        {/* Bars */}
        <Bar
          dataKey="blocklist"
          fill={colors.blocklist}
          radius={[10, 10, 0, 0]}
          barSize={30}
        />
        <Bar
          dataKey="spamhaus"
          fill={colors.spamhaus}
          radius={[10, 10, 0, 0]}
          barSize={30}
        />
        <Bar
          dataKey="digitalside"
          fill={colors.digitalside}
          radius={[10, 10, 0, 0]}
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Charts;
