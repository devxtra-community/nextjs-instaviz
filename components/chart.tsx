"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#AD49E1", "#B46FE9", "#CDA5F2", "#E5D6FA", "#D7B6FA"];

interface ChartConfig {
  type: "bar" | "pie";
  x: string; // column name
  y: string; // numeric or count
  title: string;
  data: any[]; // AI-generated data array
}

export default function Charts({ charts }: { charts: ChartConfig[] }) {
  if (!charts || charts.length === 0) {
    return (
      <p className="text-gray-400 text-sm mt-4">
        There is no charts available for your current file upload.
      </p>
    );
  }

  // Extract both charts
  const barChart = charts.find((c) => c.type === "bar");
  const pieChart = charts.find((c) => c.type === "pie");

  // NORMALIZATION — Convert AI response into Recharts format
  const normalizeBarData = (chart: ChartConfig | undefined) => {
    if (!chart || !chart.data) return [];
    return chart.data.map((row: any) => ({
      [chart.x]: row.xValue,
      [chart.y]: row.yValue,
    }));
  };

  const normalizePieData = (chart: ChartConfig | undefined) => {
    if (!chart || !chart.data) return [];
    return chart.data.map((row: any) => ({
      [chart.x]: row.xValue,
      value: row.value, // Recharts uses "value" for pie
    }));
  };

  const barData = normalizeBarData(barChart);
  const pieData = normalizePieData(pieChart);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">

      {/* ================= BAR CHART ================= */}
      {barChart && barData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl border border-[#ede4fa] p-4 md:p-5"
        >
          <h3 className="text-[15px] font-semibold text-gray-800 mb-2">
            {barChart.title}
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
              <XAxis dataKey={barChart.x} stroke="#bbb" fontSize={11} />
              <YAxis stroke="#bbb" fontSize={11} />
              <Tooltip />
              <Bar
                dataKey={barChart.y}
                fill="#AD49E1"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* ================= PIE CHART ================= */}
      {pieChart && pieData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl border border-[#ede4fa] p-4 md:p-5"
        >
          <h3 className="text-[15px] font-semibold text-gray-800 mb-2">
            {pieChart.title}
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"         // always "value" for pie chart
                nameKey={pieChart.x}    // category label
                outerRadius={90}
                labelLine={false}
                label={({ name, percent }) => {
                  const short =
                    name.length > 18 ? name.substring(0, 18) + "…" : name;

                  return `${short} ${(percent * 100).toFixed(0)}%`;
                }}
              >
                {pieData.map((_: any, i: number) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  );
}
