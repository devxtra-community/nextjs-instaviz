"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosAdmin from "@/lib/axiosAdmin";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  Bell,
  PlusCircle,
  RefreshCcw,
  Send,
  Clock,
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
  status?: "active" | "disabled";
  isSuspended?: boolean;
  suspensionEnd?: string | null;
}

interface DailyActiveTime {
  date: string;
  dayName: string;
  totalSeconds: number;
  formatted: string;
}

interface AverageTimeData {
  dailyActiveTime: DailyActiveTime[];
  totalSeconds: number;
  totalFormatted?: string;
  averagePerDay: {
    seconds: number;
    formatted: string;
  };
  totalDaysTracked?: number;
}

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"active" | "disabled">("active");
  const [singleToken, setSingleToken] = useState<number | null>(null);
  const [activityData, setActivityData] = useState<DailyActiveTime[]>([]);
  const [averageTimeData, setAverageTimeData] = useState<AverageTimeData | null>(null);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [loadingAverage, setLoadingAverage] = useState(true);
  const [suspend, setSuspend] = useState("");
  const [suspending, setSuspending] = useState(false);

  // Helpers
  const secondsToHms = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  };

  // Fetch single user
  const fetchUserSinglePage = async () => {
    try {
      const res = await axiosAdmin.get(`/admin/singleuser/${id}`);
      const userData = res.data.singleuser;
      setUser(userData);
      setStatus(userData?.status || "active");
    } catch (err) {
      console.error("Error fetching single user:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await axiosAdmin.put(`/admin/status/${id}`, {
        status: newStatus,
      });
      setStatus(newStatus as "active" | "disabled");
      alert("Status updated successfully!");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  // Fetch token
  const fetchSingleUserToken = async () => {
    try {
      const res = await axiosAdmin.get(`/admin/singltoken/${id}`);
      setSingleToken(res.data.singletoken);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch last 7 days activity
  const fetchUserActivity = async () => {
    try {
      setLoadingActivity(true);
      const res = await axiosAdmin.get(`/admin/user-daily-active/${id}`);

      if (res.data.success && res.data.dailyActiveTime) {
        const last7Days = res.data.dailyActiveTime.slice(-7);
        setActivityData(last7Days);
      }
    } catch (err) {
      console.error("Error fetching user activity:", err);
      setActivityData([]);
    } finally {
      setLoadingActivity(false);
    }
  };

  // Fetch weekly average
  const fetchAverageTime = async () => {
    try {
      setLoadingAverage(true);
      const res = await axiosAdmin.get(`/admin/singleUsertime/${id}`);

      if (res.data.success && res.data.dailyActiveTime) {
        const daily = res.data.dailyActiveTime.map((d: any) => {
          const totalSeconds = typeof d.totalSeconds === "number" ? d.totalSeconds : Number(d.totalSeconds || 0);
          return {
            date: d.date || "",
            dayName: d.dayName || "",
            totalSeconds,
            formatted: secondsToHms(totalSeconds),
          } as DailyActiveTime;
        });

        const normalized: AverageTimeData = {
          ...res.data,
          dailyActiveTime: daily,
          totalSeconds: typeof res.data.totalSeconds === "number" ? res.data.totalSeconds : Number(res.data.totalSeconds || 0),
          averagePerDay: {
            seconds: res.data.averagePerDay?.seconds || 0,
            formatted: secondsToHms(res.data.averagePerDay?.seconds || 0),
          },
        };

        setAverageTimeData(normalized);
      } else {
        setAverageTimeData(null);
      }
    } catch (err) {
      console.error("Error fetching average time:", err);
      setAverageTimeData(null);
    } finally {
      setLoadingAverage(false);
    }
  };

  // FIXED: Suspend user handler - only called when button is clicked
  const handleUserSuspend = async () => {
    // Validation
    if (!suspend || isNaN(Number(suspend)) || Number(suspend) <= 0) {
      alert("Please enter a valid number of days (greater than 0)");
      return;
    }

    try {
      setSuspending(true);
      console.log(`Suspending user for ${suspend} days...`);
      
      const res = await axiosAdmin.put(`/admin/suspend/${id}?days=${suspend}`);
      
      console.log("Suspend response:", res.data);
      alert(`User suspended successfully for ${suspend} days`);
      
      // Refresh user data to show updated suspension status
      await fetchUserSinglePage();
      
      // Clear the input
      setSuspend("");
    } catch (err: any) {
      console.error("Error suspending user:", err);
      alert(err.response?.data?.message || "Failed to suspend user. Please try again.");
    } finally {
      setSuspending(false);
    }
  };

  // FIXED: Remove handleUserSuspend from useEffect
  useEffect(() => {
    if (id) {
      fetchUserSinglePage();
      fetchSingleUserToken();
      fetchUserActivity();
      fetchAverageTime();
    }
  }, [id]);

  const tokenData = [
    { name: "Jan", value: 15 },
    { name: "Feb", value: 22 },
    { name: "Mar", value: 18 },
    { name: "Apr", value: 24 },
    { name: "May", value: 27 },
  ];

  const weeklyChartData =
    averageTimeData?.dailyActiveTime.map((item) => ({
      name: item.dayName.substring(0, 3),
      hours: +(item.totalSeconds / 3600).toFixed(2),
      formatted: item.formatted,
    })) || [];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="text-sm font-medium text-gray-900">{p.name}</p>
          <p className="text-sm text-[#AD49E1]">{p.formatted}</p>
        </div>
      );
    }
    return null;
  };

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
      <h1 className="text-2xl font-semibold text-gray-800 mb-5 tracking-tight">
        User Profile
      </h1>

      {/* HEADER CARD */}
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
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-1">{user.name}</h2>
            <p className="text-sm opacity-90">Premium User</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3 text-sm opacity-90">
              <div className="flex items-center gap-1.5">
                <Mail size={15} /> {user.email}
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={15} /> {user.phone || "+91 00000 00000"}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={15} /> {user.location || "Unknown"}
              </div>
            </div>

            {/* Show suspension status if suspended */}
            {user.isSuspended && user.suspensionEnd && (
              <div className="mt-3 bg-red-500 bg-opacity-20 border border-white rounded-lg px-3 py-2 text-sm">
                ⚠️ Account Suspended until {new Date(user.suspensionEnd).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* TOKEN CARD */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-2 text-sm uppercase tracking-wide">
            Available Tokens
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-gray-900">{singleToken ?? 0}</p>
            <div className="w-28 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tokenData}>
                  <Bar dataKey="value" fill="#AD49E1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* STATUS CARD */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-2 text-sm uppercase tracking-wide">
            Account Status
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "active" | "disabled")}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm bg-gray-50 hover:bg-white focus:ring-2 focus:ring-[#E5B4F6] transition"
            >
              <option value="active">🟢 Active</option>
              <option value="disabled">🔴 Disabled</option>
            </select>

            <button
              onClick={() => handleStatusChange(status)}
              className="flex items-center justify-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-sm shadow-sm"
            >
              Done
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Current status:{" "}
            <span className={`font-semibold ${status === "active" ? "text-green-600" : "text-red-600"}`}>
              {status === "active" ? "Active" : "Disabled"}
            </span>
          </p>
        </div>

        {/* WEEKLY ACTIVITY CARD */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
            <Clock size={16} />
            Average Active Time (Weekly)
          </h3>

          {loadingAverage ? (
            <div className="flex items-center justify-center h-20">
              <p className="text-xs text-gray-500">Loading...</p>
            </div>
          ) : averageTimeData && Array.isArray(averageTimeData.dailyActiveTime) && averageTimeData.dailyActiveTime.length > 0 ? (
            <div>
              <div className="mb-3">
                <p className="text-2xl font-bold text-gray-900">{secondsToHms(averageTimeData.averagePerDay.seconds)}</p>
                <p className="text-xs text-gray-500">Average per day (Mon – Sun)</p>
              </div>

              <div className="w-full h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyChartData}>
                    <Line type="monotone" dataKey="hours" stroke="#AD49E1" strokeWidth={2} dot={{ fill: "#AD49E1", r: 3 }} />
                    <XAxis dataKey="name" hide />
                    <Tooltip content={<CustomTooltip />} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-20">
              <p className="text-xs text-gray-500">No activity data</p>
            </div>
          )}
        </div>
      </div>

      {/* TOKEN CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* ADD TOKENS */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-3 text-sm uppercase tracking-wide">Add Tokens</h3>
          <div className="flex gap-2">
            <input type="number" placeholder="Count" className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#E5B4F6] focus:outline-none text-sm" />
            <button className="flex items-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-sm">
              <PlusCircle size={14} /> Add
            </button>
          </div>
        </div>

        {/* UPDATE TOKENS */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-3 text-sm uppercase tracking-wide">Update Tokens</h3>
          <div className="flex gap-2 items-center">
            <input type="text" placeholder="Select Count" className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#E5B4F6] focus:outline-none text-sm" />
            <button className="flex items-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-sm">
              <RefreshCcw size={14} /> Update
            </button>
          </div>
        </div>
      </div>

      {/* ACTION CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* SUSPEND CARD - FIXED */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-3 text-sm uppercase tracking-wide">Suspend User</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Days"
              value={suspend}
              onChange={(e) => setSuspend(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#E5B4F6] focus:outline-none w-32 text-sm"
              min="1"
            />
            <button
              className="flex-1 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleUserSuspend}
              disabled={suspending || !suspend}
            >
              {suspending ? "Suspending..." : "Suspend"}
            </button>
          </div>
          {user.isSuspended && user.suspensionEnd && (
            <p className="text-xs text-red-600 mt-2">
              Currently suspended until {new Date(user.suspensionEnd).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* EMAIL & ALERT CARD */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-center gap-3">
          <h3 className="text-[#AD49E1] font-semibold mb-2 text-sm uppercase tracking-wide">Actions</h3>

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
