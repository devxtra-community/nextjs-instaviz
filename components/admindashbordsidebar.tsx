"use client";

import {
  Users, Activity, Coins, TrendingUp, Zap, Calendar, CreditCard, LogOut
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

function Sidebar({ isOpen, setIsOpen }: SidebarProps) {

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
      {/* Sidebar container */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white text-[#AD49E1] shadow-2xl flex flex-col justify-between z-50
          transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ boxShadow: "4px 0 20px rgba(173, 73, 225, 0.15)" }}
      >
        
        {/* Top branding (desktop only) */}
        <div className="p-6 hidden md:flex">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#AD49E1]/10 flex items-center justify-center backdrop-blur-sm" />
            <div>
              <h2 className="font-semibold text-lg">Instavizz</h2>
              <p className="text-xs text-[#AD49E1]/70">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setIsOpen(false)}
              className="group w-full flex items-center space-x-3 px-4 py-3 rounded-lg
              text-left transition-all duration-200
              hover:bg-[#AD49E1] hover:text-white hover:shadow-lg backdrop-blur-sm"
            >
              <Icon size={20} className="group-hover:text-white duration-200" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-[#AD49E1]/10 bg-[#AD49E1]/5 p-4">
          <button
            className="group w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left 
            transition-all duration-200 hover:bg-[#AD49E1] hover:text-white hover:shadow-lg backdrop-blur-sm"
          >
            <LogOut size={20} className="group-hover:text-white duration-200" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay only on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
