"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "@/lib/sessionApi";

type AnalysisDataType = {
  data: {
    charts: any[];
    metrics: any;
    summary: string[];
    messages: any[];
  };
};

type AnalysisContextType = {
  analysisData: AnalysisDataType | null;
  setAnalysisData: (val: AnalysisDataType | null) => void;

  loading: boolean;
  setLoading: (val: boolean) => void;

  activeSessionId: string | null;
  setActiveSessionId: (id: string | null) => void;

  addNewChart: (chart: any) => void;

  resetAnalysis: () => void;
};

const AnalysisContext = createContext<AnalysisContextType | null>(null);

export const AnalysisProvider = ({ children }: { children: React.ReactNode }) => {
  const [analysisData, setAnalysisData] = useState<AnalysisDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [activeSessionId, setActiveSessionId] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("currentSessionId") : null
  );

  /** FIXED — React-safe chart updater */
  const addNewChart = (chart: any) => {
    setAnalysisData((prev) => {
      if (!prev || !prev.data) return prev;

      return {
        ...prev,
        data: {
          charts: [...prev.data.charts, chart],
          metrics: prev.data.metrics,
          summary: prev.data.summary,
          messages: prev.data.messages,
        },
      };
    });
  };

  /** Reset everything */
  const resetAnalysis = () => {
    setAnalysisData(null);
    setActiveSessionId(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("currentSessionId");
    }
  };

  /** Auto-load session on mount or sessionId change */
  useEffect(() => {
    const init = async () => {
      if (
        !activeSessionId ||
        activeSessionId === "null" ||
        activeSessionId === "undefined" ||
        activeSessionId.length < 10
      ) {
        console.log("No valid session found — skipping getSession()");
        return;
      }

      try {
        const session = await getSession(activeSessionId);

        setAnalysisData({
          data: {
            charts: session.charts || [],
            metrics: session.metrics || {},
            summary: session.data_id?.summary || [],
            messages: session.messages || [],
          },
        });
      } catch (err) {
        console.error("Failed to load session", err);
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
