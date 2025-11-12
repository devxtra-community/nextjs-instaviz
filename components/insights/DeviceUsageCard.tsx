"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Monitor, Smartphone } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

export default function DeviceUsageCard() {
  const [desktopPercent, setDesktopPercent] = useState(0);
  const [mobilePercent, setMobilePercent] = useState(0);

  useEffect(() => {
    async function fetchDeviceStats() {
      try {
        const res = await axiosInstance.get("/admin/dashboard/device");

        setMobilePercent(res.data.mobile);
        setDesktopPercent(res.data.desktop);
      } catch (err) {
        console.log("Error fetching device stats:", err);
      }
    }

    fetchDeviceStats();
  }, []);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Device Split</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Smartphone className="h-5 w-5 text-purple-600" /> Mobile
          </div>
          <span className="font-bold">{mobilePercent}%</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Monitor className="h-5 w-5 text-purple-600" /> Desktop
          </div>
          <span className="font-bold">{desktopPercent}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
