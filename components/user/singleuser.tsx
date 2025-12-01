"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosAdmin from "@/lib/axiosAdmin";
import CustomSelect from "../CustomSelect";
import Image from "next/image";
import {
  Mail, MapPin, Phone, Bell, PlusCircle, RefreshCcw, Send, Clock, UserX, UserCheck,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
} from "recharts";

/* ------------------------------ Types ------------------------------ */

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

/* ------------------------------ Component ------------------------------ */

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState<"active" | "disabled">("active");
  const [singleToken, setSingleToken] = useState<number | null>(null);

  const [activityData, setActivityData] = useState<DailyActiveTime[]>([]);
  const [averageTimeData, setAverageTimeData] = useState<AverageTimeData | null>(null);

  const [loadingAverage, setLoadingAverage] = useState(true);
  const [suspendDays, setSuspendDays] = useState("");
  const [suspending, setSuspending] = useState(false);
  const [unsuspending, setUnsuspending] = useState(false);

  const secondsToHms = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  };

  /* ------------------------------ Fetch User ------------------------------ */

  const fetchUserSinglePage = async () => {
    try {
      const res = await axiosAdmin.get(`/admin/user/singleuser/${id}`);
      const data = res.data.singleuser;
      setUser(data);
      setStatus(data?.status || "active");
    } catch {
      console.log("Error fetching single user");
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleUserToken = async () => {
    try {
      const res = await axiosAdmin.get(`/admin/user/singletoken/${id}`);
      setSingleToken(res.data.singletoken);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserActivity = async () => {
    try {
      const res = await axiosAdmin.get(`/admin/user/user-daily-active/${id}`);
      if (res.data.success && res.data.dailyActiveTime) {
        const last7 = res.data.dailyActiveTime.slice(-7);
        setActivityData(last7);
      }
    } catch {
      setActivityData([]);
    }
  };

  const fetchAverageTime = async () => {
    try {
      setLoadingAverage(true);
      const res = await axiosAdmin.get(`/admin/user/singleUsertime/${id}`);

      if (res.data.success && res.data.dailyActiveTime) {
        const daily = res.data.dailyActiveTime.map((d: any) => ({
          date: d.date,
          dayName: d.dayName,
          totalSeconds: Number(d.totalSeconds || 0),
          formatted: secondsToHms(Number(d.totalSeconds || 0)),
        }));

        setAverageTimeData({
          ...res.data,
          dailyActiveTime: daily,
          totalSeconds: Number(res.data.totalSeconds || 0),
          averagePerDay: {
            seconds: res.data.averagePerDay?.seconds || 0,
            formatted: secondsToHms(res.data.averagePerDay?.seconds || 0),
          },
        });
      }
    } catch {
      setAverageTimeData(null);
    } finally {
      setLoadingAverage(false);
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

  /* ------------------------------ Status Update ------------------------------ */

  const handleStatusChange = async (newStatus: string) => {
    try {
      await axiosAdmin.put(`/admin/user/status/${id}`, { status: newStatus });
      setStatus(newStatus as any);
    } catch {
      alert("Failed to update status.");
    }
  };

  /* ------------------------------ Suspend ------------------------------ */

  const handleUserSuspend = async () => {
    if (!suspendDays || Number(suspendDays) <= 0) {
      alert("Enter valid days");
      return;
    }
    try {
      setSuspending(true);
      await axiosAdmin.put(`/admin/user/suspend/${id}?days=${suspendDays}`);
      await fetchUserSinglePage();
      setSuspendDays("");
    } finally {
      setSuspending(false);
    }
  };

  const handleUserUnsuspend = async () => {
    try {
      setUnsuspending(true);
      await axiosAdmin.put(`/admin/user/unsuspend/${id}`);
      await fetchUserSinglePage();
    } finally {
      setUnsuspending(false);
    }
  };

  /* ------------------------------ Token Graph ------------------------------ */

  const tokenData = [
    { name: "Jan", value: 15 },
    { name: "Feb", value: 22 },
    { name: "Mar", value: 18 },
    { name: "Apr", value: 24 },
    { name: "May", value: 27 },
  ];

  const weeklyChartData =
    averageTimeData?.dailyActiveTime.map((d) => ({
      name: d.dayName.substring(0, 3),
      hours: +(d.totalSeconds / 3600).toFixed(2),
      formatted: d.formatted,
    })) || [];

  const CustomTooltip = ({ active, payload }: any) =>
    active && payload?.length ? (
      <div className="rounded border border-[var(--card-border)] bg-[var(--card)] p-2 shadow-sm">
        <p className="text-sm font-medium text-[var(--text-on-primary)]">
          {payload[0].payload.name}
        </p>
        <p className="text-sm text-[var(--primary)]">
          {payload[0].payload.formatted}
        </p>
      </div>
    ) : null;

  /* ------------------------------ Rendering ------------------------------ */

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-[var(--text-light)]">
        Loading...
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        User not found
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--secondary-color)] px-3 py-4 sm:px-4 md:px-6">

      {/* PAGE TITLE */}
      <h1 className="text-xl sm:text-2xl font-semibold text-[var(--text-dark)] mb-4">
        User Profile
      </h1>

      {/* ------------------------------ HEADER CARD ------------------------------ */}
      <div
        className="
          rounded-2xl shadow-sm overflow-hidden mb-5 
          text-[var(--text-on-primary)]
          bg-gradient-to-r
          from-[color-mix(in_srgb,var(--primary)_90%,white_0%)]
          via-[color-mix(in_srgb,var(--primary)_70%,white_0%)]
          to-[color-mix(in_srgb,var(--primary-color)_50%,white_0%)]
        "
      >
        <div className="flex flex-col md:flex-row items-center gap-4 p-6">

          {/* Avatar */}
          <div className="relative w-20 h-20 sm:w-28 sm:h-28">
            {user.picture ? (
              <Image
                src={user.picture}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-[var(--card)] shadow-lg w-full h-full"
              />
            ) : (
              <div
                className="
                  w-full h-full flex items-center justify-center rounded-full
                  bg-[var(--card)] text-[var(--primary)]
                  border-4 border-[var(--primary)] shadow-lg
                  text-3xl font-semibold
                "
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold">{user.name}</h2>
            <p className="text-xs sm:text-sm opacity-90">Premium User</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3 text-xs sm:text-sm opacity-90">
              <div className="flex items-center gap-1.5 break-all">
                <Mail size={14} /> <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={14} /> <span>{user.phone || "N/A"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} /> <span>{user.location || "Unknown"}</span>
              </div>
            </div>

            {user.isSuspended && user.suspensionEnd && (
              <div className="mt-3 bg-red-500/30 border border-white/60 rounded-lg px-3 py-2 text-xs">
                Suspended until {new Date(user.suspensionEnd).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------ MAIN GRID ------------------------------ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-6">

        {/* TOKENS CARD */}
        <div className="bg-[var(--card)] rounded-xl p-5 shadow-sm  border-[var(--card)]">
          <h3 className="text-[var(--primary-color)] font-semibold text-xs uppercase mb-2">
            Available Tokens
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-[var(--text-dark)]">{singleToken ?? 0}</p>
            <div className="w-24 h-14">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tokenData}>
                  <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* STATUS CARD */}
        <div className="bg-[var(--card)] rounded-xl p-5 shadow-sm border-[var(--card)]">
          <h3 className="text-[var(--primary-color)] font-semibold text-xs uppercase mb-2">
            Account Status
          </h3>

          <div className="flex flex-col sm:flex-row gap-2">
            <CustomSelect value={status} onChange={(v: any) => setStatus(v)} />

            <button
              onClick={() => handleStatusChange(status)}
              className="
                px-4 py-2 rounded-md text-xs sm:text-sm font-medium shadow-sm
                bg-[var(--primary-color)] text-[var(--text-on-primary)]
                hover:bg-[var(--primary-hover)]
              "
            >
              Done
            </button>
          </div>

          <p className="mt-2 text-xs text-[var(--text-light)]">
            Current status:
            <span
              className={`
                font-semibold
                ${status === "active" ? "text-green-600" : "text-red-600"}
              `}
            >
              {" "}
              {status}
            </span>
          </p>
        </div>

        {/* WEEKLY ACTIVITY */}
        <div className="bg-[var(--card)] rounded-xl p-5 shadow-sm border border-[var(--card)]">
          <h3 className="text-[var(--primary-color)] font-semibold mb-3 text-xs uppercase flex items-center gap-2">
            <Clock size={16} /> Weekly Active Time
          </h3>

          {loadingAverage ? (
            <p className="text-xs text-[var(--text-light)]">Loading...</p>
          ) : averageTimeData ? (
            <>
              <p className="text-2xl font-bold text-[var(--primary)]">
                {averageTimeData.averagePerDay.formatted}
              </p>
              <p className="text-[11px] text-[var(--text-light)] mb-2">Avg per day</p>

              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyChartData}>
                    <Line
                      type="monotone"
                      dataKey="hours"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      dot={{ fill: "var(--primary-color)", r: 3 }}
                    />
                    <XAxis dataKey="name" hide />
                    <Tooltip content={<CustomTooltip />} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <p className="text-xs text-[var(--text-light)]">No activity</p>
          )}
        </div>
      </div>

      {/* ------------------------------ TOKEN CONTROLS ------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

        {/* Add Tokens */}
        <div className="bg-[var(--card)] rounded-xl p-5 shadow-sm border border-[var(--card)]">
          <h3 className="text-[var(--primary-color)] text-xs font-semibold uppercase mb-2">
            Add Tokens
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Count"
              className="
                flex-1 border border-[var(--card-border)] rounded-md px-3 py-2 text-sm
                focus:ring-2 focus:ring-[var(--primary-light)]
              "
            />
            <button
              className="
                flex items-center justify-center gap-1.5 
                bg-[var(--primary)] hover:bg-[var(--primary-hover)]
                text-[var(--text-on-primary)] px-4 py-2 rounded-md
                text-xs sm:text-sm
              "
            >
              <PlusCircle size={14} /> Add
            </button>
          </div>
        </div>

        {/* Update Tokens */}
        <div className="bg-[var(--card)] rounded-xl p-5 shadow-sm border border-[var(--card)]">
          <h3 className="text-[var(--primary-color)] text-xs font-semibold uppercase mb-2">
            Update Tokens
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Select Count"
              className="
                flex-1 border border-[var(--card-border)] rounded-md px-3 py-2 text-sm 
                focus:ring-2 focus:ring-[var(--primary-light)]
              "
            />
            <button
              className="
                flex items-center justify-center gap-1.5 
                bg-[var(--primary)] hover:bg-[var(--primary)]
                text-[var(--text-on-primary)] px-4 py-2 rounded-md
                text-xs sm:text-sm
              "
            >
              <RefreshCcw size={14} /> Update
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------ SUSPEND + ACTIONS ------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Suspend / Unsuspend */}
        <div className="bg-[var(--card)] rounded-xl p-5 shadow-sm border border-[var(--card)]">
          <h3 className="text-[var(--primary-color)] font-semibold text-xs uppercase mb-2">
            {user.isSuspended ? "Unsuspend User" : "Suspend User"}
          </h3>

          {/* UNSUSPEND */}
          {user.isSuspended ? (
            <button
              onClick={handleUserUnsuspend}
              disabled={unsuspending}
              className="
                w-full flex justify-center items-center gap-2
                bg-green-600 hover:bg-green-700 text-white
                px-4 py-2 rounded-md text-xs sm:text-sm
              "
            >
              <UserCheck size={14} />
              {unsuspending ? "Unsuspending..." : "Unsuspend"}
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Days"
                value={suspendDays}
                onChange={(e) => setSuspendDays(e.target.value)}
                className="
                  flex-1 border border-[var(--card-border)] rounded-md px-3 py-2 text-sm
                  focus:ring-2 focus:ring-[var(--primary-light)]
                "
              />
              <button
                onClick={handleUserSuspend}
                disabled={suspending}
                className="
                  flex items-center justify-center gap-2 bg-red-600 
                  hover:bg-red-700 text-white 
                  px-4 py-2 rounded-md text-xs sm:text-sm
                "
              >
                <UserX size={14} /> {suspending ? "..." : "Suspend"}
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-[var(--card)] rounded-xl p-5 shadow-sm border border-[var(--card)] flex flex-col gap-2">
          <h3 className="text-[var(--primary-color)] text-xs font-semibold uppercase">
            Actions
          </h3>

          <button
            className="
              w-full flex justify-center items-center gap-2 
              bg-[var(--primary)] hover:bg-[var(--primary-hover)]
              text-[var(--text-on-primary)] px-4 py-2 rounded-md text-xs sm:text-sm
            "
          >
            <Bell size={14} /> Token Alert
          </button>

          <button
            className="
              w-full flex justify-center items-center gap-2 
              bg-[var(--primary)] hover:bg-[var(--primary-hover)]
              text-[var(--text-on-primary)] px-4 py-2 rounded-md text-xs sm:text-sm
            "
          >
            <Send size={14} /> Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
