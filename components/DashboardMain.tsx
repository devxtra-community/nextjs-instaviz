"use client";
import React from "react";
import { motion } from "framer-motion";
import MetricCard from "@/components/metricCard";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { FiTrendingUp, FiPieChart } from "react-icons/fi";

const chartData = [
  { month: "Jan", growth: 12, users: 240 },
  { month: "Feb", growth: 18, users: 320 },
  { month: "Mar", growth: 25, users: 380 },
  { month: "Apr", growth: 21, users: 350 },
  { month: "May", growth: 28, users: 420 },
  { month: "Jun", growth: 33, users: 470 },
];

const pieData = [
  { name: "AI Charts", value: 48 },
  { name: "Insights", value: 27 },
  { name: "Exports", value: 15 },
  { name: "Collaboration", value: 10 },
];

const COLORS = ["#AD49E1", "#B46FE9", "#CDA5F2", "#E5D6FA"];

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
          <h1 className="text-3xl font-bold text-[#AD49E1] mb-3">
            Start Visualizing Smarter
          </h1>
          <p className="text-gray-500 leading-relaxed mb-6 text-[15px]">
            InstaviZ turns your spreadsheets into interactive dashboards —
            powered by intelligent AI for instant insights.
          </p>
          <button className="bg-gradient-to-r from-[#AD49E1] to-[#9929D5] text-white px-6 py-2.5 rounded-lg font-medium hover:brightness-110 transition-all duration-300">
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
          Welcome back, <span className="text-[#AD49E1]">Analyst</span>
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl border border-[#ede4fa] p-4 md:p-5"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[15px] font-semibold text-gray-800">
              Growth & Engagement Trends
            </h3>
            <FiTrendingUp className="text-[#AD49E1]" size={18} />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
              <XAxis dataKey="month" stroke="#bbb" fontSize={11} />
              <YAxis stroke="#bbb" fontSize={11} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="growth"
                stroke="#AD49E1"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#9929D5"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl border border-[#ede4fa] p-4 md:p-5"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[15px] font-semibold text-gray-800">
              Usage Distribution
            </h3>
            <FiPieChart className="text-[#AD49E1]" size={18} />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={75}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      {/* AI Summary Section */}
      <div className="mt-6 bg-gradient-to-r from-[#faf5ff] to-[#fdfbff] border border-[#f1e7ff] rounded-xl p-3 text-sm text-gray-700">
        <h3 className="font-semibold text-[#AD49E1] mb-2">Dataset Summary</h3>
        <ul className="space-y-1">
          <li>• The dataset contains <b>12,480 rows</b> and <b>18 columns</b>.</li>
          <li>• <b>234</b> missing values were identified, primarily in “Region” and “Revenue” fields.</li>
        </ul>
      </div>
    </main>
  );
}
