"use client";

import { useEffect, useState } from "react";
import axiosAdmin from "@/lib/axiosAdmin";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface FreqData {
  frequency: number;
  totalUsers: number;
  totalUploads: number;
}

export default function UploadFrequencyCard() {
  const [data, setData] = useState<FreqData | null>(null);

  useEffect(() => {
    async function fetchFrequency() {
      try {
        const res = await axiosAdmin.get("/admin/insights/uploadfrequency");
        setData(res.data);
      } catch (err) {
        console.log("Upload frequency error:", err);
      }
    }
    fetchFrequency();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <Card className="rounded-2xl shadow-sm bg-[var(--card)] border-[var(--card)]">
      <CardHeader>
        <CardTitle className="text-md font-semibold">
          Average Upload Frequency
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* MAIN VALUE */}
        <p
          className="text-4xl font-bold"
          style={{ color: "var(--primary)" }}
        >
          {data.frequency}
        </p>

        <p className="text-sm text-gray-500 mt-1">Uploads per user</p>

        {/* VISUAL BAR */}
        <div className="w-full mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${Math.min(data.frequency * 20, 100)}%`,
              backgroundColor: "var(--primary)",
            }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}
