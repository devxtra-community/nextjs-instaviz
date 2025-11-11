"use client";

import Image from "next/image";
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import {
  Mail,
  MapPin,
  Phone,
  Bell,
  PlusCircle,
  RefreshCcw,
  Send,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const statusOptions = ["Active", "Deactive"];
const tokenOptions = ["Select Count", "+5", "+10", "+20", "+50"];
const suspendOptions = ["7 Days", "14 Days", "30 Days"];

// Example data for small graphs
const tokenData = [
  { name: "Jan", value: 15 },
  { name: "Feb", value: 22 },
  { name: "Mar", value: 18 },
  { name: "Apr", value: 24 },
  { name: "May", value: 27 },
];

const activityData = [
  { name: "Mon", value: 65 },
  { name: "Tue", value: 75 },
  { name: "Wed", value: 68 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 72 },
  { name: "Sat", value: 78 },
  { name: "Sun", value: 70 },
];

function CustomSelect({ options, selected, setSelected }) {
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-left text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm font-medium transition">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-4 w-4 text-indigo-400" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-gray-200 focus:outline-none">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-1.5 pl-8 pr-3 ${
                      active ? "bg-indigo-50 text-indigo-700" : "text-gray-600"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold text-indigo-700" : ""
                        }`}
                      >
                        {option}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-2 flex items-center text-indigo-600">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default function UserProfilePage() {
  const [status, setStatus] = useState(statusOptions[0]);
  const [tokenCount, setTokenCount] = useState(tokenOptions[0]);
  const [suspend, setSuspend] = useState(suspendOptions[0]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-5">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-5 tracking-tight">
        User Profile
      </h1>

      {/* Header Section */}
      <div className="rounded-2xl shadow-sm overflow-hidden mb-6 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="relative w-28 h-28">
            <Image
              src="/avatars/emilia.jpg"
              alt="User Avatar"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-1">nadhil</h2>
            <p className="text-sm opacity-90">Premium User</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3 text-sm opacity-90">
              <div className="flex items-center gap-1.5">
                <Mail size={15} />nadhil@.com
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={15} /> +44 4567 890 123
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={15} /> ernakulam
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Available Tokens */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <h3 className="text-indigo-600 font-semibold mb-2 text-sm uppercase tracking-wide">
            Available Tokens
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-gray-900">27</p>
            <div className="w-28 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tokenData}>
                  <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Token usage for the last 5 months
          </p>
        </div>

        {/* Account Status */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <h3 className="text-indigo-600 font-semibold mb-2 text-sm uppercase tracking-wide">
            Account Status
          </h3>
          <CustomSelect
            options={statusOptions}
            selected={status}
            setSelected={setStatus}
          />
        </div>

        {/* Average Active Time */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <h3 className="text-indigo-600 font-semibold mb-2 text-sm uppercase tracking-wide">
            Avg. Active Time
          </h3>
          <div className="w-full h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                />
                <XAxis dataKey="name" hide />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Weekly average activity percentage
          </p>
        </div>
      </div>

      {/* Token Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <h3 className="text-indigo-600 font-semibold mb-3 text-sm uppercase tracking-wide">
            Add Tokens
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Count"
              className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-200 focus:outline-none text-sm"
            />
            <button className="flex items-center gap-1.5 bg-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-600 transition text-sm shadow-sm">
              <PlusCircle size={14} /> Add
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <h3 className="text-indigo-600 font-semibold mb-3 text-sm uppercase tracking-wide">
            Update Tokens
          </h3>
          <div className="flex gap-2 items-center">
            <CustomSelect
              options={tokenOptions}
              selected={tokenCount}
              setSelected={setTokenCount}
            />
            <button className="flex items-center gap-1.5 bg-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-600 transition text-sm shadow-sm">
              <RefreshCcw size={14} /> Update
            </button>
          </div>
        </div>
      </div>

      {/* Suspension & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
          <h3 className="text-indigo-600 font-semibold mb-3 text-sm uppercase tracking-wide">
            Suspend User
          </h3>
          <div className="flex gap-2">
            <button className="flex-1 bg-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-600 transition text-sm shadow-sm">
              Suspend
            </button>
            <CustomSelect
              options={suspendOptions}
              selected={suspend}
              setSelected={setSuspend}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-center gap-3">
          <h3 className="text-indigo-600 font-semibold mb-2 text-sm uppercase tracking-wide">
            Actions
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="flex w-full items-center justify-center gap-1.5 bg-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-600 transition text-sm shadow-sm">
              <Bell size={16} /> Token Alert
            </button>
            <button className="flex w-full items-center justify-center gap-1.5 bg-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-600 transition text-sm shadow-sm">
              <Send size={16} /> Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
