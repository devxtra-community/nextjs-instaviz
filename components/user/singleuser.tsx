"use client";

import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  Bell,
  PlusCircle,
  RefreshCcw,
  Send,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserProfilePage() {
  // Example static data for small charts
  const tokenData = [
    { name: "Jan", value: 15 },
    { name: "Feb", value: 22 },
    { name: "Mar", value: 18 },
    { name: "Apr", value: 24 },
    { name: "May", value: 27 },
  ];

  const activityData = [
    { name: "Mon", value: 65 },
    { name: "Tue", value: 75 },
    { name: "Wed", value: 68 },
    { name: "Thu", value: 80 },
    { name: "Fri", value: 72 },
    { name: "Sat", value: 78 },
    { name: "Sun", value: 70 },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-5">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-5 tracking-tight">
        User Profile
      </h1>

      {/* Header */}
      <div className="rounded-2xl shadow-sm overflow-hidden mb-6 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="relative w-28 h-28">
            <Image
              src="/avatars/emilia.jpg"
              alt="User Avatar"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-1">Nadhil</h2>
            <p className="text-sm opacity-90">Premium User</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3 text-sm opacity-90">
              <div className="flex items-center gap-1.5">
                <Mail size={15} /> nadhil@.com
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={15} /> +44 4567 890 123
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={15} /> Ernakulam
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Tokens */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-indigo-600 font-semibold mb-2 text-sm uppercase tracking-wide">
            Available Tokens
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-gray-900">27</p>
            <div className="w-28 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tokenData}>
                  <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Token usage for the last 5 months
          </p>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-indigo-600 font-semibold mb-2 text-sm uppercase tracking-wide">
            Account Status
          </h3>
          <p className="text-gray-700 font-medium text-sm">Active</p>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-indigo-600 font-semibold mb-2 text-sm uppercase tracking-wide">
            Avg. Active Time
          </h3>
          <div className="w-full h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                />
                <XAxis dataKey="name" hide />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Weekly average activity percentage
          </p>
        </div>
      </div>

      {/* Token Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Add Tokens */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-indigo-600 font-semibold mb-3 text-sm uppercase tracking-wide">
            Add Tokens
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Count"
              className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-sm"
            />
            <button className="flex items-center gap-1.5 bg-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-600 transition text-sm">
              <PlusCircle size={14} /> Add
            </button>
          </div>
        </div>

        {/* Update Tokens */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-indigo-600 font-semibold mb-3 text-sm uppercase tracking-wide">
            Update Tokens
          </h3>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Select Count"
              className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-sm"
            />
            <button className="flex items-center gap-1.5 bg-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-600 transition text-sm">
              <RefreshCcw size={14} /> Update
            </button>
          </div>
        </div>
      </div>

      {/* Suspension & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-indigo-600 font-semibold mb-3 text-sm uppercase tracking-wide">
            Suspend User
          </h3>
          <div className="flex gap-2">
            <button className="flex-1 bg-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-600 transition text-sm">
              Suspend
            </button>
            <input
              type="text"
              placeholder="7 Days"
              className="border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-sm w-32"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-center gap-3">
          <h3 className="text-indigo-600 font-semibold mb-2 text-sm uppercase tracking-wide">
            Actions
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="flex w-full items-center justify-center gap-1.5 bg-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-600 transition text-sm">
              <Bell size={16} /> Token Alert
            </button>
            <button className="flex w-full items-center justify-center gap-1.5 bg-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-600 transition text-sm">
              <Send size={16} /> Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

