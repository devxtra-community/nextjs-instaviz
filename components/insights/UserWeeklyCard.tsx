"use client";

import React, { useEffect, useState } from "react";
import axiosAdmin from "@/lib/axiosAdmin";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  LabelList,
  Tooltip,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

type DayPoint = { day: string; users: number };

export default function UserWeeklyGrowthCard() {
  const [data, setData] = useState<DayPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeeklyUser() {
      try {
        const res = await axiosAdmin.get("/admin/weeklyuser");
        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching weekly user:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeeklyUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Weekly User Growth
        </CardTitle>
      </CardHeader>

      <CardContent className="h-56">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis hide />

              <Tooltip cursor={{ fill: "transparent" }} />

              <Bar
                dataKey="users"
                fill="#7c3aed"
                radius={[6, 6, 0, 0]}
                barSize={30} // responsive bar width
              >
                {/* ALWAYS visible numbers above each bar */}
                <LabelList
                  dataKey="users"
                  position="top"
                  style={{
                    fill: "#7c3aed",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}
