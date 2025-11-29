"use client";

import { useEffect, useState } from "react";
import axiosAdmin from "@/lib/axiosAdmin";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface HeatScore {
  heatScore: number;
  totalUsers: number;
  activeUsers: number;
  totalUploads: number;
}

export default function UserHeatScoreCard() {
  const [data, setData] = useState<HeatScore | null>(null);

  useEffect(() => {
    async function fetchScore() {
      try {
        const res = await axiosAdmin.get("/admin/insights/userheatscore");
        setData(res.data);
      } catch (err) {
        console.log("Heat score error:", err);
      }
    }
    fetchScore();
  }, []);

  if (!data) return <p>Loading...</p>;

  const score = data.heatScore;
  const barWidth = `${score}%`;

  const barColor =
    score > 75 ? "#16a34a" : score > 50 ? "#f59e0b" : "#ef4444";

  return (
    <Card className="p-4 rounded-2xl shadow-sm border border-gray-100">
      <CardHeader>
        <CardTitle className="text-md font-semibold">
          Heat Pulse (Last 30 Days)
        </CardTitle>
      </CardHeader>

      <CardContent>

        {/* MAIN SCORE USING THEME PRIMARY */}
        <div
          className="text-3xl font-bold"
          style={{ color: "var(--primary-color)" }}
        >
          {score} / 100
        </div>

        <p className="text-xs text-gray-500 mb-3">
          Overall engagement based on logins + uploads
        </p>

        {/* PROGRESS BAR */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: barWidth,
              backgroundColor: barColor,
            }}
          ></div>
        </div>
        
      </CardContent>
    </Card>
  );
}
