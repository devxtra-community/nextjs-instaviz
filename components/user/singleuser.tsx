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

const statusOptions = ["Active", "Deactive"];
const tokenOptions = ["Select Count", "+5", "+10", "+20", "+50"];
const suspendOptions = ["7 Days", "14 Days", "30 Days"];

function CustomSelect({ options, selected, setSelected }) {
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          {/* Button */}
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-[#AD49E1]/50 bg-white py-2 pl-3 pr-10 text-left shadow-sm text-[#AD49E1] focus:outline-none focus:ring-2 focus:ring-[#AD49E1]/50 text-sm font-medium">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon
                className="h-5 w-5 text-[#AD49E1]"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          {/* Options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-[#AD49E1]/20 focus:outline-none">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-[#AD49E1]/10 text-[#AD49E1]"
                        : "text-[#AD49E1]/80"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold text-[#AD49E1]" : ""
                        }`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-3 flex items-center text-[#AD49E1]">
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      {/* Header */}
      <div className="bg-[#AD49E1] text-white rounded-3xl shadow-xl w-full max-w-5xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-10">
          {/* Profile Picture */}
          <div className="relative w-36 h-36">
            <Image
              src="/avatars/emilia.jpg"
              alt="User Avatar"
              width={150}
              height={150}
              className="rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Emilia Clarke</h1>
            <h2 className="text-lg font-medium opacity-90">Premium User</h2>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Mail size={16} /> emilia@technext.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} /> +44 4567 890 123
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> London, UK
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Available Tokens */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-[#AD49E1]">
          <h3 className="text-[#AD49E1] font-semibold mb-2">Available Tokens</h3>
          <p className="text-4xl font-bold text-gray-800">27</p>
          <p className="text-sm text-gray-500 mt-2">Remaining active tokens</p>
        </div>

        {/* Account Status */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-[#AD49E1]">
          <h3 className="text-[#AD49E1] font-semibold mb-3">Account Status</h3>
          <CustomSelect
            options={statusOptions}
            selected={status}
            setSelected={setStatus}
          />
        </div>

        {/* Avg Active Time */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-[#AD49E1] text-center">
          <h3 className="text-[#AD49E1] font-semibold mb-2">Avg. Active Time</h3>
          <div className="w-24 h-24 mx-auto rounded-full border-8 border-[#AD49E1]/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-8 border-[#AD49E1] flex items-center justify-center">
              <p className="text-[#AD49E1] font-semibold text-lg">78%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Token Management */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Add Tokens */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-[#AD49E1]">
          <h3 className="text-[#AD49E1] font-semibold mb-4">Add Tokens</h3>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Count"
              className="flex-1 border border-[#AD49E1]/50 rounded-lg px-3 py-2 text-[#AD49E1] focus:ring-2 focus:ring-[#AD49E1]/50 focus:outline-none"
            />
            <button className="flex items-center gap-2 bg-[#AD49E1] text-white px-4 py-2 rounded-lg font-medium border border-[#AD49E1] hover:bg-white hover:text-[#AD49E1] transition">
              <PlusCircle size={16} /> Add
            </button>
          </div>
        </div>

        {/* Update Tokens */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-[#AD49E1]">
          <h3 className="text-[#AD49E1] font-semibold mb-4">Update Tokens</h3>
          <div className="flex gap-3 items-center">
            <CustomSelect
              options={tokenOptions}
              selected={tokenCount}
              setSelected={setTokenCount}
            />
            <button className="flex items-center gap-2 bg-[#AD49E1] text-white px-4 py-2 rounded-lg font-medium border border-[#AD49E1] hover:bg-white hover:text-[#AD49E1] transition">
              <RefreshCcw size={16} /> Update
            </button>
          </div>
        </div>
      </div>

      {/* Suspension & Alert */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Suspend User */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-[#AD49E1]">
          <h3 className="text-[#AD49E1] font-semibold mb-4">Suspend User</h3>
          <div className="flex gap-3">
            <button className="flex-1 bg-[#AD49E1] text-white px-4 py-2 rounded-lg font-medium border border-[#AD49E1] hover:bg-white hover:text-[#AD49E1] transition">
              Suspend
            </button>
            <CustomSelect
              options={suspendOptions}
              selected={suspend}
              setSelected={setSuspend}
            />
          </div>
        </div>

        {/* Send Buttons */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-[#AD49E1] flex flex-col justify-center gap-4">
          <h3 className="text-[#AD49E1] font-semibold mb-2">Actions</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex w-full items-center justify-center gap-2 bg-[#AD49E1] text-white px-4 py-3 rounded-lg font-medium border border-[#AD49E1] hover:bg-white hover:text-[#AD49E1] transition">
              <Bell size={18} /> Send Token Alert
            </button>
            <button className="flex w-full items-center justify-center gap-2 bg-[#AD49E1] text-white px-4 py-3 rounded-lg font-medium border border-[#AD49E1] hover:bg-white hover:text-[#AD49E1] transition">
              <Send size={18} /> Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
