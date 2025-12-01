"use client";
import React from "react";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: number;              // missing values
  total_rows?: number;
  total_columns?: number;
  unit?: string;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  total_rows,
  total_columns,
  unit,
  description,
}) => {
  // Compute total cells
  const computedTotal =
    typeof total_rows === "number" &&
    typeof total_columns === "number"
      ? total_rows * total_columns
      : null;

  // Compute percentage
  const percentage =
    computedTotal && computedTotal > 0
      ? ((value / computedTotal) * 100).toFixed(1)
      : null;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative flex flex-col justify-between overflow-hidden
                 rounded-xl bg-white border border-[#e9e0f8]
                 px-4 py-3 md:px-5 md:py-4
                 hover:border-[#AD49E1]/40 hover:shadow-[0_2px_10px_rgba(173,73,225,0.08)]
                 transition-all duration-200"
    >
      {/* Subtle accent blob */}
      <div className="absolute right-0 top-0 w-14 h-14 primarybg/5 blur-2xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <p className="text-[12px] font-medium text-gray-500">{title}</p>

        {percentage && (
          <span className="text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-[1px] rounded-full">
            {percentage}%
          </span>
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1">
        {computedTotal !== null ? (
          <h3 className="text-[1.4rem] md:text-[1.6rem] font-bold text-gray-800 flex items-baseline gap-1">
            {/* Main big value */}
            <span>{value}</span>

            {/* Smaller total */}
            <span className="text-[0.75rem] md:text-[0.8rem] text-gray-400 font-medium">
              / {computedTotal}
            </span>
          </h3>
        ) : (
          <h3 className="text-[1.4rem] md:text-[1.6rem] font-bold text-gray-800">
            {value}
          </h3>
        )}

        {unit && <span className="text-gray-400 text-xs">{unit}</span>}
      </div>

      {/* Description */}
      {description && (
        <p className="mt-1 text-[11px] text-gray-500 leading-snug">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default MetricCard;
