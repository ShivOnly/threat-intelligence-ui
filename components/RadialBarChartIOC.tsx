"use client";

import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
  fill: string;
}

interface RadialBarChartIOCProps {
  data: ChartData[];
  ips: number;
  subnets: number;
  urls: number;
  darkMode?: boolean;
}

const RadialBarChartIOC: React.FC<RadialBarChartIOCProps> = ({
  data,
  ips,
  subnets,
  urls,
  darkMode = false,
}) => {
  const widgetItems = [
    { label: "IPs", value: ips, color: "blue" },
    { label: "Subnets", value: subnets, color: "green" },
    { label: "URLs", value: urls, color: "purple" },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500 text-white font-bold",
    green: "bg-green-400 text-white font-bold",
    purple: "bg-purple-500 text-white font-bold",
  };

  return (
    <div
      className={`w-full rounded-2xl shadow-lg p-4 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 text-gray-900"
      }`}
    >
      <h2 className="text-lg font-semibold mb-3">IOC Distribution</h2>

      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Chart */}
        <div className="col-span-2 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              innerRadius="20%"
              outerRadius="100%"
              data={data.map((d) => ({ ...d, value: d.value || 1 }))}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar dataKey="value" cornerRadius={8} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#1f2937" : "#fff",
                  border: darkMode ? "1px solid #374151" : "1px solid #ddd",
                  color: darkMode ? "#fff" : "#000",
                }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Widgets */}
        <div className="col-span-1 space-y-2">
          {widgetItems.map((item) => (
            <div
              key={item.label}
              className={`p-4 rounded-2xl shadow-md text-center ${colorMap[item.color]}`}
            >
              <p className="text-sm">{item.label}</p>
              <h2 className="text-xl font-bold">{item.value}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        {data.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-2 p-2 rounded-md shadow-sm ${
              darkMode ? "bg-gray-700/40 text-white" : "bg-white/30 text-gray-700"
            }`}
          >
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.fill }}
            ></span>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadialBarChartIOC;
