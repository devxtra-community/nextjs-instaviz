"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MetricCard from "@/components/metricCard";
import dynamic from "next/dynamic";
import UploadButton from "./UploadButton";
import { useAnalysis } from "@/context/AnalysisContext";
import FullLoader from "@/components/FullLoader";
import SessionSelector from "@/components/SessionSelector";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";

const Charts = dynamic(() => import("@/components/chart"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-pulse">
      <div className="bg-white rounded-xl border border-[#ede4fa] p-5 h-[260px]" />
    </div>
  ),
});

export default function DashboardMain({
  showData,
  setDataUploaded,
}: {
  showData: boolean;
  setDataUploaded: (val: boolean) => void;
}) {
  const {
    analysisData,
    setAnalysisData,
    loading,
    activeSessionId,
    setActiveSessionId,
    resetAnalysis,
  } = useAnalysis();

  const [refreshSessions, setRefreshSessions] = useState(0);

  /** SAFE SESSION LOADING (404 handled silently) */
  const loadSession = async (sessionId: string) => {
    if (!sessionId || sessionId.length < 10) return;

    try {
      const res = await axiosInstance.get(`/session/${sessionId}`);
      const session = res.data;

      setAnalysisData({
        data: {
          charts: session.charts || [],
          metrics: session.metrics || {},
          summary: session.data_id?.summary || [],
          messages: session.messages || [],
        },
      });

      setActiveSessionId(sessionId);
      setDataUploaded(true);
      localStorage.setItem("currentSessionId", sessionId);

    } catch (err: any) {
      // ❗ If session does not exist, clear it silently
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        console.warn("Invalid session cleared.");
        resetAnalysis();
        setDataUploaded(false);
        localStorage.removeItem("currentSessionId");
        return;
      }

      console.error("Failed to load session:", err);
    }
  };

  /** Auto-load session if saved */
  useEffect(() => {
    const saved = localStorage.getItem("currentSessionId");

    if (
      saved &&
      saved !== "null" &&
      saved !== "undefined" &&
      saved.length > 10
    ) {
      loadSession(saved);
    }
  }, []);

  /** BEFORE UPLOAD VIEW */
  if (!showData || !analysisData) {
    const isLogged =
      typeof window !== "undefined" &&
      !!localStorage.getItem("accessToken");

    return (
      <main className="relative flex-1 flex h-screen flex-col items-center justify-center bg-gradient-to-br from-white to-[#faf5ff] p-8 text-center">
        {isLogged && (
          <div className="absolute top-20 right-6">
            <SessionSelector
              onSessionChange={(id) => loadSession(id)}
              onNewFile={() => {
                resetAnalysis();
                localStorage.removeItem("currentSessionId");
                setDataUploaded(false);
              }}
            />
          </div>
        )}

        {loading && <FullLoader />}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <h1 className="text-3xl font-bold primary mb-3">
            Start Visualizing Smarter
          </h1>

          <p className="text-gray-500 leading-relaxed mb-6 text-[15px]">
            InstaviZ turns your spreadsheets into interactive dashboards —
            powered by intelligent AI for instant insights.
          </p>

          <UploadButton
            onUploadSuccess={(newSessionId) => {
              localStorage.setItem("currentSessionId", newSessionId);
              setRefreshSessions((prev) => prev + 1);
              loadSession(newSessionId);
              setDataUploaded(true);
            }}
          />
        </motion.div>
      </main>
    );
  }

  /** AFTER UPLOAD VIEW */
  const metrics = analysisData.data.metrics;
  const charts = analysisData.data.charts;
  const summary = analysisData.data.summary;

  const totalValues =
    (metrics?.total_rows || 0) * (metrics?.total_columns || 0);

  return (
    <main className="relative flex-1 overflow-y-auto flex flex-col bg-[#faf9fd] min-h-screen py-16 px-5 md:px-8 top-8">
      {loading && <FullLoader />}

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-[1.6rem] md:text-[1.9rem] font-semibold text-gray-800 leading-tight">
            Welcome back, <span className="primary">Analyst</span>
          </h1>
          <p className="text-gray-500 text-[13px]">
            Live snapshot powered by InstaviZ Intelligence Engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SessionSelector
            refreshTrigger={refreshSessions}
            onSessionChange={(id) => loadSession(id)}
            onNewFile={() => {
              resetAnalysis();
              localStorage.removeItem("currentSessionId");
              setDataUploaded(false);
            }}
          />

          <UploadButton
            onUploadSuccess={(newSessionId) => {
              localStorage.setItem("currentSessionId", newSessionId);
              setRefreshSessions((prev) => prev + 1);
              loadSession(newSessionId);
              setDataUploaded(true);
            }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Rows"
          value={metrics.total_rows}
          description="Records processed"
        />

        <MetricCard
          title="Total Columns"
          value={metrics.total_columns}
          description="Attributes detected"
        />

        <MetricCard
          title="Missing Values"
          value={metrics.missing_values}
          total_rows={metrics.total_rows}
          total_columns={metrics.total_columns}
          description="Missing values / total cells"
        />

        <MetricCard
          title="Charts Generated"
          value={charts.length}
          description="Visuals auto-created"
        />
      </div>

      <Charts charts={charts} />

      <div className="mt-6 bg-gradient-to-r from-[#faf5ff] to-[#fdfbff] border border-[#f1e7ff] rounded-xl p-3 text-sm text-gray-700">
        <h3 className="font-semibold primary mb-2">Dataset Summary</h3>
        <ul className="space-y-1">
          {summary.map((point: string, i: number) => (
            <li key={i}>• {point}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
