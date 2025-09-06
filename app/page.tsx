"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SummaryCard from "../components/Summary";
import IOCList from "../components/IOCList";
import Charts from "../components/Chart";
import RadialBarChartIOC from "../components/RadialBarChartIOC";
import { useIocStore, IOC } from "../store/useIocStore";
import RefreshSVG from "../assets/refresh.png";
import Image from "next/image";

export default function Page() {
  const { iocs, fetchIOCs, refreshInterval } = useIocStore();
  const [filterSource, setFilterSource] = useState<IOC["source"] | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof IOC>("timestamp");
  const [sortAsc, setSortAsc] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { darkMode, toggleDarkMode } = useIocStore();


  // Auto refresh with interval from config
  useEffect(() => {
    fetchIOCs();
    const interval = setInterval(() => {
      fetchIOCs();
    }, refreshInterval * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval, fetchIOCs]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      fetchIOCs();
      setIsRefreshing(false);
    }, 2100);
  };

  const filteredIOCs: IOC[] = useMemo(() => {
    let result = [...iocs];

    // Source filter
    if (filterSource && filterSource !== "All") {
      result = result.filter(
        (ioc) => ioc.source.toLowerCase() === filterSource.toLowerCase()
      );
    }

    // Multi-field search
    if (searchQuery.trim() !== "") {
      const term = searchQuery.toLowerCase();
      result = result.filter(
        (ioc) =>
          ioc.value.toLowerCase().includes(term) ||
          ioc.type.toLowerCase().includes(term) ||
          ioc.source.toLowerCase().includes(term) ||
          ioc.severity.toLowerCase().includes(term) ||
          new Date(ioc.timestamp).toLocaleDateString().includes(term)
      );
    }

    // Sorting
    return result.sort((a, b) => {
      if (sortKey === "timestamp") {
        return sortAsc
          ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        const valA = String(a[sortKey]).toLowerCase();
        const valB = String(b[sortKey]).toLowerCase();
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
    });
  }, [iocs, filterSource, sortKey, sortAsc, searchQuery]);

  const totalPages = Math.ceil(filteredIOCs.length / itemsPerPage);
  const paginatedIOCs = filteredIOCs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const summary = useMemo(() => {
    const totalIOCs = iocs.length;
    const critical = iocs.filter((ioc) => ioc.severity === "Critical").length;
    const high = iocs.filter((ioc) => ioc.severity === "High").length;
    const medium = iocs.filter((ioc) => ioc.severity === "Medium").length;
    const low = iocs.filter((ioc) => ioc.severity === "Low").length;
    const ipCount = iocs.filter((ioc) => ioc.type === "ip").length;
    const subnetCount = iocs.filter((ioc) => ioc.type === "subnet").length;
    const urlCount = iocs.filter((ioc) => ioc.type === "url").length;
    return { totalIOCs, critical, high, medium, low, ipCount, subnetCount, urlCount };
  }, [iocs]);

  const radialChartData = useMemo(
    () => [
      { name: "Critical", value: summary.critical || 1, fill: "#ef4444" },
      { name: "High", value: summary.high || 1, fill: "#f97316" },
      { name: "Medium", value: summary.medium || 1, fill: "#facc15" },
      { name: "Low", value: summary.low || 1, fill: "#22c55e" },
    ],
    [summary]
  );

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredIOCs.forEach((ioc) => {
      const date = new Date(ioc.timestamp).toLocaleDateString();
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, value]) => ({ name: date, value, fill: "#3b82f6" }));
  }, [filteredIOCs]);

  const sources = ["All", "Blocklist.DE", "Spamhaus", "DigitalSide"];
  const colors = ["bg-blue-400", "bg-purple-400", "bg-green-400", "bg-pink-400"];

  return (
    <div className={`${darkMode ? "dark" : ""} relative min-h-screen font-sans`}>
      {isRefreshing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/70 dark:bg-gray-900/70">
          <img src={RefreshSVG.src} alt="Refreshing" className="w-24 h-24 animate-infinity" />
        </div>
      )}

      {/* Header */}
<header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 flex justify-between items-center p-4 md:p-6 shadow-md">
  {/* Dark Mode Toggle */}
  <div className="flex items-center gap-2">
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
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

  {/* Logo + Website Title */}
  <div className="flex items-center gap-3">
  <img src="/logo.png" alt="Logo" className="w-12 h-12" />

  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-blue-900 dark:text-white select-none">
    Threat Intelligence Dashboard
  </h1>
</div>


  {/* Config + Refresh Buttons */}
  <nav className="flex items-center gap-3">
    <Link
      href="/config"
      className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm hover:brightness-105 transition-all duration-200 flex items-center justify-center"
    >
      Config
    </Link>

    <button
      onClick={handleRefresh}
      className="px-4 py-2 rounded-full bg-blue-500 text-white shadow-sm hover:bg-blue-600 transition-all duration-200 flex items-center justify-center"
    >
      Refresh
    </button>
  </nav>
</header>


      <div className={`pt-28 px-6 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 text-blue-900"}`}>
        
        

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6"
        >
          <SummaryCard title="Total IOCs" value={summary.totalIOCs} color="blue" />
          <SummaryCard title="Critical" value={summary.critical} color="red" />
          <SummaryCard title="High" value={summary.high} color="red" />
          <SummaryCard title="Medium" value={summary.medium} color="yellow" />
          <SummaryCard title="Low" value={summary.low} color="green" />
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {sources.map((source, idx) => (
            <motion.button
              key={source}
              onClick={() => setFilterSource(source)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 text-white ${
                filterSource === source ? "ring-2 ring-offset-2 ring-blue-500" : ""
              } ${colors[idx % colors.length]} hover:brightness-110`}
            >
              {source.toUpperCase()}
            </motion.button>
          ))}
        </div>

        {/* Sorting */}
        <div className="flex gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-full font-semibold ${sortKey === "timestamp" && !sortAsc ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}
            onClick={() => { setSortKey("timestamp"); setSortAsc(false); }}
          >
            Latest First
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold ${sortKey === "value" && sortAsc ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}
            onClick={() => { setSortKey("value"); setSortAsc(true); }}
          >
            Alphabetical
          </button>
        </div>

        {/* IOC List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* iOS-style Search Bar */}
        <div className="mb-4 relative w-full md:w-1/3">
          <input
            type="text"
            placeholder=" Search by value, type, source, severity, timestamp..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
          />
          <span className="absolute left-4 top-3 text-gray-400 pointer-events-none">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
            >
              ✕
            </button>
          )}
        </div>

          <IOCList iocs={paginatedIOCs} />
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4 mb-6">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded-full font-semibold ${currentPage === idx + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-xl rounded-2xl shadow-md p-4"
          >
            <Charts darkMode={darkMode}/>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-xl rounded-2xl shadow-md p-4"
          >
            <RadialBarChartIOC
              data={radialChartData}
              height={320}
              ips={summary.ipCount}
              subnets={summary.subnetCount}
              urls={summary.urlCount}
              darkMode={darkMode}
            />
          </motion.div>
        </div>
      </div>

      <style>
        {`
          @keyframes infinity {
            0% { transform: translate(0, 0); }
            25% { transform: translate(50px, 30px); }
            50% { transform: translate(0, 60px); }
            75% { transform: translate(-50px, 30px); }
            100% { transform: translate(0, 0); }
          }
          .animate-infinity {
            animation: infinity 2.1s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
