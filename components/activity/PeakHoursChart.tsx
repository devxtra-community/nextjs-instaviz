"use client";

import { useEffect, useState } from "react";
import axiosAdmin from "@/lib/axiosAdmin";  
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { motion } from "framer-motion";

export default function PeakHoursChart() {
  const [hours, setHours] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeakHours = async () => {
      try {
        const res = await axiosAdmin.get("/admin/activities/peakhours");
        setHours(res.data);
      } catch (err) {
        console.log("Peak Hours Fetch Error:", err);
        setError("Failed to load chart data");
      }
    };

    fetchPeakHours();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl shadow-md bg-[var(--card)] border-[var(--card)]">
        <CardHeader>
          <CardTitle>Peak Upload Hours</CardTitle>
        </CardHeader>

        <CardContent>
          {error ? (
            <p className="text-red-500 text-sm text-center">{error}</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={hours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />

                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload?.length) {
                      const value = payload[0].value;
                      return (
                        <div
                          style={{
                            backgroundColor: "var(--primary)",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            color: "var(--text-on-primary)",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          }}
                        >
                          <p className="font-semibold m-0">{label}</p>
                          <p className="text-sm m-0">{value} uploads</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* UPDATED BAR WITH ALWAYS-VISIBLE LABELS */}
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {hours.map((_, i) => (
                    <Cell key={i} fill="var(--primary)" />
                  ))}

                  <LabelList
                    dataKey="value"
                    position="insideTop"
                    style={{
                      fill: "var(--text-on-primary)",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
