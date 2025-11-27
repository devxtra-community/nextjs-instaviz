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
      title: "ALL USERS",
      value: counts.totalCount,
      icon: <Users size={26} className="text-white" />,
      href: "/admin/user/allusers",
    },
    {
      title: "GUEST USERS",
      value: counts.guestCount,
      icon: <UserCog size={26} className="text-white" />,
    },
    {
      title: "LOGGED USERS",
      value: counts.loggedCount,
      icon: <UserCheck size={26} className="text-white" />,
    },
    {
      title: "PREMIUM USERS",
      value: counts.premiumCount,
      icon: <Star size={26} className="text-white" />,
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
    <div className="bg-[#f8f9fc] min-h-screen">
      
      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {cards.map((card, index) => {
          const CardWrapper = (
            <Card
              key={index}
              className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100"
            >
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-2">
                    {card.title}
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {card.value.toLocaleString()}
                  </h2>
                </div>

                {/* Purple Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-[#A855F7] flex items-center justify-center">
                  {card.icon}
                </div>
              </CardContent>
            </Card>
          );

          return card.href ? (
            <Link key={index} href={card.href}>
              {CardWrapper}
            </Link>
          ) : (
            CardWrapper
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* New Users Per Month */}
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
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length > 0) {
                      const userCount = payload?.[0]?.value ?? 0;
                      return (
                        <div
                          style={{
                            backgroundColor: "#A855F7",
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
                  stroke="#A855F7"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#A855F7" }}
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
                            backgroundColor: "#A855F7",
                            borderRadius: "10px",
                            padding: "8px 12px",
                            color: "#fff",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          }}
                        >
                          <p style={{ margin: 0, fontWeight: "600" }}>
                            {label}
                          </p>
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
                  stroke="#A855F7"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#A855F7" }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="text-center mt-4">
              <h2 className="text-3xl font-bold text-gray-900">
                {averageActive}
              </h2>
              <p className="text-sm text-gray-500">
                Avg. user active time per day
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}