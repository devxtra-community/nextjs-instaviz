"use client";

import { useState } from "react";
import {
  Users,
  Activity,
  Coins,
  TrendingUp,
  Zap,
  Calendar,
  CreditCard,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Users, label: "User Management" },
    { icon: Activity, label: "Activities" },
    { icon: Coins, label: "Tokens" },
    { icon: TrendingUp, label: "Insights" },
    { icon: Zap, label: "Actions" },
    { icon: Calendar, label: "Plans" },
    { icon: CreditCard, label: "Payments" },
  ];

  return (
    <>
  
      <div className="md:hidden flex items-center justify-between p-4 shadow-sm bg-white">
        <h2 className="text-[#AD49E1] font-semibold text-lg">Instavizz</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#AD49E1] focus:outline-none"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

     
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white text-[#AD49E1] shadow-2xl flex flex-col justify-between z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          boxShadow: "4px 0 20px rgba(173, 73, 225, 0.15)",
        }}
      >
        
        <div>
          
          <div className="p-6 hidden md:flex">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#AD49E1]/10 flex items-center justify-center backdrop-blur-sm"></div>
              <div>
                <h2 className="font-semibold text-lg">Instavizz</h2>
                <p className="text-xs text-[#AD49E1]/70">Admin Panel</p>
              </div>
            </div>
          </div>

          
          <nav className="p-4 space-y-2">
            {menuItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setIsOpen(false)} // closes sidebar on mobile
                className="group w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-[#AD49E1] hover:text-white hover:shadow-lg backdrop-blur-sm"
              >
                <Icon
                  size={20}
                  className="transition-colors duration-200 group-hover:text-white"
                />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#AD49E1]/10 bg-[#AD49E1]/5 p-4">
          <button
            className="group w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-[#AD49E1] hover:text-white hover:shadow-lg backdrop-blur-sm"
          >
            <LogOut
              size={20}
              className="transition-colors duration-200 group-hover:text-white"
            />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
