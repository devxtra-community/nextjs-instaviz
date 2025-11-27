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

  useEffect(() => {
    document.getElementById("mobile-page-title")!.textContent =
      "Token Access Overview";
  }, []);

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
    <div className="bg-[#F9FAFB] min-h-screen p-6 md:p-8 space-y-8">

      {/* DESKTOP TITLE */}
      <h1 className="hidden md:block text-3xl font-semibold text-gray-800 tracking-tight">
        Token Access Overview
      </h1>

      {/* MOBILE TITLE */}
      <h1 id="mobile-page-title" className="md:hidden text-xl font-bold mb-4"></h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100">
          <CardContent className="p-6 flex justify-between items-center">
      {/* DASHBOARD STYLE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
        
        {/* Total Tokens */}
        <Card className="rounded-2xl shadow-sm bg-white border border-gray-100">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-2">
                Total Tokens Issued
              </p>
              <h2 className="text-2xl font-bold text-gray-900">
                {alltokenCount}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-inner bg-gradient-to-r from-[#8B5CF6] to-[#AD49E1]">
              <Coins />

            {/* ICON (Dashboard Style) */}
            <div className="w-12 h-12 rounded-xl bg-[#A855F7] flex items-center justify-center">
              <Coins size={26} className="text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100">
          <CardContent className="p-6 flex justify-between items-center">
        {/* Free Tokens Used */}
        <Card className="rounded-2xl shadow-sm bg-white border border-gray-100">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-2">
                Free Tokens Used
              </p>
              <h2 className="text-2xl font-bold text-gray-900">9.8K</h2>
              <p className="text-xs font-semibold mt-1 text-green-500">+5.6%</p>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">9.8K</h2>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-[#8B5CF6] to-[#AD49E1] text-white">
              <DollarSign />

            <div className="w-12 h-12 rounded-xl bg-[#A855F7] flex items-center justify-center">
              <DollarSign size={26} className="text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100">
          <CardContent className="p-6 flex justify-between items-center">
        {/* Paid Tokens Used */}
        <Card className="rounded-2xl shadow-sm bg-white border border-gray-100">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-2">
                Paid Tokens Used
              </p>
              <h2 className="text-2xl font-bold text-gray-900">6.4K</h2>
              <p className="text-xs font-semibold mt-1 text-green-500">+8.1%</p>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">6.4K</h2>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white">
              <DollarSign />

            <div className="w-12 h-12 rounded-xl bg-[#A855F7] flex items-center justify-center">
              <DollarSign size={26} className="text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100">
          <CardContent className="p-6 flex justify-between items-center">
        {/* Premium Users */}
        <Card className="rounded-2xl shadow-sm bg-white border border-gray-100">
          <CardContent className="p-5 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase mb-2">
                Premium Users
              </p>
              <h2 className="text-2xl font-bold text-gray-900">2.3K</h2>
              <p className="text-xs font-semibold mt-1 text-green-500">
                +11.4%
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">2.3K</h2>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-[#AD49E1] to-[#9333EA] text-white">
              <Star />

            <div className="w-12 h-12 rounded-xl bg-[#A855F7] flex items-center justify-center">
              <Star size={26} className="text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Free Token Usage */}
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
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={alltokenusage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#A855F7" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Paid Token Usage */}
        <Card className="rounded-2xl shadow-md bg-white border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Paid Token Usage
              </h3>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={paidTokens}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#A855F7" strokeWidth={3} />
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
      {/* Premium Users Growth */}
      <div className="grid grid-cols-1 mt-6">
        <Card className="rounded-2xl shadow-md bg-white border border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Premium Users Growth
              </h3>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={premiumUsers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#A855F7" strokeWidth={3} />
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
