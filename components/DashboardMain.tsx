"use client";
import React from "react";
import { motion } from "framer-motion";
import MetricCard from "@/components/metricCard";
import dynamic from "next/dynamic";

// ✅ Dynamically import Recharts section (client-only rendering)
const Charts = dynamic(() => import("@/components/chart"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-pulse">
      <div className="bg-white rounded-xl border border-[#ede4fa] p-5 h-[260px]" />
      <div className="bg-white rounded-xl border border-[#ede4fa] p-5 h-[260px]" />
    </div>
  ),
});

export default function DashboardMain({ showData }: { showData: boolean }) {
  if (!showData) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-white to-[#faf5ff] p-8 text-center">
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
          <button
            className="primarybg text-white px-6 py-2.5 rounded-lg font-medium 
                       hover:brightness-110 transition-all duration-300"
          >
            Upload Your First Dataset
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col bg-[#faf9fd] min-h-screen py-6 px-5 md:px-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-[1.6rem] md:text-[1.9rem] font-semibold text-gray-800 leading-tight">
          Welcome back, <span className="primary">Analyst</span>
        </h1>
        <p className="text-gray-500 text-[13px]">
          Live snapshot powered by InstaviZ Intelligence Engine.
        </p>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Rows"
          value="12,480"
          description="Records processed"
        />
        <MetricCard
          title="Total Columns"
          value="18"
          description="Attributes detected"
        />
        <MetricCard
          title="Missing Values"
          value="234"
          description="Incomplete entries"
        />
        <MetricCard
          title="Charts Generated"
          value="2"
          description="Visuals auto-created"
        />
      </div>

      {/* ✅ Charts Section (Client Rendered) */}
      <Charts />

      {/* AI Summary Section */}
      <div className="mt-6 bg-gradient-to-r from-[#faf5ff] to-[#fdfbff] border border-[#f1e7ff] rounded-xl p-3 text-sm text-gray-700">
        <h3 className="font-semibold primary mb-2">Dataset Summary</h3>
        <ul className="space-y-1">
          <li>
            • The dataset contains <b>12,480 rows</b> and <b>18 columns</b>.
          </li>
          <li>
            • <b>234</b> missing values were identified, primarily in “Region”
            and “Revenue” fields.
          </li>
        </ul>
      </div>
    </main>
  );
}
