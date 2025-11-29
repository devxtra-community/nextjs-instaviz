"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/adminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--background)] relative">
      
      {/* Top Navbar for Mobile */}
      <div className="md:hidden w-full fixed top-0 left-0 bg-white px-4 py-3 shadow-md flex justify-between items-center z-50">
        {/* ✅ Dynamic Page Title */}
        <h1 id="mobile-page-title" className="text-lg font-semibold"></h1>
        
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
        <div className="md:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        </div>
      )}

      {/* Main Content */}
      <main
        className={`
          flex-1 p-6 w-full transition-all duration-300
          mt-14 md:mt-0
          ${sidebarOpen ? "md:ml-64" : "md:ml-16"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
