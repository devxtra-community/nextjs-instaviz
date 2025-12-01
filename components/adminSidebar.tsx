"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Activity,
  Coins,
  TrendingUp,
  Calendar,
  LogOut,
  X,
  LayoutDashboard
} from "lucide-react";
import { adminLogout } from "@/lib/adminLogout";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Users, label: "Users", href: "/admin/user" },
    { icon: Activity, label: "Activities", href: "/admin/activities" },
    { icon: Coins, label: "Tokens", href: "/admin/token" },
    { icon: TrendingUp, label: "Insights", href: "/admin/insights" },
    { icon: Calendar, label: "Plans", href: "/admin/plans" },
  ];

  return (
    <>
      <aside
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`h-screen fixed top-0 left-0 z-[9999] flex flex-col justify-between transition-all duration-300 
          ${isOpen ? "w-64" : "w-16"}`}
        style={{
          background: "var(--sidebar)",
          color: "var(--sidebar-foreground)",
          borderRight: "1px solid var(--sidebar-border)",
          boxShadow: "4px 0 20px rgba(0,0,0,0.08)"
        }}
      >
        {/* Header */}
        <div
          className="p-4 flex items-center justify-between border-b"
          style={{ borderColor: "var(--sidebar-border)" }}
        >
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="InstaviZ Logo"
              width={40}
              height={40}
              className="rounded-md"
            />

            <span
              className={`ml-2 font-bold transition-all duration-300
                ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
              style={{ color: "var(--sidebar-foreground)" }}
            >
              Admin Panel
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden"
            style={{ color: "var(--sidebar-foreground)" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-2 flex-1 space-y-2">
          {menuItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="sidebar-item group flex items-center px-3 py-2 rounded-lg transition"
              style={{ color: "var(--sidebar-foreground)" }}
            >
              <Icon
                size={20}
                className="transition"
                style={{ color: "var(--sidebar-foreground)" }}
              />

              <span
                className={`ml-2 font-medium transition-all duration-300
                  ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
              >
                {label}
              </span>
            </Link>
          ))}

         <style jsx global>{`
  .sidebar-item:hover {
    background: var(--sidebar-primary) !important;
    color: var(--sidebar-primary-foreground) !important;
  }

  .sidebar-item:hover svg {
    color: var(--sidebar-primary-foreground) !important;
  }
`}</style>

        </nav>

        {/* Logout */}
        <div
          className="border-t p-3"
          style={{
            borderColor: "var(--sidebar-border)",
            background: "var(--sidebar-accent)",
          }}
        >
          <button
            onClick={adminLogout}
            className="sidebar-item w-full flex items-center px-4 py-2 rounded-lg transition"
            style={{ color: "var(--sidebar-accent-foreground)" }}
          >
            <LogOut size={20} />

            <span
              className={`ml-2 font-medium transition-all duration-300
                ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
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
