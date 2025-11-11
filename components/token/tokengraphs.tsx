"use client";

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
import { Coins, DollarSign, Users, Star } from "lucide-react";


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

const cards = [
  {
    title: "Total Tokens Issued",
    value: "24.6K",
    percentage: "+12.3%",
    icon: <Coins />,
  },
  {
    title: "Free Tokens Used",
    value: "9.8K",
    percentage: "+5.6%",
    icon: <DollarSign />,
  },
  {
    title: "Paid Tokens Used",
    value: "6.4K",
    percentage: "+8.1%",
    icon: <DollarSign />,
  },
  {
    title: "Premium Users",
    value: "2.3K",
    percentage: "+11.4%",
    icon: <Star />,
  },
];

export default function TokenAccessDashboard() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen p-6 md:p-8 space-y-8">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
          Token Access Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1 md:mt-0">
          
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border border-gray-100"
          >
            <CardContent className="p-5 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">
                  {card.title}
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  {card.value}
                </h2>
                <p
                  className={`text-xs font-semibold mt-1 ${
                    card.percentage.includes("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {card.percentage}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-lg shadow-inner bg-gradient-to-r from-[#8B5CF6] to-[#AD49E1]">
                {card.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Graph Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Tokens Usage */}
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
              <LineChart data={freeTokens}>
                <defs>
                  <linearGradient id="freeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#8B5CF6",
                    border: "none",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                  labelStyle={{ fontWeight: "bold" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  fill="url(#freeGradient)"
                  dot={{ r: 4, fill: "#8B5CF6" }}
                  activeDot={{ r: 6, fill: "#7C3AED" }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 text-center mt-6">
              <div>
                <h4 className="text-lg font-bold text-gray-900">9.8K</h4>
                <p className="text-xs text-gray-500">Used Tokens</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-green-500">+1.3K</h4>
                <p className="text-xs text-gray-500">This Month</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#8B5CF6]">+5.6%</h4>
                <p className="text-xs text-gray-500">Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Paid Tokens Usage */}
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
                <defs>
                  <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#6366F1",
                    border: "none",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={3}
                  fill="url(#paidGradient)"
                  dot={{ r: 4, fill: "#6366F1" }}
                  activeDot={{ r: 6, fill: "#4338CA" }}
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

      {/* Premium Users Chart */}
      <div className="grid grid-cols-1 mt-6">
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
                <defs>
                  <linearGradient
                    id="premiumGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#AD49E1" stopOpacity={0.4} />
                    <stop
                      offset="100%"
                      stopColor="#AD49E1"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#AD49E1",
                    border: "none",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#AD49E1"
                  strokeWidth={3}
                  fill="url(#premiumGradient)"
                  dot={{ r: 4, fill: "#AD49E1" }}
                  activeDot={{ r: 6, fill: "#9333EA" }}
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
