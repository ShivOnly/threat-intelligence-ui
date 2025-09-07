"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, HTMLMotionProps, AnimatePresence , MotionProps } from "framer-motion";
import SummaryCard from "../components/Summary";
import IOCList from "../components/IOCList";
import Charts from "../components/Chart";
import RadialBarChartIOC from "../components/RadialBarChartIOC";
import { useIocStore, IOC } from "../store/useIocStore";
import RefreshSVG from "../assets/refresh.png";


// --- Interfaces ---
interface Alert {
  message: string;
  severity: "Critical" | "High" | "Medium" | "Low";
}

// --- Animations ---
const hoverScaleButton: MotionProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

const hoverScaleLink: MotionProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

export default function Page() {
  const { iocs, fetchIOCs, refreshInterval, darkMode, toggleDarkMode } =
    useIocStore();

  // --- States ---
  const [filterSource, setFilterSource] = useState<IOC["source"] | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof IOC>("timestamp");
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const itemsPerPage = 10;

  // --- Alerts ---
  const alerts: Alert[] = [
    { message: "Critical IOC detected: tutududu.dns", severity: "Critical" },
    { message: "High IOC detected: Verstappen.racing", severity: "High" },
    { message: "Medium IOC detected: F1racing.net", severity: "Medium" },
    { message: "Low IOC detected: freeF1race.local", severity: "Low" },
    { message: "Critical IOC detected: totalsportek.net", severity: "Critical" },
    { message: "Low IOC detected: wearechecking.local", severity: "Low" },
  ];

  const [alertsQueue, setAlertsQueue] = useState<Alert[]>(alerts);
  const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    if (!alertsQueue.length) return;
    const timer = setInterval(() => {
      setVisibleAlerts([alertsQueue[0]]);
      setAlertsQueue((prev) => prev.slice(1));
      setTimeout(() => setVisibleAlerts([]), 1000);
    }, 1200);
    return () => clearInterval(timer);
  }, [alertsQueue]);

  // --- Auto refresh IOCs ---
  useEffect(() => {
    fetchIOCs();
    const interval = setInterval(fetchIOCs, refreshInterval * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchIOCs, refreshInterval]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      fetchIOCs();
      setIsRefreshing(false);
    }, 2100);
  };

  // --- Filtered + Sorted IOCs ---
  const filteredIOCs: IOC[] = useMemo(() => {
    let result = [...iocs];

    if (filterSource && filterSource !== "All") {
      result = result.filter(
        (ioc) => ioc.source.toLowerCase() === filterSource.toLowerCase()
      );
    }

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

    return result.sort((a, b) => {
      if (sortKey === "timestamp") {
        return sortAsc
          ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        const valA = String(a.value).toLowerCase();
        const valB = String(b.value).toLowerCase();
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
    });
  }, [iocs, filterSource, searchQuery, sortKey, sortAsc]);

  // --- CSV Export ---
  const handleExport = () => {
    const headers = ["Value", "Type", "Source", "Severity", "Timestamp"];
    const rows = filteredIOCs.map((ioc) => [
      ioc.value,
      ioc.type,
      ioc.source,
      ioc.severity,
      new Date(ioc.timestamp).toLocaleString(),
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ioc_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(filteredIOCs.length / itemsPerPage);
  const paginatedIOCs = filteredIOCs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Summary ---
  const summary = useMemo(() => {
    const totalIOCs = iocs.length;
    const critical = iocs.filter((ioc) => ioc.severity === "Critical").length;
    const high = iocs.filter((ioc) => ioc.severity === "High").length;
    const medium = iocs.filter((ioc) => ioc.severity === "Medium").length;
    const low = iocs.filter((ioc) => ioc.severity === "Low").length;
    return { totalIOCs, critical, high, medium, low };
  }, [iocs]);

  const summaryColors: ("blue" | "red" | "yellow" | "green" | "orange")[] = [
  "blue",
  "red",
  "orange",
  "yellow",
  "green",
];


  // --- Radial Chart Data ---
  const radialChartData = useMemo(
    () => [
      { name: "Critical", value: summary.critical || 1, fill: "#ef4444" },
      { name: "High", value: summary.high || 1, fill: "#f97316" },
      { name: "Medium", value: summary.medium || 1, fill: "#facc15" },
      { name: "Low", value: summary.low || 1, fill: "#22c55e" },
    ],
    [summary]
  );

  const sources = ["All", "Blocklist.DE", "Spamhaus", "DigitalSide"];
  const colors = ["bg-blue-400", "bg-purple-400", "bg-green-400", "bg-pink-400"];

  return (
    <div className={`${darkMode ? "dark" : ""} relative min-h-screen`}>
      {/* Overlay Refresh */}
      {isRefreshing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/70 dark:bg-gray-900/70">
          <motion.img
            src={RefreshSVG.src}
            alt="Refreshing"
            className="w-24 h-24"
            animate={{
              x: [0, 40, 0, -40, 0],
              y: [0, -20, 0, 20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* Header */}
<header
  className="fixed top-0 left-0 w-full h-14 sm:h-16 
  backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 
  border-b border-white/20 dark:border-gray-700/40
  z-50 flex justify-between items-center px-2 sm:px-4 md:px-6 lg:px-8"
>
  {/* Left: Dark Mode Toggle */}
  <div className="flex items-center gap-1 sm:gap-3">
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
        className="sr-only peer"
      />
      <div className="w-10 h-5 sm:w-12 sm:h-6 bg-gray-300/40 dark:bg-gray-700/40 rounded-full relative transition-colors duration-300 peer-focus:ring-2 peer-focus:ring-blue-500 backdrop-blur-sm">
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full shadow transform transition-transform duration-300 ${
            darkMode ? "translate-x-5 sm:translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  </div>

  {/* Center: Logo + Title */}
  <div className="flex items-center gap-1 sm:gap-3">
    <img
      src="/logo.png"
      alt="Logo"
      className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12"
    />
    <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-blue-900 dark:text-white whitespace-nowrap">
      Threat Intelligence Dashboard
    </h1>
  </div>

  {/* Right: Buttons */}
  <div className="flex items-center gap-1 sm:gap-2">
    <motion.div {...hoverScaleLink}>
      <Link
        href="/config"
        className="px-2 py-1 rounded-full bg-white/40 dark:bg-gray-700/40 text-gray-900 dark:text-white shadow-sm border border-white/20 text-[10px] sm:text-xs md:text-sm lg:text-base flex items-center justify-center"
      >
        <span className="sm:hidden">⚙</span>
        <span className="hidden sm:inline">Config</span>
      </Link>
    </motion.div>

    <motion.button
      {...hoverScaleButton}
      onClick={handleRefresh}
      className="px-2 py-1 rounded-full bg-blue-500/90 text-white shadow-md text-[10px] sm:text-xs md:text-sm lg:text-base flex items-center justify-center"
    >
      <span className="sm:hidden">⟳</span>
      <span className="hidden sm:inline">Refresh</span>
    </motion.button>

    <motion.button
      {...hoverScaleButton}
      onClick={handleExport}
      className="px-2 py-1 rounded-full bg-green-500/90 text-white shadow-md text-[10px] sm:text-xs md:text-sm lg:text-base flex items-center justify-center"
    >
      <span className="sm:hidden">⬇</span>
      <span className="hidden sm:inline">Export CSV</span>
    </motion.button>
  </div>
</header>

      {/* Side Menu */}
      <div
        className="fixed top-16 left-0 h-[calc(100%-64px)] group z-40"
        style={{ width: "8px" }}
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <div
          className={`h-full w-56 transition-transform duration-300 shadow-lg flex flex-col
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"}`}
        >
          {/* Profile */}
          <div
            className={`flex items-center gap-3 p-4 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <img
              src="/pfp.jpeg"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Shiv Thapa</p>
              <p className="text-xs opacity-70">USER</p>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col p-4 space-y-3">
            {[
              "👤 Profile",
              "⚙ Settings",
              "📋 My Queries",
              "✅ Resolved",
              "🛠 Management",
              "📊 Dashboard",
              "📁 Files",
              "💬 Messages",
              "🔔 Notifications",
              "📅 Calendar",
              "🚪 Logout",
            ].map((item, idx) => (
              <button
                key={idx}
                className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`pt-20 px-6 transition-all duration-300 ${
          menuOpen ? "ml-56" : "ml-0"
        } ${
          darkMode
            ? "bg-gray-800 text-gray-100"
            : "bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 text-blue-900"
        }`}
      >
        {/* Summary Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {["Total IOCs", "Critical", "High", "Medium", "Low"].map(
            (title, idx) => {
              const values = [
                summary.totalIOCs,
                summary.critical,
                summary.high,
                summary.medium,
                summary.low,
              ];
              return (
                <motion.div key={title} {...hoverScaleButton}>
                  <SummaryCard
                    title={title}
                    value={values[idx]}
                    color={summaryColors[idx]}
                  />
                </motion.div>
              );
            }
          )}
        </motion.div>

        {/* Alerts */}
        <div className="space-y-2 mb-4">
          <AnimatePresence>
            {visibleAlerts.map((alert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`px-4 py-2 rounded shadow-sm text-sm ${
                  alert.severity === "Critical"
                    ? "bg-red-500 text-white"
                    : alert.severity === "High"
                    ? "bg-orange-500 text-white"
                    : alert.severity === "Medium"
                    ? "bg-yellow-500 text-black"
                    : "bg-green-500 text-white"
                }`}
              >
                {alert.message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row gap-2 mb-4 items-center">
          <input
            type="text"
            placeholder="Search IOCs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as keyof IOC)}
            className="p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          >
            <option value="value">Value</option>
            <option value="type">Type</option>
            <option value="source">Source</option>
            <option value="severity">Severity</option>
            <option value="timestamp">Date</option>
          </select>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400"
          >
            {sortAsc ? "Asc" : "Desc"}
          </button>
        </div>

        {/* Source Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {sources.map((source, idx) => (
            <motion.button
              key={source}
              {...hoverScaleButton}
              onClick={() => setFilterSource(source)}
              className={`px-4 py-2 rounded-full font-semibold text-white ${
                colors[idx % colors.length]
              }`}
            >
              {source}
            </motion.button>
          ))}
        </div>

        {/* IOC List */}
        <IOCList iocs={paginatedIOCs} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4 mb-6">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <motion.button
                key={idx}
                {...hoverScaleButton}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded-full font-semibold ${
                  currentPage === idx + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {idx + 1}
              </motion.button>
            ))}
          </div>
        )}

        {/* Charts */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <motion.div
    {...hoverScaleButton}
    className="bg-white/60 dark:bg-gray-700/60 rounded-2xl shadow-md p-4"
  >
    <Charts darkMode={darkMode} />
  </motion.div>

  <motion.div
    {...hoverScaleButton}
    className="bg-white/60 dark:bg-gray-700/60 rounded-2xl shadow-md p-4"
  >
    <RadialBarChartIOC
      data={radialChartData}
      ips={iocs.filter((i) => i.type.toLowerCase() === "ip").length}
      subnets={iocs.filter((i) => i.type.toLowerCase() === "subnet").length}
      urls={iocs.filter((i) => i.type.toLowerCase() === "url").length}
      darkMode={darkMode}
    />
  </motion.div>
</div>


        {/* Latest Queries & Fixes */}
        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">Latest Queries & Fixes</h2>
          {[
            {
              user: "BOMB_EATER",
              query: "IOC list not refreshing properly.",
              fix: "Admin: Fixed refresh interval bug.",
              img: "/pfp1.jpeg",
            },
            {
              user: "UNIVERSE_DESTROYER",
              query: "Export CSV missing timestamps.",
              fix: "Admin: Patched export function to include timestamps.",
              img: "/pfp2.jpeg",
            },
            {
              user: "LITTLE_FRUSTRATED_GUY",
              query: "Dark mode toggle resets on reload.",
              fix: "Admin: Implemented persistent dark mode.",
              img: "/pfp3.jpeg",
            },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow">
              <div className="flex items-center space-x-2">
                <img
                  src={item.img}
                  alt={item.user}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="font-semibold">{item.user}</p>
              </div>
              <p className="mt-2 text-sm">❓ {item.query}</p>
              <div className="flex items-center space-x-2 mt-2">
                <img
                  src="/admin.jpeg"
                  alt="Admin"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  ✔ {item.fix}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Query */}
        <div className="mt-8 p-4 bg-gray-200 dark:bg-gray-800 rounded-xl shadow">
          <h3 className="font-bold mb-2">Submit a Query</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter your query..."
              className="flex-1 p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500">
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
