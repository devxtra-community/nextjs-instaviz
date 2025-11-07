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
  X,
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
      <aside
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`
          h-screen bg-white text-[#AD49E1] shadow-xl flex flex-col justify-between
          fixed top-0 left-0 z-50
          transition-all duration-300
          ${isOpen ? "w-64" : "w-16"}
        `}
        style={{ boxShadow: "4px 0 20px rgba(173, 73, 225, 0.15)" }}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-[#AD49E1]/10">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="InstaviZ Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span
              className={`
                font-bold text-base ml-2 transition-all
                ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
              `}
            >
              Admin Panel
            </span>
          </div>

          {/* Close button (mobile) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-[#AD49E1]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-2 space-y-2">
          {menuItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="group w-full flex items-center px-3 py-2 rounded-lg hover:bg-[#AD49E1] hover:text-white transition"
            >
              <Icon size={20} className="group-hover:text-white" />
              <span
                className={`
                  font-medium ml-2 transition-all
                  ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}
                `}
              >
                {label}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-[#AD49E1]/10 bg-[#AD49E1]/5 p-3">
          <button className="group w-full flex items-center px-4 py-2 rounded-lg hover:bg-[#AD49E1] hover:text-white transition">
            <LogOut size={20} className="group-hover:text-white" />
            <span
              className={`
                font-medium ml-2 transition-all
                ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}
              `}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Overlay (mobile) */}
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
