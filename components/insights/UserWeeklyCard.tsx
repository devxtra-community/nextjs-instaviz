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

const InsideLabel = (props: any) => {
  const { x, y, width, height, value } = props;

  if (height < 20) return null;

  return (
    <text
      x={x + width / 2}
      y={y + height / 2}
      fill="#ffffff"
      fontSize={12}
      fontWeight={600}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {value}
    </text>
  );
};

export default function UserWeeklyGrowthCard() {
  const [data, setData] = useState<DayPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeeklyUser() {
      try {
        const res = await axiosAdmin.get("/admin/insights/weeklyuser");
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
    <Card className="p-4 rounded-2xl shadow-sm border border-gray-100">
      <CardHeader>
        <CardTitle className="text-md font-semibold">
          Weekly User Growth (Current Week)
        </CardTitle>
      </CardHeader>

      <CardContent className="h-64">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20 }}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />

              <YAxis hide />

              <Tooltip cursor={{ fill: "transparent" }} />

              {/* THEME BAR COLOR */}
              <Bar
                dataKey="users"
                fill="var(--primary-color)"
                radius={[6, 6, 0, 0]}
              >
                <LabelList content={<InsideLabel />} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}
