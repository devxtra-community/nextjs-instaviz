"use client";
import { createContext, useContext, useState } from "react";

const AnalysisContext = createContext<any>(null);

export const AnalysisProvider = ({ children }: { children: React.ReactNode }) => {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <AnalysisContext.Provider value={{ analysisData, setAnalysisData }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
