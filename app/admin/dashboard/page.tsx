"use client";

import { useState } from "react";
import Sidebar from "@/components/admindashbordsidebar";
import StatsCard from "@/components/StatsCard";
import { DollarSign, Users, UserPlus, ShoppingCart, Menu } from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">

      {/* ✅ Mobile Navbar */}
      <div className="md:hidden w-full fixed top-0 left-0 bg-white px-4 py-3 shadow-md flex justify-between items-center z-50">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <Menu size={26} onClick={() => setSidebarOpen(true)} className="cursor-pointer" />
      </div>

      {/* ✅ Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white shadow-md fixed h-full">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* ✅ Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed z-50 inset-0 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div
            className="w-64 h-full bg-white shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          </div>
        </div>
      )}

      {/* ✅ Content Area */}
      <div className="flex-1 p-6 w-full mt-14 md:mt-0 md:ml-64">
        <h1 className="text-2xl font-semibold mb-6 hidden md:block">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Today's Money"
            value="$53,000"
            percentage="+55%"
            icon={<DollarSign size={22} />}
            isPositive
          />

          <StatsCard
            title="Today's Users"
            value="2,300"
            percentage="+3%"
            icon={<Users size={22} />}
            isPositive
          />

          <StatsCard
            title="New Clients"
            value="+3,462"
            percentage="-2%"
            icon={<UserPlus size={22} />}
            isPositive={false}
          />

          <StatsCard
            title="Sales"
            value="$103,430"
            percentage="+5%"
            icon={<ShoppingCart size={22} />}
            isPositive
          />
        </div>
      </div>
    </div>
  );
}
