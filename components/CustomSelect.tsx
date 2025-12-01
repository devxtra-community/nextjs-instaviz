"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomSelect({ value, onChange }: any) {
  const [open, setOpen] = useState(false);

  const options = [
    { label: "🟢 Active", value: "active", color: "text-green-600" },
    { label: "🔴 Disabled", value: "disabled", color: "text-red-600" },
  ];

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-sm hover:bg-white"
      >
        <span>
          {value === "active" ? "🟢 Active" : "🔴 Disabled"}
        </span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-20">
          {options.map((opt) => (
            <button
              key={opt.value}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${opt.color}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
