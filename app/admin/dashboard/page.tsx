"use client";
import { useEffect } from "react";
import StatsCard from "@/components/statsCard";
import { DollarSign, Users, UserPlus, ShoppingCart } from "lucide-react";
import { ChartBarMultiple } from "@/components/adminChart1";
import { ChartPieStacked } from "@/components/adminChart2";

export default function AdminDashboard() {
  useEffect(() => {
    document.getElementById("mobile-page-title")!.textContent = "Admin Dashboard";
  }, []);
  return (
    <>
      {/* Title (shows only on desktop) */}
      <h1 className="text-2xl font-semibold mb-6 hidden md:block">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Today's Money" value="$53,000" icon={<DollarSign />} />
        <StatsCard title="Today's Users" value="2,300" icon={<Users />} />
        <StatsCard title="New Clients" value="+3,462" icon={<UserPlus />} />
        <StatsCard title="Sales" value="$103,430" icon={<ShoppingCart />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <ChartBarMultiple />
        <ChartPieStacked />
      </div>
    </>
  );
}
