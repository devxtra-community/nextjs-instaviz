"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "@/lib/sessionApi";
import { log } from "console";

type AnalysisDataType = {
  data: {
    charts: any[];
    metrics: any;
    summary: string[];
    messages:any[];
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
      if (
        !activeSessionId ||
        activeSessionId === "null" ||
        activeSessionId === "undefined" ||
        activeSessionId.length < 10 
      ) {
        console.log("No valid session found, skipping getSession()");
        return;
      }

      try {
        console.log(activeSessionId);
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
        console.error("Failed to load session → OK if first time visit", err);
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
