"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  LabelList,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosAdmin from "@/lib/axiosAdmin";

// Colors now controlled by global CSS variables
const COLORS = [
  "var(--primary-color)",
  "var(--primary-light)"
];

export function ChartBarMultiple() {
  const [isMounted, setIsMounted] = useState(false);
  const [chartData, setChartData] = useState([
    { device: "Desktop", value: 0, color: COLORS[0] },
    { device: "Mobile", value: 0, color: COLORS[1] },
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosAdmin.get("/admin/dashboard/userdevices");
        setChartData([
          { device: "Desktop", value: res.data.desktop, color: COLORS[0] },
          { device: "Mobile", value: res.data.mobile, color: COLORS[1] },
        ]);
      } catch (err) {
        console.log("Bar chart stats error:", err);
      }
    };

    fetchStats();
  }, []);

  if (!isMounted) return null;

  return (
    <Card className="w-full">
      <CardHeader className="pb-0 text-center">
        <CardTitle>User Device Split</CardTitle>
        <CardDescription>Users this month — Desktop vs Mobile</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center pt-4">
        <BarChart width={300} height={260} data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />

          <XAxis
            dataKey="device"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            style={{ fontSize: 14, fontWeight: 600 }}
          />

          <Bar dataKey="value" radius={8} barSize={70}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}

            <LabelList
              dataKey="value"
              position="insideTop"
              style={{
                fill: "var(--text-on-primary)",
                fontSize: 16,
                fontWeight: 700,
              }}
            />
          </Bar>
        </BarChart>
      </CardContent>
    </Card>
  );
}
