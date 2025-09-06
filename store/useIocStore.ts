import { create } from "zustand";

export interface IOC {
  id: number;
  value: string;
  type: "ip" | "subnet" | "url";
  source: string;
  timestamp: string;
  severity: "Critical" | "High" | "Medium" | "Low";
}

interface IocState {
  iocs: IOC[];
  loading: boolean;
  summary: {
    totalIOCs: number;
    totalIPs: number;
    totalSubnets: number;
    totalURLs: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  refreshInterval: number;
  setRefreshInterval: (interval: number) => void;
  fetchIOCs: () => Promise<void>;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useIocStore = create<IocState>((set) => ({
  iocs: [],
  loading: false,
  refreshInterval: 5,
  setRefreshInterval: (interval) => set({ refreshInterval: interval }),
  summary: {
    totalIOCs: 0,
    totalIPs: 0,
    totalSubnets: 0,
    totalURLs: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  },
  darkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", newMode);
      }
      return { darkMode: newMode };
    }),
  fetchIOCs: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/iocs.json");
      const data: IOC[] = await res.json();

      const summary = {
        totalIOCs: data.length,
        totalIPs: data.filter((d) => d.type === "ip").length,
        totalSubnets: data.filter((d) => d.type === "subnet").length,
        totalURLs: data.filter((d) => d.type === "url").length,
        critical: data.filter((d) => d.severity === "Critical").length,
        high: data.filter((d) => d.severity === "High").length,
        medium: data.filter((d) => d.severity === "Medium").length,
        low: data.filter((d) => d.severity === "Low").length,
      };

      set({ iocs: data, summary });
    } catch (err) {
      console.error("Error fetching IOCs:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
