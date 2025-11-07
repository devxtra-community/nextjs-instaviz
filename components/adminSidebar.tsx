"use client";

import Image from "next/image";
import {
  Users,
  Activity,
  Coins,
  TrendingUp,
  Calendar,
  CreditCard,
  LogOut,
  X
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { icon: Users, label: "User Actions" },
    { icon: Activity, label: "Activities" },
    { icon: Coins, label: "Tokens" },
    { icon: TrendingUp, label: "Insights" },
    { icon: Calendar, label: "Plans" },
    { icon: CreditCard, label: "Payments" },
  ];

  return (
    <>
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`
          h-full bg-white text-[#AD49E1] shadow-2xl flex flex-col justify-between z-50
          transition-all duration-300 overflow-hidden
          fixed md:static top-0 left-0
          ${isOpen ? "w-64" : "w-16"}
        `}
        style={{ boxShadow: "4px 0 20px rgba(173, 73, 225, 0.15)" }}
      >
        {/* Header + Logo */}
        <div className="p-4 flex items-center justify-between border-b border-[#AD49E1]/10">
          <div className="flex items-center">
            
            {/* ✅ LOGO */}
            <div className="flex items-center justify-center">
              <Image
                src="/logo.png" 
                alt="InstaviZ Logo"
                width={52}
                height={52}
                className="rounded-md transition-all duration-200"
              />
            </div>

            {/* ✅ Text slides in/out */}
            <div
              className={`
                overflow-hidden whitespace-nowrap transition-all duration-200
                ${isOpen ? "opacity-100 ml-2 w-32" : "opacity-0 ml-0 w-0"}
              `}
            >
              <h2 className="font-bold text-base">Admin Panel</h2>
              
            </div>
          </div>

          {/* Close button (mobile only) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-[#AD49E1] hover:text-[#8a3bc2]"
          >
            <X size={20} />
          </button>
        </div>

        {/* ✅ Menu */}
        <nav className="p-2 space-y-2">
          {menuItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="group w-full flex items-center px-3 py-2 rounded-lg hover:bg-[#AD49E1] hover:text-white transition"
            >
              <Icon size={20} className="group-hover:text-white" />

              {/* Smooth Text */}
              <span
                className={`
                  font-medium overflow-hidden whitespace-nowrap transition-all duration-200
                  ${isOpen ? "opacity-100 ml-2 w-32" : "opacity-0 ml-0 w-0"}
                `}
              >
                {label}
              </span>
            </button>
          ))}
        </nav>

        {/* ✅ Logout Button */}
        <div className="border-t border-[#AD49E1]/10 bg-[#AD49E1]/5 p-3">
          <button className="group w-full flex items-center px-4 py-2 rounded-lg hover:bg-[#AD49E1] hover:text-white transition">
            <LogOut size={20} className="group-hover:text-white" />
            <span
              className={`
                font-medium overflow-hidden whitespace-nowrap transition-all duration-200
                ${isOpen ? "opacity-100 ml-2 w-32" : "opacity-0 ml-0 w-0"}
              `}
            >
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* ✅ Mobile Overlay */}
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
