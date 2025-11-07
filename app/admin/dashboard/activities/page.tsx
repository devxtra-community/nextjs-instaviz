"use client";

import { useState } from "react";
import Sidebar from "@/components/adminSidebar";
import ActivityTabs from "@/components/activity/ActivityTabs";
import UploadSuccessRate from "@/components/activity/UploadSuccessRate";
import PeakHoursChart from "@/components/activity/PeakHoursChart";
import ActivityStatsCards from "@/components/activity/ActivityStatsCard";
import UploadTrendChart from "@/components/activity/UploadTrendChart";
import TopUploadersTable from "@/components/activity/TopUploadersTable";

export default function ActivitiesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8f9fc] relative">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div
        className={`
          flex-1 p-6 w-full transition-all duration-300
          ${sidebarOpen ? "md:ml-64" : "md:ml-16"}
        `}
      >
        <h1 className="text-3xl font-bold mb-6">File Upload Insights</h1>

        <ActivityTabs />

        <div className="space-y-8 mt-4">
          <ActivityStatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UploadTrendChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PeakHoursChart />
            <UploadSuccessRate />
          </div>

          <TopUploadersTable />
        </div>
      </div>
    </div>
  );
}
