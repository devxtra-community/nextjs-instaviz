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

const freeTokens = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 1900 },
  { name: "Mar", value: 2400 },
  { name: "Apr", value: 2800 },
  { name: "May", value: 2200 },
  { name: "Jun", value: 3100 },
  { name: "Jul", value: 4000 },
];

const paidTokens = [
  { name: "Jan", value: 700 },
  { name: "Feb", value: 950 },
  { name: "Mar", value: 1200 },
  { name: "Apr", value: 1400 },
  { name: "May", value: 1600 },
  { name: "Jun", value: 1900 },
  { name: "Jul", value: 2100 },
];

const premiumUsers = [
  { name: "Jan", value: 420 },
  { name: "Feb", value: 530 },
  { name: "Mar", value: 680 },
  { name: "Apr", value: 800 },
  { name: "May", value: 950 },
  { name: "Jun", value: 1050 },
  { name: "Jul", value: 1170 },
];

export default function TokenAccessDashboard() {
  const [alltokenCount, setAllTokenCount] = useState<number>(0);
  const [alltokenusage, setAlltokenusage] = useState<any[]>([]);

  const fetchAlltokens = async () => {
    try {
      const res = await axiosAdmin.get("/admin/alltokens");

      const total =
        res.data?.alltokencount?.[0]?.totalTokens !== undefined
          ? res.data.alltokencount[0].totalTokens
          : 0;

      console.log("Fetched total tokens:", total);
      setAllTokenCount(total);
    } catch (err) {
      console.log("Failed to fetch token count:", err);
    }
  };

  const fetchMontlytokenusage = async () => {
    try {
      const res = await axiosAdmin.get("/admin/alltokenusage");
      console.log("token usage fetched successfully", res.data);

      const totalTokenusage = res.data.totaltokeusagepermonth || [];

      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];

      const formattedMonths = months.map((monthName, index) => {
        const found = totalTokenusage.find(
          (item: any) => item._id?.month === index + 1
        );

        return {
          name: monthName,
          value: found ? found.totalTokens : 0,
        };
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
    <div className="bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
          Token Access Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-2">
                Total Tokens Issued
              </p>
              <h2 className="text-2xl font-bold text-gray-900">
                {alltokenCount}
              </h2>
              <p className="text-xs font-semibold mt-1 text-green-500">
                +12.3%
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-inner bg-gradient-to-r from-[#8B5CF6] to-[#AD49E1]">
              <Coins />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-2">
                Free Tokens Used
              </p>
              <h2 className="text-2xl font-bold text-gray-900">9.8K</h2>
              <p className="text-xs font-semibold mt-1 text-green-500">+5.6%</p>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-[#8B5CF6] to-[#AD49E1] text-white">
              <DollarSign />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-2">
                Paid Tokens Used
              </p>
              <h2 className="text-2xl font-bold text-gray-900">6.4K</h2>
              <p className="text-xs font-semibold mt-1 text-green-500">+8.1%</p>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white">
              <DollarSign />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-2">
                Premium Users
              </p>
              <h2 className="text-2xl font-bold text-gray-900">2.3K</h2>
              <p className="text-xs font-semibold mt-1 text-green-500">
                +11.4%
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-[#AD49E1] to-[#9333EA] text-white">
              <Star />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="rounded-2xl shadow-md bg-white border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Free Token Usage
                </h3>
                <p className="text-xs text-gray-500">
                  Overview of free token usage growth
                </p>
              </div>
              <span className="text-green-500 text-sm font-semibold">
                +5.6% this month
              </span>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={alltokenusage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md bg-white border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Paid Token Usage
              </h3>
              <span className="text-green-500 text-sm font-semibold">
                +8.1% this month
              </span>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={paidTokens}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="text-center mt-5">
              <h2 className="text-3xl font-bold text-gray-900">6.4K</h2>
              <p className="text-sm text-gray-500">Total paid tokens used</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1">
        <Card className="rounded-2xl shadow-md bg-white border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Premium Users Growth
              </h3>
              <span className="text-green-500 text-sm font-semibold">
                +11.4% increase
              </span>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={premiumUsers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#AD49E1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="text-center mt-5">
              <h2 className="text-3xl font-bold text-gray-900">2.3K</h2>
              <p className="text-sm text-gray-500">
                Total premium active users
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
