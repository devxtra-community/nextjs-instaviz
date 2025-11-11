"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Monitor, Smartphone } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

export default function DeviceUsageCard() {
  const [desktopPercent, setDesktopPercent] = useState(0);
  const [mobilePercent, setMobilePercent] = useState(0);

  useEffect(() => {
    async function fetchDevices() {
      try {
        //  fetch from backend
        const response = await axiosInstance.get("admin/dashboard/device");

        //  correct extraction
        const devices = response.data.devices || [];

        let desktop = 0;
        let mobile = 0;

        devices.forEach((item: any) => {
          //  correct field name from DB (userAgent)
          const ua = item.userAgent?.toLowerCase() || "";

          if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
            mobile++;
          } else {
            desktop++;
          }
        });

        const total = desktop + mobile;
        if (total > 0) {
          setDesktopPercent(Math.round((desktop / total) * 100));
          setMobilePercent(Math.round((mobile / total) * 100));
        }
      } catch (err) {
        console.log("Error fetching device data:", err);
      }
    }

    fetchDevices();
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
