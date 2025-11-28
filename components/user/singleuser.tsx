"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosAdmin from "@/lib/axiosAdmin";
import Image from "next/image";
import {Mail,MapPin,Phone,Bell,PlusCircle,RefreshCcw,Send,Clock,UserX,UserCheck,} from "lucide-react";
import {LineChart,Line,BarChart,Bar,XAxis,Tooltip,ResponsiveContainer,} from "recharts";

interface UserType {
  _id: string;name: string;email: string;
  picture?: string;phone?: string;
  location?: string;status?: "active" | "disabled";isSuspended?: boolean;
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
    if (
      !suspendDays ||
      isNaN(Number(suspendDays)) ||
      Number(suspendDays) <= 0
    ) {
      alert("Please enter a valid number of days (greater than 0)");
      return;
    }

    try {
      setSuspending(true);
      console.log(`Suspending user for ${suspendDays} days...`);

      const res = await axiosAdmin.put(
        `/admin/suspend/${id}?days=${suspendDays}`
      );

      console.log("Suspend response:", res.data);
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
      console.log("Unsuspending user...");

      const res = await axiosAdmin.put(`/admin/unsuspend/${id}`);

      console.log("Unsuspend response:", res.data);
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
    <div className="min-h-screen bg-[#F9FAFB] p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
      {/* Page Title */}
      <h1 className="mb-4 text-xl font-semibold tracking-tight text-gray-800 sm:mb-5 sm:text-2xl md:text-3xl">
        User Profile
      </h1>

      {/* HEADER CARD */}
      <div className="mb-4 overflow-hidden rounded-xl bg-gradient-to-r from-[#AD49E1] via-[#C56BE8] to-[#E19BFF] text-white shadow-md sm:mb-5 sm:rounded-2xl md:mb-6 lg:mb-8">
        <div className="flex flex-col items-center gap-4 p-4 sm:gap-5 sm:p-5 md:flex-row md:gap-6 md:p-7 lg:p-8">
          {/* Profile Picture */}
          <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32">
            {user.picture ? (
              <Image
                src={user.picture}
                alt={user.name}
                width={128}
                height={128}
                className="rounded-full border-3 border-white object-cover shadow-lg sm:border-4"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full border-3 border-white bg-[#E8C7F7] text-2xl font-semibold text-[#AD49E1] shadow-lg sm:border-4 sm:text-3xl lg:text-4xl">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-1 text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
              {user.name}
            </h2>
            <p className="text-xs opacity-90 sm:text-sm md:text-base">Premium User</p>

            {/* Contact Info */}
            <div className="mt-2 flex flex-col gap-2 text-xs opacity-90 sm:mt-3 sm:gap-3 sm:text-sm md:flex-row md:flex-wrap md:text-base lg:mt-4">
              <div className="flex items-center justify-center gap-1.5 md:justify-start">
                <Mail size={14} className="shrink-0 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 md:justify-start">
                <Phone size={14} className="shrink-0 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <span>{user.phone || "+91 00000 00000"}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 md:justify-start">
                <MapPin size={14} className="shrink-0 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <span>{user.location || "Unknown"}</span>
              </div>
            </div>

            {/* Suspension Status */}
            {user.isSuspended && user.suspensionEnd && (
              <div className="mt-3 inline-block rounded-lg border border-white bg-red-500 bg-opacity-20 px-3 py-2 text-xs sm:text-sm md:mt-4 md:text-base">
                ⚠️ Account Suspended until{" "}
                {new Date(user.suspensionEnd).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN GRID - Stats Cards */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-5 sm:gap-4 md:mb-6 md:grid-cols-2 md:gap-5 lg:mb-8 lg:grid-cols-3 xl:gap-6">
        {/* TOKEN CARD */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:rounded-xl sm:p-5 lg:p-6">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#AD49E1] sm:text-sm md:mb-3">
            Available Tokens
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              {singleToken ?? 0}
            </p>
            <div className="h-10 w-20 sm:h-12 sm:w-28 lg:h-14 lg:w-32">
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
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:rounded-xl sm:p-5 lg:p-6">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#AD49E1] sm:text-sm md:mb-3">
            Account Status
          </h3>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "active" | "disabled")
              }
              className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-xs text-gray-700 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#E5B4F6] sm:text-sm lg:py-2.5"
            >
              <option value="active">🟢 Active</option>
              <option value="disabled">🔴 Disabled</option>
            </select>

            <button
              onClick={() => handleStatusChange(status)}
              className="flex items-center justify-center gap-1.5 rounded-md bg-[#AD49E1] px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-[#9b34d1] active:scale-95 sm:text-sm lg:px-5 lg:py-2.5"
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
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:rounded-xl sm:p-5 md:col-span-2 lg:col-span-1 lg:p-6">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#AD49E1] sm:text-sm">
            <Clock size={14} className="sm:h-4 sm:w-4" />
            Average Active Time (Weekly)
          </h3>

          {loadingAverage ? (
            <div className="flex h-20 items-center justify-center lg:h-24">
              <p className="text-xs text-gray-500 sm:text-sm">Loading...</p>
            </div>
          ) : averageTimeData &&
            Array.isArray(averageTimeData.dailyActiveTime) &&
            averageTimeData.dailyActiveTime.length > 0 ? (
            <div>
              <div className="mb-3 md:mb-4">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                  {secondsToHms(averageTimeData.averagePerDay.seconds)}
                </p>
                <p className="text-xs text-gray-500 sm:text-sm">
                  Average per day (Mon – Sun)
                </p>
              </div>

              <div className="h-14 w-full sm:h-16 lg:h-20">
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
            <div className="flex h-20 items-center justify-center lg:h-24">
              <p className="text-xs text-gray-500 sm:text-sm">No activity data</p>
            </div>
          )}
        </div>
      </div>

      {/* TOKEN CONTROLS */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-5 sm:gap-4 md:mb-6 md:grid-cols-2 md:gap-5 lg:mb-8 xl:gap-6">
        {/* ADD TOKENS */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:rounded-xl sm:p-5 lg:p-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#AD49E1] sm:text-sm md:mb-4">
            Add Tokens
          </h3>
          <div className="flex gap-2 sm:gap-3">
            <input
              type="number"
              placeholder="Count"
              className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E5B4F6] sm:text-sm lg:py-2.5"
            />
            <button className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-[#AD49E1] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#9b34d1] active:scale-95 sm:px-4 sm:text-sm lg:px-5 lg:py-2.5">
              <PlusCircle size={14} className="shrink-0 sm:h-4 sm:w-4" /> Add
            </button>
          </div>
        </div>

        {/* UPDATE TOKENS */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:rounded-xl sm:p-5 lg:p-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#AD49E1] sm:text-sm md:mb-4">
            Update Tokens
          </h3>
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="text"
              placeholder="Select Count"
              className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E5B4F6] sm:text-sm lg:py-2.5"
            />
            <button className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-[#AD49E1] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#9b34d1] active:scale-95 sm:px-4 sm:text-sm lg:px-5 lg:py-2.5">
              <RefreshCcw size={14} className="shrink-0 sm:h-4 sm:w-4" /> Update
            </button>
          </div>
        </div>
      </div>

      {/* ACTION CONTROLS */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 xl:gap-6">
        {/* SUSPEND/UNSUSPEND CARD */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:rounded-xl sm:p-5 lg:p-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#AD49E1] sm:text-sm md:mb-4">
            {user.isSuspended ? "Unsuspend User" : "Suspend User"}
          </h3>

          {user.isSuspended ? (
            // UNSUSPEND UI
            <div className="space-y-3 md:space-y-4">
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-xs sm:text-sm lg:p-4">
                <p className="mb-1 font-medium text-red-800">
                  ⚠️ User is currently suspended
                </p>
                <p className="text-xs text-red-600 sm:text-sm">
                  Suspension ends:{" "}
                  {user.suspensionEnd
                    ? new Date(user.suspensionEnd).toLocaleString()
                    : "Unknown"}
                </p>
              </div>

              <button
                className="flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-green-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400 sm:text-sm lg:py-2.5"
                onClick={handleUserUnsuspend}
                disabled={unsuspending}
              >
                <UserCheck size={14} className="shrink-0 sm:h-4 sm:w-4" />
                {unsuspending ? "Unsuspending..." : "Unsuspend User"}
              </button>
            </div>
          ) : (
            // SUSPEND UI
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <input
                type="number"
                placeholder="Days"
                value={suspendDays}
                onChange={(e) => setSuspendDays(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E5B4F6] sm:w-24 sm:text-sm lg:w-28 lg:py-2.5"
                min="1"
              />
              <button
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400 sm:text-sm lg:py-2.5"
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
        <div className="flex flex-col justify-center gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:rounded-xl sm:p-5 md:gap-4 lg:p-6">
          <h3 className="mb-0 text-xs font-semibold uppercase tracking-wide text-[#AD49E1] sm:mb-1 sm:text-sm">
            Actions
          </h3>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[#AD49E1] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#9b34d1] active:scale-95 sm:text-sm lg:py-2.5">
              <Bell size={14} className="shrink-0 sm:h-4 sm:w-4" /> Token Alert
            </button>
            <button className="flex w-full items-center justify-center gap-1.5 rounded-md bg-[#AD49E1] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#9b34d1] active:scale-95 sm:text-sm lg:py-2.5">
              <Send size={14} className="shrink-0 sm:h-4 sm:w-4" /> Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}