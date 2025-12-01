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

/* Use theme variables instead of static colors */
const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)"
];

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
      <p className="text-[var(--text-light)] text-sm mt-4">
        No charts available for this session.
      </p>
    );

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

  const validCharts = charts.filter(
    (c) => c && Array.isArray(c.data) && c.data.length > 0
  );

  if (validCharts.length === 0)
    return (
      <p className="text-[var(--text-light)] text-sm mt-4">
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
            className="rounded-xl p-4"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <h3
              className="text-[15px] font-semibold mb-2"
              style={{ color: "var(--text-dark)" }}
            >
              {chart.title}
            </h3>

            <ResponsiveContainer width="100%" height={260}>
              {{
                bar: (
                  <BarChart data={data}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey={chart.x}
                      tick={{ fill: "var(--text-light)" }}
                    />
                    <YAxis
                      tickFormatter={formatNumber}
                      tick={{ fill: "var(--text-light)" }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--card-border)",
                        color: "var(--primary)",
                      }}
                      formatter={(value) => formatNumber(Number(value))}
                    />
                    <Bar
                      dataKey={chart.y}
                      fill="var(--primary)"
                      radius={[4, 4, 0, 0]}
                    />
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
                    <Tooltip
                      contentStyle={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--card-border)",
                        color: "var(--primary)",
                      }}
                      formatter={(value) => formatNumber(Number(value))}
                    />
                  </PieChart>
                ),

                line: (
                  <LineChart data={data}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey={chart.x}
                      tick={{ fill: "var(--text-light)" }}
                    />
                    <YAxis
                      tickFormatter={formatNumber}
                      tick={{ fill: "var(--text-light)" }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--card-border)",
                        color: "var(--text-dark)",
                      }}
                      formatter={(value) => formatNumber(Number(value))}
                    />
                    <Line
                      type="monotone"
                      dataKey={chart.y}
                      stroke="var(--primary-color)"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "var(--primary-color)" }}
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
