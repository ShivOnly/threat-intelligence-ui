import React, { useMemo, useState } from "react";
import { IOC } from "../store/useIocStore";

interface IOCListProps {
  iocs: IOC[];
}

const severityColor: Record<IOC["severity"], string> = {
  Critical: "bg-red-600 text-white font-weight-700",
  High: "bg-red-400 text-white font-weight-700",
  Medium: "bg-yellow-400 text-black font-weight-700",
  Low: "bg-green-400 text-blue font-weight-700",
};

const IOCList: React.FC<IOCListProps> = ({ iocs }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof IOC; direction: "asc" | "desc" } | null>(null);

  const sortedIOCs = useMemo(() => {
    if (!iocs) return [];
    let sortable = [...iocs];
    if (sortConfig) {
      sortable.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [iocs, sortConfig]);

  const requestSort = (key: keyof IOC) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-blue-50 dark:bg-gray-900 rounded-3xl shadow-inner p-4 mt-6 backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-3 text-blue-900 dark:text-white">IOC List</h2>
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-blue-200 text-blue-900 dark:bg-gray-800 dark:text-white">
            {["value", "type", "source", "severity", "timestamp"].map((col) => (
              <th
                key={col}
                className="px-4 py-2 text-left cursor-pointer select-none hover:bg-blue-300 dark:hover:bg-gray-700 transition-colors"
                onClick={() => requestSort(col as keyof IOC)}
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}
                {sortConfig?.key === col ? (sortConfig.direction === "asc" ? " ↑" : " ↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedIOCs.map((ioc, index) => (
            <tr
              key={ioc.id ?? index} // Ensure every row has a unique key
              className="hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
            >
              <td className="px-4 py-2 font-mono">{ioc.value}</td>
              <td className="px-4 py-2">{ioc.type}</td>
              <td className="px-4 py-2">{ioc.source}</td>
              <td className={`px-4 py-2 font-semibold rounded ${severityColor[ioc.severity]}`}>{ioc.severity}</td>
              <td className="px-4 py-2">{new Date(ioc.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IOCList;
