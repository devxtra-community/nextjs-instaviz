"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { appendChart, getSession } from "@/lib/sessionApi";

type AnalysisDataType = {
  data: {
    charts: any[];
    metrics: any;
    summary: string[];
  };
};

type AnalysisContextType = {
  analysisData: AnalysisDataType | null;
  setAnalysisData: (val: AnalysisDataType | null) => void;

  loading: boolean;
  setLoading: (val: boolean) => void;

  activeSessionId: string | null;
  setActiveSessionId: (id: string | null) => void;

  addNewChart: (chart: any) => Promise<void>;

  resetAnalysis: () => void;
};

const AnalysisContext = createContext<AnalysisContextType | null>(null);

export const AnalysisProvider = ({ children }: { children: React.ReactNode }) => {
  const [analysisData, setAnalysisData] = useState<AnalysisDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [activeSessionId, setActiveSessionId] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("currentSessionId") : null
  );

  const addNewChart = async (chart: any) => {
    // instantly update UI
    setAnalysisData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: {
          ...prev.data,
          charts: [...prev.data.charts, chart],
        },
      };
    });

    // persist chart to backend session
    try {
      if (!activeSessionId) return;
      await appendChart(activeSessionId, chart);
    } catch (err) {
      console.error("Failed to persist chart:", err);
    }
  };

  const resetAnalysis = () => {
    setAnalysisData(null);
    setActiveSessionId(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("currentSessionId");
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!activeSessionId) return;

      try {
        const session = await getSession(activeSessionId);

        setAnalysisData({
          data: {
            charts: session.charts || [],
            metrics: session.metrics || {},
            summary: session.data_id?.summary || [],
          },
        });
      } catch (err) {
        console.error("Failed to load session:", err);
      }
    };

    init();
  }, [activeSessionId]);

  return (
    <AnalysisContext.Provider
      value={{
        analysisData,
        setAnalysisData,
        loading,
        setLoading,
        activeSessionId,
        setActiveSessionId,
        addNewChart,
        resetAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used inside AnalysisProvider");
  return ctx;
};
