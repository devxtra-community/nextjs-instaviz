"use client";

import { useState } from "react";
import Sidebar from "@/components/adminSidebar";
import StatsCard from "@/components/statsCard";
import { DollarSign, Users, UserPlus, ShoppingCart, Menu } from "lucide-react";
import { ChartBarMultiple } from "@/components/adminChart1";
import { ChartPieStacked } from "@/components/adminChart2";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">

      {/* Mobile Navbar */}
      <div className="md:hidden w-full fixed top-0 left-0 bg-white px-4 py-3 shadow-md flex justify-between items-center z-50">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <Menu size={26} onClick={() => setSidebarOpen(true)} className="cursor-pointer" />
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`
          hidden md:block fixed h-full bg-white shadow-md transition-all duration-300 z-50
          ${sidebarOpen ? "w-64" : "w-16"}
        `}
      >
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        </div>
      )}

      {/* Content */}
      <div
        className={`
          flex-1 p-6 w-full mt-14 md:mt-0 transition-all duration-300
          ${sidebarOpen ? "md:ml-64" : "md:ml-16"}
        `}
      >
        <h1 className="text-2xl font-semibold mb-6 hidden md:block">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Today's Money" value="$53,000" icon={<DollarSign />}  />
          <StatsCard title="Today's Users" value="2,300"icon={<Users />}  />
          <StatsCard title="New Clients" value="+3,462" icon={<UserPlus />}  />
          <StatsCard title="Sales" value="$103,430" icon={<ShoppingCart />}  />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <ChartBarMultiple />
          <ChartPieStacked />
        </div>

      </div>
    </div>
  );
}
