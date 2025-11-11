"use client";
import { useEffect } from "react";
import ActivityTabs from "@/components/activity/ActivityTabs";
import UploadSuccessRate from "@/components/activity/UploadSuccessRate";
import PeakHoursChart from "@/components/activity/PeakHoursChart";
import ActivityStatsCards from "@/components/activity/ActivityStatsCard";
import UploadTrendChart from "@/components/activity/UploadTrendChart";
import TopUploadersTable from "@/components/activity/TopUploadersTable";

export default function ActivitiesPage() {
     useEffect(() => {
    document.getElementById("mobile-page-title")!.textContent = "File Upload Activity";
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 hidden md:block">File Upload Activity</h1>

      <ActivityTabs />

      <div className="mt-6 space-y-8 max-w-9xl mx-auto">
        <ActivityStatsCards />
        <UploadTrendChart />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PeakHoursChart />
          <UploadSuccessRate />
        </div>

        <TopUploadersTable />
      </div>
    </>
  );
}
