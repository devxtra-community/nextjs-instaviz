"use client";

import { createContext, useContext, useState } from "react";

type AnalysisContextType = {
  analysisData: any;
  setAnalysisData: (val: any) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
};

const AnalysisContext = createContext<AnalysisContextType | null>(null);

export const AnalysisProvider = ({ children }: { children: React.ReactNode }) => {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false); // ⬅ GLOBAL LOADING STATE

  return (
    <AnalysisContext.Provider
      value={{
        analysisData,
        setAnalysisData,
        loading,
        setLoading,
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
