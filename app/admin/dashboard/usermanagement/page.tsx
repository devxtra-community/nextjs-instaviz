"use client";

import { useState } from "react";
import Sidebar from "@/components/adminSidebar";
import Userstatscard from "@/components/usermanagement";

export default function UserManagementPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main content area */}
      <div
        className={`
          flex-1 transition-all duration-300
          ${isOpen ? "md:ml-64 ml-16" : "ml-16"}
        `}
      >
        <main className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              User management
            </h1>

            {/* User Stats Section */}
            <Userstatscard />
          </div>
        </main>
      </div>
    </div>
  );
}
