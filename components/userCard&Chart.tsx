"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Users, UserCheck, UserCog, Star } from "lucide-react";
import { useState, useEffect } from "react";
import axiosAdmin from "@/lib/axiosAdmin";
import axiosInstance from "@/lib/axiosInstance";

export default function UserManagementDashboard() {
  const [counts, setCounts] = useState({
    totalCount: 0,
    guestCount: 0,
    loggedCount: 0,
    premiumCount: 0,
  });

  const [monthlyUsers, setMonthlyUsers] = useState<
    { name: string; users: number }[]
  >([]);


  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await axiosAdmin.get("/admin/getallusers");
        setCounts({
          totalCount: res.data.totalCount || 0,
          guestCount: res.data.guestCount || 0,
          loggedCount: res.data.loggedCount || 0,
          premiumCount: res.data.premiumCount || 0,
        });
      } catch (err) {
        console.error("Failed to fetch user counts:", err);
      }
    }
    fetchCounts();
  }, []);


  useEffect(() => {
    async function fetchMonthlyNewUsers() {
      try {
        const res = await axiosAdmin.get("/admin/newuserpermonth");

        const usersPerMonth = res.data.usersPerMonth || [];

      
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        
        const formatted = months.map((monthName, index) => {
          const found = usersPerMonth.find(
            (item: any) => item._id?.month === index + 1
          );
          return {
            name: `${monthName} ${found?._id?.year || new Date().getFullYear()}`,
            users: found?.count || 0,
          };
        });

        setMonthlyUsers(formatted);
      } catch (error) {
        console.error("Couldn't fetch monthly users:", error);
      }
    }

    fetchMonthlyNewUsers();
  }, []);


  const cards = [
    {
      title: "All Users",
      value: counts.totalCount,
      percentage: "+8.2%",
      icon: <Users />,
      href: "/admin/user/allusers",
    },
    {
      title: "Guest Users",
      value: counts.guestCount,
      percentage: "-2.1%",
      icon: <UserCog />,
    },
    {
      title: "Logged Users",
      value: counts.loggedCount,
      percentage: "+5.5%",
      icon: <UserCheck />,
    },
    {
      title: "Premium Users",
      value: counts.premiumCount,
      percentage: "+12.8%",
      icon: <Star />,
    },
  ];

const [activeHours, setActiveHours] = useState<any[]>([]);
const [averageActive, setAverageActive] = useState("0h 0m");

const getActivetimedetails = async () => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const res = await axiosAdmin.get(`/admin/activetime?day=${today}`);

    const apiData = res.data?.hourlyActive || [];

    const formatted = apiData.map((item: any) => {
      const hour = item.hour;
      const label =
        hour === 0
          ? "12 AM"
          : hour < 12
          ? `${hour} AM`
          : hour === 12
          ? "12 PM"
          : `${hour - 12} PM`;

      return {
        name: label,
        value: item.active || 0,
      };
    });

    setActiveHours(formatted);
    setAverageActive(res.data?.averageFormatted || "0h 0m");
  } catch (err) {
    console.log("Average active time not fetched", err);
  }
};



useEffect(() => {
  getActivetimedetails();
}, []);




  return (
    <div className="bg-[#f8f9fc] min-h-screen p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        User Management Dashboard
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const CardContentWrapper = (
            <Card
              key={index}
              className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100"
            >
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    {card.title}
                  </p>
                  <h2 className="text-xl font-bold text-gray-900">
                    {card.value.toLocaleString()}
                  </h2>
                  <p
                    className={`text-xs font-semibold ${
                      card.percentage.includes("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {card.percentage}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-inner bg-[#AD49E1]">
                  {card.icon}
                </div>
              </CardContent>
            </Card>
          );

          return card.href ? (
            <Link key={index} href={card.href}>
              {CardContentWrapper}
            </Link>
          ) : (
            CardContentWrapper
          );
        })}
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  
        <Card className="rounded-2xl shadow-md bg-white border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  New Users per Month
                </h3>
                <p className="text-xs text-gray-500">
                  Monthly registration overview
                </p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyUsers}>
                <defs>
                  <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#AD49E1" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#AD49E1" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis
                  tickFormatter={(value) => value.toLocaleString()}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length > 0) {
                      const userCount = payload?.[0]?.value ?? 0;
                      return (
                        <div
                          style={{
                            backgroundColor: "#AD49E1",
                            borderRadius: "10px",
                            padding: "8px 12px",
                            color: "#fff",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          }}
                        >
                          <p style={{ margin: 0, fontWeight: "600" }}>{label}</p>
                          <p style={{ margin: 0, fontSize: "12px" }}>
                            {userCount.toLocaleString()} users
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#AD49E1"
                  strokeWidth={3}
                  fill="url(#usersGradient)"
                  dot={{ r: 4, fill: "#AD49E1" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Average Active Time */}
<Card className="rounded-2xl shadow-md bg-white border border-gray-100">
  <CardContent className="p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Average Active Time
      </h3>
      <span className="text-green-500 text-sm font-semibold">
        +6.4% from last week
      </span>
    </div>

    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={activeHours}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />

        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length > 0) {
              const timeValue = payload?.[0]?.value ?? 0;
              return (
                <div
                  style={{
                    backgroundColor: "#AD49E1",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    color: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: "600" }}>{label}</p>
                  <p style={{ margin: 0, fontSize: "12px" }}>
                    {timeValue.toLocaleString()} active
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#AD49E1"
          strokeWidth={3}
          dot={{ r: 4, fill: "#AD49E1" }}
        />
      </LineChart>
    </ResponsiveContainer>

    <div className="text-center mt-4">
      <h2 className="text-3xl font-bold text-gray-900">{averageActive}</h2>
      <p className="text-sm text-gray-500">Avg. user active time per day</p>
    </div>
  </CardContent>
</Card>

      </div>
    </div>
  );
}

