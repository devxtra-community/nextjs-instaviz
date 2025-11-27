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
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-md font-semibold">
          Average Upload Frequency
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-4xl font-bold text-purple-600">
          {data.frequency}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Uploads per user
        </p>

        {/* Visual bar (scaled but capped at 100%) */}
        <div className="w-full mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all"
            style={{ width: `${Math.min(data.frequency * 20, 100)}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}
