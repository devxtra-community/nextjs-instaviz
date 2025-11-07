"use client";

import { useState } from "react";
import Sidebar from "@/components/adminSidebar";
import RegisteredUsersMain from "@/components/registerusermain";

export default function RegisteredUsersPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex bg-gray-50 min-h-screen transition-all duration-300">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />


      <div
        className={`
          flex-1 transition-all duration-300
          ${isOpen ? "md:ml-64 ml-16" : "ml-16"}
        `}
      >
        <main className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
              Registered Users
            </h1>

            
            <RegisteredUsersMain />
          </div>
        </main>
      </div>
    </div>
  );
}
