"use client";

import { createContext, useContext, useState } from "react";

type AnalysisContextType = {
  analysisData: any;
  setAnalysisData: (val: any) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;

  // Add dynamic chart
  addNewChart: (chart: any) => void;
};

const AnalysisContext = createContext<AnalysisContextType | null>(null);

export const AnalysisProvider = ({ children }: { children: React.ReactNode }) => {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // append chart to existing dashboard
  const addNewChart = (chart: any) => {
    setAnalysisData((prev: any) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: {
          ...prev.data,
          charts: [...prev.data.charts, chart],  // ⬅ add chart to end
        },
      };
    });
  };

  return (
    <AnalysisContext.Provider
      value={{
        analysisData,
        setAnalysisData,
        loading,
        setLoading,
        addNewChart,
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
