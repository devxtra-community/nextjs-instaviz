"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosAdmin from "@/lib/axiosAdmin";
import CustomSelect from "../CustomSelect";
import Image from "next/image";
import {Mail,MapPin,Phone,Bell,PlusCircle,RefreshCcw,Send,Clock,UserX,UserCheck,} from "lucide-react";
import {LineChart,Line,BarChart,Bar,XAxis,Tooltip,ResponsiveContainer,} from "recharts";

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
  date: string;dayName: string;
  totalSeconds: number;formatted: string;
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
  const [averageTimeData, setAverageTimeData] =
    useState<AverageTimeData | null>(null);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [loadingAverage, setLoadingAverage] = useState(true);
  const [suspendDays, setSuspendDays] = useState("");
  const [suspending, setSuspending] = useState(false);
  const [unsuspending, setUnsuspending] = useState(false);

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
      const res = await axiosAdmin.get(`/admin/user/singleuser/${id}`);
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
      await axiosAdmin.put(`/admin/user/status/${id}`, {
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
      const res = await axiosAdmin.get(`/admin/user/singletoken/${id}`);
      setSingleToken(res.data.singletoken);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch last 7 days activity
  const fetchUserActivity = async () => {
    try {
      setLoadingActivity(true);
      const res = await axiosAdmin.get(`/admin/user/user-daily-active/${id}`);

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
      const res = await axiosAdmin.get(`/admin/user/singleUsertime/${id}`);

      if (res.data.success && res.data.dailyActiveTime) {
        const daily = res.data.dailyActiveTime.map((d: any) => {
          const totalSeconds =
            typeof d.totalSeconds === "number"
              ? d.totalSeconds
              : Number(d.totalSeconds || 0);
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
          totalSeconds:
            typeof res.data.totalSeconds === "number"
              ? res.data.totalSeconds
              : Number(res.data.totalSeconds || 0),
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

  // Suspend user handler
  const handleUserSuspend = async () => {
    if (!suspendDays || isNaN(Number(suspendDays)) || Number(suspendDays) <= 0) {
      alert("Please enter a valid number of days (greater than 0)");
      return;
    }

    try {
      setSuspending(true);

      const res = await axiosAdmin.put(
        `/admin/user/suspend/${id}?days=${suspendDays}`
      );

      alert(`User suspended successfully for ${suspendDays} days`);

      await fetchUserSinglePage();
      setSuspendDays("");
    } catch (err: any) {
      console.error("Error suspending user:", err);
      alert(
        err.response?.data?.message ||
          "Failed to suspend user. Please try again."
      );
    } finally {
      setSuspending(false);
    }
  };

  // Unsuspend user handler
  const handleUserUnsuspend = async () => {
    if (!confirm("Are you sure you want to unsuspend this user?")) {
      return;
    }

    try {
      setUnsuspending(true);

      const res = await axiosAdmin.put(`/admin/user/unsuspend/${id}`);

      alert("User unsuspended successfully!");

      await fetchUserSinglePage();
    } catch (err: any) {
      console.error("Error unsuspending user:", err);
      alert(
        err.response?.data?.message ||
          "Failed to unsuspend user. Please try again."
      );
    } finally {
      setUnsuspending(false);
    }
  };

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
        <div className="rounded border border-gray-200 bg-white p-2 shadow-sm">
          <p className="text-sm font-medium text-gray-900">{p.name}</p>
          <p className="text-sm text-[#AD49E1]">{p.formatted}</p>
        </div>
      );
    }
    return null;
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-gray-500">
        Loading user data...
      </div>
    );

  if (!user)
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-red-500">
        User not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-3 py-4 sm:px-4 md:px-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-5 tracking-tight">
        User Profile
      </h1>

      {/* HEADER CARD */}
      <div className="rounded-2xl shadow-sm overflow-hidden mb-5 bg-gradient-to-r from-[#AD49E1] via-[#C56BE8] to-[#E19BFF] text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 p-4 sm:p-6 text-center md:text-left">
          <div className="relative w-20 h-20 sm:w-28 sm:h-28">
            {user.picture ? (
              <Image
                src={user.picture}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-white shadow-lg w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-full bg-[#E8C7F7] text-[#AD49E1] text-2xl sm:text-3xl font-semibold border-4 border-white shadow-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left mt-2 md:mt-0">
            <h2 className="text-xl sm:text-2xl font-semibold mb-1">
              {user.name}
            </h2>
            <p className="text-xs sm:text-sm opacity-90">Premium User</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 mt-3 text-xs sm:text-sm opacity-90">
              <div className="flex items-center gap-1.5 break-all">
                <Mail size={14} /> <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={14} />{" "}
                <span>{user.phone || "+91 00000 00000"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} />{" "}
                <span>{user.location || "Unknown"}</span>
              </div>
            </div>

            {user.isSuspended && user.suspensionEnd && (
              <div className="mt-3 bg-red-500/20 border border-white/80 rounded-lg px-3 py-2 text-xs sm:text-sm">
                ⚠️ Account Suspended until{" "}
                {new Date(user.suspensionEnd).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mb-6">
        {/* TOKEN CARD */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-2 text-xs sm:text-sm uppercase tracking-wide">
            Available Tokens
          </h3>
          <div className="flex justify-between items-center gap-3">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {singleToken ?? 0}
            </p>
            <div className="w-24 h-14 sm:w-28 sm:h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tokenData}>
                  <Bar
                    dataKey="value"
                    fill="#AD49E1"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* STATUS CARD */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-2 text-xs sm:text-sm uppercase tracking-wide">
            Account Status
          </h3>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <CustomSelect value={status} onChange={(v:any) => setStatus(v)} />


            <button
              onClick={() => handleStatusChange(status)}
              className="flex items-center justify-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-xs sm:text-sm shadow-sm"
            >
              Done
            </button>
          </div>

          <p className="mt-2 text-xs text-gray-500 md:mt-3">
            Current status:{" "}
            <span
              className={`font-semibold ${
                status === "active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status === "active" ? "Active" : "Disabled"}
            </span>
          </p>
        </div>

        {/* WEEKLY ACTIVITY CARD */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2">
            <Clock size={16} />
            Average Active Time (Weekly)
          </h3>

          {loadingAverage ? (
            <div className="flex items-center justify-center h-16 sm:h-20">
              <p className="text-xs text-gray-500">Loading...</p>
            </div>
          ) : averageTimeData &&
            Array.isArray(averageTimeData.dailyActiveTime) &&
            averageTimeData.dailyActiveTime.length > 0 ? (
            <div>
              <div className="mb-3">
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  {secondsToHms(averageTimeData.averagePerDay.seconds)}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-500">
                  Average per day (Mon – Sun)
                </p>
              </div>

              <div className="w-full h-20 sm:h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyChartData}>
                    <Line
                      type="monotone"
                      dataKey="hours"
                      stroke="#AD49E1"
                      strokeWidth={2}
                      dot={{ fill: "#AD49E1", r: 3 }}
                    />
                    <XAxis dataKey="name" hide />
                    <Tooltip content={<CustomTooltip />} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-16 sm:h-20">
              <p className="text-xs text-gray-500">No activity data</p>
            </div>
          )}
        </div>
      </div>

      {/* TOKEN CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6">
        {/* ADD TOKENS */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wide">
            Add Tokens
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="number"
              placeholder="Count"
              className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#E5B4F6] focus:outline-none text-sm"
            />
            <button className="flex items-center justify-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-xs sm:text-sm">
              <PlusCircle size={14} /> Add
            </button>
          </div>
        </div>

        {/* UPDATE TOKENS */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wide">
            Update Tokens
          </h3>
          <div className="flex flex-col sm:flex-row gap-2 items-stretch">
            <input
              type="text"
              placeholder="Select Count"
              className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#E5B4F6] focus:outline-none text-sm"
            />
            <button className="flex items-center justify-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-xs sm:text-sm">
              <RefreshCcw size={14} /> Update
            </button>
          </div>
        </div>
      </div>

      {/* ACTION CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6">
        {/* SUSPEND/UNSUSPEND CARD */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#AD49E1] font-semibold mb-3 text-xs sm:text-sm uppercase tracking-wide">
            {user.isSuspended ? "Unsuspend User" : "Suspend User"}
          </h3>

          {user.isSuspended ? (
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-xs sm:text-sm">
                <p className="text-red-800 font-medium mb-1">
                  ⚠️ User is currently suspended
                </p>
                <p className="text-red-600 text-[11px] sm:text-xs">
                  Suspension ends:{" "}
                  {user.suspensionEnd
                    ? new Date(user.suspensionEnd).toLocaleString()
                    : "Unknown"}
                </p>
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition text-xs sm:text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleUserUnsuspend}
                disabled={unsuspending}
              >
                <UserCheck size={14} className="shrink-0 sm:h-4 sm:w-4" />
                {unsuspending ? "Unsuspending..." : "Unsuspend User"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="Days"
                value={suspendDays}
                onChange={(e) => setSuspendDays(e.target.value)}
                className="border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#E5B4F6] focus:outline-none w-full sm:w-32 text-sm"
                min="1"
              />
              <button
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition text-xs sm:text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleUserSuspend}
                disabled={suspending || !suspendDays}
              >
                <UserX size={14} className="shrink-0 sm:h-4 sm:w-4" />
                {suspending ? "Suspending..." : "Suspend"}
              </button>
            </div>
          )}
        </div>

        {/* EMAIL & ALERT CARD */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col justify-center gap-3">
          <h3 className="text-[#AD49E1] font-semibold mb-1 text-xs sm:text-sm uppercase tracking-wide">
            Actions
          </h3>

          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <button className="flex w-full items-center justify-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-xs sm:text-sm">
              <Bell size={16} /> Token Alert
            </button>
            <button className="flex w-full items-center justify-center gap-1.5 bg-[#AD49E1] text-white px-4 py-2 rounded-md font-medium hover:bg-[#9b34d1] transition text-xs sm:text-sm">
              <Send size={16} /> Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
