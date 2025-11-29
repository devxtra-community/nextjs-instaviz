"use client";

import { useState, useEffect } from "react";
import axiosAdmin from "@/lib/axiosAdmin";

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
import { Coins, DollarSign, Star } from "lucide-react";

export default function TokenAccessDashboard() {
  const [alltokenCount, setAllTokenCount] = useState<number>(0);
  const [alltokenusage, setAlltokenusage] = useState<any[]>([]);

  const fetchAlltokens = async () => {
    try {
      const res = await axiosAdmin.get("/admin/token/alltokens");
      const total =
        res.data?.alltokencount?.[0]?.totalTokens !== undefined
          ? res.data.alltokencount[0].totalTokens
          : 0;
      setAllTokenCount(total);
    } catch (err) {
      console.log("Failed to fetch token count:", err);
    }
  };

  const fetchMontlytokenusage = async () => {
    try {
      const res = await axiosAdmin.get("/admin/token/alltokenusage");
      const totalTokenusage = res.data.totaltokeusagepermonth || [];

      const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec",
      ];

      const formattedMonths = months.map((monthName, index) => {
        const found = totalTokenusage.find(
          (item: any) => item._id?.month === index + 1
        );
        return { name: monthName, value: found ? found.totalTokens : 0 };
      });

      setAlltokenusage(formattedMonths);
    } catch (err) {
      console.log("cant fetch token", err);
    }
  };

  useEffect(() => {
    fetchAlltokens();
    fetchMontlytokenusage();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* TITLE */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1
          className="hidden md:block text-3xl font-semibold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          Token Access Overview
        </h1>
      </div>

      {/* MOBILE */}
      <h1
        id="mobile-page-title"
        className="md:hidden text-xl font-bold mb-4"
        style={{ color: "var(--foreground)" }}
      ></h1>

      {/* ===================== STATS CARDS ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        {/* CARD TEMPLATE */}
        {[
          { label: "Total Tokens Issued", value: alltokenCount, icon: <Coins size={26} /> },
          { label: "Free Tokens Used", value: "9.8K", icon: <DollarSign size={26} /> },
          { label: "Paid Tokens Used", value: "6.4K", icon: <DollarSign size={26} /> },
          { label: "Premium Users", value: "2.3K", icon: <Star size={26} /> },
        ].map((item, index) => (
          <Card
            key={index}
            className="rounded-2xl shadow-sm"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--card-foreground)",
            }}
          >
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p
                  className="text-xs font-medium uppercase mb-2"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {item.label}
                </p>
                <h2 className="text-2xl font-bold">{item.value}</h2>
              </div>

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                {item.icon}
              </div>
            </CardContent>
          </Card>
        ))}

      </div>

      {/* ===================== CHARTS ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* FREE TOKEN USAGE */}
        <Card
          className="rounded-2xl shadow-md"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--card-foreground)",
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Free Token Usage</h3>
            <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
              Overview of free token usage growth
            </p>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={alltokenusage}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fill: "var(--muted-foreground)" }} />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload?.length) {
                      const val = payload[0]?.value ?? 0;
                      return (
                        <div
                          style={{
                            background: "var(--primary)",
                            color: "var(--primary-foreground)",
                            padding: "10px",
                            borderRadius: "8px",
                          }}
                        >
                          <p className="font-semibold">{label}</p>
                          <p className="text-sm">{val}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "var(--primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* PAID TOKEN USAGE */}
        <Card
          className="rounded-2xl shadow-md"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--card-foreground)",
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Paid Token Usage</h3>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={alltokenusage}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fill: "var(--muted-foreground)" }} />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload?.length) {
                      const val = payload[0]?.value ?? 0;
                      return (
                        <div
                          style={{
                            background: "var(--primary)",
                            color: "var(--primary-foreground)",
                            padding: "10px",
                            borderRadius: "8px",
                          }}
                        >
                          <p className="font-semibold">{label}</p>
                          <p className="text-sm">{val}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "var(--primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="text-center mt-5">
              <h2 className="text-3xl font-bold">6.4K</h2>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Total paid tokens used
              </p>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ===================== PREMIUM USERS CHART ===================== */}
      <Card
        className="rounded-2xl shadow-md"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          color: "var(--card-foreground)",
        }}
      >
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3">Premium Users Growth</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={alltokenusage}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)" }} />
              <YAxis tick={{ fill: "var(--muted-foreground)" }} />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload?.length) {
                    const val = payload[0]?.value ?? 0;
                    return (
                      <div
                        style={{
                          background: "var(--primary)",
                          color: "var(--primary-foreground)",
                          padding: "10px",
                          borderRadius: "8px",
                        }}
                      >
                        <p className="font-semibold">{label}</p>
                        <p className="text-sm">{val}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="text-center mt-5">
            <h2 className="text-3xl font-bold">2.3K</h2>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Total premium active users
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
