"use client";

import React, { useEffect, useState } from "react";
import axiosAdmin from "@/lib/axiosAdmin";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
} from "recharts";

import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

type DayPoint = { day: string; users: number };

export default function UserWeeklyGrowthCard({ className = "" }) {
  const [data, setData] = useState<DayPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeeklyUser() {
      try {
        const res = await axiosAdmin.get("/admin/weeklyuser");
        setData(res.data); 
      } catch (err) {
        console.error("Error fetching weekly user:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeeklyUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  const latest = data[data.length - 1]?.users ?? 0;
  const previous = data[data.length - 2]?.users ?? latest;
  const change = Math.round(((latest - previous) / (previous || 1)) * 100);
  const positive = change >= 0;

  return (
    <Card className={`p-4 ${className}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-sm">User Weekly Growth</CardTitle>

          <div className="mt-1 flex items-baseline gap-2">
            <h3 className="text-2xl font-semibold">{latest}</h3>
            <Badge variant="secondary" className="text-sm">Total</Badge>
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            Active users this week
          </p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex items-center rounded-full px-2 py-1 text-sm font-medium ${
                positive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              <ArrowUp
                className={`h-3 w-3 ${
                  positive ? "text-green-600" : "text-red-600"
                }`}
              />

              <span className="ml-1">{Math.abs(change)}%</span>
            </div>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="mt-2 text-xs text-muted-foreground cursor-help">
                  vs yesterday
                </span>
              </TooltipTrigger>
              <TooltipContent side="left" className="text-xs">
                Compared to previous day
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="mt-4 h-36">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="day"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <ReTooltip />

              <Area
                type="monotone"
                dataKey="users"
                stroke="#7c3aed"
                fillOpacity={1}
                fill="url(#colorUsers)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}
