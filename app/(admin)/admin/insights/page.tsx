"use client";
import { useEffect } from "react";
import UserGrowthCard from "@/components/insights/UploadFrequency";
import ActiveIdleCard from "@/components/insights/UserHeatScoreCard";
import DeviceUsageCard from "@/components/insights/DeviceUsageCard";
import UserWeeklyGrowthCard from "@/components/insights/UserWeeklyCard";
import UserHeatScoreCard from "@/components/insights/UserHeatScoreCard";
import UploadFrequencyCard from "@/components/insights/UploadFrequency";


export default function InsightsPage() {
  useEffect(() => {
    document.getElementById("mobile-page-title")!.textContent = "Insights";
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6 hidden md:block">Insights</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <UploadFrequencyCard />
        <UserHeatScoreCard/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
     <UserWeeklyGrowthCard/>
        <DeviceUsageCard />
      </div>

     
    </>
  );
}
