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
        className={`
          h-screen bg-white shadow-xl flex flex-col justify-between
          fixed top-0 left-0 z-50
          transition-all duration-300 transform-gpu will-change-transform
          ${isOpen ? "w-64" : "w-16"}
        `}
        style={{
          boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
          color: "var(--primary-color)"
        }}
      >
        {/* Header */}
        <div
          className="p-4 flex items-center justify-between border-b"
          style={{
            borderColor: "var(--primary-color)",
          }}
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
              className={`
                font-bold text-base ml-2 transition-all duration-300 transform-gpu origin-left
                ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}
              `}
              style={{ color: "var(--primary-color)" }}
            >
              Admin Panel
            </span>
          </div>

          {/* Close (Mobile) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden"
            style={{ color: "var(--primary-color)" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-2 space-y-2">
          {menuItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="group w-full flex items-center px-3 py-2 rounded-lg transition cursor-pointer"
              style={{
                color: "var(--primary-color)",
              }}
            >
              <Icon
                size={20}
                className="transition"
                style={{
                  color: "var(--primary-color)",
                }}
              />

              <span
                className={`
                  font-medium ml-2 transition-all duration-300 transform-gpu origin-left
                  ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                `}
              >
                {label}
              </span>

              {/* Hover Styles */}
              <style jsx>{`
                a:hover {
                  background: var(--primary-color);
                  color: var(--text-on-primary);
                }
                a:hover svg {
                  color: var(--text-on-primary);
                }
              `}</style>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div
          className="border-t p-3"
          style={{
            borderColor: "var(--primary-color)",
            background: "var(--secondary-color)",
          }}
        >
          <button
            onClick={adminLogout}
            className="group w-full flex items-center px-4 py-2 rounded-lg transition"
            style={{
              color: "var(--primary-color)",
            }}
          >
            <LogOut size={20} className="transition" />

            <span
              className={`
                font-medium ml-2 transition-all duration-300 transform-gpu origin-left
                ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"}
              `}
            >
              Logout
            </span>

            {/* Hover */}
            <style jsx>{`
              button:hover {
                background: var(--primary-color);
                color: var(--text-on-primary) !important;
              }
              button:hover svg {
                color: var(--text-on-primary) !important;
              }
            `}</style>
          </button>
        </div>
      </aside>

      {/* Overlay (mobile only) */}
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
