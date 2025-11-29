"use client";

import { useEffect, useState } from "react";
import axiosAdmin from "@/lib/axiosAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";

type UploadPoint = {
  day: string;
  uploads: number;
};

export default function UploadTrendChart() {
  const [data, setData] = useState<UploadPoint[]>([]);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const res = await axiosAdmin.get("/admin/activities/weeklyuploads");

        const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        const sorted = [...res.data].sort(
          (a, b) => order.indexOf(a.day) - order.indexOf(b.day)
        );

        setData(sorted);
      } catch (err) {
        console.log("Weekly trend error:", err);
      }
    };

    fetchTrend();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl shadow-md border border-gray-100">
        <CardHeader>
          <CardTitle>Weekly Upload Trend (Current Week)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />

              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />

              {/* Tooltip with theme */}
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload?.length) {
                    const val = payload[0]?.value ?? 0; // ✅ FIXED

                    return (
                      <div
                        style={{
                          backgroundColor: "var(--primary-color)",
                          color: "var(--text-on-primary)",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}
                      >
                        <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
                        <p style={{ margin: 0, fontSize: 12 }}>
                          {val.toLocaleString()} uploads
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* THEME LINE */}
              <Line
                type="monotone"
                dataKey="uploads"
                stroke="var(--primary-color)"
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--primary-color)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
