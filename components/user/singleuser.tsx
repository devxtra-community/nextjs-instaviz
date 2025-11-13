"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
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

interface UserType {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  phone?: string;
  location?: string;
  status?: string;
}

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Active");

  const fetchUserSinglePage = async () => {
    try {
      const res = await axiosInstance.get(`/admin/dashboard/singleuser/${id}`);
      console.log("Single user fetched:", res.data.singleuser);
      setUser(res.data.singleuser);
      setStatus(res.data.singleuser?.status || "Active");
    } catch (err) {
      console.error("Error fetching single user:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await axiosInstance.put(`/admin/dashboard/update-status/${id}`, {
        status: newStatus,
      });
      setStatus(newStatus);
      console.log("Status updated successfully:", newStatus);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    if (id) fetchUserSinglePage();
  }, [id]);

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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading user data...
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        User not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-5">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-5 tracking-tight">
        User Profile
      </h1>

      {/* Header Section */}
      <div className="rounded-2xl shadow-sm overflow-hidden mb-6 bg-gradient-to-r from-[#AD49E1] via-[#C56BE8] to-[#E19BFF] text-white">
        <div className="flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="relative w-28 h-28">
            {user.picture ? (
              <Image
                src={user.picture}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-28 h-28 flex items-center justify-center rounded-full bg-[#E8C7F7] text-[#AD49E1] text-3xl font-semibold border-4 border-white shadow-lg">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-1">{user.name}</h2>
            <p className="text-sm opacity-90">Premium User</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3 text-sm opacity-90">
              <div className="flex items-center gap-1.5">
                <Mail size={15} /> {user.email || "No email"}
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={15} /> {user.phone || "+91 00000 00000"}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={15} /> {user.location || "Unknown"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Tokens */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-2 text-sm uppercase tracking-wide">
            Available Tokens
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-gray-900">27</p>
            <div className="w-28 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tokenData}>
                  <Bar dataKey="value" fill="#AD49E1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Token usage for the last 5 months
          </p>
        </div>

        {/* Account Status */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-2 text-sm uppercase tracking-wide">
            Account Status
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-[#E5B4F6] focus:outline-none bg-gray-50 hover:bg-white transition"
            >
              <option value="Active">🟢 Active</option>
              <option value="Deactivated">🔴 Deactivated</option>
            </select>

            <button
              onClick={() => handleStatusChange(status)}
              className="flex items-center justify-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] active:scale-95 transition text-sm shadow-sm"
            >
              Done
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Current status:{" "}
            <span
              className={`font-semibold ${
                status === "Active"
                  ? "text-green-600"
                  : status === "Deactivated"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {status}
            </span>
          </p>
        </div>

        {/* Activity Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-2 text-sm uppercase tracking-wide">
            Avg. Active Time
          </h3>
          <div className="w-full h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#AD49E1"
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

      {/* Token Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-3 text-sm uppercase tracking-wide">
            Add Tokens
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Count"
              className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#E5B4F6] focus:outline-none text-sm"
            />
            <button className="flex items-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-sm">
              <PlusCircle size={14} /> Add
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-3 text-sm uppercase tracking-wide">
            Update Tokens
          </h3>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Select Count"
              className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#E5B4F6] focus:outline-none text-sm"
            />
            <button className="flex items-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-sm">
              <RefreshCcw size={14} /> Update
            </button>
          </div>
        </div>
      </div>

      {/* Suspend & Alert Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-3 text-sm uppercase tracking-wide">
            Suspend User
          </h3>
          <div className="flex gap-2">
            <button className="flex-1 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-sm">
              Suspend
            </button>
            <input
              type="text"
              placeholder="7 Days"
              className="border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#E5B4F6] focus:outline-none text-sm w-32"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-center gap-3">
          <h3 className="text-[#AD49E1] font-semibold mb-2 text-sm uppercase tracking-wide">
            Actions
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="flex w-full items-center justify-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-sm">
              <Bell size={16} /> Token Alert
            </button>
            <button className="flex w-full items-center justify-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-sm">
              <Send size={16} /> Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

