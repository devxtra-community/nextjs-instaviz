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
        const res = await axiosAdmin.get("/admin/user/stats");
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
        const res = await axiosAdmin.get("/admin/user/newusers");

        const usersPerMonth = res.data.usersPerMonth || [];

        const months = [
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec"
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
      } catch {
        console.error("Couldn't fetch monthly users");
      }
    }

    fetchMonthlyNewUsers();
  }, []);

  const [activeHours, setActiveHours] = useState<any[]>([]);
  const [averageActive, setAverageActive] = useState("0h 0m");

  const getActivetimedetails = async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const res = await axiosAdmin.get(`/admin/user/activetime?day=${today}`);

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

  const cards = [
    {
      title: "ALL USERS",
      value: counts.totalCount,
      icon: <Users size={26} />,
      href: "/admin/user/allusers",
    },
    {
      title: "GUEST USERS",
      value: counts.guestCount,
      icon: <UserCog size={26} />,
    },
    {
      title: "LOGGED USERS",
      value: counts.loggedCount,
      icon: <UserCheck size={26} />,
    },
    {
      title: "PREMIUM USERS",
      value: counts.premiumCount,
      icon: <Star size={26} />,
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {cards.map((card, index) => {
          const Box = (
            <Card
              key={index}
              className="
                rounded-[var(--radius)]
                shadow-sm hover:shadow-md transition
                bg-[var(--card)]
                text-[var(--card-text)]
                border-[var(--card)]
              "
            >
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-xs font-medium mb-2 text-[var(--text-light)]">
                    {card.title}
                  </p>
                  <h2 className="text-2xl font-bold">{card.value.toLocaleString()}</h2>
                </div>

                <div
                  className="
                    w-12 h-12 rounded-xl flex items-center justify-center shadow-sm
                    bg-[var(--icon-bg)] 
                    text-[var(--icon)]
                  "
                >
                  {card.icon}
                </div>
              </CardContent>
            </Card>
          );

          return card.href ? (
            <Link key={index} href={card.href}>{Box}</Link>
          ) : (
            <>{Box}</>
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* MONTHLY USERS */}
        <Card
          className="
            rounded-[var(--radius)]
            shadow-md
            bg-[var(--card)]
            text-[var(--card-text)]
            border-[var(--card)]
          "
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">New Users per Month</h3>
            <p className="text-xs mb-4 text-[var(--text-light)]">
              Monthly registration overview
            </p>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyUsers}>
                <CartesianGrid stroke="#EAEAEA" strokeDasharray="3 3" />
                <XAxis tick={{ fill: "#6b7280" }} dataKey="name" />
                <YAxis tick={{ fill: "#6b7280" }} />

                <Tooltip
                  content={({ active, payload, label }) =>
                    active && payload?.length ? (
                      <div className="p-2 rounded-lg"
                        style={{
                          background: "var(--primary)",
                          color: "var(--text-on-primary)",
                        }}
                      >
                        <p className="font-semibold">{label}</p>
                        <p className="text-sm">{payload[0].value} users</p>
                      </div>
                    ) : null
                  }
                />

                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "var(--text-on-primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ACTIVE TIME */}
        <Card
          className="
            rounded-[var(--radius)]
            shadow-md
            bg-[var(--card)]
            text-[var(--card-text)]
             border-[var(--card)]
          "
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Average Active Time</h3>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={activeHours}>
                <CartesianGrid stroke="#EAEAEA" strokeDasharray="3 3" />
                <XAxis tick={{ fill: "#6b7280" }} dataKey="name" />
                <YAxis tick={{ fill: "#6b7280" }} />

                <Tooltip
                  content={({ active, payload, label }) =>
                    active && payload?.length ? (
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          background: "var(--primary)",
                          color: "var(--text-on-primary)",
                        }}
                      >
                        <p className="font-semibold">{label}</p>
                        <p className="text-sm">{payload[0].value} active</p>
                      </div>
                    ) : null
                  }
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "var(--text-on-primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="text-center mt-4">
              <h2 className="text-3xl font-bold">{averageActive}</h2>
              <p className="text-sm text-[var(--text-light)]">
                Avg. user active time per day
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
