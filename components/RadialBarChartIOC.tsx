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
  height?: number;
  ips: number;
  subnets: number;
  urls: number;
  darkMode: boolean; // new prop
}

const RadialBarChartIOC: React.FC<RadialBarChartIOCProps> = ({
  data,
  height = 320,
  ips,
  subnets,
  urls,
  darkMode,
}) => {
  const widgetItems = [
    { label: "IPs", value: ips, color: "text-blue-500" },
    { label: "Subnets", value: subnets, color: "text-green-500" },
    { label: "URLs", value: urls, color: "text-purple-500" },
  ];

  // Ensure no value is zero for visibility
  const chartData = data.map((d) => ({ ...d, value: d.value || 1 }));

  return (
    <div
      className={`w-full rounded-2xl shadow-lg p-4 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 text-gray-900"
      }`}
    >
      <h2 className="text-lg font-semibold mb-3">{`IOC Distribution`}</h2>

      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="col-span-2 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={height}>
            <RadialBarChart
              innerRadius="20%"
              outerRadius="100%"
              data={chartData}
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

        <div className="col-span-1 space-y-2">
          {widgetItems.map((item) => (
            <div
              key={item.label}
              className={`flex justify-between items-center p-3 rounded-lg backdrop-blur-md shadow-sm ${
                darkMode ? "bg-gray-700/40 text-white" : "bg-white/30 text-gray-700"
              }`}
            >
              <span className="text-sm font-medium">{item.label}</span>
              <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-4 flex-wrap">
        {chartData.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-2 p-2 rounded-md shadow-sm backdrop-blur-md ${
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
