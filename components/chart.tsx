"use client";

import {
  BarChart,
  Bar,
  PieChart,
  LineChart,
  Line,
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
  type: "bar" | "pie" | "line";
  x: string;
  y: string;
  title: string;
  data: any[];
}

export default function Charts({ charts }: { charts: ChartConfig[] }) {
  if (!charts || charts.length === 0) {
    return (
      <p className="text-gray-400 text-sm mt-4">
        There is no charts available for your current file upload.
      </p>
    );
  }

  const barCharts = charts.filter((c) => c.type === "bar");
  const pieCharts = charts.filter((c) => c.type === "pie");
  const lineCharts = charts.filter((c) => c.type === "line");

  // Normalizers
  const normalizeBar = (chart: ChartConfig) =>
    chart.data.map((r) => ({
      [chart.x]: r.xValue,
      [chart.y]: r.yValue,
    }));

  const normalizePie = (chart: ChartConfig) =>
    chart.data.map((r) => ({
      [chart.x]: r.xValue,
      value: r.value,
    }));

  const normalizeLine = (chart: ChartConfig) =>
    chart.data.map((r) => ({
      [chart.x]: r.xValue,
      [chart.y]: r.yValue,
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">

      {/*  BAR CHARTS  */}
      {barCharts.map((chart, i) => {
        const data = normalizeBar(chart);

        return (
          <motion.div
            key={`bar-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border border-[#ede4fa] p-4 md:p-5"
          >
            <h3 className="text-[15px] font-semibold text-gray-800 mb-2">
              {chart.title}
            </h3>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                <XAxis dataKey={chart.x} stroke="#bbb" fontSize={11} />
                <YAxis stroke="#bbb" fontSize={11} />
                <Tooltip />
                <Bar dataKey={chart.y} fill="#AD49E1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        );
      })}

      {/*  PIE CHARTS  */}
      {pieCharts.map((chart, i) => {
        const data = normalizePie(chart);

        return (
          <motion.div
            key={`pie-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border border-[#ede4fa] p-4 md:p-5"
          >
            <h3 className="text-[15px] font-semibold text-gray-800 mb-2">
              {chart.title}
            </h3>

            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey={chart.x}
                  outerRadius={90}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name.substring(0, 18)}… ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        );
      })}

      {/*  LINE CHARTS  */}
      {lineCharts.map((chart, i) => {
        const data = normalizeLine(chart);

        return (
          <motion.div
            key={`line-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border border-[#ede4fa] p-4 md:p-5"
          >
            <h3 className="text-[15px] font-semibold text-gray-800 mb-2">
              {chart.title}
            </h3>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                <XAxis dataKey={chart.x} stroke="#bbb" fontSize={11} />
                <YAxis stroke="#bbb" fontSize={11} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={chart.y}
                  stroke="#B46FE9"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        );
      })}

    </div>
  );
}
