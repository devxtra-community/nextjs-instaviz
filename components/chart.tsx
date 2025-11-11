"use client";
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
import { motion } from "framer-motion";
import React from "react";

const COLORS = ["#AD49E1", "#B46FE9", "#CDA5F2", "#E5D6FA"];

export default function Charts() {
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

  return (
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
          <FiTrendingUp className="primary" size={18} />
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
          <FiPieChart className="primary" size={18} />
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
  );
}
