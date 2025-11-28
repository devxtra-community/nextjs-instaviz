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
  if (!charts || charts.length === 0)
    return (
      <p className="text-gray-400 text-sm mt-4">
        No charts available for this session.
      </p>
    );

  // Safe normalizer
  const normalize = (chart: any) =>
    (chart?.data ?? []).map((d: any) => {
      const xVal = d[chart.x] ?? d.xValue ?? d.period ?? "";
      const yVal = d[chart.y] ?? d.yValue ?? d.value ?? 0;

      return {
        [chart.x]: xVal,
        [chart.y]: yVal,
        value: d.value ?? yVal,
      };
    });

  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toLocaleString();
  };



  // Filter only valid charts (avoid crashing)
  const validCharts = charts.filter(
    (c) => c && Array.isArray(c.data) && c.data.length > 0
  );

  if (validCharts.length === 0)
    return (
      <p className="text-gray-400 text-sm mt-4">
        No valid charts found for this session.
      </p>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {validCharts.map((chart, i) => {
        const data = normalize(chart);

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border border-[#ede4fa] p-4"
          >
            <h3 className="text-[15px] font-semibold text-gray-800 mb-2">
              {chart.title}
            </h3>

            <ResponsiveContainer width="100%" height={260}>
              {{
                bar: (
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey={chart.x} />
                    <YAxis tickFormatter={formatNumber} />
                    <Tooltip formatter={(value) => formatNumber(Number(value))} />
                    <Bar dataKey={chart.y} fill="#AD49E1" radius={[4, 4, 0, 0]} />

                  </BarChart>
                ),

                pie: (
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey={chart.x}
                      outerRadius={90}
                      label
                    >
                      {data.map((_: any, idx: any) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatNumber(Number(value))} />

                  </PieChart>
                ),

                line: (
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey={chart.x} />
                    <YAxis tickFormatter={formatNumber} />
                    <Tooltip formatter={(value) => formatNumber(Number(value))} />
                    <Line
                      type="monotone"
                      dataKey={chart.y}
                      stroke="#AD49E1"
                      strokeWidth={2}
                    />

                  </LineChart>
                ),
              }[chart.type]}
            </ResponsiveContainer>
          </motion.div>
        );
      })}
    </div>
  );
}
