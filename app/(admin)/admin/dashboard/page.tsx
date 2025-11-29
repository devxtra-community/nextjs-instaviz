"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/statsCard";
import { DollarSign, HardDrive, TrendingUp } from "lucide-react";
import { ChartBarMultiple } from "@/components/adminChart1";
import { ChartPieStacked } from "@/components/adminChart2";
import axiosAdmin from "@/lib/axiosAdmin";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    dataGenerated: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    document.getElementById("mobile-page-title")!.textContent =
      "Admin Dashboard";

    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await axiosAdmin.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log("Error fetching dashboard stats:", error);
    }
  };

  return (
    <>
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6 hidden md:block">
        Admin Dashboard
      </h1>

      {/* 3 Stats Cards */}
      <div className="text-gray-500 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Revenue */}
        <StatsCard
          title="TOTAL REVENUE"
          value={`₹${stats.totalRevenue}`}
          icon={<DollarSign />}
        />

        {/* Total Data Generated */}
        <StatsCard
          title="DATA GENERATED"
          value={String(stats.dataGenerated)}
          icon={<HardDrive />}
        />

        {/* Conversion Rate */}
        <StatsCard
          title="CONVERSION RATE"
          value={`${stats.conversionRate}%`}
          icon={<TrendingUp />}
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <ChartBarMultiple />
        <ChartPieStacked />
      </div>
    </>
  );
}
